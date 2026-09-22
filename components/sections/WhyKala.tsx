import { Briefcase, Layers, BadgeCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Page hierarchy §16: "Why KALA — three proof points." Copy drawn from the brand
// doc's own Functional Benefits (§01 Brand Strategy), not invented.
const PROOF_POINTS = [
  {
    icon: Layers,
    title: "Craft",
    description:
      "Industry-current technique, taught hands-on, in small cohorts with real practice hours.",
  },
  {
    icon: BadgeCheck,
    title: "Confidence",
    description:
      "Personal correction in every session, so the technique becomes yours — not just something you watched.",
  },
  {
    icon: Briefcase,
    title: "Career",
    description:
      "A recognised certificate and a finished portfolio, with placement and freelance-start support.",
  },
] as const;

export function WhyKala() {
  return (
    <section className="bg-white px-6 py-16 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          eyebrow="Why KALA"
          title="We Teach the Craft. You Keep the Confidence."
          description="Every visual and every session is built around one distinction: the capability to produce beauty, and the confidence that comes from owning a skill nobody can take away."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {PROOF_POINTS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="border border-border bg-cream p-6">
              <Icon className="h-6 w-6 text-wine" strokeWidth={1.5} />
              <h3 className="mt-4 text-h3 font-sans font-medium uppercase tracking-[0.06em] text-ink">
                {title}
              </h3>
              <p className="mt-3 text-body text-ink-muted">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
