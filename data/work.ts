/**
 * The Work page content. Chapter lines and caption techniques come straight from the
 * curriculum in data/courses.ts — they name what each course teaches, not claims about any
 * individual student or result. Captions are the craft plus the technique shown; swap in
 * real ones when the photographs arrive (the slots live in data/images.ts).
 */
import type { CourseCategory } from "@/data/courses";
import type { ImageSlotKey } from "@/data/images";

export const WORK_HERO = {
  eyebrow: "Made at KALA",
  title: "The Work",
  text: "Where practice becomes something you can be proud of.",
};

export type WorkLayout = "lead-left" | "lead-right" | "wide-top" | "staircase" | "centred";

export interface WorkFrame {
  slot: ImageSlotKey;
  caption: string;
}

export interface WorkChapterData {
  category: CourseCategory;
  courseSlug: string;
  line: string;
  layout: WorkLayout;
  frames: readonly [WorkFrame, WorkFrame, WorkFrame];
}

// Five chapters, five different compositions — the gallery never tiles the same way twice.
export const WORK_CHAPTERS: WorkChapterData[] = [
  {
    category: "makeup",
    courseSlug: "advanced-makeup-artist",
    line: "Skin preparation, HD and airbrush finishes, bridal and occasion looks.",
    layout: "lead-left",
    frames: [
      { slot: "work-makeup-1", caption: "Bridal makeup" },
      { slot: "work-makeup-2", caption: "Eyes & lashes" },
      { slot: "work-makeup-3", caption: "HD & airbrush" },
    ],
  },
  {
    category: "beauty",
    courseSlug: "advanced-beautician",
    line: "Facials, threading, waxing, hair spa and colour — salon fundamentals for real client work.",
    layout: "lead-right",
    frames: [
      { slot: "work-beauty-1", caption: "Facial & skin care" },
      { slot: "work-beauty-2", caption: "Threading & brow shaping" },
      { slot: "work-beauty-3", caption: "Hair spa & colour" },
    ],
  },
  {
    category: "mehendi",
    courseSlug: "advanced-mehendi-artist",
    line: "From foundational strokes to full-hand bridal design.",
    layout: "wide-top",
    frames: [
      { slot: "work-mehendi-1", caption: "Full-hand bridal design" },
      { slot: "work-mehendi-2", caption: "Floral & mandala detail" },
      { slot: "work-mehendi-3", caption: "Cone handling" },
    ],
  },
  {
    category: "saree",
    courseSlug: "advanced-saree-pleating-draping",
    line: "Pleating, draping and the finishing details of professional styling.",
    layout: "staircase",
    frames: [
      { slot: "work-saree-1", caption: "Bridal saree draping" },
      { slot: "work-saree-2", caption: "Pleating" },
      { slot: "work-saree-3", caption: "Pinning & finishing" },
    ],
  },
  {
    category: "fashion",
    courseSlug: "advanced-tailoring-fashion-design",
    line: "Measurement, pattern making, and blouse and garment construction.",
    layout: "centred",
    frames: [
      { slot: "work-fashion-1", caption: "Blouse construction" },
      { slot: "work-fashion-2", caption: "Stitching detail" },
      { slot: "work-fashion-3", caption: "Pattern & cutting" },
    ],
  },
];

export const WORK_WIDE = {
  slot: "work-wide" as ImageSlotKey,
  label: "Student projects",
  caption: "Practice, made visible.",
};
