import { buildMetadata } from "@/lib/seo";
import { LeadForm } from "@/components/forms/LeadForm";
import { Button } from "@/components/ui/Button";
import { generalEnquiryWhatsAppLink } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: "Contact & Admissions",
  description: "Talk to a course advisor — enquire, get counselling and book a campus visit.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="flex-1 bg-cream px-6 py-16 lg:px-12 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
            Admissions
          </p>
          <h1 className="mt-3 text-h1 font-display font-semibold tracking-[0.01em] text-ink">
            Find Your Course
          </h1>
          <p className="mt-4 max-w-sm text-body text-ink-muted">
            Tell us what you&apos;re interested in and a course advisor will follow up
            with duration, fees and the admissions steps.
          </p>
          <Button
            href={generalEnquiryWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="mt-6"
          >
            WhatsApp Us Directly
          </Button>
        </div>

        <div className="bg-white p-6 shadow-md sm:p-8">
          <LeadForm />
        </div>
      </div>
    </main>
  );
}
