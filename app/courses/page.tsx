import { buildMetadata } from "@/lib/seo";
import { PageEnquiry } from "@/components/editorial/PageEnquiry";
import { CourseIndex } from "@/components/courses/CourseIndex";
import { PageHeading } from "@/components/ui/PageHeading";

export const metadata = buildMetadata({
  title: "Courses",
  description:
    "Explore beauty and fashion courses at KALA — makeup, beautician, mehendi, saree draping and tailoring & fashion design.",
  path: "/courses",
});

// Find your craft: an opening statement, then the five programmes as a numbered index,
// then the enquiry. The description is the client's own summary of the programme.
export default function CoursesPage() {
  return (
    <main className="flex-1">
      <section className="bg-cream px-6 pb-14 pt-14 lg:px-12 lg:pb-20 lg:pt-24">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <PageHeading eyebrow="Courses" title="Find your craft." className="lg:col-span-7" />
          <p className="max-w-md text-body text-ink-muted lg:col-span-5 lg:justify-self-end">
            Five advanced programmes in beauty and fashion — theory and hands-on practice, taught
            in small batches, finished with a practical assessment and a completion certificate.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-6 lg:px-12 lg:py-10">
        <div className="mx-auto max-w-[1200px]">
          <CourseIndex />
        </div>
      </section>

      <PageEnquiry
        eyebrow="Not sure yet?"
        title="Talk through the right craft for you."
        description="Tell us what you're interested in and a course advisor will follow up with the duration, fees and admissions steps."
        source="courses"
      />
    </main>
  );
}
