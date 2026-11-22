/**
 * Operational alerts — "something the owner must act on", not analytics.
 *
 * Today the only thing that can silently cost the academy money is a lead that fails to
 * reach its destination: the visitor is told to use WhatsApp, but nobody is told the pipe is
 * broken. `console.error` alone is not enough, because nobody reads Vercel's runtime logs
 * until they already suspect a problem.
 *
 * Set ALERT_WEBHOOK_URL to any endpoint that accepts a JSON POST (a Slack or Discord
 * incoming webhook, or a Make / Zapier / n8n hook). Unset, this is a no-op and the structured
 * console line remains the record — so the site behaves identically without it.
 *
 * Never put a visitor's name or phone number in an alert: these go to a chat channel that is
 * usually wider than the admissions team. Only the lead id, which is a random UUID.
 */

const ALERT_TIMEOUT_MS = 5000;

export type AlertLevel = "error" | "warning";

export interface Alert {
  level: AlertLevel;
  /** Short machine-ish key, e.g. "lead.delivery_failed". */
  event: string;
  /** One line a human can act on. No personal data. */
  message: string;
  /** Extra non-personal context (ids, status codes, durations). */
  context?: Record<string, string | number | boolean>;
}

/**
 * Sends the alert if a destination is configured. Always resolves — an alert that fails must
 * never turn into a second failure on the request path. Call it from `after()` so the visitor
 * is not kept waiting for a chat webhook.
 */
export async function sendAlert(alert: Alert): Promise<void> {
  // The structured line is the fallback record, and is what Vercel's log search sees.
  const line = `[alert:${alert.level}] ${alert.event} — ${alert.message}`;
  if (alert.level === "error") console.error(line, alert.context ?? {});
  else console.warn(line, alert.context ?? {});

  const url = process.env.ALERT_WEBHOOK_URL;
  if (!url) return;

  let target: URL;
  try {
    target = new URL(url);
  } catch {
    console.error("[alert] ALERT_WEBHOOK_URL is not a valid URL");
    return;
  }
  // https only in production, with the same loopback exception the lead route makes: it lets
  // the alert path be exercised against a local receiver without weakening anything real.
  const isLoopback = ["localhost", "127.0.0.1", "[::1]"].includes(target.hostname);
  if (target.protocol !== "https:" && !isLoopback && process.env.NODE_ENV === "production") {
    console.error("[alert] ALERT_WEBHOOK_URL must be https in production");
    return;
  }

  // `text` is what Slack and Discord render; the structured fields are there for anything
  // that parses JSON (Make, n8n, a spreadsheet).
  const body = JSON.stringify({
    text: `KALA website — ${alert.message}`,
    level: alert.level,
    event: alert.event,
    site: process.env.NEXT_PUBLIC_SITE_URL ?? "unknown",
    at: new Date().toISOString(),
    ...alert.context,
  });

  try {
    await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(ALERT_TIMEOUT_MS),
    });
  } catch (error) {
    const reason = error instanceof Error ? error.name : "unknown";
    console.error(`[alert] could not deliver alert (${reason})`);
  }
}
