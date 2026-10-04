import { ArrowLink } from "@/components/ui/ArrowLink";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { CurtainReveal, Reveal } from "@/components/ui/Reveal";

// Moment 5 — asymmetry. A 7/12 photograph with a type panel that overlaps its edge,
// so the section can't be mistaken for the one above or below it. Copy is lifted from
// the client's course document ("Your passion can become your profession", the
// theory + practical + client-handling + business-guidance promise).
export function EditorialStory() {
  return (
    <section className="bg-white px-6 py-20 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1200px] items-start lg:grid-cols-12">
        <CurtainReveal className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
          <ImageSlot
            slot="story-classroom"
            sizes="(min-width: 1024px) 700px, 100vw"
            className="aspect-[4/5] w-full"
          />
        </CurtainReveal>

        <Reveal
          delay={0.25}
          className="relative z-10 -mt-14 ml-4 bg-cream-deep p-8 sm:ml-10 sm:p-10 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:mt-28 lg:ml-0 lg:p-14"
        >
          <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
            Learn Professionally
          </p>
          <h2 className="mt-4 text-h1 font-display font-semibold leading-[1.1] tracking-[0.01em] text-ink">
            Your passion can become your profession.
          </h2>
          <p className="mt-5 text-body text-ink-muted">
            Theory and practice side by side, hands-on training on real tools and products,
            client handling, and guidance on building a freelance or business practice —
            finished with a practical assessment and a course completion certificate.
          </p>
          <ArrowLink href="/courses" className="mt-8">
            Explore Courses
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
