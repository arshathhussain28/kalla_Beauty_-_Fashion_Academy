"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_CINEMATIC, VIEWPORT_ONCE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const CLIP_SHOWN = "inset(0% 0% 0% 0%)";
const CLIP_HIDDEN = {
  up: "inset(100% 0% 0% 0%)",
  right: "inset(0% 100% 0% 0%)",
} as const;

/**
 * Photograph reveal for the editorial pages: the frame opens with a clip-path while the
 * image settles from a slight zoom. clip-path + transform only, so nothing reflows —
 * the frame's size comes from `className` (aspect ratio), never from the animation.
 * The `data-reveal` hooks let globals.css force the final state under reduced motion.
 */
export function ClipReveal({
  children,
  delay = 0,
  from = "up",
  className,
}: {
  children: ReactNode;
  delay?: number;
  /** "up" opens from the bottom edge; "right" wipes in from the left. */
  from?: keyof typeof CLIP_HIDDEN;
  className?: string;
}) {
  return (
    <m.div
      data-reveal
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: CLIP_HIDDEN[from] }}
      whileInView={{ clipPath: CLIP_SHOWN }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 1.3, delay, ease: EASE_CINEMATIC }}
    >
      <m.div
        data-reveal
        className="h-full w-full"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 1.8, delay, ease: EASE_CINEMATIC }}
      >
        {children}
      </m.div>
    </m.div>
  );
}
