"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CraftPinnedProps {
  slides: { key: string; label: string; node: ReactNode }[];
}

// Moment 2 — pinned horizontal scroll (desktop only; mobile and reduced-motion get the
// swipe carousel instead, switched in CSS). The section is n×100svh tall; its inner
// stage is sticky, and vertical scroll progress translates a track n viewports wide.
// Pure transform, so it stays on the GPU — and it's `sticky`, not scroll-jacking: the
// page still scrolls normally, the stage just holds still while it does.
export function CraftPinned({ slides }: CraftPinnedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = slides.length;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `${-((count - 1) / count) * 100}%`]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(Math.min(count - 1, Math.max(0, Math.floor(value * count))));
  });

  // A slide that's off-screen can still receive keyboard focus; clip (unlike hidden)
  // won't scroll the stage to reveal it, so jump the page to that slide's scroll position.
  function revealSlide(index: number) {
    const section = ref.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const range = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (index / (count - 1)) * range, behavior: "auto" });
  }

  return (
    <div
      ref={ref}
      className="craft-pinned relative hidden lg:block"
      style={{ height: `${count * 100}svh` }}
    >
      <div className="sticky top-[72px] h-[calc(100svh-72px)] overflow-clip">
        <motion.div
          data-reveal
          style={{ x, width: `${count * 100}%` }}
          className="flex h-full will-change-transform"
        >
          {slides.map((slide, index) => (
            <div
              key={slide.key}
              className="h-full shrink-0"
              style={{ width: `${100 / count}%` }}
              onFocusCapture={() => revealSlide(index)}
            >
              {slide.node}
            </div>
          ))}
        </motion.div>

        <div
          className="absolute inset-x-12 bottom-6 flex items-center gap-6"
          aria-hidden="true"
        >
          {slides.map((slide, index) => (
            <span
              key={slide.key}
              className={cn(
                "text-descriptor uppercase tracking-[0.3em] transition-colors duration-500",
                index === active ? "text-wine" : "text-ink-muted/50"
              )}
            >
              {slide.label}
            </span>
          ))}
          <span className="relative ml-2 h-px flex-1 bg-border">
            <motion.span
              data-reveal
              style={{ scaleX: scrollYProgress }}
              className="absolute inset-0 origin-left bg-wine"
            />
          </span>
        </div>
      </div>
    </div>
  );
}
