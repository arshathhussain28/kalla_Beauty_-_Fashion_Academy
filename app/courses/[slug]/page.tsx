import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import {
  CATEGORY_LABELS,
  KALA_TRAINING_STANDARDS,
  getAllCourses,
  getCourseBySlug,
} from "@/data/courses";
import { craftSlot } from "@/data/images";
import { getTrainerBySlug } from "@/data/trainers";
import { buildMetadata } from "@/lib/seo";
import { LeadForm } from "@/components/forms/LeadForm";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { CurtainReveal, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ThreadRule } from "@/components/ui/ThreadRule";
import { CourseModules } from "@/components/courses/CourseModules";
import { LearningMethod } from "@/components/sections/LearningMethod";
import { courseEnquiryWhatsAppLink } from "@/lib/whatsapp";

const WORK_SLOTS = ["work-1", "work-2", "work-3"] as const;

function delay(ms: number) {
  return { "--kala-delay": `${ms}ms` } as CSSProperties;
}

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
  const categoryLabel = CATEGORY_LABELS[course.category];
  const durationLabel =
    course.duration.status === "confirmed" && course.duration.value
      ? course.duration.value
      : "Contact us for current duration";
  const feeLabel =
    course.fee.status === "confirmed" && course.fee.value
      ? `₹${course.fee.value.toLocaleString("en-IN")}`
      : "Contact us for current fees";

  return (
    <main className="flex-1">
      <div className="bg-wine-deep px-6 py-16 text-cream lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <p className="kala-rise text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-light">
              {categoryLabel}
            </p>
            <h1
              className="kala-rise mt-3 text-h1 font-display font-semibold tracking-[0.01em]"
              style={delay(150)}
            >
              {course.name}
            </h1>
            <p className="kala-rise mt-4 max-w-xl text-body text-cream/85" style={delay(350)}>
              {course.tagline}
            </p>

            {/* Course snapshot — duration/fee only render when explicitly confirmed;
                see data/courses.ts for why they're pending right now. */}
            <div
              className="kala-rise mt-8 grid max-w-xl grid-cols-2 gap-6 border-t border-cream/15 pt-6 sm:grid-cols-4"
              style={delay(550)}
            >
              <div>
                <p className="text-descriptor uppercase tracking-[0.3em] text-cream/50">
                  Duration
                </p>
                <p className="mt-1 text-small text-cream/90">{durationLabel}</p>
              </div>
              <div>
                <p className="text-descriptor uppercase tracking-[0.3em] text-cream/50">Level</p>
                <p className="mt-1 text-small text-cream/90">{course.level}</p>
              </div>
              <div>
                <p className="text-descriptor uppercase tracking-[0.3em] text-cream/50">Fees</p>
                <p className="mt-1 text-small text-cream/90">{feeLabel}</p>
              </div>
              <div>
                <p className="text-descriptor uppercase tracking-[0.3em] text-cream/50">
                  Certificate
                </p>
                <p className="mt-1 text-small text-cream/90">On Completion</p>
              </div>
            </div>

            <div className="kala-rise" style={delay(750)}>
              <Button
                href={courseEnquiryWhatsAppLink(course.name)}
                target="_blank"
                rel="noopener noreferrer"
                variant="inverse"
                className="mt-8"
              >
                Enquire About This Course
              </Button>
            </div>
          </div>

          <ImageSlot
            slot={craftSlot(course.category)}
            tone="dark"
            priority
            sizes="(min-width: 1024px) 440px, 100vw"
            className="aspect-[4/5] w-full max-w-md rounded-t-[200px] lg:justify-self-end"
            imageClassName="kala-settle"
          />
        </div>
      </div>

      <div className="mx-auto grid max-w-[1200px] gap-16 px-6 py-16 lg:grid-cols-[1.6fr_1fr] lg:px-12 lg:py-24">
        <div>
          <p className="max-w-2xl text-body text-ink-muted">{course.description}</p>

          <ThreadRule className="my-12" />

          <section>
            <h2 className="text-h2 font-display font-medium tracking-[0.01em] text-ink">
              What You&apos;ll Master
            </h2>
            <div className="mt-6">
              <CourseModules modules={course.modules} />
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-h2 font-display font-medium tracking-[0.01em] text-ink">
              Professional Skills
            </h2>
            <ul className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {KALA_TRAINING_STANDARDS.map((item) => (
                <li key={item} className="text-body text-ink-muted">
                  — {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-h2 font-display font-medium tracking-[0.01em] text-ink">
              Where This Can Take You
            </h2>
            <p className="mt-2 text-small text-ink-muted">
              Possible professional directions — not a placement guarantee.
            </p>
            <ul className="mt-5 space-y-2">
              {course.careerDirections.map((path) => (
                <li key={path} className="text-body text-ink-muted">
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
                {course.faqs.map((faq) => (
                  <div key={faq.question}>
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

      <LearningMethod tone="white" />

      <section className="bg-cream px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <SectionHeading eyebrow="Student Work" title={`${categoryLabel}, made at KALA.`} />
          </Reveal>
          <div className="mt-10 grid grid-cols-3 gap-1">
            {WORK_SLOTS.map((slot, index) => (
              <CurtainReveal key={slot} delay={0.15 * index}>
                <ImageSlot
                  slot={slot}
                  sizes="(min-width: 1024px) 400px, 33vw"
                  className="aspect-[4/5] w-full"
                />
              </CurtainReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-6 py-12 lg:px-12">
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
