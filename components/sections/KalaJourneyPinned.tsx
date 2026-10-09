"use client";

import { m, useMotionValueEvent, useScroll, type MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { JOURNEY_INTRO, JOURNEY_STAGES, type JourneyStage } from "@/data/journey";
import type { ImageSlotKey } from "@/data/images";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ClosingBackdrop } from "@/components/sections/ClosingBackdrop";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { EASE_CINEMATIC } from "@/lib/motion";
import { useScrub } from "@/lib/scrub";
import { cn } from "@/lib/utils";
import { generalEnquiryWhatsAppLink } from "@/lib/whatsapp";

// ─── Timeline ────────────────────────────────────────────────────────────────
// One scroll-progress value (0 → 1) choreographs five states, each a fifth of the run:
//   0.0 intro · 0.2 Craft · 0.4 Confidence · 0.6 Career · 0.8 closing line.
// Text cross-fades in a shared grid cell; each photograph is revealed by a rising
// clip-path over the previous one, so scenes overlap instead of cutting.
// All scroll-linked values go through useScrub (see lib/scrub.ts for why).
const STATE_COUNT = 5;
const SEG = 1 / STATE_COUNT;
const FADE = 0.05;

const REVEAL_ZOOM_FROM = 1.18;
const CLIP_HIDDEN = "inset(100% 0% 0% 0%)";
const CLIP_SHOWN = "inset(0% 0% 0% 0%)";

/** [start, fully in, begin out, fully out] for a stage's text. */
const stageWindow = (index: number) => {
  const start = (index + 1) * SEG;
  return [start, start + FADE, start + SEG - FADE, start + SEG] as const;
};
/** Photographs begin revealing slightly before their text arrives. */
const imageWindow = (index: number) => {
  const start = (index + 1) * SEG;
  return [start - 0.04, start + 0.06] as const;
};

// ─── Pieces ──────────────────────────────────────────────────────────────────

