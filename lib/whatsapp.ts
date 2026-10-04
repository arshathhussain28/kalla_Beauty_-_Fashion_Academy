/**
 * WhatsApp click-to-chat links. The number is public by design (it's meant to be
 * clicked), so it's read from NEXT_PUBLIC_WHATSAPP_NUMBER rather than treated as a secret.
 * No WhatsApp Business API tokens or credentials belong in this file or the client bundle.
 */
import { SITE_PHONE_TEL } from "@/data/site";

function getWhatsAppNumber(): string {
  const configured = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || SITE_PHONE_TEL;
  return configured.replace(/[^\d]/g, "");
}

/**
 * Where a chat started — so the advisor can see which page and course it came from.
 * wa.me ignores query-string parameters other than `text`, so UTM-style tags would be
 * thrown away; the context instead rides along as a short reference line at the end of
 * the pre-filled message, which the visitor can see (and delete) before sending.
 */
export interface WhatsAppContext {
  /** The page or control the click came from, e.g. "why-kala" or "mobile-bar". */
  source?: string;
  /** A course slug, e.g. "advanced-makeup-artist". */
  course?: string;
}

function withContext(message: string, context?: WhatsAppContext): string {
  const parts = ["website", context?.source, context?.course].filter(Boolean);
  // Always tag website traffic; add the finer detail only when it was supplied.
  return context ? `${message}\n\nRef: ${parts.join(" · ")}` : message;
}

export function buildWhatsAppLink(message: string, context?: WhatsAppContext): string {
  const number = getWhatsAppNumber();
  const encoded = encodeURIComponent(withContext(message, context));
  return `https://wa.me/${number}?text=${encoded}`;
}

export function courseEnquiryWhatsAppLink(courseName: string, context?: WhatsAppContext): string {
  return buildWhatsAppLink(
    `Hi KALA, I'm interested in the ${courseName} course. I'd like to know about the duration, curriculum and admissions.`,
    context
  );
}

export function generalEnquiryWhatsAppLink(context?: WhatsAppContext): string {
  return buildWhatsAppLink(
    "Hi KALA, I'd like to know more about your beauty & fashion courses.",
    context
  );
}
