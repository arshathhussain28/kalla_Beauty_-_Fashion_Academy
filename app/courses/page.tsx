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
          description="Beauty and fashion, taught as trades — not hobbies. Every programme runs in small cohorts with tutors who still work in the industry."
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
