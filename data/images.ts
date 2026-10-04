/**
 * Photography registry — the single place to wire a real photograph into the site.
 *
 * No real KALA photography exists yet, and the brand system is explicit that stock
 * imagery must not stand in for it. Every slot therefore ships with `src: null`,
 * which renders a clearly labelled placeholder (see components/ui/ImageSlot.tsx).
 *
 * To go live with a photo: drop the file in /public/images/, set `src` here, and
 * rewrite `alt` to describe what the photograph actually shows. Nothing else changes —
 * every section reads from this registry, and `object-cover` handles any aspect ratio.
 *
 * `label` doubles as the shot brief for the photographer: what this slot needs.
 */
import type { CourseCategory } from "@/data/courses";

export type ImageSlotKey =
  | "hero-founder"
  | "journey-intro"
  | "journey-craft"
  | "journey-confidence"
  | "journey-career"
  | `craft-${CourseCategory}`
  | "story-classroom"
  | "made-makeup"
  | "made-beauty"
  | "made-mehendi"
  | "made-saree"
  | "made-fashion"
  | "made-student"
  | "work-1"
  | "work-2"
  | "work-3"
  | "trainer-1"
  | "trainer-2"
  | "trainer-3";

export interface ImageSlotDef {
  src: string | null;
  alt: string;
  label: string;
}

export const imageSlots: Record<ImageSlotKey, ImageSlotDef> = {
  "hero-founder": {
    src: null,
    alt: "The KALA founder in the academy",
    label: "Hero — founder portrait, dark neutral background, negative space left",
  },
  "journey-intro": {
    src: null,
    alt: "A KALA student absorbed in her work",
    label: "Journey · intro — a student practising, natural light, cinematic and unposed",
  },
  "journey-craft": {
    src: null,
    alt: "A student's hands at work",
    label: "Journey · Craft — hands at work: brush, needle, cone or pleats, tight crop",
  },
  "journey-confidence": {
    src: null,
    alt: "A KALA trainer guiding a student",
    label: "Journey · Confidence — trainer and student together, guidance in progress",
  },
  "journey-career": {
    src: null,
    alt: "A student presenting her finished work",
    label: "Journey · Career — a finished look, garment or drape, presented with pride",
  },
  "craft-makeup": {
    src: null,
    alt: "A KALA student applying makeup",
    label: "Makeup — trainer or student at work, close and natural",
  },
  "craft-beauty": {
    src: null,
    alt: "A KALA student giving a facial",
    label: "Beauty — facial, threading or hair care in progress",
  },
  "craft-mehendi": {
    src: null,
    alt: "A KALA student applying bridal mehendi",
    label: "Mehendi — hands, cone work, an intricate bridal design",
  },
  "craft-saree": {
    src: null,
    alt: "A KALA student pleating and draping a saree",
    label: "Saree — hands arranging pleats, bridal draping",
  },
  "craft-fashion": {
    src: null,
    alt: "A KALA student cutting and stitching fabric",
    label: "Fashion — measuring, cutting, sewing a blouse",
  },
  "story-classroom": {
    src: null,
    alt: "A KALA trainer correcting a student's technique",
    label: "Method — trainer correcting a student, hands in frame",
  },
  "made-makeup": {
    src: null,
    alt: "Finished makeup by a KALA student",
    label: "Made at KALA — a finished makeup look (large)",
  },
  "made-beauty": {
    src: null,
    alt: "Beauty work by a KALA student",
    label: "Made at KALA — skin or hair work (detail)",
  },
  "made-mehendi": {
    src: null,
    alt: "Mehendi by a KALA student",
    label: "Made at KALA — finished mehendi hand (detail)",
  },
  "made-saree": {
    src: null,
    alt: "A saree draped by a KALA student",
    label: "Made at KALA — a finished saree drape (large)",
  },
  "made-fashion": {
    src: null,
    alt: "A garment stitched by a KALA student",
    label: "Made at KALA — a finished garment (detail)",
  },
  "made-student": {
    src: null,
    alt: "A KALA student with her finished work",
    label: "Made at KALA — a student with her work (detail)",
  },
  "work-1": {
    src: null,
    alt: "Student work from this course",
    label: "Student work — a finished piece from this course",
  },
  "work-2": {
    src: null,
    alt: "Student work in progress",
    label: "Student work — the process, mid-task",
  },
  "work-3": {
    src: null,
    alt: "A close detail of student work",
    label: "Student work — a close detail shot",
  },
  "trainer-1": {
    src: null,
    alt: "A KALA trainer",
    label: "Trainer portrait — environmental, in the academy",
  },
  "trainer-2": {
    src: null,
    alt: "A KALA trainer",
    label: "Trainer portrait — environmental, in the academy",
  },
  "trainer-3": {
    src: null,
    alt: "A KALA trainer",
    label: "Trainer portrait — environmental, in the academy",
  },
};

export function craftSlot(category: CourseCategory): ImageSlotKey {
  return `craft-${category}`;
}
