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
  /** "corner" tucks the placeholder label top-right, clear of overlaid headlines. */
  labelPosition?: "center" | "corner";
  className?: string;
  /** Applied to the photograph (or placeholder) itself — e.g. hover scale. */
  imageClassName?: string;
}

// Renders the registered photograph, or — until one exists — a clearly labelled
// placeholder. Callers size the slot via className (aspect ratio / height); the image
// always fills it with object-cover, so any photographed ratio works.
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
          role="img"
          aria-label={`Photograph pending: ${def.label}`}
          className={cn(
            "absolute inset-0 flex flex-col gap-2 px-6",
            labelPosition === "corner"
              ? "items-end justify-start pt-24 text-right"
              : "items-center justify-center text-center",
            tone === "dark"
              ? "bg-gradient-to-br from-wine-soft via-wine to-wine-deep"
              : "bg-gradient-to-b from-rose-light/60 to-cream-deep",
            imageClassName
          )}
        >
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
        </div>
      )}
    </div>
  );
}
