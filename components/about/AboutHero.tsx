import type { CSSProperties } from "react";
import { ABOUT_HERO } from "@/data/about";
import { ImageSlot } from "@/components/ui/ImageSlot";

function delay(ms: number) {
  return { "--kala-delay": `${ms}ms` } as CSSProperties;
}

// The Why KALA cover, deliberately reversed: the arched photograph leads on the left and
// the three words stack on the right, each one arriving in turn — the brand idea in the
// order it is meant to be read. Pure-CSS entrance so it plays on first paint.
export function AboutHero() {
  return (
    <section className="bg-cream px-6 pb-20 pt-12 lg:px-12 lg:pb-28 lg:pt-20">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <ImageSlot
            slot={ABOUT_HERO.slot}
            priority
            sizes="(min-width: 1024px) 460px, 100vw"
            className="aspect-[4/5] w-full rounded-t-[200px] lg:rounded-t-[240px]"
            imageClassName="kala-settle"
          />
        </div>

        <div className="order-1 lg:order-2 lg:col-span-7 lg:pb-6 lg:text-right">
          <p
            className="kala-rise text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep"
            style={delay(150)}
          >
            {ABOUT_HERO.eyebrow}
          </p>
          <h1 className="mt-6 text-[44px] font-display font-semibold leading-[1.02] tracking-[0.01em] text-ink sm:text-[56px] lg:text-display">
            {ABOUT_HERO.words.map((word, index) => (
              <span key={word} className="kala-rise block" style={delay(350 + index * 220)}>
                {word}
              </span>
            ))}
          </h1>
          <p
            className="kala-rise mt-8 max-w-md text-body text-ink-muted lg:ml-auto"
            style={delay(1100)}
          >
            {ABOUT_HERO.text}
          </p>
        </div>
      </div>
    </section>
  );
}
