import { test, expect } from "@playwright/test";
import {
  ROUTES,
  CORE_ROUTES,
  brokenImages,
  collectConsoleErrors,
  horizontalOverflow,
  scrollThrough,
} from "./helpers";

// Does every page still load, render its heading, and stay quiet in the console?
// This is the net that catches "someone broke a page and nobody noticed".
test.describe("every page loads cleanly", () => {
  for (const route of ROUTES) {
    test(`${route} renders without errors`, async ({ page }) => {
      const errors = collectConsoleErrors(page);

      const response = await page.goto(route);
      expect(response?.status(), `${route} should return 200`).toBe(200);

      // Exactly one <h1>: the thing screen readers and search engines use to say what the
      // page is. Two is a hierarchy bug, zero means the heading failed to render.
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).not.toBeEmpty();

      await expect(page).toHaveTitle(/KALA/i);

      await scrollThrough(page);

      expect(await brokenImages(page), `${route} has broken images`).toEqual([]);
      expect(errors, `${route} logged console errors`).toEqual([]);
    });
  }
});

test.describe("core pages on every engine @xbrowser", () => {
  for (const route of CORE_ROUTES) {
    test(`${route} works cross-browser`, async ({ page }) => {
      const errors = collectConsoleErrors(page);
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await scrollThrough(page);

      // The site is cream-on-wine editorial design; a blank page would still pass a status
      // check, so assert something was actually painted.
      const textLength = await page.evaluate(() => document.body.innerText.trim().length);
      expect(textLength, `${route} rendered almost no text`).toBeGreaterThan(200);

      expect(await horizontalOverflow(page), `${route} scrolls sideways`).toBeLessThanOrEqual(0);
      expect(errors, `${route} logged console errors`).toEqual([]);
    });
  }
});

test("the main navigation goes where it says @xbrowser", async ({ page, isMobile }) => {
  await page.goto("/");

  // Below lg the links live behind the hamburger; the desktop bar is hidden. Open the menu
  // first so this covers the real journey on a phone rather than only the desktop one.
  if (isMobile) {
    await page.getByRole("button", { name: /menu/i }).first().click();
    await expect(page.getByRole("dialog", { name: /menu/i })).toBeVisible();
  }

  const scope = isMobile ? page.getByRole("dialog", { name: /menu/i }) : page.locator("header");
  const courses = scope.getByRole("link", { name: /^Courses$/i }).first();
  await expect(courses).toBeVisible();
  await courses.click();

  await expect(page).toHaveURL(/\/courses$/);
  await expect(page.locator("h1")).toContainText(/craft/i);
});

test("the logo returns home @xbrowser", async ({ page }) => {
  await page.goto("/courses");
  await page.getByRole("link", { name: /KALA home/i }).first().click();
  await expect(page).toHaveURL(/\/$/);
});
