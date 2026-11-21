"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { RevealText } from "@/components/ui/RevealText";
import { EASE_CINEMATIC } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * The opening of a page: eyebrow, then the title word by word, then a supporting line, each
 * arriving in turn. Every editorial page (`/courses`, `/the-work`, `/about`, `/why-kala`,
 * `/contact`, the legal pages) opens with this, so they share one entrance instead of six.
 *
 * `animate` rather than `whileInView`: a page's own heading is on screen at load, and waiting
 * for an intersection callback would show it a frame late. A rose hairline draws itself under
 * the eyebrow as the title settles.
 */
export function PageHeading({
  eyebrow,
  title,
  children,
  align = "left",
  tone = "ink",
  titleClassName,
  className,
}: {
  eyebrow: string;
  title: string;
  /** The supporting line(s) under the title — arrives last. */
  children?: ReactNode;
  align?: "left" | "center";
  tone?: "ink" | "cream";
  titleClassName?: string;
  className?: string;
}) {
  const cream = tone === "cream";

  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <m.p
        data-reveal
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE_CINEMATIC }}
        className={cn(
          "flex items-center gap-4 text-eyebrow font-medium uppercase tracking-[0.24em]",
          align === "center" && "justify-center",
          cream ? "text-rose-light" : "text-rose-deep"
        )}
      >
        {eyebrow}
        <m.span
          data-reveal
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.45, ease: EASE_CINEMATIC }}
          className={cn("h-px w-12 origin-left", cream ? "bg-rose-light/60" : "bg-rose")}
        />
      </m.p>

      <RevealText
        as="h1"
        text={title}
        delay={0.3}
        stagger={0.075}
        className={cn(
          "mt-5 font-display font-semibold leading-[1.02] tracking-[0.01em]",
          cream ? "text-cream" : "text-ink",
          titleClassName ?? "text-[44px] sm:text-[56px] lg:text-display"
        )}
      />

      {children && (
        <m.div
          data-reveal
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: EASE_CINEMATIC }}
        >
          {children}
        </m.div>
      )}
    </div>
  );
}
