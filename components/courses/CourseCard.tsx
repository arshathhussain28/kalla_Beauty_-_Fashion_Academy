import Link from "next/link";
import { Droplet, Flower2, Layers, Shirt, Sparkles } from "lucide-react";
import type { Course, CourseCategory } from "@/data/courses";

// §16 Website System, Course card spec: white, shadow-md, arched image top, eyebrow
// (duration) → H3 name → 2-line summary → text link. No course photography exists yet,
// so the image area is a tinted placeholder with a category icon, not a stock photo.
const CATEGORY_ICON: Record<CourseCategory, typeof Sparkles> = {
  makeup: Sparkles,
  beauty: Droplet,
  mehendi: Flower2,
  saree: Layers,
  fashion: Shirt,
};

export function CourseCard({ course }: { course: Course }) {
  const Icon = CATEGORY_ICON[course.category];
  const durationLabel =
    course.duration.status === "confirmed" && course.duration.value
      ? course.duration.value
      : "Contact for Details";

  return (
    <div className="flex h-full flex-col bg-white shadow-md">
      <div className="flex aspect-[4/5] items-center justify-center rounded-t-[200px] bg-gradient-to-b from-rose-light/60 to-cream-deep">
        <Icon className="h-12 w-12 text-wine/40" strokeWidth={1.5} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
          {durationLabel}
        </p>
        <h3 className="mt-2 text-h3 font-sans font-medium uppercase tracking-[0.06em] text-ink">
          {course.name}
        </h3>
        <p className="mt-3 line-clamp-2 flex-1 text-body text-ink-muted">{course.tagline}</p>
        <Link
          href={`/courses/${course.slug}`}
          className="mt-4 text-button font-sans font-medium uppercase tracking-[0.12em] text-wine transition-colors hover:text-wine-deep"
        >
          Explore →
        </Link>
      </div>
    </div>
  );
}
