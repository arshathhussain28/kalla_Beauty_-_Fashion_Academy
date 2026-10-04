import { WORK_WIDE } from "@/data/work";
import { ClipReveal } from "@/components/editorial/ClipReveal";
import { Parallax } from "@/components/editorial/Parallax";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/ui/Reveal";

// The pause in the middle of the gallery: one full-bleed wide frame, edge to edge, with a
// single line beneath it. After three dense chapters it lets the page breathe before the
// last two.
export function WorkWide() {
  return (
    <section className="bg-cream pb-16 pt-16 lg:pb-24 lg:pt-24">
      <ClipReveal className="aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
        <Parallax className="h-full w-full" amount={6}>
          <ImageSlot slot={WORK_WIDE.slot} sizes="100vw" className="h-full w-full" />
        </Parallax>
      </ClipReveal>
      <Reveal className="mx-auto mt-5 flex max-w-[1200px] items-baseline justify-between gap-6 px-6 lg:px-12">
        <span className="text-descriptor uppercase tracking-[0.3em] text-rose-deep">
          {WORK_WIDE.label}
        </span>
        <span className="font-display text-h3 text-ink">{WORK_WIDE.caption}</span>
      </Reveal>
    </section>
  );
}
