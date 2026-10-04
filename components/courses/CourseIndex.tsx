import Link from "next/link";
import { CATEGORY_LABELS, getAllCourses, type Course } from "@/data/courses";
import { craftSlot } from "@/data/images";
import { ClipReveal } from "@/components/editorial/ClipReveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

// Two facts the client's course document states for the programme as a whole (not per
// course): practice is hands-on, and completion earns a certificate. Per-course facts —
// level, and duration only once it is confirmed — come from the course record itself.
const PROGRAMME_FACTS = ["Hands-on practice", "Completion certificate"] as const;

function facts(course: Course): string[] {
  const duration =
    course.duration.status === "confirmed" && course.duration.value
      ? [course.duration.value]
      : [];
  return [...duration, course.level, ...PROGRAMME_FACTS];
}

function CourseRow({ course, index }: { course: Course; index: number }) {
  const href = `/courses/${course.slug}`;
  const flip = index % 2 === 1;
  const label = CATEGORY_LABELS[course.category];

  return (
    <li className="border-t border-border last:border-b">
      <article className="group relative -mx-4 px-4 py-12 transition-colors duration-700 hover:bg-cream/60 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
          <Link
            href={href}
            tabIndex={-1}
            aria-hidden="true"
            className={cn("block lg:col-span-6", flip ? "lg:order-2 lg:col-start-7" : "lg:col-start-1")}
          >
            <ClipReveal
              className={cn(
                "w-full",
                flip ? "aspect-[4/3] lg:aspect-[5/4]" : "aspect-[4/5] rounded-t-[160px] lg:rounded-t-[240px]"
              )}
            >
              <ImageSlot
                slot={craftSlot(course.category)}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="h-full w-full"
                imageClassName="transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]"
              />
            </ClipReveal>
          </Link>

          <Reveal
            className={cn("lg:col-span-5", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8")}
          >
            <p className="flex items-center gap-4 text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span
                aria-hidden="true"
                className="h-px w-10 bg-rose transition-[width] duration-700 ease-out group-hover:w-20"
              />
              <span>{label}</span>
            </p>

            <h2 className="mt-5 font-display text-[36px] font-semibold leading-[1.08] tracking-[0.01em] text-ink sm:text-h1">
              <Link href={href} className="after:absolute after:inset-0 after:content-['']">
                {course.name}
              </Link>
            </h2>
            <p className="mt-4 max-w-md text-body text-ink-muted">{course.tagline}</p>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-descriptor uppercase tracking-[0.2em] text-ink-muted">
              {facts(course).map((fact) => (
                <li key={fact} className="flex items-center gap-5">
                  {fact}
                </li>
              ))}
            </ul>

            {/* Visual only: the title link above is stretched over the whole article and is
                the one real control, so this doesn't add a second tab stop to the row. */}
            <span
              aria-hidden="true"
              className="mt-8 inline-flex items-center gap-2 text-button font-medium uppercase tracking-[0.12em] text-wine"
            >
              <span className="relative pb-1 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 group-hover:after:scale-x-100">
                Explore Course
              </span>
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </span>
          </Reveal>
        </div>

        <span
          aria-hidden="true"
          className="absolute inset-x-4 bottom-0 h-px origin-left scale-x-0 bg-wine transition-transform duration-[900ms] ease-out group-hover:scale-x-100 sm:inset-x-6 lg:inset-x-8"
        />
      </article>
    </li>
  );
}

// An index rather than a grid: one course per row, the photograph and the text swapping
// sides down the page. Each row is a single large target — the title link stretches over
// the whole article — with the photograph drifting, the rule beneath drawing across and the
// hairline by the number lengthening on hover.
export function CourseIndex() {
  const courses = getAllCourses();

  return (
    <ol>
      {courses.map((course, index) => (
        <CourseRow key={course.slug} course={course} index={index} />
      ))}
    </ol>
  );
}
