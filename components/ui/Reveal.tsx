"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_CINEMATIC, VIEWPORT_ONCE } from "@/lib/motion";
import { cn } from "@/lib/utils";

// `data-reveal` / `data-curtain` are hooks for the prefers-reduced-motion rules in
// globals.css. Overriding via CSS (rather than branching on useReducedMotion in JS)
// keeps the server and client markup identical, so there's no hydration mismatch and
// reduced-motion users can never be left looking at an element stuck at opacity 0.

/** Fade + short rise on entering the viewport. Text and small blocks. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.9, delay, ease: EASE_CINEMATIC }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Photograph reveal: a wine "curtain" lifts off the image while the image settles from
 * a slight zoom. Transform-only (scale), so it stays on the GPU and causes no layout
 * shift — the wrapper's size comes from `className`, never from the animation.
 */
export function CurtainReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        data-reveal
        className="h-full w-full"
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 1.6, delay, ease: EASE_CINEMATIC }}
      >
        {children}
      </motion.div>
      <motion.div
        data-curtain
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 origin-top bg-wine-deep"
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 1.1, delay, ease: EASE_CINEMATIC }}
      />
    </div>
  );
}
