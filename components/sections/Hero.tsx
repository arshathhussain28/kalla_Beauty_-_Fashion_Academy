import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { generalEnquiryWhatsAppLink } from "@/lib/whatsapp";

// Moment 1 — cinematic reveal. Brand doc §16: full-bleed photo, wine scrim from the
// bottom, 70vh (never 100vh). The photograph settles from 1.08 → 1 while the type
// arrives in sequence: label → headline → supporting line → actions. All CSS (see
// .kala-rise / .kala-settle in globals.css), so it plays on first paint and costs no JS.
function delay(ms: number) {
  return { "--kala-delay": `${ms}ms` } as CSSProperties;
}

export function Hero() {
  return (
    <section className="relative flex h-[70vh] min-h-[560px] items-end overflow-hidden bg-wine-deep">
      {/* Below lg the headline block sits low over a narrow slice of a very wide photograph.
          To keep the founder's whole face above the text, the image is held to the top 65% of
          the section and faded into the wine ground beneath it (the bottom scrim below takes
          over from there). From lg up it fills the section. */}
      <div className="kala-settle absolute inset-x-0 top-0 h-[65%] [mask-image:linear-gradient(to_bottom,#000_70%,transparent)] lg:inset-0 lg:h-auto lg:[mask-image:none]">
        <ImageSlot
          slot="hero-founder"
          tone="dark"
          labelPosition="corner"
          sizes="100vw"
          priority
          className="h-full w-full"
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-wine-deep via-wine-deep/45 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-16 lg:px-12 lg:pb-24">
        <div className="max-w-2xl">
          <p
            className="kala-rise text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-light"
            style={delay(200)}
          >
            KALA · Beauty &amp; Fashion Academy
          </p>
          <h1
            className="kala-rise mt-4 text-[40px] font-display font-semibold leading-[1.05] tracking-[0.01em] text-cream lg:text-display"
            style={delay(450)}
          >
            Craft Your
            <br />
            Confidence
          </h1>
          <p className="kala-rise mt-5 max-w-md text-body text-cream/85" style={delay(800)}>
            Professional beauty &amp; fashion education built around practical skill,
            confidence and career opportunity.
          </p>
          <div
            className="kala-rise mt-8 flex flex-wrap items-center gap-x-8 gap-y-4"
            style={delay(1050)}
          >
            <Button href="/courses" variant="inverse">
              Explore Courses
            </Button>
            <ArrowLink href={generalEnquiryWhatsAppLink()} tone="cream" external>
              Talk to a Course Advisor
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
