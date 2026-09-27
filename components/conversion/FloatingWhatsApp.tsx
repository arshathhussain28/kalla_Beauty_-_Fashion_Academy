"use client";

import { MessageCircle, Phone } from "lucide-react";
import { generalEnquiryWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { SITE_PHONE_TEL } from "@/data/site";

// Master prompt §18/§19: floating WhatsApp on desktop, fixed bottom WhatsApp+Call bar
// on mobile. Kept off the brand doc's motif budget deliberately — this is a functional
// conversion control, not decoration, so it doesn't compete with the one-motif rule.
export function FloatingWhatsApp() {
  const href = generalEnquiryWhatsAppLink();

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-white lg:hidden">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { source: "mobile_bar" })}
          className="flex h-14 items-center justify-center gap-2 text-small font-medium uppercase tracking-[0.12em] text-wine"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
          WhatsApp
        </a>
        <a
          href={`tel:${SITE_PHONE_TEL}`}
          onClick={() => trackEvent("call_click", { source: "mobile_bar" })}
          className="flex h-14 items-center justify-center gap-2 border-l border-border text-small font-medium uppercase tracking-[0.12em] text-ink"
        >
          <Phone className="h-4 w-4" strokeWidth={1.5} />
          Call
        </a>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("whatsapp_click", { source: "floating_button" })}
        className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-sm bg-wine px-5 py-3 text-button font-sans font-medium uppercase tracking-[0.12em] text-cream shadow-lg transition-colors hover:bg-wine-deep lg:flex"
      >
        <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
        Talk to KALA
      </a>
    </>
  );
}
