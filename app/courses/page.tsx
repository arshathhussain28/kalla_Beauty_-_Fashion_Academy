import { buildMetadata } from "@/lib/seo";
import { getAllCourses } from "@/data/courses";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CourseCard } from "@/components/courses/CourseCard";

export const metadata = buildMetadata({
  title: "Courses",
  description:
    "Explore beauty and fashion courses at KALA — makeup, beautician, mehendi, saree draping and tailoring & fashion design.",
  path: "/courses",
});

export default function CoursesPage() {
  const courses = getAllCourses();

  return (
    <main className="flex-1 bg-cream px-6 py-16 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          eyebrow="Find Your Craft"
          title="Courses"
          description="Five advanced programmes in beauty and fashion — theory and hands-on practice, taught in small batches, finished with a practical assessment and a completion certificate."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </div>
    </main>
  );
}
