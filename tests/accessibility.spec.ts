import { test, expect } from "@playwright/test";
import { ROUTES, CORE_ROUTES, scrollThrough, horizontalOverflow } from "./helpers";

// Accessibility and responsive guarantees. The motion system is the risk here: a word-by-word
// headline that fails to start leaves text invisible, and a visitor who asked for less motion
// must never be shown a half-finished animation.

const WIDTHS = [
  { name: "phone", width: 390, height: 844 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "desktop", width: 1440, height: 900 },
];

test.describe("no page scrolls sideways", () => {
  for (const size of WIDTHS) {
    test(`${size.name} (${size.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: size.width, height: size.height });
      for (const route of ROUTES) {
        await page.goto(route);
        await scrollThrough(page);
        expect(await horizontalOverflow(page), `${route} at ${size.width}px`).toBeLessThanOrEqual(0);
      }
    });
  }
});

test.describe("animated text always ends up readable", () => {
  for (const route of CORE_ROUTES) {
    test(`${route} has no text left invisible`, async ({ page }) => {
      await page.goto(route);
      await scrollThrough(page);
      await page.waitForTimeout(1500); // let every entrance finish

      const invisible = await page.evaluate(() =>
        [...document.querySelectorAll("h1, h2, h1 span span, h2 span span")]
          .filter((el) => {
            const s = getComputedStyle(el);
            return (
              (el as HTMLElement).innerText.trim().length > 0 &&
              (s.opacity === "0" || s.visibility === "hidden")
            );
          })
          .map((el) => (el as HTMLElement).innerText.slice(0, 40))
      );
      expect(invisible, `${route} left headings invisible`).toEqual([]);
    });
  }
});

test.describe("reduced motion is respected", () => {
  // Set per test via emulateMedia rather than test.use(): it must be applied BEFORE the first
  // navigation, and this way the intent is visible in the test that depends on it.
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("headings are shown immediately, fully opaque", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(400);
    const state = await page.evaluate(() => {
      const el = document.querySelector("h1 span span") ?? document.querySelector("h1");
      const s = getComputedStyle(el as Element);
      return { opacity: s.opacity, transform: s.transform };
    });
    expect(state.opacity).toBe("1");
    expect(["none", "matrix(1, 0, 0, 1, 0, 0)"]).toContain(state.transform);
  });

  test("the smooth-scroll library is never activated", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1200);
    const active = await page.evaluate(() => document.documentElement.classList.contains("lenis"));
    expect(active, "smooth scroll must stay off for reduced motion").toBe(false);
  });

  test("the route-transition veil is not drawn", async ({ page }) => {
    await page.goto("/");
    const display = await page.evaluate(
      () => getComputedStyle(document.querySelector(".kala-page")!, "::before").display
    );
    expect(display).toBe("none");
  });
});

test("phones do not download the smooth-scroll library @xbrowser", async ({ page, isMobile }) => {
  test.skip(!isMobile, "only meaningful on a touch device profile");
  await page.goto("/");
  await page.waitForTimeout(1200);
  const active = await page.evaluate(() => document.documentElement.classList.contains("lenis"));
  expect(active, "touch devices keep their native scrolling").toBe(false);
});

test("every image carries alt text", async ({ page }) => {
  for (const route of CORE_ROUTES) {
    await page.goto(route);
    await scrollThrough(page);
    const missing = await page.evaluate(() =>
      [...document.images].filter((i) => !i.hasAttribute("alt")).map((i) => i.currentSrc)
    );
    expect(missing, `${route} has images without an alt attribute`).toEqual([]);
  }
});

test("interactive controls have accessible names", async ({ page }) => {
  await page.goto("/contact");
  const unnamed = await page.evaluate(() =>
    [...document.querySelectorAll("button, a[href]")]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return false;
        const name =
          el.getAttribute("aria-label") ??
          (el as HTMLElement).innerText.trim() ??
          el.getAttribute("title") ??
          "";
        return name.length === 0;
      })
      .map((el) => el.outerHTML.slice(0, 80))
  );
  expect(unnamed).toEqual([]);
});
