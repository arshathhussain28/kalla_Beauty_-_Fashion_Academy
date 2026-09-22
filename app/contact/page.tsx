import { buildMetadata } from "@/lib/seo";
import { LeadForm } from "@/components/forms/LeadForm";
import { generalEnquiryWhatsAppLink } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: "Contact & Admissions",
  description: "Talk to a course advisor — enquire, get counselling and book a campus visit.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="flex-1 px-6 py-24">
      <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.14em] text-rose-gold">Admissions</p>
          <h1 className="mt-3 font-display text-display-lg text-charcoal">Find Your Course</h1>
          <p className="mt-4 max-w-sm text-charcoal/70">
            Tell us what you&apos;re interested in and a course advisor will follow up with
            details, duration and admissions steps.
          </p>
          <a
            href={generalEnquiryWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sm uppercase tracking-[0.14em] text-charcoal underline underline-offset-4 hover:text-rose-gold"
          >
            Or WhatsApp us directly
          </a>
        </div>

        <LeadForm />
      </div>
    </main>
  );
}
