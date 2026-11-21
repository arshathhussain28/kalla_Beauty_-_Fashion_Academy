"use client";

import { m } from "framer-motion";
import { ABOUT_HERO } from "@/data/about";
import { hasPhotos } from "@/data/images";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { cn } from "@/lib/utils";
import { EASE_CINEMATIC } from "@/lib/motion";

// The Why KALA cover, deliberately reversed: the arched photograph leads on the left and
// the three words stack on the right, each one arriving in turn — the brand idea in the
// order it is meant to be read. Pure-CSS entrance so it plays on first paint.
//
// Without a photograph the words take the whole row, left-aligned, instead of leaving an
// empty arch on the left.
export function AboutHero() {
  const hasPhoto = hasPhotos(ABOUT_HERO.slot);

  return (
    <section className="bg-cream px-6 pb-20 pt-12 lg:px-12 lg:pb-28 lg:pt-20">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
        {hasPhoto && (
          <div className="order-2 lg:order-1 lg:col-span-5">
            <ImageSlot
              slot={ABOUT_HERO.slot}
              priority
              sizes="(min-width: 1024px) 460px, 100vw"
              className="aspect-[4/5] w-full rounded-t-[200px] lg:rounded-t-[240px]"
              imageClassName="kala-settle"
            />
          </div>
        )}

        <div
          className={cn(
            "order-1 lg:order-2 lg:pb-6",
            hasPhoto ? "lg:col-span-7 lg:text-right" : "lg:col-span-12"
          )}
        >
          <m.p
            data-reveal
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_CINEMATIC }}
            className="flex items-center gap-4 text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep lg:justify-end"
          >
            {ABOUT_HERO.eyebrow}
            <m.span
              data-reveal
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.45, ease: EASE_CINEMATIC }}
              className="h-px w-12 origin-left bg-rose"
            />
          </m.p>
          <h1 className="mt-6 text-[44px] font-display font-semibold leading-[1.02] tracking-[0.01em] text-ink sm:text-[56px] lg:text-display">
            {ABOUT_HERO.words.map((word, index) => (
              <span key={word} className="block overflow-hidden pb-[0.08em]">
                <m.span
                  data-reveal
                  className="block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 1.1, delay: 0.3 + index * 0.14, ease: EASE_CINEMATIC }}
                >
                  {word}
                </m.span>
              </span>
            ))}
          </h1>
          <m.p
            data-reveal
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE_CINEMATIC }}
            className={cn("mt-8 max-w-md text-body text-ink-muted", hasPhoto && "lg:ml-auto")}
          >
            {ABOUT_HERO.text}
          </m.p>
        </div>
      </div>
    </section>
  );
}
