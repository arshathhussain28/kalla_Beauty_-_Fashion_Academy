import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllCourses, getCourseBySlug } from "@/data/courses";
import { getTrainerBySlug } from "@/data/trainers";
import { buildMetadata } from "@/lib/seo";
import { LeadForm } from "@/components/forms/LeadForm";
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
    <main className="flex-1 px-6 py-24">
      <div className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.14em] text-rose-gold">
            {course.category} · {course.discipline}
          </p>
          <h1 className="mt-3 font-display text-display-lg text-charcoal">{course.name}</h1>
          <p className="mt-4 text-lg text-charcoal/70">{course.tagline}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.1em] text-charcoal/50">
            {course.duration} · {course.level}
          </p>

          <p className="mt-8 max-w-2xl text-charcoal/80">{course.description}</p>

          <section className="mt-12">
            <h2 className="font-display text-2xl text-charcoal">What you&apos;ll learn</h2>
            <ul className="mt-4 space-y-2">
              {course.highlights.map((item) => (
                <li key={item} className="text-charcoal/80">
                  — {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl text-charcoal">Curriculum</h2>
            <div className="mt-4 space-y-6">
              {course.curriculum.map((module) => (
                <div key={module.title}>
                  <h3 className="text-charcoal">{module.title}</h3>
                  <p className="mt-1 text-sm text-charcoal/70">{module.summary}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl text-charcoal">Career pathways</h2>
            <ul className="mt-4 space-y-2">
              {course.careerPaths.map((path) => (
                <li key={path} className="text-charcoal/80">
                  — {path}
                </li>
              ))}
            </ul>
          </section>

          {trainer && (
            <section className="mt-12">
              <h2 className="font-display text-2xl text-charcoal">Trainer</h2>
              <p className="mt-2 text-charcoal/80">
                {trainer.name} — {trainer.role}
              </p>
            </section>
          )}

          {course.faqs.length > 0 && (
            <section className="mt-12">
              <h2 className="font-display text-2xl text-charcoal">FAQ</h2>
              <div className="mt-4 space-y-4">
                {course.faqs.map((faq) => (
                  <div key={faq.question}>
                    <p className="text-charcoal">{faq.question}</p>
                    <p className="mt-1 text-sm text-charcoal/70">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="h-fit border border-charcoal/15 p-6">
          <h2 className="font-display text-xl text-charcoal">Enquire about this course</h2>
          <LeadForm courseSlug={course.slug} className="mt-6" />
          <a
            href={courseEnquiryWhatsAppLink(course.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-center text-sm uppercase tracking-[0.14em] text-charcoal underline underline-offset-4 hover:text-rose-gold"
          >
            WhatsApp Course Advisor
          </a>
        </aside>
      </div>

      <div className="mx-auto mt-16 max-w-5xl">
        <Link
          href="/courses"
          className="text-sm uppercase tracking-[0.14em] text-charcoal/60 hover:text-rose-gold"
        >
          ← All courses
        </Link>
      </div>
    </main>
  );
}
