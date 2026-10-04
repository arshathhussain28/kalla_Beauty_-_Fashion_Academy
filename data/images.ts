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
  | "trainer-3"
  | "why-hero"
  | "why-craft"
  | "why-watch"
  | "why-practice"
  | "why-create"
  | "why-refine"
  | "why-present"
  | "why-career"
  | "why-making-1"
  | "why-making-2"
  | "why-making-3"
  | "why-making-4"
  | "people-founder"
  | "people-trainer"
  | "people-student"
  | "people-class"
  | "about-academy"
  | "work-wide"
  | WorkSlotKey;

/** Three frames per craft on The Work page: a lead, a detail and a process shot. */
export type WorkSlotKey = `work-${CourseCategory}-${1 | 2 | 3}`;

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

  // ── Why KALA ───────────────────────────────────────────────────────────────
  "why-hero": {
    src: null,
    alt: "A KALA student absorbed in her technique",
    label: "Why KALA — a student mid-technique, natural light, editorial crop (4:5)",
  },
  "why-craft": {
    src: null,
    alt: "Hands at work on a craft",
    label: "Craft — close-up of hands working: brush, needle, cone or pleats (4:5)",
  },
  "why-watch": {
    src: null,
    alt: "A KALA trainer demonstrating a technique",
    label: "Watch — a trainer demonstrating a technique to the class",
  },
  "why-practice": {
    src: null,
    alt: "A KALA student practising a technique",
    label: "Practice — a student repeating the technique, trainer nearby",
  },
  "why-create": {
    src: null,
    alt: "A KALA student building a complete piece",
    label: "Create — a student building a complete look, drape or garment",
  },
  "why-refine": {
    src: null,
    alt: "Finishing detail work by a KALA student",
    label: "Refine — detail work: finishing, fitting, correcting",
  },
  "why-present": {
    src: null,
    alt: "A KALA student presenting finished work",
    label: "Present — a finished piece, shown with pride",
  },
  "why-career": {
    src: null,
    alt: "Finished work by a KALA student",
    label: "Career — finished student work, composed like a portfolio piece (wide)",
  },
  "why-making-1": {
    src: null,
    alt: "Hands styling hair or applying makeup",
    label: "Making — hands styling hair or applying makeup (4:5)",
  },
  "why-making-2": {
    src: null,
    alt: "Fabric, needle and thread",
    label: "Making — fabric, needle and thread, tight detail (1:1)",
  },
  "why-making-3": {
    src: null,
    alt: "A KALA student working beside a trainer",
    label: "Making — a student working beside a trainer (3:2)",
  },
  "why-making-4": {
    src: null,
    alt: "Tools of the craft laid out",
    label: "Making — tools laid out: brushes, cones, pins (1:1 detail)",
  },

  // ── People (Why KALA + About) ──────────────────────────────────────────────
  "people-founder": {
    src: null,
    alt: "The KALA founder",
    label: "The founder — environmental portrait in the academy (3:4)",
  },
  "people-trainer": {
    src: null,
    alt: "A KALA trainer guiding a student",
    label: "A trainer guiding a student — hands in frame (4:5)",
  },
  "people-student": {
    src: null,
    alt: "A KALA student concentrating on her work",
    label: "A student concentrating on the work (1:1)",
  },
  "people-class": {
    src: null,
    alt: "A KALA class working together",
    label: "The class together — a small group at work (4:3)",
  },

  // ── About ──────────────────────────────────────────────────────────────────
  "about-academy": {
    src: null,
    alt: "The KALA academy",
    label: "The academy — the learning space in natural light, composed and calm (4:5)",
  },

  // ── The Work ───────────────────────────────────────────────────────────────
  "work-wide": {
    src: null,
    alt: "Finished student projects together",
    label: "Student projects — a wide, composed shot of finished work together (21:9)",
  },
  // Three per craft — lead, detail, process. Subjects stay inside what each course
  // actually teaches (see data/courses.ts).
  "work-makeup-1": {
    src: null,
    alt: "A finished bridal makeup look",
    label: "The Work · makeup — a finished bridal makeup look, face and shoulders (4:5)",
  },
  "work-makeup-2": {
    src: null,
    alt: "Eye and lash detail on a finished makeup look",
    label: "The Work · makeup — eye and lash detail on a finished look (1:1)",
  },
  "work-makeup-3": {
    src: null,
    alt: "Makeup in progress",
    label: "The Work · makeup — makeup in progress, brush in frame (3:2)",
  },
  "work-beauty-1": {
    src: null,
    alt: "A finished facial or skin-care result",
    label: "The Work · beauty — a finished facial or skin-care result, calm and natural (4:5)",
  },
  "work-beauty-2": {
    src: null,
    alt: "Threading or brow-shaping detail",
    label: "The Work · beauty — threading or brow-shaping detail (1:1)",
  },
  "work-beauty-3": {
    src: null,
    alt: "Hair spa or colour work in progress",
    label: "The Work · beauty — hair spa or colour work in progress (3:2)",
  },
  "work-mehendi-1": {
    src: null,
    alt: "A finished bridal mehendi hand",
    label: "The Work · mehendi — a finished bridal mehendi hand, full design (landscape 16:9)",
  },
  "work-mehendi-2": {
    src: null,
    alt: "Close detail of floral and mandala mehendi linework",
    label: "The Work · mehendi — close detail of floral or mandala linework (1:1)",
  },
  "work-mehendi-3": {
    src: null,
    alt: "Mehendi cone work in progress",
    label: "The Work · mehendi — cone work in progress, steady hands (3:2)",
  },
  "work-saree-1": {
    src: null,
    alt: "A finished bridal saree drape",
    label: "The Work · saree — a finished bridal saree drape, full length (3:4)",
  },
  "work-saree-2": {
    src: null,
    alt: "Saree pleats arranged by hand",
    label: "The Work · saree — pleats arranged by hand, close crop (1:1)",
  },
  "work-saree-3": {
    src: null,
    alt: "Saree pinning and finishing in progress",
    label: "The Work · saree — pinning and finishing in progress (3:2)",
  },
  "work-fashion-1": {
    src: null,
    alt: "A finished blouse stitched by a KALA student",
    label: "The Work · fashion — a finished blouse or garment, styled simply (4:5)",
  },
  "work-fashion-2": {
    src: null,
    alt: "Stitching and seam detail",
    label: "The Work · fashion — stitching and seam detail (1:1)",
  },
  "work-fashion-3": {
    src: null,
    alt: "Measuring and cutting in progress",
    label: "The Work · fashion — measuring, pattern or cutting in progress (3:2)",
  },
};

export function craftSlot(category: CourseCategory): ImageSlotKey {
  return `craft-${category}`;
}
