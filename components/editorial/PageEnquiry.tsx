"use client";

import { LeadForm } from "@/components/forms/LeadForm";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SITE_LOCATION, SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import { generalEnquiryWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface PageEnquiryProps {
  eyebrow: string;
  title: string;
  description: string;
  /** Which page this block sits on — carried into the WhatsApp message as a reference. */
  source: string;
  /** Section ground. Pick the one that differs from the section above. */
  tone?: "cream" | "white";
  className?: string;
}

// The closing conversion block for the editorial pages: WhatsApp first (the primary
// destination), the course index as a quiet link, and the real enquiry form — the same
// validated, rate-limited LeadForm used everywhere else. Contact facts are the two the
// client confirmed on both posters: phone and location.
export function PageEnquiry({
  eyebrow,
  title,
  description,
  source,
  tone = "cream",
  className,
}: PageEnquiryProps) {
  return (
    <section
      id="enquire"
      className={cn(
        "scroll-mt-20 px-6 py-20 lg:px-12 lg:py-32",
        tone === "cream" ? "bg-cream" : "bg-white",
        className
      )}
    >
      <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="lg:col-span-6 lg:pr-8">
          <Reveal>
            <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
              {eyebrow}
            </p>
            <h2 className="mt-4 text-[40px] font-display font-semibold leading-[1.05] tracking-[0.01em] text-ink lg:text-display">
              {title}
            </h2>
            <p className="mt-6 max-w-md text-body text-ink-muted">{description}</p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button
                href={generalEnquiryWhatsAppLink({ source })}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                onClick={() => trackEvent("whatsapp_click", { source })}
              >
                Talk to KALA
              </Button>
              <ArrowLink href="/courses">Explore Courses</ArrowLink>
            </div>

            <dl className="mt-12 grid max-w-md gap-6 border-t border-border pt-8 sm:grid-cols-2">
              <div>
                <dt className="text-descriptor uppercase tracking-[0.3em] text-rose-deep">
                  Call
                </dt>
                <dd className="mt-2 text-body text-ink">
                  <a
                    href={`tel:${SITE_PHONE_TEL}`}
                    onClick={() => trackEvent("call_click", { source })}
                    className="hover:text-wine"
                  >
                    {SITE_PHONE_DISPLAY}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-descriptor uppercase tracking-[0.3em] text-rose-deep">
                  Find us
                </dt>
                <dd className="mt-2 text-body text-ink">{SITE_LOCATION}</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="lg:col-span-6">
          <div className={cn("p-6 shadow-md sm:p-10", tone === "cream" ? "bg-white" : "bg-cream")}>
            <h3 className="font-sans text-h3 font-medium uppercase tracking-[0.06em] text-ink">
              Leave your details
            </h3>
            <p className="mt-2 max-w-sm text-small text-ink-muted">
              A course advisor will get in touch with the course details.
            </p>
            <LeadForm className="mt-8" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