/** Intro copy: time-based editorial reveal on entry, then a scroll-driven exit. */
function IntroLayer({ progress }: { progress: MotionValue<number> }) {
  const opacity = useScrub(progress, [[0, 1], [0.15, 1], [SEG, 0]]);
  const y = useScrub(progress, [[0, 0], [0.15, 0], [SEG, -28]]);

  return (
    <m.div data-reveal style={{ opacity, y }} className="[grid-area:1/1]">
      <m.div
        data-reveal
        initial={{ opacity: 0, y: 24, filter: "blur(8px)", clipPath: "inset(0% 0% 100% 0%)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", clipPath: "inset(0% 0% -10% 0%)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: EASE_CINEMATIC }}
      >
        <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
          {JOURNEY_INTRO.eyebrow}
        </p>
        <h2 className="mt-5 text-[40px] font-display font-semibold leading-[1.05] tracking-[0.01em] text-ink lg:text-display">
          {JOURNEY_INTRO.title}
        </h2>
        <p className="mt-6 max-w-md text-body text-ink-muted">{JOURNEY_INTRO.text}</p>
      </m.div>
    </m.div>
  );
}

function StageLayer({
  progress,
  index,
  stage,
}: {
  progress: MotionValue<number>;
  index: number;
  stage: JourneyStage;
}) {
  const [a, b, c, d] = stageWindow(index);
  const opacity = useScrub(progress, [[a, 0], [b, 1], [c, 1], [d, 0]]);
  const y = useScrub(progress, [[a, 28], [b, 0], [c, 0], [d, -28]]);

  return (
    <m.div data-reveal style={{ opacity, y }} className="[grid-area:1/1]">
      <p className="flex items-center gap-4 text-eyebrow font-medium uppercase tracking-[0.24em]">
        <span className="text-rose-deep">{stage.number} / 03</span>
        <span className="h-px w-10 bg-rose" aria-hidden="true" />
        <span className="text-ink-muted">{JOURNEY_INTRO.eyebrow}</span>
      </p>
      <h3 className="mt-4 text-[40px] font-display font-semibold leading-[1.05] tracking-[0.01em] text-ink lg:text-display">
        {stage.title}
      </h3>
      <p className="mt-3 text-[22px] leading-snug text-ink">{stage.tagline}</p>
      <p className="mt-4 max-w-md text-body text-ink-muted">{stage.copy}</p>
      <p className="mt-6 text-descriptor uppercase leading-[1.9] tracking-[0.3em] text-rose-deep">
        {stage.meta.join("  ·  ")}
      </p>
    </m.div>
  );
}

function StageImage({
  progress,
  index,
  slot,
}: {
  progress: MotionValue<number>;
  index: number;
  slot: ImageSlotKey;
}) {
  const [from, to] = imageWindow(index);
  const clipPath = useScrub(progress, [[from, CLIP_HIDDEN], [to, CLIP_SHOWN]]);
  const scale = useScrub(progress, [[from, REVEAL_ZOOM_FROM], [to, 1]]);

  return (
    <m.div data-reveal style={{ clipPath }} className="absolute inset-0">
      <m.div data-reveal style={{ scale }} className="h-full w-full">
        <ImageSlot
          slot={slot}
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="h-full w-full"
          imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </m.div>
    </m.div>
  );
}

function RailItem({
  progress,
  index,
  current,
  number,
}: {
  progress: MotionValue<number>;
  index: number;
  current: number;
  number: string;
}) {
  const fill = useScrub(progress, [[(index + 1) * SEG, 0], [(index + 2) * SEG, 1]]);

  return (
    <li className="flex items-center gap-3">
      <span
        className={cn(
          "text-eyebrow font-medium tracking-[0.24em] transition-colors duration-500",
          current === index ? "text-wine" : "text-ink-muted/50"
        )}
      >
        {number}
      </span>
      <span className="relative block h-px w-14 bg-border">
        <m.span
          data-reveal
          style={{ scaleX: fill }}
          className="absolute inset-0 origin-left bg-wine"
        />
      </span>
    </li>
  );
}

function ConnectorLine({ progress }: { progress: MotionValue<number> }) {
  const scaleX = useScrub(progress, [[0.82, 0], [0.87, 1]]);

  return (
    <li aria-hidden="true" className="relative block h-px w-8 bg-border sm:w-14">
      <m.span
        data-reveal
        style={{ scaleX }}
        className="absolute inset-0 origin-left bg-wine"
      />
    </li>
  );
}

/** Closing state: the three words connect, then "Craft Your Confidence." and the CTAs. */
function ClosingLayer({
  progress,
  active,
  showBackdrop,
}: {
  progress: MotionValue<number>;
  active: boolean;
  /** Mount the backdrop photograph only once the visitor is part-way through the journey. */
  showBackdrop: boolean;
}) {
  const layer = useScrub(progress, [[0.8, 0], [0.84, 1]]);
  const words = useScrub(progress, [[0.8, 0], [0.85, 1], [0.9, 1], [0.94, 0.45]]);
  const headline = useScrub(progress, [[0.87, 0], [0.93, 1]]);
  const headlineY = useScrub(progress, [[0.87, 24], [0.93, 0]]);
  const headlineClip = useScrub(progress, [
    [0.87, "inset(0% 0% 100% 0%)"],
    [0.93, "inset(0% 0% -10% 0%)"],
  ]);
  const actions = useScrub(progress, [[0.93, 0], [0.97, 1]]);
  // The backdrop starts a touch zoomed in and settles as the headline lands.
  const backdropScale = useScrub(progress, [[0.8, 1.06], [0.97, 1]]);

  return (
    // `isolate` gives the layer its own stacking context so the backdrop (z -10) sits behind
    // the text without slipping behind the stage itself.
    <m.div
      data-reveal
      style={{ opacity: layer }}
      className={cn(
        // portrait: the backdrop is a band across the top, so the words move down to sit beneath it
        "absolute inset-0 isolate flex flex-col items-center justify-center px-8 text-center portrait:pt-[36%]",
        active ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      {/* Mounted only from the journey's midpoint: the stage sits just below the hero, so a lazy
          image here would otherwise download at page load for a picture that appears at the very
          end of the scroll. Starting at ~45 % leaves the rest of the scroll to fetch it. */}
      {showBackdrop && (
        <m.div data-reveal style={{ scale: backdropScale }} className="absolute inset-0 -z-10">
          <ClosingBackdrop />
        </m.div>
      )}

      {/* wine, not rose-deep: this line now sits over a photographic backdrop, and wine holds
          8.8 : 1 on cream where rose-deep manages 3.4 : 1 */}
      <m.ul
        data-reveal
        style={{ opacity: words }}
        className="kala-closing-eyebrow flex items-center gap-4 text-eyebrow font-medium uppercase tracking-[0.3em] text-wine sm:gap-6"
        aria-label="Craft, Confidence, Career"
      >
        <li>Craft</li>
        <ConnectorLine progress={progress} />
        <li>Confidence</li>
        <ConnectorLine progress={progress} />
        <li>Career</li>
      </m.ul>

      <m.h3
        data-reveal
        style={{ opacity: headline, y: headlineY, clipPath: headlineClip }}
        className="kala-closing-headline mt-8 max-w-3xl text-[40px] font-display font-semibold leading-[1.05] tracking-[0.01em] text-ink lg:text-display"
      >
        Craft Your Confidence.
      </m.h3>

      <m.div
        data-reveal
        style={{ opacity: actions }}
        className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
      >
        <Button href="/courses" variant="primary">
          Explore Courses
        </Button>
        <ArrowLink href={generalEnquiryWhatsAppLink()} external>
          Talk to KALA
        </ArrowLink>
      </m.div>
    </m.div>
  );
}

// ─── Stage ───────────────────────────────────────────────────────────────────

// Desktop + tablet only (≥768px, and not under reduced motion — see globals.css).
// Mobile gets a dedicated vertical layout instead (KalaJourneyStatic).
export function KalaJourneyPinned() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [backdropReady, setBackdropReady] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(Math.min(STATE_COUNT - 1, Math.max(0, Math.floor(value * STATE_COUNT))));
    if (value > 0.45) setBackdropReady(true);
  });

  const gridOpacity = useScrub(scrollYProgress, [[0.76, 1], [0.83, 0]]);

  // The CTAs only exist in the closing state; if keyboard focus reaches them early,
  // scroll the page to that state rather than leaving focus on something invisible.
  function revealClosing() {
    const section = ref.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const range = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + 0.97 * range, behavior: "auto" });
  }

  return (
    <div
      ref={ref}
      className="journey-pinned relative hidden h-[270svh] md:block lg:h-[340svh]"
    >
      <div className="sticky top-[72px] h-[calc(100svh-72px)] overflow-clip">
        <m.div data-reveal style={{ opacity: gridOpacity }} className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-[1200px] flex-col gap-8 px-8 pb-16 pt-6 lg:justify-center lg:px-12 lg:py-0">
            <div className="grid lg:w-[40%] lg:pr-6">
              <IntroLayer progress={scrollYProgress} />
              {JOURNEY_STAGES.map((stage, index) => (
                <StageLayer key={stage.key} progress={scrollYProgress} index={index} stage={stage} />
              ))}
            </div>

            <div className="group relative order-first h-[50%] w-[84%] self-end overflow-hidden rounded-t-[160px] lg:absolute lg:right-0 lg:top-[7%] lg:order-none lg:h-[86%] lg:w-[56%] lg:rounded-none lg:rounded-tl-[200px]">
              <m.div
                data-reveal
                className="absolute inset-0"
                initial={{ clipPath: CLIP_HIDDEN }}
                whileInView={{ clipPath: CLIP_SHOWN }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: EASE_CINEMATIC }}
              >
                <ImageSlot
                  slot={JOURNEY_INTRO.slot}
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="h-full w-full"
                  imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </m.div>
              {JOURNEY_STAGES.map((stage, index) => (
                <StageImage
                  key={stage.key}
                  progress={scrollYProgress}
                  index={index}
                  slot={stage.slot}
                />
              ))}
            </div>
          </div>

          <ol
            className="absolute bottom-[72px] left-8 flex items-center gap-6 lg:bottom-6 lg:left-[max(3rem,calc((100%-1200px)/2+3rem))]"
            aria-label="Journey progress"
          >
            {JOURNEY_STAGES.map((stage, index) => (
              <RailItem
                key={stage.key}
                progress={scrollYProgress}
                index={index}
                current={active - 1}
                number={stage.number}
              />
            ))}
          </ol>
        </m.div>

        <div onFocusCapture={() => active < STATE_COUNT - 1 && revealClosing()}>
          <ClosingLayer
            progress={scrollYProgress}
            active={active === STATE_COUNT - 1}
            showBackdrop={backdropReady}
          />
        </div>
      </div>
    </div>
  );
}
