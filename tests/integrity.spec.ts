import { test, expect } from "@playwright/test";
import { ROUTES, scrollThrough } from "./helpers";

// Content-integrity rules. These encode promises the project made to the client and to
// visitors — that unfinished scaffolding never reaches a real person — so that a future
// change cannot quietly break one.

test.describe("nothing unfinished reaches a visitor", () => {
  for (const route of ROUTES) {
    test(`${route} shows no placeholder scaffolding`, async ({ page }) => {
      await page.goto(route);
      await scrollThrough(page);

      const text = await page.evaluate(() => document.body.innerText);
      expect(text).not.toMatch(/lorem ipsum/i);
      expect(text).not.toMatch(/placeholder (route|trainer|student|credential|biography)/i);
      expect(text).not.toMatch(/photography pending/i);
      expect(text).not.toMatch(/\bundefined\b|\bNaN\b|\[object Object\]/);
    });
  }
});

test("empty photo frames are never shown", async ({ page }) => {
  // The empty-slot placeholder is a blush gradient block. A section that cannot fill its
  // photographs must leave the page or fall back to text (hasPhotos in data/images.ts),
  // never render these.
  for (const route of ROUTES) {
    await page.goto(route);
    await scrollThrough(page);
    const blanks = await page.evaluate(
      () =>
        [...document.querySelectorAll('div[aria-hidden="true"]')].filter(
          (d) =>
            /from-rose-light\/60|from-wine-soft/.test(d.className) &&
            /to-cream-deep|to-wine-deep/.test(d.className) &&
            d.getBoundingClientRect().width > 40
        ).length
    );
    expect(blanks, `${route} is showing empty photo frames`).toBe(0);
  }
});

test("unconfirmed fees are never invented", async ({ page }) => {
  // data/courses.ts keeps fee and duration as pending() until the client confirms one
  // authoritative figure. Until then the page must say so rather than print a number.
  await page.goto("/courses/advanced-makeup-artist");
  const text = await page.evaluate(() => document.body.innerText);
  expect(text).toMatch(/contact us for current fees/i);
  // no rupee amount anywhere on a course page while fees are unconfirmed
  expect(text).not.toMatch(/₹\s?\d/);
});

test("the legal pages carry the draft notice while unapproved", async ({ page }) => {
  for (const route of ["/privacy", "/terms"]) {
    await page.goto(route);
    await expect(page.getByText(/draft for review/i)).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();
    // and they are kept out of search while they are drafts
    const robots = await page
      .locator('meta[name="robots"]')
      .getAttribute("content")
      .catch(() => null);
    expect(robots ?? "").toMatch(/noindex/);
  }
});

test("The Work stays out of the navigation until it has photographs", async ({ page }) => {
  await page.goto("/");
  // WORK_READY is false, so no link anywhere
  await expect(page.locator('a[href="/the-work"]')).toHaveCount(0);

  // but the page itself is honest rather than empty, and stays out of search
  await page.goto("/the-work");
  await expect(page.getByText(/being prepared/i)).toBeVisible();
  const robots = await page.locator('meta[name="robots"]').getAttribute("content");
  expect(robots ?? "").toMatch(/noindex/);
});

test("the sitemap lists only pages that are ready", async ({ request }) => {
  const res = await request.get("/sitemap.xml");
  expect(res.status()).toBe(200);
  const xml = await res.text();
  expect(xml).toContain("/courses");
  expect(xml).not.toContain("/the-work");
  // drafts and legal pages are not advertised
  expect(xml).not.toContain("/privacy");
});
