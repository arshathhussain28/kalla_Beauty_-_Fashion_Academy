import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";
import { getCourseBySlug } from "@/data/courses";

// Page hierarchy §16, item 6: "Testimonials — the reassurance." Card spec (§16):
// cream, 88px circle portrait left, serif italic 26px quote, name + course Jost 14px.
export function Testimonials() {
  return (
    <section className="bg-cream px-6 py-16 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading eyebrow="Real Students" title="Testimonials" />

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {testimonials.map((testimonial) => {
            const course = getCourseBySlug(testimonial.courseSlug);
            return (
              <div key={testimonial.slug} className="flex gap-5">
                <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-full bg-rose-light/50">
                  <span className="font-display text-xl text-wine">
                    {testimonial.studentName
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="text-quote font-display italic text-ink">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <p className="mt-3 text-small text-ink-muted">
                    {testimonial.studentName}
                    {course ? ` · ${course.name}` : ""}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
