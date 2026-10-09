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

// The close of the stacked story, for phones and small tablets. A sibling of the story column — not
// inside it — so the photograph runs truly edge to edge at every width (inside the centred
// 672 px column it floated between cream margins on a small tablet). The flat lay is shown whole,
// as a band ABOVE the words rather than behind them: a phone is too narrow to set a two-line
// headline between two clusters of objects without the type landing on top of them. The band
// fades out at the bottom into the cream the words sit on.
function KalaJourneyClosing() {
  return (
    <div className="mt-4 border-t border-border text-center">
      <ClosingBackdrop variant="banner" />
      <div className="mx-auto max-w-2xl px-6 pb-24 pt-5 sm:pt-8">
        <Reveal>
          {/* tighter tracking on the narrowest phones so the line stays on one row at 320 px */}
          <p className="text-eyebrow font-medium uppercase tracking-[0.18em] text-wine min-[400px]:tracking-[0.3em]">
            Craft · Confidence · Career
          </p>
          <h3 className="mt-5 text-[40px] font-display font-semibold leading-[1.05] tracking-[0.01em] text-ink sm:mt-6 sm:text-[48px]">
            Craft Your Confidence.
          </h3>
          <div className="mt-8 flex flex-col items-center gap-6 sm:mt-10 sm:flex-row sm:justify-center sm:gap-x-10">
            <Button href="/courses" variant="primary">
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
