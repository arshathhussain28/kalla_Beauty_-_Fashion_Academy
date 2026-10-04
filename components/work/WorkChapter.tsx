"use client";

import type { KeyboardEvent } from "react";
import { CATEGORY_LABELS } from "@/data/courses";
import { imageSlots } from "@/data/images";
import type { WorkChapterData, WorkFrame } from "@/data/work";
import { ClipReveal } from "@/components/editorial/ClipReveal";
import { Parallax } from "@/components/editorial/Parallax";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface FrameStyle {
  /** Aspect ratio and radius of the photograph. */
  frame: string;
  /** Grid placement and offsets of the figure (mobile insets + desktop columns). */
  figure: string;
  parallax: number;
  delay: number;
  /** Rides over a neighbouring frame, so it carries a border in the section's own colour. */
  overlap?: boolean;
}

// Mobile is the same for every chapter — full-bleed, then inset right, then inset left —
// so the three photographs never line up as a column of identical cards. Desktop is where
// the five compositions diverge.
const MOBILE = ["-mx-6 lg:mx-0", "mr-10 lg:mr-0", "ml-10 lg:ml-0"] as const;

const LAYOUTS: Record<WorkChapterData["layout"], readonly [FrameStyle, FrameStyle, FrameStyle]> = {
  // A tall lead on the left; a square detail steps down beside it, a small process shot below.
  "lead-left": [
    {
      frame: "aspect-[4/5] w-full",
      figure: "lg:col-span-7 lg:row-span-2",
      parallax: 5,
      delay: 0,
    },
    {
      frame: "aspect-square w-full",
      figure: "lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:mt-28",
      parallax: 3,
      delay: 0.15,
    },
    {
      frame: "aspect-[3/2] w-full",
      figure: "lg:col-span-4 lg:col-start-8 lg:row-start-2 lg:self-end",
      parallax: 3,
      delay: 0.25,
    },
  ],
  // The same idea mirrored, with the detail frame arched.
  "lead-right": [
    {
      frame: "aspect-[4/5] w-full",
      figure: "lg:col-span-7 lg:col-start-6 lg:row-span-2",
      parallax: 5,
      delay: 0,
    },
    {
      frame: "aspect-square w-full rounded-t-[140px]",
      figure: "lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-28",
      parallax: 3,
      delay: 0.15,
    },
    {
      frame: "aspect-[3/2] w-full",
      figure: "lg:col-span-4 lg:col-start-2 lg:row-start-2 lg:self-end",
      parallax: 3,
      delay: 0.25,
    },
  ],
  // One wide frame across the top, the other two riding up over its foot.
  "wide-top": [
    {
      frame: "aspect-[4/3] w-full lg:aspect-[16/9]",
      figure: "lg:col-span-12",
      parallax: 5,
      delay: 0,
    },
    {
      frame: "aspect-[4/5] w-full",
      figure:
        "lg:relative lg:z-10 lg:col-span-4 lg:col-start-2 lg:row-start-2 lg:-mt-20 lg:border-[10px]",
      parallax: 3,
      delay: 0.15,
      overlap: true,
    },
    {
      frame: "aspect-[3/2] w-full",
      figure: "lg:col-span-5 lg:col-start-7 lg:row-start-2 lg:mt-12",
      parallax: 3,
      delay: 0.25,
    },
  ],
  // Three tall frames descending left to right in height and rising in offset.
  staircase: [
    { frame: "aspect-[3/4] w-full", figure: "lg:col-span-4", parallax: 5, delay: 0 },
    {
      frame: "aspect-square w-full",
      figure: "lg:col-span-4 lg:mt-24",
      parallax: 4,
      delay: 0.15,
    },
    {
      frame: "aspect-[3/2] w-full",
      figure: "lg:col-span-4 lg:mt-56",
      parallax: 3,
      delay: 0.25,
    },
  ],
  // A large centre frame flanked by two small ones at different heights.
  centred: [
    {
      frame: "aspect-[4/5] w-full",
      figure: "lg:col-span-6 lg:col-start-4 lg:row-start-1",
      parallax: 5,
      delay: 0,
    },
    {
      frame: "aspect-square w-full",
      figure: "lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:self-end",
      parallax: 3,
      delay: 0.15,
    },
    {
      frame: "aspect-[3/2] w-full rounded-t-[100px]",
      figure: "lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:mt-20",
      parallax: 3,
      delay: 0.25,
    },
  ],
};

