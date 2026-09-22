import { Scissors, Shirt, Sparkles, Layers } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

// Page hierarchy §16, item 4: "Student work — the evidence." Gallery spec (§16):
// masonry, 4px gutter, no captions. No student photography exists yet, so this is a
// tinted placeholder grid, ready to swap for real work the moment it's shot.
const PLACEHOLDER_TILES = [
  { icon: Sparkles, label: "Makeup" },
  { icon: Scissors, label: "Hair" },
  { icon: Shirt, label: "Fashion" },
  { icon: Layers, label: "Tailoring" },
] as const;

export function StudentWorkTeaser() {
  return (
    <section className="bg-cream px-6 py-16 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading eyebrow="Made at KALA" title="The Work" />

        <div className="mt-12 grid grid-cols-2 gap-1 sm:grid-cols-4">
          {PLACEHOLDER_TILES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex aspect-square flex-col items-center justify-center gap-2 bg-rose-light/40"
            >
              <Icon className="h-8 w-8 text-wine/50" strokeWidth={1.5} />
              <span className="text-small text-wine/60">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Button href="/the-work" variant="secondary">
            See the Work
          </Button>
        </div>
      </div>
    </section>
  );
}
