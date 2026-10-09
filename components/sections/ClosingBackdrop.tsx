import { ImageSlot } from "@/components/ui/ImageSlot";
import { cn } from "@/lib/utils";

// The backdrop for the "Craft Your Confidence." close. The photograph is a 16:9 flat lay whose
// objects sit in the outer thirds with a plain middle, and it is drawn two ways so the same
// picture — both clusters, in full — works on every screen:
//
// • "frame" (pinned stage on desktop and landscape tablets) — TWO halves rather than one stretched
//   picture: the left half shows the image anchored to its left edge, the right half anchored to its
//   right edge, each scaled to the stage's height. On a wide screen the halves meet to show the
//   whole photograph; on a slightly squarer one each side still shows its own cluster.
//
// • "whole" (stacked phone / small-tablet layout, and the pinned stage when the screen is upright)
//   — the ENTIRE photograph at its natural 16:9 shape, edge to edge, centred in a block that is
//   taller than it. Both clusters are shown in full, exactly as on desktop; the extra height above
//   and below is the photograph's own background colour (the block is painted with it), so the two
//   read as one surface. A horizontal mask fades each cluster's inner edge into the plain middle and
//   a vertical mask dissolves the picture's top and bottom edges into the surface, so the words sit
//   in the middle of the picture just as they do between the two sides on desktop.
//
// Decorative: empty alt, hidden from assistive technology.
const FADE_LEFT =
  "[mask-image:linear-gradient(to_right,#000_46%,transparent)] [-webkit-mask-image:linear-gradient(to_right,#000_46%,transparent)]";
const FADE_RIGHT =
  "[mask-image:linear-gradient(to_left,#000_46%,transparent)] [-webkit-mask-image:linear-gradient(to_left,#000_46%,transparent)]";

// "whole": the plain middle (36–64 % of the width) is masked out entirely — it is the same colour as
// the surface behind it — and each cluster fades over its inner 16 % so no hard edge shows.
const WHOLE_FADE_SIDES =
  "[mask-image:linear-gradient(to_right,#000_20%,transparent_36%,transparent_64%,#000_80%)] [-webkit-mask-image:linear-gradient(to_right,#000_20%,transparent_36%,transparent_64%,#000_80%)]";
const WHOLE_FADE_EDGES =
  "[mask-image:linear-gradient(to_bottom,transparent,#000_9%,#000_91%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_9%,#000_91%,transparent)]";

// A tablet held sideways (viewport between 1:1 and 3:2, e.g. iPad 4:3) is much taller for its width
// than a laptop, so the photograph is scaled up and its objects would crowd the headline. There each
// side takes 40% of the width instead of 50%, which keeps both clusters clear of the words.
const NARROW = "[@media(min-aspect-ratio:1/1)_and_(max-aspect-ratio:3/2)]:w-[40%]";

// `sizes` is not the visible frame's width for the halves: the photograph is scaled to the
// frame's HEIGHT, so it is painted far wider than the half that shows it (about 1500 px on a
// laptop). ImageSlot doubles whatever it is given, so these values are half the real painted
// width — the optimiser then serves enough pixels instead of a stretched small file.
const FRAME_SIZES = "(min-width: 1536px) 960px, 800px";

export function ClosingBackdrop({
  variant = "frame",
  className,
}: {
  variant?: "frame" | "whole";
  className?: string;
}) {
  if (variant === "whole") {
    return (
      <div aria-hidden="true" className={cn("pointer-events-none", className)}>
        <div className={cn("w-full", WHOLE_FADE_EDGES)}>
          <ImageSlot
            slot="journey-closing"
            sizes="100vw"
            // aspect-video is the photograph's own shape, so nothing is cropped; the height follows
            // the width and the picture scales with the screen
            className={cn("aspect-video w-full", WHOLE_FADE_SIDES)}
          />
        </div>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      <ImageSlot
        slot="journey-closing"
        sizes={FRAME_SIZES}
        className={cn("absolute inset-y-0 left-0 w-1/2", NARROW, FADE_LEFT)}
        imageClassName="object-left"
      />
      <ImageSlot
        slot="journey-closing"
        sizes={FRAME_SIZES}
        className={cn("absolute inset-y-0 right-0 w-1/2", NARROW, FADE_RIGHT)}
        imageClassName="object-right"
      />
    </div>
  );
}
