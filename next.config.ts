import type { NextConfig } from "next";

// Content-Security-Policy, built from what the site actually loads: its own scripts, styles,
// fonts and images, and one same-origin POST (/api/leads). WhatsApp, Google Maps and `tel:`
// links are plain navigations, which CSP doesn't restrict. `'unsafe-inline'` stays on
// script-src because Next.js writes small inline bootstrap scripts into every page; a
// nonce-based policy would force every page to render dynamically (no static caching), so
// this trades that away for a policy that still blocks third-party scripts, framing, plugins
// and form hijacking. When GA4 / Meta Pixel are wired in (lib/analytics.ts), add their hosts
// to script-src and connect-src here. Production only — `next dev` needs eval for hot reload.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

// Baseline security headers.
const securityHeaders = [
  ...(process.env.NODE_ENV === "production"
    ? [{ key: "Content-Security-Policy", value: contentSecurityPolicy }]
    : []),
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
  // No reason to tell every visitor (and scanner) which framework serves the site.
  poweredByHeader: false,
  images: {
    // Brand assets are versioned with a "?v=N" query string so browsers don't keep
    // serving a stale cached render after the underlying file is replaced (the file
    // itself, e.g. the logo, gets edited/re-cropped in place rather than renamed).
    // Next.js 16 requires local `next/image` query strings to be explicitly allowed.
    //
    // Photography goes in /public/images/ (see data/images.ts). Without this second
    // pattern, next/image rejects every local photograph with "does not match
    // images.localPatterns" the moment a slot's `src` is set.
    localPatterns: [
      { pathname: "/brand/**", search: "?v=3" },
      { pathname: "/images/**" },
    ],
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
