import { ABOUT_PEOPLE, PEOPLE } from "@/data/about";
import { ClipReveal } from "@/components/editorial/ClipReveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";

// Three portraits in three different shapes, stepped at different heights. Captions stay
// generic ("A KALA trainer") until real names and roles are supplied — set `name` and
// `role` on an entry in data/about.ts and they take over automatically.
const FRAMES = [
  { frame: "aspect-[4/5]", figure: "" },
  { frame: "aspect-square", figure: "sm:mt-20" },
  { frame: "aspect-[3/4] rounded-t-[140px]", figure: "sm:mt-8" },
] as const;

export function AboutPeople() {
  return (
    <section className="bg-white px-6 py-20 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
            {ABOUT_PEOPLE.eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl text-[40px] font-display font-semibold leading-[1.05] tracking-[0.01em] text-ink lg:text-display">
            {ABOUT_PEOPLE.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid items-start gap-10 sm:grid-cols-3 sm:gap-6 lg:mt-20 lg:gap-8">
          {PEOPLE.map((person, index) => (
            <figure key={person.slot} className={FRAMES[index].figure}>
              <ClipReveal delay={0.15 * index} className={`${FRAMES[index].frame} w-full`}>
                <ImageSlot
                  slot={person.slot}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 30vw, 100vw"
                  className="h-full w-full"
                />
              </ClipReveal>
              <figcaption className="mt-4">
                <span className="block text-h3 font-display text-ink">
                  {person.name ?? person.caption}
                </span>
                {person.role && (
                  <span className="mt-1 block text-small text-rose-deep">{person.role}</span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
