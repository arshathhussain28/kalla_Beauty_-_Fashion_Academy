import { SectionHeading } from "@/components/ui/SectionHeading";
import { trainers } from "@/data/trainers";

// Page hierarchy §16, item 5: "Faculty — the credibility." Tutors are shown beside
// students, not above them (§03 Brand Personality — Encouraging). No trainer
// photography exists yet, so portraits are a placeholder monogram circle.
export function Faculty() {
  return (
    <section className="bg-white px-6 py-16 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading eyebrow="The People" title="Faculty" />

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {trainers.map((trainer) => (
            <div key={trainer.slug} className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-rose-light/50">
                <span className="font-display text-2xl text-wine">
                  {trainer.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
              </div>
              <h3 className="mt-4 text-h3 font-sans font-medium uppercase tracking-[0.06em] text-ink">
                {trainer.name}
              </h3>
              <p className="mt-1 text-small text-rose-deep">{trainer.role}</p>
              <p className="mt-3 max-w-xs text-body text-ink-muted">{trainer.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
