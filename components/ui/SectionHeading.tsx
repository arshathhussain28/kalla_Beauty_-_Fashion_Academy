"use client";

import { m } from "framer-motion";
import { RevealText } from "@/components/ui/RevealText";
import { EASE_CINEMATIC, VIEWPORT_ONCE } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Enforces the brand's hierarchy discipline (§09/§23): eyebrow → headline → body,
// always in that order, never more than these three sizes in one block.
//
// It also carries the site's section entrance, so every section that uses it opens the same
// way: the eyebrow fades up, a rose hairline draws out beside it, the headline arrives word by
// word, and the description follows. Callers no longer need to wrap this in a <Reveal>.
interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "ink" | "cream";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "ink",
  className,
}: SectionHeadingProps) {
  const cream = tone === "cream";

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <m.p
        data-reveal
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.7, ease: EASE_CINEMATIC }}
        className={cn(
          "flex items-center gap-4 text-eyebrow font-sans font-medium uppercase tracking-[0.24em]",
          align === "center" && "justify-center",
          cream ? "text-rose-light" : "text-rose-deep"
        )}
      >
        {eyebrow}
        <m.span
          data-reveal
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 1, delay: 0.25, ease: EASE_CINEMATIC }}
          className={cn("h-px w-10 origin-left", cream ? "bg-rose-light/60" : "bg-rose")}
        />
      </m.p>

      <RevealText
        as="h2"
        text={title}
        delay={0.12}
        className={cn(
          "text-h2 font-display font-medium tracking-[0.01em]",
          cream ? "text-cream" : "text-ink"
        )}
      />

      {description && (
        <m.p
          data-reveal
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.9, delay: 0.42, ease: EASE_CINEMATIC }}
          className={cn(
            "max-w-xl text-body font-sans",
            align === "center" && "mx-auto",
            cream ? "text-cream/80" : "text-ink-muted"
          )}
        >
          {description}
        </m.p>
      )}
    </div>
  );
}
