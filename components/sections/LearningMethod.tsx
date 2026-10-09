"use client";

import { m, useScroll } from "framer-motion";
import { useRef } from "react";
import { EASE_CINEMATIC } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Copy is built from what the course document actually promises — theory + practical
// learning, hands-on practice, detailing & finishing, a final practical assessment and
// a completion certificate — and nothing beyond it (no hours, ratios or outcomes).
const STAGES = [
  {
    title: "Learn",
    text: "The technique, the tools and the product knowledge behind every skill — theory first.",
  },
  {
    title: "Practice",
    text: "Hands-on practice with guidance, repeated until the technique is steady.",
  },
  {
    title: "Create",
    text: "Put the skill to work on a complete piece — a bridal look, a design, a drape, a garment.",
  },
  {
    title: "Refine",
    text: "Detailing, fitting and finishing: the difference between good work and professional work.",
  },
  {
    title: "Present",
    text: "A final practical assessment, a completion certificate, and the confidence to work with clients.",
  },
] as const;

const stageVariants = {
  off: { opacity: 0.28, x: 12 },
  on: { opacity: 1, x: 0 },
};

const dotVariants = {
  off: { scale: 0.55, opacity: 0.35 },
  on: { scale: 1, opacity: 1 },
};

// Moment 4 — the learning journey. The vertical line is driven by scroll progress and
// each stage activates as it reaches the middle of the viewport, then stays lit, so the
// sequence reads as progress rather than a flicker.
export function LearningMethod({ tone = "cream" }: { tone?: "cream" | "white" }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 55%"] });

  return (
    <section
      className={`px-6 py-20 lg:px-12 lg:py-32 ${tone === "white" ? "bg-white" : "bg-cream"}`}
    >
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="The KALA Method"
            title="Learn it. Practise it. Make it yours."
            description="Every course follows the same path — from first technique to finished, professional work."
          />
        </div>

        <ol ref={ref} className="relative pl-10">
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-[7px] top-2 w-px bg-border"
          />
          <m.span
            data-reveal
            aria-hidden="true"
            style={{ scaleY: scrollYProgress }}
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-wine"
          />

          {STAGES.map((stage, index) => (
            <m.li
              key={stage.title}
              data-reveal
              initial="off"
              whileInView="on"
              viewport={{ once: true, margin: "-40% 0px -40% 0px" }}
              variants={stageVariants}
              transition={{ duration: 0.9, ease: EASE_CINEMATIC }}
              className="relative pb-16 last:pb-0"
            >
              <m.span
                data-reveal
                aria-hidden="true"
                variants={dotVariants}
                transition={{ duration: 0.7, ease: EASE_CINEMATIC }}
                className="absolute -left-10 top-2 block h-[15px] w-[15px] rounded-full bg-wine"
              />
              <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-h1 font-semibold tracking-[0.01em] text-ink">
                {stage.title}
              </h3>
              <p className="mt-3 max-w-md text-body text-ink-muted">{stage.text}</p>
            </m.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
