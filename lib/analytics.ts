/**
 * Thin, provider-agnostic event tracking. Call trackEvent(...) from client components;
 * it no-ops safely when no analytics provider is configured (e.g. in local dev).
 * Wire GA4 / Meta Pixel loading in app/layout.tsx once real IDs exist — see .env.example.
 */
"use client";

export type AnalyticsEvent =
  | "page_view"
  | "course_view"
  | "course_enquiry"
  | "whatsapp_click"
  | "call_click"
  | "form_start"
  | "form_submit"
  | "map_click"
  | "admission_cta_click";

type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, payload: EventPayload = {}): void {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", event, payload);
  }

  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event, payload);
  }
}
