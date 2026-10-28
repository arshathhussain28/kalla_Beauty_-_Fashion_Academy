import { hasPhotos } from "@/data/images";
import { WHY_MAKING, type MakingFrame } from "@/data/why-kala";
import { WORK_READY } from "@/data/work";
import { ClipReveal } from "@/components/editorial/ClipReveal";
import { Parallax } from "@/components/editorial/Parallax";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

function Frame({
  frame,
  frameClassName,
  className,
  delay = 0,
  parallax = 4,
}: {
  frame: MakingFrame;
  /** Aspect ratio and radius of the photograph itself. */
  frameClassName: string;
  /** Grid placement and offsets for the figure. */
  className?: string;
  delay?: number;
  parallax?: number;
}) {
  return (
    <figure className={cn("group", className)}>
      <ClipReveal delay={delay} className={frameClassName}>
        <Parallax className="h-full w-full" amount={parallax}>
          <ImageSlot
            slot={frame.slot}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="h-full w-full"
            imageClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
          />
        </Parallax>
      </ClipReveal>
      <figcaption className="mt-3 flex items-baseline justify-between gap-4">
        <span className="text-descriptor uppercase tracking-[0.3em] text-rose-deep">
          {frame.label}
        </span>
        <span className="text-small text-ink-muted transition-colors group-hover:text-wine">
          {frame.caption}
        </span>
      </figcaption>
    </figure>
  );
}

// The link to The Work only appears once that page has photographs to show.
function SeeTheWork() {
  if (!WORK_READY) return null;
  return (
    <Reveal className="mt-12 flex justify-end lg:mt-16">
      <ArrowLink href="/the-work">See the Work</ArrowLink>
    </Reveal>
  );
}

// The same four ideas without the photographs: a rail of short lines under the headline,
// in the style of the career rail above it. Shown until all four photographs exist.
function LearnByMakingText() {
  return (
    <section className="bg-white px-6 py-20 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
            {WHY_MAKING.eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl text-[40px] font-display font-semibold leading-[1.05] tracking-[0.01em] text-ink lg:text-display">
            {WHY_MAKING.title}
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {WHY_MAKING.frames.map((frame, index) => (
            <li key={frame.slot}>
              <Reveal delay={0.1 * index}>
                <div className="border-t border-wine! pt-5">
                  <span className="text-descriptor uppercase tracking-[0.3em] text-rose-deep">
                    {frame.label}
                  </span>
                  <p className="mt-3 max-w-[16ch] font-display text-h2 font-semibold tracking-[0.01em] text-ink">
                    {frame.caption}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <SeeTheWork />
      </div>
    </section>
  );
}

// An overlapping collage rather than a grid: four frames of different shapes and sizes,
// the third riding over the foot of the first, one small detail at the edge. The headline
// sits in the gap the layout leaves. Mobile restacks them with alternating insets.
export function LearnByMaking() {
  if (!hasPhotos(...WHY_MAKING.frames.map((frame) => frame.slot))) return <LearnByMakingText />;

  const [one, two, three, four] = WHY_MAKING.frames;

  return (
    <section className="overflow-hidden bg-white px-6 py-20 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12">
          <Frame
            frame={one}
            frameClassName="aspect-[4/5] w-full"
            className="lg:col-span-6 lg:row-span-2 lg:row-start-1"
            parallax={5}
          />

          <Reveal className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:pt-6">
            <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
              {WHY_MAKING.eyebrow}
            </p>
            <h2 className="mt-4 text-[40px] font-display font-semibold leading-[1.05] tracking-[0.01em] text-ink lg:text-h1">
              {WHY_MAKING.title}
            </h2>
          </Reveal>

          <Frame
            frame={two}
            delay={0.15}
            frameClassName="aspect-square w-full rounded-t-[140px] sm:aspect-[4/5]"
            className="ml-10 lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:ml-0 lg:self-end"
            parallax={3}
          />

          <Frame
            frame={three}
            delay={0.1}
            frameClassName="aspect-[3/2] w-full"
            className="mr-10 lg:relative lg:z-10 lg:col-span-6 lg:col-start-4 lg:row-start-3 lg:-mt-24 lg:mr-0 lg:border-[12px] lg:border-white! lg:bg-white"
            parallax={4}
          />

          <Frame
            frame={four}
            delay={0.2}
            frameClassName="aspect-square w-full"
            className="ml-10 lg:col-span-3 lg:col-start-10 lg:row-start-3 lg:ml-0 lg:self-start lg:mt-10"
            parallax={3}
          />
        </div>

        <SeeTheWork />
      </div>
    </section>
  );
}