function Frame({
  frame,
  category,
  style,
  mobile,
  tone,
  onOpen,
}: {
  frame: WorkFrame;
  category: WorkChapterData["category"];
  style: FrameStyle;
  mobile: string;
  tone: "cream" | "white";
  onOpen: (slot: WorkFrame["slot"]) => void;
}) {
  // A frame is only a control once it holds a real photograph — a blank frame that opens
  // an empty viewer would be worse than one that simply sits there.
  const viewable = Boolean(imageSlots[frame.slot].src);

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen(frame.slot);
    }
  }

  return (
    <figure
      className={cn(
        "group",
        mobile,
        style.figure,
        // `!` because globals.css sets a universal border-color that outranks utilities.
        style.overlap &&
          (tone === "white" ? "lg:border-white! lg:bg-white" : "lg:border-cream! lg:bg-cream")
      )}
    >
      <div
        {...(viewable
          ? {
              role: "button",
              tabIndex: 0,
              "aria-label": `View larger: ${frame.caption}`,
              onClick: () => onOpen(frame.slot),
              onKeyDown: handleKey,
            }
          : {})}
        className={cn(viewable && "cursor-zoom-in")}
      >
        <ClipReveal delay={style.delay} className={style.frame}>
          <Parallax className="h-full w-full" amount={style.parallax}>
            <ImageSlot
              slot={frame.slot}
              sizes="(min-width: 1024px) 700px, 100vw"
              className="h-full w-full"
              imageClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
            />
          </Parallax>
        </ClipReveal>
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-4 px-0.5">
        <span className="text-descriptor uppercase tracking-[0.3em] text-rose-deep">
          {CATEGORY_LABELS[category]}
        </span>
        <span className="text-small text-ink-muted transition-colors duration-500 group-hover:text-wine">
          {frame.caption}
        </span>
      </figcaption>
    </figure>
  );
}

export function WorkChapter({
  chapter,
  index,
  total,
  tone,
  onOpen,
}: {
  chapter: WorkChapterData;
  index: number;
  total: number;
  /** Grounds alternate down the page so chapters need no divider between them. */
  tone: "cream" | "white";
  onOpen: (slot: WorkFrame["slot"]) => void;
}) {
  const layout = LAYOUTS[chapter.layout];

  return (
    <section
      id={chapter.category}
      className={cn(
        "scroll-mt-20 overflow-hidden px-6 py-16 lg:px-12 lg:py-24",
        tone === "white" ? "bg-white" : "bg-cream"
      )}
    >
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <header className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-7">
              <p className="flex items-center gap-4 text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
                <span>
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <span className="h-px w-10 bg-rose" aria-hidden="true" />
              </p>
              <h2 className="mt-3 font-display text-[44px] font-semibold leading-none tracking-[0.01em] text-ink lg:text-display">
                {CATEGORY_LABELS[chapter.category]}
              </h2>
            </div>
            <div className="max-w-sm lg:col-span-5 lg:justify-self-end">
              <p className="text-body text-ink-muted">{chapter.line}</p>
              <ArrowLink href={`/courses/${chapter.courseSlug}`} className="mt-5">
                View the Course
              </ArrowLink>
            </div>
          </header>
        </Reveal>

        <div className="mt-12 grid gap-y-10 lg:mt-16 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
          {chapter.frames.map((frame, frameIndex) => (
            <Frame
              key={frame.slot}
              frame={frame}
              category={chapter.category}
              style={layout[frameIndex]}
              mobile={MOBILE[frameIndex]}
              tone={tone}
              onOpen={onOpen}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
