import { NextRequest, NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/validation";

// Best-effort in-memory rate limit — resets on redeploy and doesn't share state across
// serverless instances. Replace with a durable store (e.g. Upstash Redis) before scaling
// past a single long-running instance.
const RATE_LIMIT_MAX = Number(process.env.LEADS_RATE_LIMIT_MAX ?? 5);
const RATE_LIMIT_WINDOW_MS = Number(process.env.LEADS_RATE_LIMIT_WINDOW_SECONDS ?? 60) * 1000;
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  requestLog.set(key, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = leadFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 }
    );
  }

  if (parsed.data.company) {
    // Honeypot tripped — report success so bots don't learn to skip the field.
    return NextResponse.json({ success: true });
  }

  const lead = {
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
    status: "new" as const,
  };

  // TODO(lead-backend): persist `lead` to the real CRM/DB and notify admissions — see
  // docs/ARCHITECTURE.md § Lead Backend. Placeholder-logged only outside production.
  if (process.env.NODE_ENV !== "production") {
    console.log("[leads] new enquiry", lead);
  }

  return NextResponse.json({ success: true });
}
