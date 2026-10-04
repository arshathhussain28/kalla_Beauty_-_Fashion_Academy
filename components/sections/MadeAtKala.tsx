import type { ImageSlotKey } from "@/data/images";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { CurtainReveal, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

function Tile({
  slot,
  className,
  delay = 0,
}: {
  slot: ImageSlotKey;
  className: string;
  delay?: number;
}) {
  return (
    <CurtainReveal delay={delay} className={className}>
      <ImageSlot
        slot={slot}
        sizes="(min-width: 768px) 66vw, 100vw"
        className="h-full w-full"
      />
    </CurtainReveal>
  );
}

// Moment 6 — "Made at KALA". Two mirrored rows, each one large frame beside a stack of
// two small ones, so image sizes alternate instead of tiling evenly. Brand gallery spec:
// 4px gutter, no captions. On desktop each row is aspect 2:1, so an 8-col frame and two
// stacked 4-col frames come out the same height without any fixed pixel values.
export function MadeAtKala() {
  return (
    <section className="bg-cream px-6 py-20 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <SectionHeading
            eyebrow="Made at KALA"
            title="Where learning becomes craft."
            description="Makeup, beauty, mehendi, saree styling and fashion — the work our students make."
          />
        </Reveal>

        <div className="mt-12 space-y-1 lg:mt-16">
          <div className="grid grid-cols-2 gap-1 md:aspect-[2/1] md:grid-cols-12 md:grid-rows-2">
            <Tile
              slot="made-makeup"
              className="col-span-2 aspect-[4/3] md:col-span-8 md:row-span-2 md:aspect-auto"
            />
            <Tile
              slot="made-fashion"
              delay={0.15}
              className="aspect-[4/5] md:col-span-4 md:aspect-auto"
            />
            <Tile
              slot="made-mehendi"
              delay={0.3}
              className="aspect-[4/5] md:col-span-4 md:aspect-auto"
            />
          </div>

          <div className="grid grid-cols-2 gap-1 md:aspect-[2/1] md:grid-cols-12 md:grid-rows-2">
            <Tile
              slot="made-beauty"
              className="aspect-[4/5] md:col-span-4 md:col-start-1 md:row-start-1 md:aspect-auto"
            />
            <Tile
              slot="made-student"
              delay={0.15}
              className="aspect-[4/5] md:col-span-4 md:col-start-1 md:row-start-2 md:aspect-auto"
            />
            <Tile
              slot="made-saree"
              delay={0.3}
              className="col-span-2 aspect-[4/3] md:col-span-8 md:col-start-5 md:row-span-2 md:row-start-1 md:aspect-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
