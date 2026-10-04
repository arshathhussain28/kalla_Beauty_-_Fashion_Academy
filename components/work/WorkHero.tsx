import type { CSSProperties } from "react";
import { WORK_HERO } from "@/data/work";

function delay(ms: number) {
  return { "--kala-delay": `${ms}ms` } as CSSProperties;
}

// Typography as architecture: the title carries the page. No image up here on purpose —
// the gallery below is where the page earns it, and the craft filter that follows is the
// way in.
export function WorkHero() {
  return (
    <section className="bg-cream px-6 pb-14 pt-14 lg:px-12 lg:pb-20 lg:pt-24">
      <div className="mx-auto max-w-[1200px]">
        <p
          className="kala-rise text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep"
          style={delay(150)}
        >
          {WORK_HERO.eyebrow}
        </p>
        <h1
          className="kala-rise mt-6 text-[56px] font-display font-semibold leading-[0.98] tracking-[0.01em] text-ink sm:text-[72px] lg:text-[96px]"
          style={delay(350)}
        >
          {WORK_HERO.title}
        </h1>
        <p className="kala-rise mt-8 max-w-md text-h3 text-ink-muted" style={delay(750)}>
          {WORK_HERO.text}
        </p>
      </div>
    </section>
  );
}
