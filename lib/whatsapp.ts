/**
 * WhatsApp click-to-chat links. The number is public by design (it's meant to be
 * clicked), so it's read from NEXT_PUBLIC_WHATSAPP_NUMBER rather than treated as a secret.
 * No WhatsApp Business API tokens or credentials belong in this file or the client bundle.
 */

const FALLBACK_NUMBER_PLACEHOLDER = "0000000000";

function getWhatsAppNumber(): string {
  const configured = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!configured) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "NEXT_PUBLIC_WHATSAPP_NUMBER is not set — WhatsApp links will use a placeholder number."
      );
    }
    return FALLBACK_NUMBER_PLACEHOLDER;
  }
  return configured.replace(/[^\d]/g, "");
}

export function buildWhatsAppLink(message: string): string {
  const number = getWhatsAppNumber();
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

export function courseEnquiryWhatsAppLink(courseName: string): string {
  return buildWhatsAppLink(
    `Hi KALA, I'm interested in the ${courseName} course. I'd like to know about the duration, curriculum and admissions.`
  );
}

export function generalEnquiryWhatsAppLink(): string {
  return buildWhatsAppLink(
    "Hi KALA, I'd like to know more about your beauty & fashion courses."
  );
}
