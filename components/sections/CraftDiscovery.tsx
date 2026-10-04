import { CATEGORY_LABELS, getAllCourses, type Course } from "@/data/courses";
import { craftSlot } from "@/data/images";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CourseCard } from "@/components/courses/CourseCard";
import { CraftPinned } from "@/components/sections/CraftPinned";

function CraftSlide({ course, index, total }: { course: Course; index: number; total: number }) {
  return (
    <div className="grid h-full grid-cols-12 items-center gap-12 px-12 pb-16">
      <ImageSlot
        slot={craftSlot(course.category)}
        sizes="(min-width: 1024px) 55vw, 100vw"
        className="col-span-7 h-[84%] rounded-t-[200px]"
      />
      <div className="col-span-5">
        <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <h3 className="mt-4 text-display font-display font-semibold leading-[1.05] tracking-[0.01em] text-ink">
          {CATEGORY_LABELS[course.category]}
        </h3>
        <p className="mt-2 text-small uppercase tracking-[0.18em] text-ink-muted">{course.name}</p>
        <p className="mt-5 max-w-sm text-body text-ink-muted">{course.tagline}</p>
        <ArrowLink href={`/courses/${course.slug}`} className="mt-8">
          Explore Course
        </ArrowLink>
      </div>
    </div>
  );
}

// Section 03 — "Find your craft". Desktop: pinned horizontal scroll (CraftPinned).
// Mobile / reduced motion: a swipeable carousel of the same course cards, switched by
// CSS so neither version depends on a JS media query (no layout shift on hydration).
export function CraftDiscovery() {
  const courses = getAllCourses();

  return (
    <section className="bg-white pt-20 lg:pt-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <Reveal>
          <SectionHeading
            eyebrow="Find Your Craft"
            title="What would you like to create?"
            description="Five advanced, practical programmes — each built around a professional skill."
          />
        </Reveal>
      </div>

      <div className="craft-carousel-wrap mt-10 pb-20 lg:hidden">
        <ul className="craft-carousel mx-auto flex max-w-[1200px] snap-x snap-mandatory gap-4 overflow-x-auto px-6 lg:grid lg:grid-cols-5 lg:snap-none lg:overflow-visible lg:px-12">
          {courses.map((course) => (
            <li
              key={course.slug}
              className="w-[78vw] max-w-[320px] shrink-0 snap-center lg:w-auto lg:max-w-none"
            >
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
      </div>

      <CraftPinned
        slides={courses.map((course, index) => ({
          key: course.slug,
          label: CATEGORY_LABELS[course.category],
          node: <CraftSlide course={course} index={index} total={courses.length} />,
        }))}
      />
    </section>
  );
}
