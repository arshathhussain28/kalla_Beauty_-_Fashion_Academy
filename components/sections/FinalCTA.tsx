"use client";

import {
  m,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
} from "framer-motion";
import { Fragment, useRef, type PointerEvent } from "react";
import { FinalCTABackdrop } from "@/components/sections/FinalCTABackdrop";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { EASE_CINEMATIC, VIEWPORT_ONCE } from "@/lib/motion";
import { useScrub } from "@/lib/scrub";
import { generalEnquiryWhatsAppLink } from "@/lib/whatsapp";

const HEADLINE = ["Ready", "to", "create", "your", "future?"];

// One word's entrance: rises out of the mask beneath it.
const WORD = {
  hidden: { y: "115%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 1.15, ease: EASE_CINEMATIC } },
};

// Moment 7 — the close, and this page's one wine band (brand doc: exactly one wine band per
// page; the previous "statistics" band was removed because its figures were illustrative rather
// than confirmed). It is built as a doorway: the band rises into the page as a dome (scroll-
// scrubbed), arches draw themselves behind the words, light drifts, and the headline arrives a
// word at a time with the last one catching a slow rose-gold sheen. One button plus one quiet
// link, as ever — the spectacle is all behind and around them. The closing line is from the
// client's course document.
//
// Everything animated is transform / opacity / clip only (no layout can move) and each piece is
// stilled by the reduced-motion rules in globals.css.
export function FinalCTA() {
  const frameRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);

  // The dome: grows from nothing to its full height as the band's top edge climbs the screen.
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "start 55%"] });
  const domeScale = useScrub(scrollYProgress, [
    [0, 0],
    [1, 1],
  ]);

  // A soft spotlight that follows the mouse (fine pointers only; hidden on touch and for
  // reduced motion). Motion values, so moving the mouse never re-renders anything.
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.38);
  const lightX = useSpring(mouseX, { stiffness: 90, damping: 22, mass: 0.6 });
  const lightY = useSpring(mouseY, { stiffness: 90, damping: 22, mass: 0.6 });
  const spotlight = useMotionTemplate`radial-gradient(460px circle at calc(${lightX} * 100%) calc(${lightY} * 100%), rgba(232,196,188,0.17), transparent 70%)`;

  function handleMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    const box = stageRef.current?.getBoundingClientRect();
    if (!box) return;
    mouseX.set((event.clientX - box.left) / box.width);
    mouseY.set((event.clientY - box.top) / box.height);
  }

  return (
    <div ref={frameRef} className="relative">
      {/* The dome. A half-ellipse of the band's own colour sitting on its top edge, so the wine
          rises into the page instead of cutting across it. `origin-bottom` keeps its base glued
          to the band while it grows; the rose hairline traces the curve. */}
      <m.div
        data-reveal
        aria-hidden="true"
        style={{ scaleY: domeScale }}
        className="pointer-events-none absolute inset-x-0 bottom-full h-[clamp(40px,7vw,104px)] origin-bottom border-t border-rose/55! bg-wine [border-radius:50%_50%_0_0/100%_100%_0_0]"
      />

      <section
        ref={stageRef}
        onPointerMove={handleMove}
        className="relative isolate overflow-hidden bg-gradient-to-b from-wine via-wine to-wine-deep px-6 py-24 text-center lg:px-12 lg:py-36"
      >
        <FinalCTABackdrop />
        <m.div
          data-spotlight
          aria-hidden="true"
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 hidden md:block"
        />

        <div className="relative z-10 mx-auto max-w-3xl">
          <Reveal>
            <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-light">
              Learn Professionally. Create Confidently. Grow Successfully.
            </p>
          </Reveal>

          {/* The heading itself is the in-view trigger and the words follow it by variants: a word
              sitting below its own clipping box is never "in view" to the browser, so it could not
              start the animation itself. */}
          <m.h2
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_ONCE}
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
            className="mt-6 text-[40px] font-display font-semibold leading-[1.05] tracking-[0.01em] text-cream lg:text-display"
          >
            {HEADLINE.map((word, index) => (
              <Fragment key={word}>
                <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
                  <m.span
                    data-reveal
                    className={
                      index === HEADLINE.length - 1
                        ? "kala-cta-sheen inline-block bg-gradient-to-r from-rose-light via-white to-rose-light bg-[length:200%_100%] bg-clip-text text-transparent"
                        : "inline-block"
                    }
                    variants={WORD}
                  >
                    {word}
                  </m.span>
                </span>
                {/* The space lives outside the clipped box: inside it, the browser would drop
                    it as trailing whitespace and the words would run together. */}
                {index < HEADLINE.length - 1 ? " " : null}
              </Fragment>
            ))}
          </m.h2>

          <Reveal delay={0.7}>
            <div className="mt-10 flex flex-col items-center gap-6">
              <Magnetic strength={0.18} className="relative">
                {/* Two outlines ripple out from the button, one after the other, to say "here". */}
                <span aria-hidden="true" className="kala-cta-ring pointer-events-none absolute inset-0 rounded-sm" />
                <span aria-hidden="true" className="kala-cta-ring kala-cta-ring-late pointer-events-none absolute inset-0 rounded-sm" />
                {/* The sweep of light across the button is a pseudo-element of this wrapper. */}
                <span className="kala-cta-shimmer relative inline-block overflow-hidden rounded-sm">
                  <Button
                    href={generalEnquiryWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="inverse"
                  >
                    Talk to KALA
                  </Button>
                </span>
              </Magnetic>
              <ArrowLink href="/courses" tone="cream">
                Explore Your Course
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
