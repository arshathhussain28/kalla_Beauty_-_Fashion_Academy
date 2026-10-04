import Image from "next/image";
import { imageSlots, type ImageSlotKey } from "@/data/images";
import { cn } from "@/lib/utils";

interface ImageSlotProps {
  slot: ImageSlotKey;
  /** Passed straight to next/image — describe the rendered width at each breakpoint. */
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
          sizes={sizes}
          priority={priority}
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
