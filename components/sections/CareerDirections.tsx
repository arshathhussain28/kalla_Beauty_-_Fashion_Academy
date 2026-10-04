import { CATEGORY_LABELS, getAllCourses } from "@/data/courses";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Ruled rows rather than cards, so this section reads as an index — and deliberately
// worded as "possible directions": no placement, salary or employment promises.
export function CareerDirections() {
  const courses = getAllCourses();

  return (
    <section className="bg-cream px-6 py-20 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <SectionHeading
            eyebrow="Career Direction"
            title="Where each craft can take you."
            description="Possible professional directions for each course — not a placement guarantee."
          />
        </Reveal>

        <ul className="mt-12 border-t border-border lg:mt-16">
          {courses.map((course, index) => (
            <li key={course.slug} className="border-b border-border">
              <Reveal delay={0.05 * index}>
                <div className="grid gap-4 py-8 lg:grid-cols-[1fr_1.4fr_auto] lg:items-center lg:gap-10">
                  <h3 className="font-display text-h2 font-medium tracking-[0.01em] text-ink">
                    {CATEGORY_LABELS[course.category]}
                  </h3>
                  <p className="text-body text-ink-muted">
                    {course.careerDirections.join("  ·  ")}
                  </p>
                  <ArrowLink href={`/courses/${course.slug}`}>View Course</ArrowLink>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
