import { ABOUT_EXPERIENCE } from "@/data/about";
import { KALA_TRAINING_STANDARDS } from "@/data/courses";
import { ClipReveal } from "@/components/editorial/ClipReveal";
import { Parallax } from "@/components/editorial/Parallax";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";

// Two overlapping photographs on the left, the standards on the right. The list is the
// client's own "Why Choose KALA" set (single source of truth in data/courses.ts) rather
// than anything restated here, so it can never drift from the course pages.
export function AboutExperience() {
  return (
    <section className="bg-white px-6 py-20 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="relative lg:col-span-6 lg:pb-24">
          <ClipReveal className="aspect-[4/5] w-full lg:w-[78%]">
            <Parallax className="h-full w-full" amount={4}>
              <ImageSlot
                slot="story-classroom"
                sizes="(min-width: 1024px) 460px, 100vw"
                className="h-full w-full"
              />
            </Parallax>
          </ClipReveal>
          <ClipReveal
            delay={0.2}
            className="-mt-24 ml-auto aspect-square w-[58%] border-[10px] border-white! bg-white lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-[46%]"
          >
            <ImageSlot
              slot="made-student"
              sizes="(min-width: 1024px) 280px, 60vw"
              className="h-full w-full"
            />
          </ClipReveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal>
            <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
              {ABOUT_EXPERIENCE.eyebrow}
            </p>
            <h2 className="mt-4 text-h1 font-display font-semibold leading-[1.1] tracking-[0.01em] text-ink">
              {ABOUT_EXPERIENCE.title}
            </h2>
            <p className="mt-5 max-w-md text-body text-ink-muted">{ABOUT_EXPERIENCE.text}</p>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-10 text-descriptor uppercase tracking-[0.3em] text-rose-deep">
              {ABOUT_EXPERIENCE.standardsLabel}
            </p>
            <ul className="mt-4 grid border-t border-border sm:grid-cols-2 sm:gap-x-8">
              {KALA_TRAINING_STANDARDS.map((standard) => (
                <li
                  key={standard}
                  className="border-b border-border py-3.5 text-body text-ink"
                >
                  {standard}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
