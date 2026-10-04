import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { generalEnquiryWhatsAppLink } from "@/lib/whatsapp";

// Moment 7 — the close, and this page's one wine band (brand doc: exactly one wine band
// per page; the previous "statistics" band was removed because its figures were
// illustrative rather than confirmed). Calm, centred, one button plus one quiet link.
// The closing line is from the client's course document.
export function FinalCTA() {
  return (
    <section className="bg-wine px-6 py-24 text-center lg:px-12 lg:py-36">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-light">
            Learn Professionally. Create Confidently. Grow Successfully.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <h2 className="mt-6 text-[40px] font-display font-semibold leading-[1.05] tracking-[0.01em] text-cream lg:text-display">
            Ready to create your future?
          </h2>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col items-center gap-6">
            <Button
              href={generalEnquiryWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              variant="inverse"
            >
              Talk to KALA
            </Button>
            <ArrowLink href="/courses" tone="cream">
              Explore Your Course
            </ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
