import type { CSSProperties } from "react";
import { buildMetadata } from "@/lib/seo";
import { PageEnquiry } from "@/components/editorial/PageEnquiry";
import { CourseIndex } from "@/components/courses/CourseIndex";

export const metadata = buildMetadata({
  title: "Courses",
  description:
    "Explore beauty and fashion courses at KALA — makeup, beautician, mehendi, saree draping and tailoring & fashion design.",
  path: "/courses",
});

function delay(ms: number) {
  return { "--kala-delay": `${ms}ms` } as CSSProperties;
}

// Find your craft: an opening statement, then the five programmes as a numbered index,
// then the enquiry. The description is the client's own summary of the programme.
export default function CoursesPage() {
  return (
    <main className="flex-1">
      <section className="bg-cream px-6 pb-14 pt-14 lg:px-12 lg:pb-20 lg:pt-24">
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <p
              className="kala-rise text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep"
              style={delay(150)}
            >
              Courses
            </p>
            <h1
              className="kala-rise mt-5 text-[44px] font-display font-semibold leading-[1.02] tracking-[0.01em] text-ink sm:text-[56px] lg:text-display"
              style={delay(350)}
            >
              Find your craft.
            </h1>
          </div>
          <p
            className="kala-rise max-w-md text-body text-ink-muted lg:col-span-5 lg:justify-self-end"
            style={delay(700)}
          >
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
