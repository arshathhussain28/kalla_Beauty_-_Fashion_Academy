// Proves a lead destination works BEFORE the live form depends on it.
//
//   node scripts/verify-lead-delivery.mjs "<webhook url>" [secret]
//   node scripts/verify-lead-delivery.mjs            # uses LEADS_WEBHOOK_URL / _SECRET
//
// It sends ONE clearly-marked test enquiry, exactly as app/api/leads/route.ts would — same
// JSON shape, same headers, same HMAC signature, same 8-second timeout, same `redirect:
// manual` — and then explains what came back and what to do about it.
//
// It writes a real row to whatever you point it at, so only run it against your own
// destination, and delete the test row afterwards.
import { createHmac } from "node:crypto";

const WEBHOOK_TIMEOUT_MS = 8000;

const url = process.argv[2] ?? process.env.LEADS_WEBHOOK_URL;
const secret = process.argv[3] ?? process.env.LEADS_WEBHOOK_SECRET;

if (!url) {
  console.error(
    "Usage: node scripts/verify-lead-delivery.mjs \"<webhook url>\" [secret]\n" +
      "   or: set LEADS_WEBHOOK_URL (and optionally LEADS_WEBHOOK_SECRET) first."
  );
  process.exit(2);
}

let target;
try {
  target = new URL(url);
} catch {
  console.error(`✗ Not a valid URL: ${url}`);
  process.exit(1);
}
if (target.protocol !== "https:") {
  console.error(
    `✗ ${target.protocol}// is refused in production — the lead carries a name and phone\n` +
      "  number, so the destination must be https."
  );
  process.exit(1);
}

// Unmistakably a test, so whoever reads the sheet does not ring this person.
const lead = {
  id: crypto.randomUUID(),
  interest: "makeup",
  goal: "career",
  name: "TEST — delivery check (ignore)",
  phone: "0000000000",
  preferredContactTime: "anytime",
  source: "scripts/verify-lead-delivery",
  createdAt: new Date().toISOString(),
  status: "new",
};

const body = JSON.stringify(lead);
const timestamp = Math.floor(Date.now() / 1000).toString();
const headers = {
  "Content-Type": "application/json",
  "X-KALA-Event": "lead.created",
  "X-KALA-Lead-Id": lead.id,
  "X-KALA-Timestamp": timestamp,
};
if (secret) {
  headers["X-KALA-Signature"] =
    `sha256=${createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex")}`;
}

console.log(`→ Sending one test enquiry to ${target.host}${target.pathname}`);
console.log(`  lead id: ${lead.id}`);
console.log(`  signed:  ${secret ? "yes (X-KALA-Signature)" : "NO — set a secret before launch"}`);

const started = Date.now();
let response;
try {
  response = await fetch(target, {
    method: "POST",
    headers,
    body,
    cache: "no-store",
    redirect: "manual",
    signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
  });
} catch (error) {
  const name = error instanceof Error ? error.name : "unknown";
  console.error(`\n✗ The request never completed (${name}).`);
  console.error(
    name === "TimeoutError"
      ? `  Nothing answered within ${WEBHOOK_TIMEOUT_MS / 1000}s. The live site waits exactly this\n` +
          "  long before giving the visitor the WhatsApp fallback."
      : "  Check the URL is reachable from the public internet."
  );
  process.exit(1);
}

const ms = Date.now() - started;
console.log(`\n← ${response.status} ${response.statusText} in ${ms}ms`);

const redirect = response.status >= 300 && response.status < 400;

if (response.ok) {
  console.log("\n✓ Delivered. The live form will show \"Thank you\" for a lead like this.");
  console.log("  Now check the row actually arrived, then delete the test row.");
  if (!secret) {
    console.log(
      "\n  One thing left: no secret is set, so the receiver cannot prove deliveries came\n" +
        "  from the site. Set LEADS_WEBHOOK_SECRET before launch."
    );
  }
  process.exit(0);
}

if (redirect) {
  console.log(`  (redirects to: ${response.headers.get("location") ?? "unknown"})`);
  console.log(
    "\n! The receiver answered with a redirect.\n" +
      "  Google Apps Script always does this, AFTER it has stored the lead. If that is what\n" +
      "  you are using, check the row arrived and then set LEADS_WEBHOOK_ACCEPTS_REDIRECT=1\n" +
      "  in Vercel — otherwise the site treats this as a failure.\n" +
      "  For anything else, a redirect usually means the URL is stale or mistyped."
  );
  process.exit(1);
}

console.error(
  `\n✗ The destination rejected it (${response.status}).\n` +
    "  The live form would show the WhatsApp fallback, and no enquiry would be stored."
);
if (response.status === 401 || response.status === 403) {
  console.error("  That status usually means a wrong or missing token/secret.");
}
const text = await response.text().catch(() => "");
if (text) console.error(`  Response body: ${text.slice(0, 300)}`);
process.exit(1);
