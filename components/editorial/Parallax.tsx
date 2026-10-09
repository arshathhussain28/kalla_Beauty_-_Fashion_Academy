"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Gentle vertical drift for a photograph inside its frame. The child is oversized by 10%
 * top and bottom so the frame never shows an edge; `amount` (percent of the child's own
 * height, keep it ≤ 8) is how far it travels over the frame's pass through the viewport.
 *
 * The scroll range spans the full 0 → 1 (see lib/scrub.ts for why that matters), and the
 * `data-reveal` hook lets reduced-motion users get a still image.
 */
export function Parallax({
  children,
  amount = 5,
  className,
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-amount}%`, `${amount}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <m.div data-reveal style={{ y }} className="absolute inset-x-0 -bottom-[10%] -top-[10%]">
        {children}
      </m.div>
    </div>
  );
}
