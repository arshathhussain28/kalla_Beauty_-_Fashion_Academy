// Fails the build if a production bundle is missing a security header.
//
// Why this exists: Next.js evaluates `headers()` at BUILD time and freezes the result into
// .next/routes-manifest.json. The browser-test harness builds with E2E_HTTP=1, which drops the
// two directives that force https (Strict-Transport-Security and `upgrade-insecure-requests`)
// because WebKit will not load http subresources with them set. That flag must never reach a
// real deployment — and because the headers are baked in, a flagged build looks completely
// normal. This check runs in the CI job that builds WITHOUT the flag, so the mistake cannot
// ship quietly.
//
// Run: node scripts/check-security-headers.mjs   (after `next build`)
import { readFileSync } from "node:fs";

const MANIFEST = ".next/routes-manifest.json";

const REQUIRED_HEADERS = [
  "Content-Security-Policy",
  "Strict-Transport-Security",
  "X-Content-Type-Options",
  "X-Frame-Options",
  "Referrer-Policy",
  "Permissions-Policy",
];

const REQUIRED_CSP_DIRECTIVES = [
  "default-src 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
];

let manifest;
try {
  manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
} catch {
  console.error(`✗ Could not read ${MANIFEST}. Run \`next build\` first.`);
  process.exit(1);
}

const entries = (manifest.headers ?? []).flatMap((rule) => rule.headers ?? []);
const present = new Set(entries.map((h) => h.key));
const csp = entries.find((h) => h.key === "Content-Security-Policy")?.value ?? "";

const problems = [];

for (const key of REQUIRED_HEADERS) {
  if (!present.has(key)) problems.push(`missing header: ${key}`);
}
for (const directive of REQUIRED_CSP_DIRECTIVES) {
  if (!csp.includes(directive)) problems.push(`CSP is missing: ${directive}`);
}
if (present.has("X-Powered-By")) {
  problems.push("X-Powered-By is being sent — it should stay off (poweredByHeader: false)");
}

if (problems.length > 0) {
  console.error("✗ Production security headers are not what they should be:\n");
  for (const p of problems) console.error(`   • ${p}`);
  console.error(
    "\n  If this ran after a test build, that is the cause: E2E_HTTP=1 deliberately drops the\n" +
      "  two https-forcing directives. Production builds must never set it.\n"
  );
  process.exit(1);
}

console.log(`✓ All ${REQUIRED_HEADERS.length} security headers present, CSP intact.`);
