"use client";

import { m } from "framer-motion";
import { WHY_IDEA } from "@/data/why-kala";
import { EASE_CINEMATIC } from "@/lib/motion";

const rowVariants = {
  off: { opacity: 0.3 },
  on: { opacity: 1 },
};

const ruleVariants = {
  off: { scaleX: 0 },
  on: { scaleX: 1 },
};

// The three pillars as typography, not cards. Each row lights up as it crosses the middle
// of the viewport and stays lit, so scrolling reads Craft → Confidence → Career in order.
// Time-based (whileInView), not scroll-linked, so nothing re-fades on the way back up.
export function IdeaPillars() {
  return (
    <section id="approach" className="scroll-mt-20 bg-white px-6 py-20 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
              {WHY_IDEA.eyebrow}
            </p>
            <h2 className="mt-4 text-[40px] font-display font-semibold leading-[1.05] tracking-[0.01em] text-ink lg:text-display">
              {WHY_IDEA.title}
            </h2>
          </div>
          <p className="max-w-sm text-body text-ink-muted lg:col-span-5 lg:justify-self-end">
            {WHY_IDEA.text}
          </p>
        </div>

        <ol className="mt-16 lg:mt-24">
          {WHY_IDEA.pillars.map((pillar, index) => (
            <m.li
              key={pillar.name}
              data-reveal
              initial="off"
              whileInView="on"
              viewport={{ once: true, margin: "0px 0px -35% 0px" }}
              variants={rowVariants}
              transition={{ duration: 1, ease: EASE_CINEMATIC }}
              className="relative grid items-baseline gap-x-8 gap-y-3 py-10 lg:grid-cols-[88px_1fr_auto] lg:py-14"
            >
              <m.span
                data-reveal
                aria-hidden="true"
                variants={ruleVariants}
                transition={{ duration: 1.4, ease: EASE_CINEMATIC }}
                className="absolute inset-x-0 top-0 h-px origin-left bg-wine"
              />
              <span className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[clamp(32px,10.5vw,56px)] font-semibold uppercase leading-none tracking-[0.04em] text-ink lg:text-display">
                {pillar.name}
              </h3>
              <p className="text-h3 text-ink-muted lg:text-right">{pillar.line}</p>
            </m.li>
          ))}
          <li aria-hidden="true" className="h-px bg-border" />
        </ol>
      </div>
    </section>
  );
}
