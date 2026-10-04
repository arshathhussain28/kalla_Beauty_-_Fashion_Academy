import { ABOUT_STORY } from "@/data/about";
import { ClipReveal } from "@/components/editorial/ClipReveal";
import { Parallax } from "@/components/editorial/Parallax";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";

// Why KALA exists. The founder portrait leads (5/12), the belief sits beside it in large
// type, and the brand promise closes the block as a rule-led pull line. No biography is
// asserted: only the belief and the promise, which are KALA's own words.
export function AboutStory() {
  return (
    <section className="bg-white px-6 py-20 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <figure className="lg:col-span-5">
          <ClipReveal className="aspect-[3/4] w-full">
            <Parallax className="h-full w-full" amount={4}>
              <ImageSlot
                slot={ABOUT_STORY.slot}
                sizes="(min-width: 1024px) 460px, 100vw"
                className="h-full w-full"
              />
            </Parallax>
          </ClipReveal>
          <figcaption className="mt-3 text-descriptor uppercase tracking-[0.3em] text-rose-deep">
            {ABOUT_STORY.caption}
          </figcaption>
        </figure>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
              {ABOUT_STORY.eyebrow}
            </p>
            <h2 className="mt-4 text-h1 font-display font-semibold leading-[1.1] tracking-[0.01em] text-ink">
              {ABOUT_STORY.title}
            </h2>
            <p className="mt-8 font-display text-h2 font-medium leading-snug tracking-[0.01em] text-wine">
              {ABOUT_STORY.lead}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-8 space-y-5">
              {ABOUT_STORY.paragraphs.map((paragraph) => (
                <p key={paragraph} className="max-w-md text-body text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex gap-5">
              <span aria-hidden="true" className="w-px shrink-0 bg-rose" />
              <p className="max-w-sm text-body text-ink">{ABOUT_STORY.promise}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
