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
// • "band" (stacked phone / small-tablet layout) — a phone is too narrow to put objects either side
//   of the words, so the frame is turned a quarter-turn: one slice of the photograph (its upper half)
//   runs across the TOP of the block and the other (its lower half) across the BOTTOM, with the
//   words in the plain middle. The block's own background is the photograph's background colour,
//   so the middle and the photograph read as one surface and the words sit "on" the picture, just
//   as they do between the two sides on desktop. Each slice shows different objects (palette,
//   brushes, silk above; henna, scissors, tape below), so nothing repeats.
//
// Each piece fades to transparent toward the text (a mask), so the photograph melts into the
// page's cream, the join between halves can't show, and the text always sits on clean cream.
// Decorative: empty alt, hidden from assistive technology.
const FADE_LEFT =
  "[mask-image:linear-gradient(to_right,#000_46%,transparent)] [-webkit-mask-image:linear-gradient(to_right,#000_46%,transparent)]";
const FADE_RIGHT =
  "[mask-image:linear-gradient(to_left,#000_46%,transparent)] [-webkit-mask-image:linear-gradient(to_left,#000_46%,transparent)]";
// Each band is crisp at the block's outer edge and melts into the plain middle at its inner edge.
const FADE_DOWN =
  "[mask-image:linear-gradient(to_bottom,#000_52%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,#000_52%,transparent)]";
const FADE_UP =
  "[mask-image:linear-gradient(to_top,#000_52%,transparent)] [-webkit-mask-image:linear-gradient(to_top,#000_52%,transparent)]";

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
  edge = "top",
  className,
}: {
  variant?: "frame" | "band";
  /** For the band variant: which end of the block it fills. */
  edge?: "top" | "bottom";
  className?: string;
}) {
  if (variant === "band") {
    const top = edge === "top";
    return (
      <div aria-hidden="true" className={cn("pointer-events-none", className)}>
        <ImageSlot
          slot="journey-closing"
          sizes="100vw"
          // 3.5:1 across the full width = the photograph's upper (or lower) half exactly, with no
          // sideways crop; the height follows the width, so the bands scale with the screen
          className={cn("aspect-[3.5/1] w-full", top ? FADE_DOWN : FADE_UP)}
          imageClassName={top ? "object-top" : "object-bottom"}
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
