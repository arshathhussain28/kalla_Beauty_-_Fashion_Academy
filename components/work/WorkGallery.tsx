"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { CATEGORY_LABELS, type CourseCategory } from "@/data/courses";
import { imageSlots, type ImageSlotKey } from "@/data/images";
import { WORK_CHAPTERS } from "@/data/work";
import { Lightbox, type LightboxItem } from "@/components/work/Lightbox";
import { WorkChapter } from "@/components/work/WorkChapter";
import { WorkWide } from "@/components/work/WorkWide";
import { cn } from "@/lib/utils";

type Filter = "all" | CourseCategory;

// cream hero → white → cream → white → [cream wide frame] → white → cream.
const ALL_TONES = ["white", "cream", "white", "white", "cream"] as const;

// The gallery: a sticky craft filter, the five chapters (or one, when filtered), the
// full-bleed pause between them, and the lightbox. State lives here so the filter, the
// chapters and the viewer share one list of what is currently on screen.
export function WorkGallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(
    () =>
      WORK_CHAPTERS.map((chapter, index) => ({ chapter, index })).filter(
        ({ chapter }) => filter === "all" || chapter.category === filter
      ),
    [filter]
  );

  // Photographs that actually exist, in reading order — what the viewer can step through.
  const items = useMemo<LightboxItem[]>(
    () =>
      visible.flatMap(({ chapter }) =>
        chapter.frames
          .filter((frame) => imageSlots[frame.slot].src)
          .map((frame) => ({
            slot: frame.slot,
            label: CATEGORY_LABELS[chapter.category],
            caption: frame.caption,
          }))
      ),
    [visible]
  );

  const openSlot = useCallback(
    (slot: ImageSlotKey) => {
      const index = items.findIndex((item) => item.slot === slot);
      if (index >= 0) setOpenIndex(index);
    },
    [items]
  );

  function chooseFilter(next: Filter) {
    setFilter(next);
    // If the reader is already down in the gallery, bring them back to the top of the new
    // selection instead of leaving them stranded below a shorter page.
    const top = topRef.current;
    if (top) {
      const target = top.getBoundingClientRect().top + window.scrollY - 72;
      if (window.scrollY > target) window.scrollTo({ top: target, behavior: "auto" });
    }
  }

  const options: { value: Filter; label: string }[] = [
    { value: "all", label: "All" },
    ...WORK_CHAPTERS.map((chapter) => ({
      value: chapter.category as Filter,
      label: CATEGORY_LABELS[chapter.category],
    })),
  ];

  return (
    <div ref={topRef}>
      <div className="sticky top-[72px] z-30 border-y border-border bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center gap-6 overflow-x-auto px-6 lg:px-12">
          <p className="hidden shrink-0 text-descriptor uppercase tracking-[0.3em] text-rose-deep sm:block">
            Browse by craft
          </p>
          <div role="group" aria-label="Filter by craft" className="flex">
            {options.map((option) => {
              const active = filter === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => chooseFilter(option.value)}
                  className={cn(
                    "relative h-12 shrink-0 px-4 text-[13px] font-medium uppercase tracking-[0.16em] transition-colors",
                    active ? "text-wine" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {option.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-4 bottom-0 h-px origin-left bg-wine transition-transform duration-500 ease-out",
                      active ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div key={filter}>
        {visible.map(({ chapter, index }, position) => (
          <div key={chapter.category}>
            <WorkChapter
              chapter={chapter}
              index={index}
              total={WORK_CHAPTERS.length}
              tone={filter === "all" ? ALL_TONES[index] : position % 2 === 0 ? "white" : "cream"}
              onOpen={openSlot}
            />
            {filter === "all" && index === 2 && <WorkWide />}
          </div>
        ))}
      </div>

      <Lightbox
        items={items}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </div>
  );
}
