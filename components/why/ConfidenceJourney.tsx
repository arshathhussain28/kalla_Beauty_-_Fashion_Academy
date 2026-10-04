"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { WHY_JOURNEY } from "@/data/why-kala";
import { CurtainReveal, Reveal } from "@/components/ui/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { cn } from "@/lib/utils";

const CLIP_SHOWN = "inset(0% 0% 0% 0%)";
const CLIP_HIDDEN = "inset(100% 0% 0% 0%)";

// The page's one wine band and its signature moment. Five stages down the right, a line
// that draws as you scroll, and on desktop a sticky arched photograph on the left that
// opens to the next stage's image each time a stage reaches the middle of the screen
// (earlier images stay beneath, so it reads as progress, not a slideshow). On mobile the
// sticky panel is dropped and each stage carries its own image inline.
export function ConfidenceJourney() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });

  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>("[data-stage]");
    if (!items?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.getAttribute("data-stage")));
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const { moments } = WHY_JOURNEY;

  return (
    <section className="bg-wine px-6 py-24 text-cream lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-light">
            {WHY_JOURNEY.eyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl text-[40px] font-display font-semibold leading-[1.05] tracking-[0.01em] lg:text-display">
            {WHY_JOURNEY.title}
          </h2>
          <p className="mt-6 max-w-md text-body text-cream/80">{WHY_JOURNEY.text}</p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-[200px]">
                {moments.map((moment, index) => (
                  <div
                    key={moment.slot}
                    aria-hidden={index !== active}
                    className="absolute inset-0 transition-[clip-path] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      clipPath: index <= active ? CLIP_SHOWN : CLIP_HIDDEN,
                      zIndex: index,
                    }}
                  >
                    <ImageSlot
                      slot={moment.slot}
                      sizes="(min-width: 1024px) 440px, 100vw"
                      className="h-full w-full"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-5 flex items-center gap-4 text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-light">
                <span>{moments[active].number} / 05</span>
                <span className="h-px w-10 bg-rose-light/60" aria-hidden="true" />
                <span className="text-cream/70">{moments[active].title}</span>
              </p>
            </div>
          </div>

          <ol ref={listRef} className="relative pl-10 lg:pl-14">
            <span
              aria-hidden="true"
              className="absolute bottom-2 left-[7px] top-2 w-px bg-cream/20 lg:left-[9px]"
            />
            <motion.span
              data-reveal
              aria-hidden="true"
              style={{ scaleY: scrollYProgress }}
              className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-rose-light lg:left-[9px]"
            />

            {moments.map((moment, index) => {
              const lit = index <= active;
              return (
                <li
                  key={moment.title}
                  data-stage={index}
                  className="relative pb-20 last:pb-0 lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center lg:pb-0"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -left-10 top-2 block h-[15px] w-[15px] rounded-full ring-1 transition-colors duration-700 lg:-left-14 lg:top-1/2 lg:h-[19px] lg:w-[19px]",
                      lit ? "bg-rose-light ring-rose-light" : "bg-wine ring-cream/40"
                    )}
                  />
                  <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-light">
                    {moment.number}
                  </p>
                  <h3
                    className={cn(
                      "mt-2 font-display text-[40px] font-semibold leading-none tracking-[0.01em] transition-colors duration-700 lg:text-h1",
                      lit ? "text-cream" : "text-cream/40"
                    )}
                  >
                    {moment.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 text-h3 transition-colors duration-700",
                      lit ? "text-cream" : "text-cream/40"
                    )}
                  >
                    {moment.line}
                  </p>
                  <p className="mt-3 max-w-md text-body text-cream/75">{moment.detail}</p>

                  <CurtainReveal
                    className={cn(
                      "mt-8 aspect-[4/3] w-full lg:hidden",
                      index % 2 === 1 && "rounded-t-[120px]"
                    )}
                  >
                    <ImageSlot
                      slot={moment.slot}
                      sizes="(min-width: 640px) 560px, 100vw"
                      className="h-full w-full"
                    />
                  </CurtainReveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
