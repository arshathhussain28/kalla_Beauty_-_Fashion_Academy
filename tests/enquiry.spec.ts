import { test, expect } from "@playwright/test";
import { fillEnquiryForm } from "./helpers";

// The enquiry form is the only thing on this site that earns money, and it has already failed
// once in a way nobody noticed: it used to answer "Thank you" for leads the server quietly
// discarded. These tests exist mainly to make that regression impossible to ship twice.
//
// The API is mocked so the real destination is never touched and no fake enquiry is ever
// delivered to the academy.

test.describe("enquiry form", () => {
  test("shows success only when the server actually accepted the lead", async ({ page }) => {
    let received = 0;
    await page.route("**/api/leads", async (route) => {
      received++;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto("/contact");
    await fillEnquiryForm(page);
    await page.getByRole("button", { name: /get course details/i }).click();

    await expect(page.getByText(/thank you/i)).toBeVisible();
    expect(received, "the form should have called the API exactly once").toBe(1);
  });

  test("NEVER shows success when delivery failed — offers WhatsApp instead", async ({ page }) => {
    await page.route("**/api/leads", async (route) => {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({
          error: "We couldn't take your enquiry online just now.",
          fallback: true,
        }),
      });
    });

    await page.goto("/contact");
    await fillEnquiryForm(page);
    await page.getByRole("button", { name: /get course details/i }).click();

    // The whole point: no false reassurance.
    await expect(page.getByText(/thank you/i)).toHaveCount(0);

    // Scoped to the form: Next.js injects its own visually-hidden role="alert" route
    // announcer into every page, so an unscoped getByRole("alert") is ambiguous.
    const alert = page.locator("form").getByRole("alert");
    await expect(alert).toBeVisible();
    await expect(alert).toContainText(/couldn't take your enquiry/i);
    // and the visitor is handed a way to reach a human instead of a dead end
    await expect(alert.locator('a[href*="wa.me"]')).toBeVisible();
  });

  test("a network failure is reported, not swallowed", async ({ page }) => {
    await page.route("**/api/leads", (route) => route.abort("failed"));

    await page.goto("/contact");
    await fillEnquiryForm(page);
    await page.getByRole("button", { name: /get course details/i }).click();

    await expect(page.getByText(/thank you/i)).toHaveCount(0);
    const alert = page.locator("form").getByRole("alert");
    await expect(alert).toBeVisible();
    await expect(alert).toContainText(/couldn't reach the server/i);
  });

  test("an incomplete form is not sent to the server", async ({ page }) => {
    let called = false;
    await page.route("**/api/leads", async (route) => {
      called = true;
      await route.fulfill({ status: 200, body: "{}" });
    });

    await page.goto("/contact");
    await page.getByRole("button", { name: /get course details/i }).click();
    await page.waitForTimeout(600);

    expect(called, "an empty form must never reach the API").toBe(false);
    await expect(page.getByText(/thank you/i)).toHaveCount(0);
  });

  test("the spam honeypot stays hidden from real visitors", async ({ page }) => {
    await page.goto("/contact");
    // Present in the DOM for bots to fill, but no human should reach it. It is hidden by
    // being positioned far off-screen — which Playwright still reports as "visible", so
    // assert the three things that actually keep it away from people.
    const honeypot = page.locator("#company");
    await expect(honeypot).toHaveCount(1);
    await expect(honeypot).toHaveAttribute("tabindex", "-1");

    const box = await honeypot.boundingBox();
    expect(box, "honeypot should be laid out, just off-screen").not.toBeNull();
    expect(box!.x + box!.width, "honeypot must sit outside the viewport").toBeLessThan(0);

    // and it is hidden from assistive technology
    const hiddenFromAT = await honeypot.evaluate(
      (el) => !!el.closest('[aria-hidden="true"]')
    );
    expect(hiddenFromAT).toBe(true);
  });

  test("the form is reachable and usable on a phone @xbrowser", async ({ page }) => {
    await page.route("**/api/leads", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: '{"success":true}' })
    );

    await page.goto("/contact");
    await fillEnquiryForm(page);
    const submit = page.getByRole("button", { name: /get course details/i });
    await expect(submit).toBeVisible();
    await submit.click();
    await expect(page.getByText(/thank you/i)).toBeVisible();
  });
});
