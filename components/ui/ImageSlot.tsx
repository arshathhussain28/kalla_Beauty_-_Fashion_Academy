import Image from "next/image";
import { imageSlots, type ImageSlotKey } from "@/data/images";
import { cn } from "@/lib/utils";

interface ImageSlotProps {
  slot: ImageSlotKey;
  /** Describe the *frame's* rendered width at each breakpoint (scaled up internally for cover crops). */
  sizes: string;
  priority?: boolean;
  /** "dark" for placeholders that sit on wine fields. */
  tone?: "light" | "dark";
  /** "corner" tucks the shot-brief label top-right, clear of overlaid headlines. */
  labelPosition?: "center" | "corner";
  className?: string;
  /** Applied to the photograph (or placeholder) itself — e.g. hover scale. */
  imageClassName?: string;
}

// While a slot has no photograph, a visitor sees a calm blush frame with a faint KALA
// monogram — nothing that reads as unfinished. The shot brief (the slot's `label`) is for
// the team, so it only renders in development, or on a review deployment that sets
// NEXT_PUBLIC_SHOW_PHOTO_BRIEFS=true. Production never shows it.
const SHOW_BRIEFS =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_PHOTO_BRIEFS === "true";

// With object-cover the browser sizes the <img> to its frame but paints the photograph larger
// than that — a 16:9 photo in a 4:5 frame is drawn about 2.2× the frame's width, and the part
// that shows is a crop of it. Asking next/image for "the frame's width" therefore returns an
// image too small for what is painted, and it comes out soft (measured: a 798 px frame was
// being served an 806 px-wide file for a ~1265 px-wide painting). The caller's `sizes` hint is
// scaled up so the optimizer serves enough pixels; vw values are capped at 100vw, so
// full-bleed images are unchanged. Only each entry's trailing size is scaled, never its media
// condition.
const COVER_FACTOR = 2;

function coverSizes(sizes: string): string {
  return sizes
    .split(",")
    .map((entry) =>
      entry.trim().replace(/(\d+(?:\.\d+)?)(px|vw)$/, (_, value: string, unit: string) => {
        const scaled = Number(value) * COVER_FACTOR;
        return unit === "vw" ? `${Math.min(100, Math.round(scaled))}vw` : `${Math.round(scaled)}px`;
      })
    )
    .join(", ");
}

// Renders the registered photograph, or — until one exists — the placeholder above.
// Callers size the slot via className (aspect ratio / height); the image always fills it
// with object-cover, so any photographed ratio works.
export function ImageSlot({
  slot,
  sizes,
  priority = false,
  tone = "light",
  labelPosition = "center",
  className,
  imageClassName,
}: ImageSlotProps) {
  const def = imageSlots[slot];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {def.src ? (
        <Image
          src={def.src}
          alt={def.alt}
          fill
          sizes={coverSizes(sizes)}
          priority={priority}
          style={def.focus ? { objectPosition: def.focus } : undefined}
          className={cn("object-cover", imageClassName)}
        />
      ) : (
        <div
          {...(SHOW_BRIEFS
            ? { role: "img", "aria-label": `Photograph pending: ${def.label}` }
            : { "aria-hidden": true })}
          className={cn(
            "absolute inset-0 flex flex-col gap-2 px-6",
            SHOW_BRIEFS && labelPosition === "corner"
              ? "items-end justify-start pt-24 text-right"
              : "items-center justify-center text-center",
            tone === "dark"
              ? "bg-gradient-to-br from-wine-soft via-wine to-wine-deep"
              : "bg-gradient-to-b from-rose-light/60 to-cream-deep",
            imageClassName
          )}
        >
          {SHOW_BRIEFS ? (
            <>
              <span
                className={cn(
                  "text-descriptor uppercase tracking-[0.3em]",
                  tone === "dark" ? "text-rose-light/80" : "text-rose-deep"
                )}
              >
                Photography pending
              </span>
              <span
                className={cn(
                  "max-w-[28ch] text-small",
                  tone === "dark" ? "text-cream/60" : "text-wine/60"
                )}
              >
                {def.label}
              </span>
            </>
          ) : (
            tone === "light" && (
              <Image
                src="/brand/kala-icon.jpg?v=3"
                alt=""
                width={944}
                height={944}
                sizes="72px"
                className="h-16 w-auto opacity-[0.13] mix-blend-multiply"
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
