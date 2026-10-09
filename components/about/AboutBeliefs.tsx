"use client";

import { m, useScroll } from "framer-motion";
import { useRef } from "react";
import { ABOUT_BELIEFS } from "@/data/about";
import { ClipReveal } from "@/components/editorial/ClipReveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";
import { EASE_CINEMATIC } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Craft → Confidence → Career as a descent: three beliefs zig-zag down the page, each
// beside its photograph, joined by a line that draws as you scroll. The line is the
// "visual progression" — it is what makes the three read as steps, not three columns.
export function AboutBeliefs() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });

  return (
    <section className="bg-cream px-6 py-20 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
            {ABOUT_BELIEFS.eyebrow}
          </p>
          <h2 className="mt-4 max-w-2xl text-[40px] font-display font-semibold leading-[1.05] tracking-[0.01em] text-ink lg:text-display">
            {ABOUT_BELIEFS.title}
          </h2>
        </Reveal>

        <ol ref={ref} className="relative mt-16 space-y-20 pl-8 lg:mt-24 lg:space-y-28 lg:pl-0">
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[7px] top-0 w-px bg-border lg:left-1/2"
          />
          <m.span
            data-reveal
            aria-hidden="true"
            style={{ scaleY: scrollYProgress }}
            className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-wine lg:left-1/2"
          />

          {ABOUT_BELIEFS.items.map((belief, index) => {
            const flip = index % 2 === 1;
            return (
              <li
                key={belief.name}
                className="relative lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-24"
              >
                <m.span
                  data-reveal
                  aria-hidden="true"
                  initial={{ scale: 0.4, opacity: 0.3 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "0px 0px -40% 0px" }}
                  transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
                  className="absolute -left-8 top-1 h-[15px] w-[15px] rounded-full bg-wine lg:left-1/2 lg:top-1/2 lg:-ml-[8px] lg:-mt-[8px]"
                />

                <div className={cn(flip && "lg:order-2")}>
                  <Reveal>
                    <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
                      {belief.number}
                    </p>
                    <h3 className="mt-2 font-display text-[40px] font-semibold leading-none tracking-[0.01em] text-ink lg:text-display">
                      {belief.name}
                    </h3>
                    <p className="mt-4 text-h3 text-ink">{belief.line}</p>
                    <p className="mt-3 max-w-sm text-body text-ink-muted">{belief.text}</p>
                  </Reveal>
                </div>

                <div className={cn("mt-8 lg:mt-0", flip && "lg:order-1")}>
                  {/* The same frame for all three beliefs — same shape, same arch — so they read as
                      a set and only the photographs differ. Landscape (never taller than 5:4)
                      so a trainer-and-student photograph can't lose one of its faces. */}
                  <ClipReveal
                    from={flip ? "right" : "up"}
                    className="aspect-[4/3] w-full rounded-t-[96px] lg:aspect-[5/4] lg:rounded-t-[140px]"
                  >
                    <ImageSlot
                      slot={belief.slot}
                      sizes="(min-width: 1024px) 540px, 100vw"
                      className="h-full w-full"
                    />
                  </ClipReveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
