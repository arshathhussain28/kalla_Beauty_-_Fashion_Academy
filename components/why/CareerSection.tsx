import { WHY_CAREER } from "@/data/why-kala";
import { ClipReveal } from "@/components/editorial/ClipReveal";
import { Parallax } from "@/components/editorial/Parallax";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";

// A horizontal composition after the wine band: four words as a rail, then one wide
// photograph of finished work. Worded as possibility throughout — no placement, income or
// employment promise.
export function CareerSection() {
  return (
    <section className="bg-cream px-6 py-20 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
            {WHY_CAREER.eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl text-[40px] font-display font-semibold leading-[1.05] tracking-[0.01em] text-ink lg:text-display">
            {WHY_CAREER.title}
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-4 lg:gap-0">
          {WHY_CAREER.steps.map((step, index) => (
            <li key={step.word} className="relative lg:pr-8">
              <Reveal delay={0.1 * index}>
                <div className="flex items-center gap-4 border-t border-wine! pt-5">
                  <span className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {index < WHY_CAREER.steps.length - 1 && (
                    <span aria-hidden="true" className="ml-auto hidden text-rose lg:block">
                      →
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-h1 font-semibold tracking-[0.01em] text-ink">
                  {step.word}
                </h3>
                <p className="mt-3 max-w-[26ch] text-body text-ink-muted">{step.line}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <ClipReveal className="mt-16 aspect-[4/3] w-full sm:aspect-[16/9] lg:mt-24 lg:aspect-[21/9]">
          <Parallax className="h-full w-full" amount={5}>
            <ImageSlot
              slot={WHY_CAREER.slot}
              sizes="(min-width: 1200px) 1100px, 100vw"
              className="h-full w-full"
            />
          </Parallax>
        </ClipReveal>

        <Reveal className="mt-8 flex flex-wrap items-center justify-between gap-x-10 gap-y-4">
          <p className="max-w-md text-small text-ink-muted">{WHY_CAREER.note}</p>
          <ArrowLink href="/courses">See Each Course&apos;s Directions</ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
