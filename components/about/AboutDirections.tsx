import { ABOUT_DIRECTIONS } from "@/data/about";
import { getAllCourses } from "@/data/courses";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";

// Where the journey can lead, set as one sentence of large type rather than a list of
// icons or cards. Every direction comes from the course data (deduplicated), so the page
// can't promise anything the courses don't name — and the note says plainly that these are
// possibilities, not placements.
export function AboutDirections() {
  const directions = [
    ...new Set(getAllCourses().flatMap((course) => course.careerDirections)),
  ];

  return (
    <section className="bg-cream px-6 py-20 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
            {ABOUT_DIRECTIONS.eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl text-h1 font-display font-semibold leading-[1.1] tracking-[0.01em] text-ink">
            {ABOUT_DIRECTIONS.title}
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <ul className="mt-12 flex flex-wrap items-baseline gap-x-4 gap-y-3 font-display text-h2 font-medium leading-snug tracking-[0.01em] text-ink lg:mt-16 lg:gap-x-6 lg:gap-y-5 lg:text-[40px]">
            {directions.map((direction, index) => (
              <li key={direction} className="flex items-baseline gap-4 lg:gap-6">
                <span>{direction}</span>
                {index < directions.length - 1 && (
                  <span aria-hidden="true" className="text-rose">
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap items-center justify-between gap-x-10 gap-y-4 lg:mt-16">
          <p className="max-w-md text-small text-ink-muted">{ABOUT_DIRECTIONS.note}</p>
          <ArrowLink href="/courses">Explore Courses</ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
