import { NextResponse } from "next/server";

// A single endpoint an external uptime monitor can poll (UptimeRobot, Better Stack, Pingdom —
// see docs/OPERATIONS.md). Two different failures matter here and they are reported separately:
//
//   * the site being down            -> this returns nothing at all, or a 5xx
//   * the site being up but unable to take enquiries -> 200 with leadDelivery:"not_configured"
//
// They are deliberately NOT merged into one status code. If a missing lead destination returned
// 503, the monitor would sit permanently red (it is unset today) and a real outage would be lost
// in the noise. So: the status code answers "is the site alive", and a keyword check on
// `"leadDelivery":"configured"` answers "can it still take enquiries".
//
// Nothing secret is exposed — only whether a destination exists, never the URL. A visitor could
// learn the same by submitting the form and getting the WhatsApp fallback.
export const dynamic = "force-dynamic";

export async function GET() {
  const leadDelivery = process.env.LEADS_WEBHOOK_URL ? "configured" : "not_configured";
  const alerting = process.env.ALERT_WEBHOOK_URL ? "configured" : "not_configured";

  return NextResponse.json(
    {
      status: "ok",
      leadDelivery,
      alerting,
      time: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
