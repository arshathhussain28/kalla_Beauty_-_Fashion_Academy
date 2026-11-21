"use client";

import { m } from "framer-motion";
import { Fragment } from "react";
import { EASE_CINEMATIC, VIEWPORT_ONCE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * A headline that arrives one word at a time, each rising out of its own clipping box.
 *
 * Two things matter and are easy to get wrong:
 *  - The in-view trigger lives on the *wrapper*, not the words. A word that starts below its
 *    own `overflow-hidden` box is never "in view" to the browser, so it would never start.
 *  - The spaces sit *outside* the inline-block word boxes. Inside, the browser drops them as
 *    trailing whitespace and the words run together.
 *
 * Transform and opacity only: the text keeps its normal line box, so nothing reflows and the
 * heading occupies its final height from the first paint. `data-reveal` lets the reduced-motion
 * rules in globals.css show the finished state instead.
 */
const WORD = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 1.05, ease: EASE_CINEMATIC } },
};

export function RevealText({
  text,
  as: Tag = "h2",
  delay = 0,
  stagger = 0.08,
  className,
  wordClassName,
  lastWordClassName,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  stagger?: number;
  className?: string;
  wordClassName?: string;
  /** Applied to the final word only — used for the rose-gold sheen on closing lines. */
  lastWordClassName?: string;
}) {
  const MotionTag = m[Tag];
  const words = text.split(" ");

  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_ONCE}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      className={className}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
            <m.span
              data-reveal
              variants={WORD}
              className={cn(
                "inline-block",
                wordClassName,
                index === words.length - 1 && lastWordClassName
              )}
            >
              {word}
            </m.span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}
