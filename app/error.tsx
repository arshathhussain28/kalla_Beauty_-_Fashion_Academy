"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/data/site";
import { generalEnquiryWhatsAppLink } from "@/lib/whatsapp";

// Shown when a page below the root layout throws. It keeps the navbar, footer and quick-contact
// bar, so the visitor is never stranded — and because this is an admissions site, a broken page
// still offers WhatsApp and the phone number rather than dead-ending someone who wanted to enquire.
//
// `digest` is the hash Next.js assigns a server-side error; the real message stays on the server.
// Showing it lets a visitor quote it to an advisor, and lets us match it to a log line.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Phase 1 replaces this with a real reporter (Sentry). Until then the browser console is
    // the only record, which is why the error monitoring item is still open.
    console.error("[kala] page error", error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-32 text-center">
      <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
        Something went wrong
      </p>
      <h1 className="max-w-xl text-h1 font-display font-semibold tracking-[0.01em] text-ink">
        This page didn&apos;t load properly.
      </h1>
      <p className="max-w-md text-body text-ink-muted">
        Please try again. If it keeps happening, talk to a course advisor directly — we are happy
        to answer on WhatsApp or by phone.
      </p>

      <div className="mt-4 flex flex-col items-center gap-5">
        <Button onClick={reset} variant="primary">
          Try again
        </Button>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <ArrowLink href={generalEnquiryWhatsAppLink({ source: "error-page" })} external>
            Talk to KALA
          </ArrowLink>
          <a
            href={`tel:${SITE_PHONE_TEL}`}
            className="text-button font-sans font-medium uppercase tracking-[0.12em] text-wine transition-colors hover:text-wine-deep"
          >
            Call {SITE_PHONE_DISPLAY}
          </a>
        </div>
      </div>

      {error.digest && (
        <p className="mt-6 text-descriptor uppercase tracking-[0.2em] text-ink-muted">
          Reference {error.digest}
        </p>
      )}
    </main>
  );
}
