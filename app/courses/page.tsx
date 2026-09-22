import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getAllCourses } from "@/data/courses";

export const metadata = buildMetadata({
  title: "Courses",
  description:
    "Explore beauty and fashion courses at KALA — makeup, hair, tailoring and fashion design.",
  path: "/courses",
});

export default function CoursesPage() {
  const courses = getAllCourses();

  return (
    <main className="flex-1 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.14em] text-rose-gold">Find Your Craft</p>
        <h1 className="mt-3 font-display text-display-lg text-charcoal">Courses</h1>
        <p className="mt-4 max-w-xl text-charcoal/70">
          The full editorial course discovery experience is still in creative development —
          this listing proves the data architecture end to end using placeholder programme data.
        </p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {courses.map((course) => (
            <li key={course.slug} className="border border-charcoal/15 p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-rose-gold">
                {course.category} · {course.discipline}
              </p>
              <h2 className="mt-2 font-display text-2xl text-charcoal">
                <Link href={`/courses/${course.slug}`} className="hover:text-rose-gold">
                  {course.name}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-charcoal/70">{course.tagline}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.1em] text-charcoal/50">
                {course.duration} · {course.level}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
