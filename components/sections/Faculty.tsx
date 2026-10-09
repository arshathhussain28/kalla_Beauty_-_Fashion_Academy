import { getConfirmedTrainers } from "@/data/trainers";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { CurtainReveal, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// The people behind the craft. Portraits are environmental (in the academy, not
// against a seamless backdrop) per the brand's photography direction; trainers stand
// beside their students, never behind a desk. Renders nothing until at least one real,
// client-confirmed trainer exists (see `confirmed` in data/trainers.ts) — an empty-frame
// section of placeholder names would be worse than no section.
export function Faculty() {
  const trainers = getConfirmedTrainers();
  if (trainers.length === 0) return null;

  return (
    <section className="bg-white px-6 py-20 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <SectionHeading eyebrow="The People" title="The people behind the craft." />
        </Reveal>

        <div className="mt-12 grid gap-10 sm:grid-cols-3 lg:mt-16">
          {trainers.map((trainer, index) => (
            <div key={trainer.slug} className={index === 1 ? "sm:mt-16" : undefined}>
              <CurtainReveal delay={0.12 * index}>
                <ImageSlot
                  slot={trainer.photoSlot}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 30vw, 100vw"
                  className="aspect-[4/5] w-full"
                />
              </CurtainReveal>
              <h3 className="mt-5 text-h3 font-sans font-medium uppercase tracking-[0.06em] text-ink">
                {trainer.name}
              </h3>
              <p className="mt-1 text-small text-rose-deep">{trainer.role}</p>
              <p className="mt-3 text-body text-ink-muted">{trainer.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
