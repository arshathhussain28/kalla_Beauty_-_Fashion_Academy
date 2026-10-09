import { WHY_CRAFT } from "@/data/why-kala";
import { ClipReveal } from "@/components/editorial/ClipReveal";
import { Parallax } from "@/components/editorial/Parallax";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";

// Text left, a large photograph right (7/12) — the opposite hand from the section above
// and the homepage's image-left story. Four short statements stand in as a ruled index
// rather than cards.
export function CraftSection() {
  return (
    <section className="bg-cream px-6 py-20 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
              {WHY_CRAFT.eyebrow}
            </p>
            <h2 className="mt-4 text-h1 font-display font-semibold leading-[1.1] tracking-[0.01em] text-ink">
              {WHY_CRAFT.title}
            </h2>
            <p className="mt-5 max-w-md text-body text-ink-muted">{WHY_CRAFT.text}</p>
          </Reveal>

          <dl className="mt-10 border-t border-border">
            {/* The Reveal's own <div> is the grouping element a <dl> allows around a dt/dd pair
                (a second wrapper inside it made the list invalid for screen readers). */}
            {WHY_CRAFT.statements.map((item, index) => (
              <Reveal
                key={item.label}
                delay={0.08 * index}
                className="grid grid-cols-[140px_1fr] items-baseline gap-4 border-b border-border py-5"
              >
                <dt className="text-descriptor uppercase tracking-[0.3em] text-rose-deep">
                  {item.label}
                </dt>
                <dd className="text-body text-ink">{item.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <ClipReveal className="aspect-[4/5] w-full sm:aspect-[5/6] lg:aspect-[4/5]">
            <Parallax className="h-full w-full" amount={4}>
              <ImageSlot
                slot={WHY_CRAFT.slot}
                sizes="(min-width: 1024px) 700px, 100vw"
                className="h-full w-full"
              />
            </Parallax>
          </ClipReveal>
        </div>
      </div>
    </section>
  );
}
