import { createHmac } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/seo";
import { leadFormSchema } from "@/lib/validation";

// The enquiry form's only server endpoint. It validates, rate-limits, and hands the lead to
// the configured destination (LEADS_WEBHOOK_URL). It never reports success for a lead it
// did not deliver: until a destination is configured, production answers 503 and the form
// sends the visitor to WhatsApp / phone instead (see LeadForm).

const MAX_BODY_BYTES = 4096;
const WEBHOOK_TIMEOUT_MS = 8000;

const FALLBACK_MESSAGE =
  "We couldn't take your enquiry online just now. Please WhatsApp or call us and we'll help right away.";

// An empty or non-numeric value in .env (e.g. a copied .env.example) must not turn the limiter
// into "block everything", so anything that isn't a positive integer falls back to the default.
function positiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

// Best-effort in-memory rate limit — resets on redeploy and doesn't share state across
// serverless instances. Replace with a durable store (e.g. Upstash Redis) before scaling
// past a single long-running instance.
const RATE_LIMIT_MAX = positiveInt(process.env.LEADS_RATE_LIMIT_MAX, 5);
const RATE_LIMIT_WINDOW_MS = positiveInt(process.env.LEADS_RATE_LIMIT_WINDOW_SECONDS, 60) * 1000;
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();

  // Drop clients whose whole history has aged out, so the map can't grow without bound.
  if (requestLog.size > 1000) {
    for (const [client, timestamps] of requestLog) {
      if (timestamps.every((timestamp) => now - timestamp >= RATE_LIMIT_WINDOW_MS)) {
        requestLog.delete(client);
      }
    }
  }

  const recent = (requestLog.get(key) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  requestLog.set(key, recent);
  return recent.length > RATE_LIMIT_MAX;
}

// Browsers always send Origin on a cross-site POST, so a mismatched Origin is a request
// made from someone else's page. Requests without an Origin (curl, server-side tools) are
// not a CSRF vector and are left to the rate limit.
function hasForeignOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return true;
  }

  const allowed = new Set<string>();
  const requestHost = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (requestHost) allowed.add(requestHost);
  try {
    allowed.add(new URL(getSiteUrl()).host);
  } catch {
    // getSiteUrl() always returns a valid URL; nothing to add otherwise.
  }
  return !allowed.has(originHost);
}

type Lead = {
  id: string;
  interest: string;
  goal: string;
  name: string;
  phone: string;
  preferredContactTime?: string;
  source?: string;
  campaign?: string;
  courseSlug?: string;
  createdAt: string;
  status: "new";
};

type Delivery = "delivered" | "not_configured" | "failed";

// POSTs the lead as JSON to LEADS_WEBHOOK_URL. When LEADS_WEBHOOK_SECRET is set the body is
// signed (X-KALA-Signature: sha256=HMAC of "<timestamp>.<body>") so the receiver can reject
// forged calls. Only the lead id is ever logged — never the visitor's name or number.
async function deliverLead(lead: Lead): Promise<Delivery> {
  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) return "not_configured";

  let target: URL;
  try {
    target = new URL(url);
  } catch {
    console.error("[leads] LEADS_WEBHOOK_URL is not a valid URL");
    return "failed";
  }
  // The lead contains a name and phone number, so in production it only travels over https.
  // (Plain http is allowed to a loopback address, which lets the delivery path be tested
  // against a local receiver without any real destination.)
  const isLoopback = ["localhost", "127.0.0.1", "[::1]"].includes(target.hostname);
  if (target.protocol !== "https:" && !isLoopback && process.env.NODE_ENV === "production") {
    console.error("[leads] LEADS_WEBHOOK_URL must be https in production");
    return "failed";
  }

  const body = JSON.stringify(lead);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-KALA-Event": "lead.created",
    "X-KALA-Lead-Id": lead.id,
    "X-KALA-Timestamp": timestamp,
  };
  const secret = process.env.LEADS_WEBHOOK_SECRET;
  if (secret) {
    headers["X-KALA-Signature"] =
      `sha256=${createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex")}`;
  }

  try {
    const response = await fetch(target, {
      method: "POST",
      headers,
      body,
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
    if (response.ok) return "delivered";
    console.error(`[leads] webhook answered ${response.status} for lead ${lead.id}`);
    return "failed";
  } catch (error) {
    const reason = error instanceof Error ? error.name : "unknown";
    console.error(`[leads] webhook request failed (${reason}) for lead ${lead.id}`);
    return "failed";
  }
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  if (hasForeignOrigin(request)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  }

  // Only a real JSON request is accepted. A cross-site form or `text/plain` POST can reach
  // this route without a CORS preflight, so the content type is part of the defence.
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ error: "Invalid request." }, { status: 415 });
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Invalid request." }, { status: 413 });
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Invalid request." }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot first, before validation: real visitors never fill this field, so a filled one
  // is a bot. It gets the same answer a real lead would, so it can't learn to skip the field —
  // and nothing is delivered.
  if (
    typeof body === "object" &&
    body !== null &&
    "company" in body &&
    typeof body.company === "string" &&
    body.company.length > 0
  ) {
    return NextResponse.json({ success: true });
  }

  const parsed = leadFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 }
    );
  }

  const lead: Lead = {
    id: crypto.randomUUID(),
    interest: parsed.data.interest,
    goal: parsed.data.goal,
    name: parsed.data.name,
    phone: parsed.data.phone,
    preferredContactTime: parsed.data.preferredContactTime,
    source: parsed.data.source,
    campaign: parsed.data.campaign,
    courseSlug: parsed.data.courseSlug,
    createdAt: new Date().toISOString(),
    status: "new",
  };

  const delivery = await deliverLead(lead);

  if (delivery === "delivered") {
    return NextResponse.json({ success: true });
  }

  if (delivery === "not_configured") {
    if (process.env.NODE_ENV !== "production") {
      // Local development only: show the lead in the terminal so the form can be worked on
      // without a destination. Production never takes this branch.
      console.log("[leads] (dev, no LEADS_WEBHOOK_URL) new enquiry", lead);
      return NextResponse.json({ success: true });
    }
    console.error("[leads] LEADS_WEBHOOK_URL is not set — enquiry rejected, not stored");
  }

  // Not configured (production) or the destination failed: say so. The visitor is pointed to
  // WhatsApp / phone, and the form never shows "Thank you" for a lead nobody received.
  return NextResponse.json({ error: FALLBACK_MESSAGE, fallback: true }, { status: 503 });
}
