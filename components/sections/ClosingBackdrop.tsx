import { ImageSlot } from "@/components/ui/ImageSlot";
import { cn } from "@/lib/utils";

// The backdrop for the "Craft Your Confidence." close. The photograph is a flat lay whose
// objects sit in the outer thirds with a plain middle, and it is used two ways:
//
// • "frame" (pinned desktop / tablet stage) — drawn as TWO halves rather than one stretched
//   picture: the left half shows the image anchored to its left edge, the right half anchored to
//   its right edge. At 16:9 the halves meet to show the whole photograph; on any other shape (an
//   iPad held upright, an ultrawide) each side still shows its own cluster of objects and the
//   plain middle is just wider or narrower. A single `object-cover` image would crop to the empty
//   centre on narrow screens and show no objects at all.
//
// • "banner" (stacked phone layout) — a phone is too narrow to put objects either side of a
//   two-line headline without the type landing on top of them, so there the whole photograph is
//   shown as a 16:9 band ABOVE the text and fades into the cream beneath it.
//
// Each piece fades to transparent toward the text (a mask), so the photograph melts into the
// page's cream, the join between halves can't show, and the text always sits on clean cream.
// Decorative: empty alt, hidden from assistive technology.
const FADE_LEFT =
  "[mask-image:linear-gradient(to_right,#000_46%,transparent)] [-webkit-mask-image:linear-gradient(to_right,#000_46%,transparent)]";
const FADE_RIGHT =
  "[mask-image:linear-gradient(to_left,#000_46%,transparent)] [-webkit-mask-image:linear-gradient(to_left,#000_46%,transparent)]";
// Bottom fade only: the band starts crisp under the section's hairline and melts into the cream below.
const FADE_BOTTOM =
  "[mask-image:linear-gradient(to_bottom,#000_62%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,#000_62%,transparent)]";

// A tablet held sideways (viewport between 1:1 and 3:2, e.g. iPad 4:3) is much taller for its width
// than a laptop, so the photograph is scaled up and its objects would crowd the headline. There each
// side takes 40% of the width instead of 50%, which keeps both clusters clear of the words.
const NARROW_LEFT = "[@media(min-aspect-ratio:1/1)_and_(max-aspect-ratio:3/2)]:w-[40%]";
const NARROW_RIGHT = "[@media(min-aspect-ratio:1/1)_and_(max-aspect-ratio:3/2)]:w-[40%]";

// `sizes` is not the visible frame's width for the halves: the photograph is scaled to the
// frame's HEIGHT, so it is painted far wider than the half that shows it (about 1500 px on a
// laptop). ImageSlot doubles whatever it is given, so these values are half the real painted
// width — the optimiser then serves enough pixels instead of a stretched small file.
const FRAME_SIZES = "(min-width: 1536px) 960px, 800px";

export function ClosingBackdrop({
  variant = "frame",
  className,
}: {
  variant?: "frame" | "banner";
  className?: string;
}) {
  if (variant === "banner") {
    return (
      <div aria-hidden="true" className={cn("pointer-events-none", className)}>
        <ImageSlot
          slot="journey-closing"
          sizes="100vw"
          // 16:9 shows the whole photograph; from 480 px a 2:1 crop keeps the band from towering over the
          // words on a tablet while trimming only 11 % off the top and bottom
          className={cn("aspect-video w-full min-[480px]:aspect-[2/1]", FADE_BOTTOM)}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0",
        // A screen held upright (an iPad, a rotated monitor) is far taller than wide; the photograph
        // would be scaled up to that height and its objects would swamp the headline. There it
        // becomes a band across the top 44% that fades into the cream the text sits on.
        "portrait:bottom-auto portrait:h-[44%]",
        "portrait:[mask-image:linear-gradient(to_bottom,#000_55%,transparent)] portrait:[-webkit-mask-image:linear-gradient(to_bottom,#000_55%,transparent)]",
        className
      )}
    >
      <ImageSlot
        slot="journey-closing"
        sizes={FRAME_SIZES}
        className={cn("absolute inset-y-0 left-0 w-1/2", NARROW_LEFT, FADE_LEFT)}
        imageClassName="object-left"
      />
      <ImageSlot
        slot="journey-closing"
        sizes={FRAME_SIZES}
        className={cn("absolute inset-y-0 right-0 w-1/2", NARROW_RIGHT, FADE_RIGHT)}
        imageClassName="object-right"
      />
    </div>
  );
}
