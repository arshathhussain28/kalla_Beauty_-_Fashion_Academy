import { defineConfig, devices } from "@playwright/test";

// Tests run against a REAL PRODUCTION BUILD (`next build && next start`), not `next dev`.
// Half the things worth testing here only behave correctly in production: the error boundary
// (dev shows Next's overlay instead), static generation, and the minified bundle split that
// decides whether a phone downloads the smooth-scroll library.
//
// Browser coverage is deliberately uneven, to keep CI quick while still being honest:
//   chromium — the whole suite
//   firefox / webkit — the cross-engine subset, tagged @xbrowser
// WebKit is what makes Safari and iOS testable at all from a Windows machine, which is the
// gap flagged in audit/PRODUCTION_READINESS.md.
const PORT = 3210;
// `localhost`, never `127.0.0.1`: WebKit silently upgrades subresource requests on a bare
// loopback IP to https, which a plain `next start` cannot answer. Every stylesheet, script,
// font and image then fails with an SSL error and the page renders completely unstyled — which
// looks exactly like a catastrophic Safari layout bug and is purely an artefact of the harness.
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  // A test that only passes sometimes is worse than no test: fail the build if `.only` is
  // committed, and never silently retry a flake away locally.
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  timeout: 30_000,
  expect: { timeout: 10_000 },

  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "off",
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] }, grep: /@xbrowser/ },
    { name: "webkit", use: { ...devices["Desktop Safari"] }, grep: /@xbrowser/ },
    { name: "mobile-safari", use: { ...devices["iPhone 13"] }, grep: /@xbrowser/ },
  ],

  webServer: {
    // E2E_HTTP drops the two directives that force https — `upgrade-insecure-requests` in the
    // CSP, and Strict-Transport-Security. Chromium exempts loopback from both; WebKit does not,
    // so over a plain `next start` every subresource would be upgraded to https, fail with an
    // SSL error, and the page would render unstyled. Nothing else changes: this is the real
    // production build, and those two directives are verified against the live site instead.
    env: { E2E_HTTP: "1", NEXT_TELEMETRY_DISABLED: "1" },
    command: "npm run build && npm run start -- -p " + PORT,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: "ignore",
    stderr: "pipe",
  },
});
