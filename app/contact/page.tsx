import { buildMetadata } from "@/lib/seo";
import { LeadForm } from "@/components/forms/LeadForm";
import { Button } from "@/components/ui/Button";
import { PageHeading } from "@/components/ui/PageHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SITE_LOCATION, SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/data/site";
import { generalEnquiryWhatsAppLink } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: "Contact & Admissions",
  description: "Talk to a course advisor — enquire, get counselling and book a campus visit.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="flex-1 bg-cream px-6 py-16 lg:px-12 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
          <PageHeading
            eyebrow="Admissions"
            title="Find your course."
            titleClassName="text-[40px] sm:text-[52px] lg:text-h1"
          >
            <p className="mt-5 max-w-sm text-body text-ink-muted">
              Tell us what you&apos;re interested in and a course advisor will follow up
              with duration, fees and the admissions steps.
            </p>
            <Button
              href={generalEnquiryWhatsAppLink({ source: "contact" })}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="mt-7"
            >
              WhatsApp Us Directly
            </Button>
          </PageHeading>

          {/* The two contact facts the client confirmed, as a quiet index under the intro. */}
          <Reveal delay={0.95} className="mt-12 border-t border-border pt-8">
            <dl className="grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-descriptor uppercase tracking-[0.3em] text-rose-deep">Call</dt>
                <dd className="mt-2 text-body text-ink">
                  <a href={`tel:${SITE_PHONE_TEL}`} className="transition-colors hover:text-wine">
                    {SITE_PHONE_DISPLAY}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-descriptor uppercase tracking-[0.3em] text-rose-deep">Find us</dt>
                <dd className="mt-2 text-body text-ink">{SITE_LOCATION}</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.35} y={32} className="bg-white p-6 shadow-md sm:p-8">
          <LeadForm />
        </Reveal>
      </div>
    </main>
  );
}
