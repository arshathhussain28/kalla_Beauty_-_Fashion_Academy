import Link from "next/link";
import { CATEGORY_LABELS, type Course } from "@/data/courses";
import { craftSlot } from "@/data/images";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ImageSlot } from "@/components/ui/ImageSlot";

// Brand doc §09 "Image card": photograph on top with the arched corners, type
// left-aligned beneath, no box, no shadow. The whole image is a link (hidden from
// keyboard/AT — the text link below is the real control) and the photograph drifts
// slightly on hover.
export function CourseCard({ course }: { course: Course }) {
  const href = `/courses/${course.slug}`;
  const duration =
    course.duration.status === "confirmed" && course.duration.value
      ? ` · ${course.duration.value}`
      : "";

  return (
    <article className="group flex h-full flex-col">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="block">
        <ImageSlot
          slot={craftSlot(course.category)}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 78vw"
          className="aspect-[4/5] rounded-t-[200px]"
          imageClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
      </Link>
      <div className="mt-5 flex flex-1 flex-col">
        <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
          {CATEGORY_LABELS[course.category]}
        </p>
        <h3 className="mt-2 text-h3 font-sans font-medium uppercase tracking-[0.06em] text-ink">
          {course.name}
        </h3>
        <p className="mt-3 line-clamp-2 text-body text-ink-muted">{course.tagline}</p>
        <p className="mt-3 text-small text-ink-muted">
          {course.level} · {course.modules.length} modules
          {duration}
        </p>
        <ArrowLink href={href} className="mt-auto pt-5">
          Explore Course
        </ArrowLink>
      </div>
    </article>
  );
}
