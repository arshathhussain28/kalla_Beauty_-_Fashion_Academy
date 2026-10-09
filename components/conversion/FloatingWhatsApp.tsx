"use client";

import { Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { generalEnquiryWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { SITE_PHONE_TEL } from "@/data/site";

// Master prompt §18/§19: floating WhatsApp on desktop; on mobile a fixed bottom bar with
// three plain actions — WhatsApp, Call, Enquire — each a 56px-tall touch target. The bar
// pads itself by the iPhone home-indicator inset (needs viewport-fit=cover, set in
// layout.tsx), and the body reserves matching room so it never covers the last line of
// content. Kept off the brand doc's motif budget deliberately — this is a functional
// conversion control, not decoration.
export function FloatingWhatsApp() {
  const barHref = generalEnquiryWhatsAppLink({ source: "mobile-bar" });
  const floatHref = generalEnquiryWhatsAppLink({ source: "floating-button" });

  return (
    <>
      <nav
        aria-label="Quick contact"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
      >
        <a
          href={barHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { source: "mobile_bar" })}
          className="flex h-14 items-center justify-center gap-2 text-descriptor font-medium uppercase tracking-[0.14em] text-wine"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
          WhatsApp
        </a>
        <a
          href={`tel:${SITE_PHONE_TEL}`}
          onClick={() => trackEvent("call_click", { source: "mobile_bar" })}
          className="flex h-14 items-center justify-center gap-2 border-l border-border text-descriptor font-medium uppercase tracking-[0.14em] text-ink"
        >
          <Phone className="h-4 w-4" strokeWidth={1.5} />
          Call
        </a>
        <Link
          href="/contact"
          onClick={() => trackEvent("admission_cta_click", { source: "mobile_bar" })}
          className="flex h-14 items-center justify-center gap-2 border-l border-border bg-wine text-descriptor font-medium uppercase tracking-[0.14em] text-cream"
        >
          <Mail className="h-4 w-4" strokeWidth={1.5} />
          Enquire
        </Link>
      </nav>

      <a
        href={floatHref}
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
