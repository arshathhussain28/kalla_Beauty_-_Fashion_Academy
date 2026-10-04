import type { CSSProperties } from "react";
import { WHY_HERO } from "@/data/why-kala";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";

function delay(ms: number) {
  return { "--kala-delay": `${ms}ms` } as CSSProperties;
}

// An editorial cover: the headline as architecture on the left, one arched photograph on
// the right (the arch is the brand's single soft shape). Pure-CSS entrance so it plays on
// first paint, same as the homepage hero.
export function WhyHero() {
  return (
    <section className="bg-cream px-6 pb-20 pt-12 lg:px-12 lg:pb-28 lg:pt-20">
      <div className="mx-auto grid max-w-[1200px] items-end gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7 lg:pb-6">
          <p
            className="kala-rise text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep"
            style={delay(150)}
          >
            {WHY_HERO.eyebrow}
          </p>
          <h1 className="mt-6 text-[44px] font-display font-semibold leading-[1.02] tracking-[0.01em] text-ink sm:text-[56px] lg:text-display">
            {WHY_HERO.title.map((line, index) => (
              <span
                key={line}
                className="kala-rise block"
                style={delay(350 + index * 200)}
              >
                {line}
              </span>
            ))}
          </h1>
          <p className="kala-rise mt-8 max-w-md text-body text-ink-muted" style={delay(1000)}>
            {WHY_HERO.text}
          </p>
          <div
            className="kala-rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            style={delay(1250)}
          >
            <Button href="#approach" variant="primary">
              Explore the KALA Approach
            </Button>
            <ArrowLink href="/courses">Explore Courses</ArrowLink>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <ImageSlot
            slot="why-hero"
            priority
            sizes="(min-width: 1024px) 460px, 100vw"
            className="aspect-[4/5] w-full rounded-t-[200px] lg:rounded-t-[240px]"
            imageClassName="kala-settle"
          />
          <span
            aria-hidden="true"
            className="absolute -left-4 bottom-10 hidden h-px w-24 bg-rose lg:block"
          />
        </div>
      </div>
    </section>
  );
}
