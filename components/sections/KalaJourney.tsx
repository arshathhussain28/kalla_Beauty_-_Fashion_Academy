import { JOURNEY_INTRO, JOURNEY_STAGES } from "@/data/journey";
import { ClosingBackdrop } from "@/components/sections/ClosingBackdrop";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { CurtainReveal, Reveal } from "@/components/ui/Reveal";
import { KalaJourneyPinned } from "@/components/sections/KalaJourneyPinned";
import { generalEnquiryWhatsAppLink } from "@/lib/whatsapp";

// One frame for all three stages (Craft, Confidence, Career) on the stacked layout: the same
// width, the same 4:3 shape and the same arch top, so the three read as a set and only the
// photographs differ. Each photograph's own crop point (`focus` in data/images.ts) is what keeps
// its people and hands in view at this shape. Deliberately not varied per stage — earlier each
// had a different size and offset, which read as uneven rather than designed.
const STAGE_FRAME = "aspect-[4/3] w-full rounded-t-[96px]";

// Mobile (<768px) and reduced-motion: a dedicated vertical story. No pinning, no
// horizontal scroll, shorter reveals — the same Craft → Confidence → Career sequence,
// recomposed for a thumb rather than shrunk from the desktop stage.
function KalaJourneyStatic() {
  return (
    <>
      <div className="mx-auto max-w-2xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
            {JOURNEY_INTRO.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 text-[40px] font-display font-semibold leading-[1.05] tracking-[0.01em] text-ink">
            {JOURNEY_INTRO.title}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 text-body text-ink-muted">{JOURNEY_INTRO.text}</p>
        </Reveal>
        <CurtainReveal className="mt-10 rounded-t-[160px]">
          <ImageSlot
            slot={JOURNEY_INTRO.slot}
            sizes="(min-width: 640px) 640px, 100vw"
            className="aspect-[4/5] w-full"
          />
        </CurtainReveal>

        {JOURNEY_STAGES.map((stage) => (
          <div key={stage.key} className="mt-24">
            <Reveal>
              <p className="flex items-center gap-4 text-eyebrow font-medium uppercase tracking-[0.24em]">
                <span className="text-rose-deep">{stage.number} / 03</span>
                <span className="h-px w-10 bg-rose" aria-hidden="true" />
              </p>
              <h3 className="mt-4 text-[40px] font-display font-semibold leading-[1.05] tracking-[0.01em] text-ink">
                {stage.title}
              </h3>
              <p className="mt-3 text-[22px] leading-snug text-ink">{stage.tagline}</p>
              <p className="mt-4 text-body text-ink-muted">{stage.copy}</p>
              <p className="mt-5 text-descriptor uppercase leading-[1.9] tracking-[0.3em] text-rose-deep">
                {stage.meta.join("  ·  ")}
              </p>
            </Reveal>
            <CurtainReveal className={`mt-8 ${STAGE_FRAME}`}>
              <ImageSlot
                slot={stage.slot}
                sizes="(min-width: 640px) 640px, 100vw"
                className="h-full w-full"
              />
            </CurtainReveal>
          </div>
        ))}
      </div>

      <KalaJourneyClosing />
    </>
  );
}

// The close of the stacked story, for phones and small tablets: the same picture and the same
// composition as desktop. The WHOLE photograph (ClosingBackdrop "whole") runs edge to edge at its
// natural 16:9 shape — both clusters of objects in full, left and right — and the words sit on top,
// in the middle of the picture, in a column scaled to that middle (about 58 % of the width, never
// more than 22rem) with the type sized down to match, exactly as the desktop words sit between the
// two sides. The block is a one-cell grid holding the picture and the words, so it is always at
// least as tall as the picture and as tall as the words need; when the words are taller than the
// picture the picture is centred, and the surface above and below it is the photograph's own
// background colour, which is also the block's background. A soft veil behind the words keeps them
// legible where they reach the clusters' faded inner edges.
function KalaJourneyClosing() {
  return (
    // #f5e6df is the photograph's background colour (median of its quiet centre) — an image
    // colour, not a brand token, so that the plain surface and the photograph are one
    <div className="mt-4 grid border-t border-border bg-[#f5e6df] text-center">
      <ClosingBackdrop variant="whole" className="self-center [grid-area:1/1]" />
      <div
        aria-hidden="true"
        className="pointer-events-none self-stretch [grid-area:1/1] bg-[radial-gradient(ellipse_54%_74%_at_center,rgba(245,230,223,0.94),rgba(245,230,223,0.7)_55%,rgba(245,230,223,0)_100%)]"
      />
      <div className="relative z-10 mx-auto w-[58%] min-w-[12.5rem] max-w-[22rem] self-center py-8 [grid-area:1/1] sm:py-10">
        <Reveal>
          {/* sized to the middle of the picture: 10px type on the narrowest phones, the brand eyebrow
              size from 480px */}
          <p className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.14em] text-wine min-[480px]:text-eyebrow min-[480px]:tracking-[0.24em]">
            Craft · Confidence · Career
          </p>
          <h3 className="mt-3 text-[32px] font-display font-semibold leading-[1.08] tracking-[0.01em] text-ink min-[480px]:mt-4 sm:text-[40px]">
            {/* always two lines: one line would run wider than the middle of the picture */}
            Craft Your
            <br />
            Confidence.
          </h3>
          <div className="mt-5 flex flex-col items-center gap-4 min-[480px]:mt-6">
            <Button
              href="/courses"
              variant="primary"
              className="px-5 text-[13px] min-[480px]:px-7 min-[480px]:text-button"
            >
              Explore Courses
            </Button>
            <ArrowLink href={generalEnquiryWhatsAppLink()} external>
              Talk to KALA
            </ArrowLink>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// "The KALA Journey" — the Craft → Confidence → Career idea as a story the visitor moves
// through, replacing three equal text columns. Two renderings of the same content,
// switched in CSS (see globals.css) so neither depends on a JS media query.
export function KalaJourney() {
  return (
    <section className="bg-cream">
      <KalaJourneyPinned />
      <div className="journey-static-wrap md:hidden">
        <KalaJourneyStatic />
      </div>
    </section>
  );
}
