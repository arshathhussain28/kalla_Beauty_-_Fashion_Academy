import { WHY_PEOPLE } from "@/data/why-kala";
import { ClipReveal } from "@/components/editorial/ClipReveal";
import { Parallax } from "@/components/editorial/Parallax";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";

// One large portrait with two smaller frames stepping down beside it, and a single quiet
// line of four words instead of a feature list. Names, roles and credentials are not
// asserted anywhere — the people sections of the site carry those once they are supplied.
export function MentorshipSection() {
  return (
    <section className="bg-cream px-6 py-20 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-12 lg:gap-8">
        <ClipReveal className="aspect-[4/5] w-full lg:col-span-6">
          <Parallax className="h-full w-full" amount={4}>
            <ImageSlot
              slot="people-trainer"
              sizes="(min-width: 1024px) 580px, 100vw"
              className="h-full w-full"
            />
          </Parallax>
        </ClipReveal>

        <div className="flex flex-col justify-between gap-12 lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
              {WHY_PEOPLE.eyebrow}
            </p>
            <h2 className="mt-4 text-[40px] font-display font-semibold leading-[1.05] tracking-[0.01em] text-ink lg:text-h1">
              {WHY_PEOPLE.title}
            </h2>
            <p className="mt-5 max-w-md text-body text-ink-muted">{WHY_PEOPLE.text}</p>
            <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-descriptor uppercase tracking-[0.3em] text-rose-deep">
              {WHY_PEOPLE.words.map((word, index) => (
                <span key={word} className="flex items-center gap-3">
                  {index > 0 && (
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-rose" />
                  )}
                  {word}
                </span>
              ))}
            </p>
          </Reveal>

          <div className="grid grid-cols-5 items-end gap-4">
            <ClipReveal delay={0.15} className="col-span-3 aspect-[4/5] w-full">
              <ImageSlot
                slot="people-student"
                sizes="(min-width: 1024px) 300px, 60vw"
                className="h-full w-full"
              />
            </ClipReveal>
            <ClipReveal delay={0.3} className="col-span-2 aspect-square w-full">
              <ImageSlot
                slot="people-class"
                sizes="(min-width: 1024px) 200px, 40vw"
                className="h-full w-full"
              />
            </ClipReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
