import { SectionHeading } from "@/components/ui/SectionHeading";
import { CourseCard } from "@/components/courses/CourseCard";
import { Button } from "@/components/ui/Button";
import { getAllCourses } from "@/data/courses";

// Page hierarchy §16, item 2: "Courses — the reason they came." Five categories,
// five courses — shown in full rather than a teaser slice, since a "see all" for
// only two more items would be redundant.
export function FeaturedCourses() {
  const courses = getAllCourses();

  return (
    <section className="bg-cream px-6 py-16 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          eyebrow="Find Your Craft"
          title="What Would You Like to Create?"
          description="Beauty and fashion, taught as trades — not hobbies."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>

        <div className="mt-10">
          <Button href="/courses" variant="secondary">
            Compare All Courses
          </Button>
        </div>
      </div>
    </section>
  );
}
