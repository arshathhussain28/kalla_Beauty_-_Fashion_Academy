import type { Page } from "@playwright/test";

/** Every public route, in navigation order. Add a page here and the smoke suite covers it. */
export const ROUTES = [
  "/",
  "/courses",
  "/courses/advanced-makeup-artist",
  "/courses/advanced-beautician",
  "/courses/advanced-mehendi-artist",
  "/courses/advanced-saree-pleating-draping",
  "/courses/advanced-tailoring-fashion-design",
  "/why-kala",
  "/the-work",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
] as const;

/** The handful worth paying for on every engine. */
export const CORE_ROUTES = ["/", "/courses", "/contact", "/why-kala"] as const;

/**
 * Console noise a passing page is still allowed to make. Keep this list short and specific —
 * each entry is a thing we have decided not to care about, so a vague pattern here would hide
 * a real regression.
 */
const IGNORED_CONSOLE = [
  /favicon/i,
  // Chrome logs this for any lazily-decoded image that leaves the viewport mid-load.
  /The play\(\) request was interrupted/i,
];

export function collectConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    if (IGNORED_CONSOLE.some((re) => re.test(text))) return;
    errors.push(text);
  });
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  return errors;
}

/** Scrolls the whole page so lazy images load and in-view animations fire, then returns to top. */
export async function scrollThrough(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const total = document.documentElement.scrollHeight;
    for (let y = 0; y < total; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 250));
  });
}

export async function horizontalOverflow(page: Page): Promise<number> {
  return page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
}

export async function brokenImages(page: Page): Promise<string[]> {
  return page.evaluate(() =>
    [...document.images]
      .filter((img) => img.complete && img.naturalWidth === 0 && img.currentSrc)
      .map((img) => img.currentSrc)
  );
}

/**
 * Fills the enquiry form with test-only values. The radio inputs are visually hidden
 * (`sr-only`) behind styled labels, so they are set directly rather than clicked.
 */
export async function fillEnquiryForm(page: Page): Promise<void> {
  await page.locator('input[name="interest"][value="makeup"]').first().check({ force: true });
  await page.locator('input[name="goal"][value="career"]').first().check({ force: true });
  await page.locator("#name").first().fill("Test Person");
  await page.locator("#phone").first().fill("9876543210");
}
