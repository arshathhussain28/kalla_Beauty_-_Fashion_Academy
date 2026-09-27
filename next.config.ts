import type { NextConfig } from "next";

// Baseline security headers. CSP is intentionally not yet locked down to script-src 'self'
// with nonces — that hardening pass belongs to the dedicated Security phase once real
// third-party scripts (analytics, WhatsApp, maps) are wired in, so it can be tuned against
// what the app actually loads instead of guessed in advance.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
    // Brand assets are versioned with a "?v=N" query string so browsers don't keep
    // serving a stale cached render after the underlying file is replaced (the file
    // itself, e.g. the logo, gets edited/re-cropped in place rather than renamed).
    // Next.js 16 requires local `next/image` query strings to be explicitly allowed.
    localPatterns: [{ pathname: "/brand/**", search: "?v=3" }],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
