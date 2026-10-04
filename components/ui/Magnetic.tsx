"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A quiet magnetic pull for one primary control (the "Enquire Now" button): the wrapper
 * drifts a few pixels toward the pointer and settles back on leave. Fine-pointer devices
 * only — touch and reduced-motion users get a plain button (the `data-reveal` hook lets
 * globals.css drop the transform). The spring is heavily damped so nothing overshoots.
 */
export function Magnetic({
  children,
  strength = 0.22,
  className,
}: {
  children: ReactNode;
  /** Fraction of the pointer's offset from centre that the wrapper follows (≤ 0.3). */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.5 });

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    x.set((event.clientX - (box.left + box.width / 2)) * strength);
    y.set((event.clientY - (box.top + box.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      data-reveal
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
