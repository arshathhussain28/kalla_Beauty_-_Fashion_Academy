import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllCourses, getCourseBySlug } from "@/data/courses";
import { getTrainerBySlug } from "@/data/trainers";
import { buildMetadata } from "@/lib/seo";
import { LeadForm } from "@/components/forms/LeadForm";
import { Button } from "@/components/ui/Button";
import { ThreadRule } from "@/components/ui/ThreadRule";
import { courseEnquiryWhatsAppLink } from "@/lib/whatsapp";

export function generateStaticParams() {
  return getAllCourses().map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  return buildMetadata({
    title: course.name,
    description: course.tagline,
    path: `/courses/${course.slug}`,
  });
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const trainer = getTrainerBySlug(course.trainerSlug);

  return (
    <main className="flex-1">
      <div className="bg-wine-deep px-6 py-16 text-cream lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-light">
            {course.category} · {course.discipline}
          </p>
          <h1 className="mt-3 text-h1 font-display font-semibold tracking-[0.01em]">
            {course.name}
          </h1>
          <p className="mt-4 max-w-xl text-body text-cream/85">{course.tagline}</p>
          <p className="mt-2 text-small uppercase tracking-[0.18em] text-cream/60">
            {course.duration} · {course.level}
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1200px] gap-16 px-6 py-16 lg:grid-cols-[1.6fr_1fr] lg:px-12 lg:py-24">
        <div>
          <p className="max-w-2xl text-body text-ink-muted">{course.description}</p>

          <ThreadRule className="my-12" />

          <section>
            <h2 className="text-h2 font-display font-medium tracking-[0.01em] text-ink">
              What You&apos;ll Learn
            </h2>
            <ul className="mt-5 space-y-2">
              {course.highlights.map((item, index) => (
                <li key={index} className="text-body text-ink-muted">
                  — {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-h2 font-display font-medium tracking-[0.01em] text-ink">
              Curriculum
            </h2>
            <div className="mt-5 space-y-6">
              {course.curriculum.map((module, index) => (
                <div key={index}>
                  <h3 className="text-h3 font-sans font-medium uppercase tracking-[0.06em] text-ink">
                    {module.title}
                  </h3>
                  <p className="mt-1 text-body text-ink-muted">{module.summary}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-h2 font-display font-medium tracking-[0.01em] text-ink">
              Career Pathways
            </h2>
            <ul className="mt-5 space-y-2">
              {course.careerPaths.map((path, index) => (
                <li key={index} className="text-body text-ink-muted">
                  — {path}
                </li>
              ))}
            </ul>
          </section>

          {trainer && (
            <section className="mt-12">
              <h2 className="text-h2 font-display font-medium tracking-[0.01em] text-ink">
                Trainer
              </h2>
              <p className="mt-3 text-body text-ink-muted">
                {trainer.name} — {trainer.role}
              </p>
            </section>
          )}

          {course.faqs.length > 0 && (
            <section className="mt-12">
              <h2 className="text-h2 font-display font-medium tracking-[0.01em] text-ink">
                FAQ
              </h2>
              <div className="mt-5 space-y-4">
                {course.faqs.map((faq, index) => (
                  <div key={index}>
                    <p className="font-medium text-ink">{faq.question}</p>
                    <p className="mt-1 text-body text-ink-muted">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="h-fit bg-white p-6 shadow-md">
          <h2 className="text-h3 font-sans font-medium uppercase tracking-[0.06em] text-ink">
            Enquire About This Course
          </h2>
          <LeadForm courseSlug={course.slug} className="mt-6" />
          <Button
            href={courseEnquiryWhatsAppLink(course.name)}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="mt-4 w-full"
          >
            WhatsApp Course Advisor
          </Button>
        </aside>
      </div>

      <div className="mx-auto mb-16 max-w-[1200px] px-6 lg:px-12">
        <Link
          href="/courses"
          className="text-small font-medium uppercase tracking-[0.18em] text-ink-muted hover:text-wine"
        >
          ← All Courses
        </Link>
      </div>
    </main>
  );
}
