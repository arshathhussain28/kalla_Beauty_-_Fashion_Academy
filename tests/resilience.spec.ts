import { test, expect } from "@playwright/test";

// Security posture and failure behaviour. These are cheap to assert and expensive to discover
// in production, and several of them encode decisions that are easy to undo by accident
// (a header dropped from next.config.ts, an API guard removed during a refactor).

test.describe("the enquiry endpoint refuses what it should", () => {
  test("rejects GET", async ({ request }) => {
    expect((await request.get("/api/leads")).status()).toBe(405);
  });

  test("rejects a non-JSON body", async ({ request }) => {
    const res = await request.post("/api/leads", {
      headers: { "Content-Type": "text/plain" },
      data: "not json",
    });
    expect(res.status()).toBe(415);
  });

  test("rejects a cross-site post", async ({ request }) => {
    const res = await request.post("/api/leads", {
      headers: { "Content-Type": "application/json", Origin: "https://evil.example" },
      data: {},
    });
    expect(res.status()).toBe(403);
  });

  test("rejects an oversized body", async ({ request, baseURL }) => {
    const res = await request.post("/api/leads", {
      headers: { "Content-Type": "application/json", Origin: baseURL ?? "" },
      data: { name: "x".repeat(10_000) },
    });
    expect(res.status()).toBe(413);
  });
});

test("security headers are present", async ({ request }) => {
  const res = await request.get("/");
  const h = res.headers();
  expect(h["x-frame-options"]).toBe("DENY");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(h["permissions-policy"]).toContain("camera=()");
  // X-Powered-By leaks the framework version; it is switched off in next.config.ts
  expect(h["x-powered-by"]).toBeUndefined();
});

test("the health endpoint reports status for an uptime monitor", async ({ request }) => {
  const res = await request.get("/api/health");
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.status).toBe("ok");
  // The monitor keyword-checks this to catch "site up but cannot take enquiries".
  expect(["configured", "not_configured"]).toContain(body.leadDelivery);
  expect(res.headers()["cache-control"]).toContain("no-store");
});

test("an unknown URL shows the 404 page, not a crash @xbrowser", async ({ page }) => {
  const res = await page.goto("/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByText(/different path/i)).toBeVisible();
  // the 404 is a real page with a way back, not a dead end
  await expect(page.getByRole("link", { name: /back to kala/i })).toBeVisible();
});

test("search engines are told to stay away until launch", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  // Indexing is deliberately off until the content is real (NEXT_PUBLIC_ALLOW_INDEXING).
  expect(robots).toMatch(/Disallow: \//);
});
