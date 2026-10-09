import { JOURNEY_INTRO, JOURNEY_STAGES } from "@/data/journey";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { CurtainReveal, Reveal } from "@/components/ui/Reveal";
import { KalaJourneyPinned } from "@/components/sections/KalaJourneyPinned";
import { generalEnquiryWhatsAppLink } from "@/lib/whatsapp";

// Per-stage crop and position for the mobile layout, so the three photographs differ in
// shape and alignment instead of repeating one card: full-bleed 4:3 → inset right 5:4 →
// inset left square arch. The middle frame is landscape (5:4) because its photograph —
// a trainer and a student with the work between them — needs both faces in view.
const MOBILE_IMAGE_STYLE = [
  "-mx-6 aspect-[4/3]",
  "mr-10 aspect-[5/4]",
  "ml-10 aspect-square rounded-t-[140px]",
] as const;

// Mobile (<768px) and reduced-motion: a dedicated vertical story. No pinning, no
// horizontal scroll, shorter reveals — the same Craft → Confidence → Career sequence,
// recomposed for a thumb rather than shrunk from the desktop stage.
function KalaJourneyStatic() {
  return (
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

      {JOURNEY_STAGES.map((stage, index) => (
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
          <CurtainReveal className={`mt-8 ${MOBILE_IMAGE_STYLE[index]}`}>
            <ImageSlot
              slot={stage.slot}
              sizes="(min-width: 640px) 640px, 100vw"
              className="h-full w-full"
            />
          </CurtainReveal>
        </div>
      ))}

      <div className="mt-24 border-t border-border pt-14 text-center">
        <Reveal>
          <p className="text-eyebrow font-medium uppercase tracking-[0.3em] text-rose-deep">
            Craft · Confidence · Career
          </p>
          <h3 className="mt-6 text-[40px] font-display font-semibold leading-[1.05] tracking-[0.01em] text-ink">
            Craft Your Confidence.
          </h3>
          <div className="mt-8 flex flex-col items-center gap-6">
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
