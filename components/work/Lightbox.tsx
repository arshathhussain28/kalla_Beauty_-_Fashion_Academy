"use client";

import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { imageSlots, type ImageSlotKey } from "@/data/images";
import { EASE_CINEMATIC } from "@/lib/motion";

export interface LightboxItem {
  slot: ImageSlotKey;
  label: string;
  caption: string;
}

interface LightboxProps {
  items: LightboxItem[];
  /** Index into `items`, or null when closed. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

// A full-screen viewer for the gallery: Escape closes, ← / → step through, focus moves
// into the dialog and returns to wherever it came from, and the page behind is frozen.
// It only ever opens for photographs that exist (see WorkChapter), so there is no empty
// state to design for.
export function Lightbox({ items, index, onClose, onIndexChange }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;

  const step = useCallback(
    (direction: 1 | -1) => {
      if (index === null || items.length < 2) return;
      onIndexChange((index + direction + items.length) % items.length);
    },
    [index, items.length, onIndexChange]
  );

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, step]);

  const item = index !== null ? items[index] : null;
  const def = item ? imageSlots[item.slot] : null;

  return (
    <AnimatePresence>
      {item && def?.src && (
        <m.div
          role="dialog"
          aria-modal="true"
          aria-label={`${item.label}: ${item.caption}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_CINEMATIC }}
          className="fixed inset-0 z-[80] flex flex-col bg-wine-deep/95 text-cream backdrop-blur-sm"
          onClick={onClose}
        >
          <div className="flex shrink-0 items-center justify-between px-6 py-4 lg:px-12">
            <p className="text-descriptor uppercase tracking-[0.3em] text-rose-light">
              {String((index ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="-mr-2 flex h-11 items-center gap-3 px-2 text-[13px] font-medium uppercase tracking-[0.18em] hover:text-rose-light"
              aria-label="Close viewer"
            >
              Close
              <span aria-hidden="true" className="relative block h-5 w-5">
                <span className="absolute left-0 top-1/2 h-px w-5 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-5 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <div className="relative min-h-0 flex-1 px-6 lg:px-24">
            <m.div
              key={item.slot}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE_CINEMATIC }}
              className="relative h-full w-full"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={def.src}
                alt={def.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </m.div>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Previous photograph"
                  className="absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-[22px] hover:text-rose-light lg:left-8"
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    step(1);
                  }}
                  aria-label="Next photograph"
                  className="absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-[22px] hover:text-rose-light lg:right-8"
                >
                  <span aria-hidden="true">→</span>
                </button>
              </>
            )}
          </div>

          <div className="shrink-0 px-6 py-5 text-center lg:px-12">
            <p className="text-descriptor uppercase tracking-[0.3em] text-rose-light">
              {item.label}
            </p>
            <p className="mt-1 font-display text-h3">{item.caption}</p>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
