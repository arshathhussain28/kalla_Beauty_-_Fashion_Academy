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
  | "journey-closing"
  | `craft-${CourseCategory}`
  | "story-classroom"
  | "made-makeup"
  | "made-beauty"
  | "made-mehendi"
  | "made-saree"
  | "made-fashion"
  | "made-student"
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
  /**
   * CSS object-position for the photograph (e.g. "74% 10%"): where the subject sits, so a
   * narrow crop on a phone keeps her in frame instead of cutting to the centre of the file.
   * Omit for centred.
   */
  focus?: string;
}

export const imageSlots: Record<ImageSlotKey, ImageSlotDef> = {
  "hero-founder": {
    src: "/images/hero-founder.jpg",
    alt: "The founder of KALA Beauty & Fashion Academy seated at her makeup vanity",
    label: "Hero — founder portrait, dark neutral background, negative space left",
    // She sits at ~76% across this 2.4:1 image. On a phone the frame is a narrow slice of it,
    // so anchor there (87% puts her face about 60% across the slice, clear of the edge); the
    // small y keeps the top of her hair in frame on desktop.
    focus: "87% 10%",
  },
  "journey-intro": {
    src: "/images/journey-intro.jpg",
    alt: "The founder applying eye makeup to a client while students watch and learn",
    label: "Journey · intro — a student practising, natural light, cinematic and unposed",
    // Square crop of a wide frame: the founder is left of centre, the client at the right
    // edge. This keeps both in view when the arch frame is narrower than square.
    focus: "45% 35%",
  },
  "journey-craft": {
    src: "/images/journey-craft.jpg",
    alt: "A trainer looks on as a student in a KALA apron applies eyeshadow to a client",
    label: "Journey · Craft — hands at work: brush, needle, cone or pleats, tight crop",
    // 3:2 source shown in frames from ~1.1 to 4:3. The student's face sits at ~40%, the
    // trainer's at ~61% and the client's eye at ~83%; anchoring at 72% keeps the student, the
    // trainer, the brush and the client's eye in view in every frame shape (checked at 1.0,
    // 1.12, 1.25 and 1.33).
    focus: "72% 40%",
  },
  "journey-confidence": {
    src: "/images/journey-confidence.jpg",
    alt: "A trainer pointing out technique as her student, in a KALA apron, applies eye makeup to a model",
    label: "Journey · Confidence — trainer and student together, guidance in progress",
    // A 16:9 frame shown in near-square to 4:3 windows. The trainer's face sits at ~47%, the
    // student's at ~72% and the model's eye at ~89%; anchoring at 87% keeps all three faces and
    // the brush in view whatever shape the frame takes (checked at 1.0, 1.12, 1.25 and 1.33 —
    // the frames are widened to suit, see KalaJourney.tsx and AboutBeliefs.tsx).
    focus: "87% 35%",
  },
  "journey-career": {
    src: "/images/journey-career.jpg",
    alt: "A makeup artist in a KALA apron putting the finishing touches to a bride's look, adjusting her earring",
    label: "Journey · Career — a finished look, garment or drape, presented with pride",
    // 16:9 source shown in near-square to 5:4 arch frames. The artist sits at ~58% across and
    // the bride at ~80% (jasmine and jewellery out to ~90%, the observer at ~92%); anchoring at
    // 96% frames the pair with the bride's necklace and saree intact, whatever shape the frame
    // takes (checked at 0.9, 1.0, 1.12 and 1.25).
    focus: "96% 40%",
  },
  "journey-closing": {
    src: "/images/journey-closing.jpg",
    // Decorative backdrop for the "Craft Your Confidence." close — objects only, no people.
    alt: "",
    label: "Journey · Closing — flat lay of the five crafts' tools, objects at the edges, calm centre",
    // 16:9 flat lay: makeup brushes, towel, comb and henna cones fill the left ~31%, silk, thread
    // and a tape measure the right ~33%, and the middle 31–67% is plain. ClosingBackdrop draws it
    // as two halves (the left half pinned to the image's left edge, the right half to its right)
    // so those clusters stay in view whatever shape the frame has — no `focus` here on purpose.
  },
  "craft-makeup": {
    src: "/images/craft-makeup.jpg",
    alt: "A makeup artist in a KALA apron applying eyeshadow with a fine brush to a bride-to-be",
    label: "Makeup — trainer or student at work, close and natural",
    // 3:2 source shown in tall 4:5 arch frames (home craft section, courses index, the
    // Makeup course page). The artist's face sits at ~49%, her hand and brush at ~68% and the
    // bride's closed eye at ~76%; anchoring at 74% keeps all three, and most of the bride's
    // face, in the 4:5 window (checked at 0.8, 1.0 and 1.25 too).
    focus: "74% 40%",
  },
  "craft-beauty": {
    src: "/images/craft-beauty.jpg",
    alt: "A trainer pointing out technique as a beautician in a KALA apron gives a client a facial",
    label: "Beauty — facial, threading or hair care in progress",
    // A very wide (~2:1) photograph: the trainer's face sits at ~41%, the beautician's at ~71%
    // and the client's face and hands at ~64%. In 4:5 frames the window is only ~40% of the
    // width, so anchoring at 67% centres the facial and the beautician's face with the trainer's
    // smile and pointing hand entering at the left; in the landscape frames (1.0 to ~1.33) the
    // window is wide enough that the same anchor brings the trainer's whole face into view too.
    focus: "67% 40%",
  },
  "craft-mehendi": {
    src: "/images/craft-mehendi.jpg",
    alt: "A trainer guides a student in a KALA apron as she draws a bridal mehendi design with a cone",
    label: "Mehendi — hands, cone work, an intricate bridal design",
    // 16:9 source shown in 4:5 arch frames up to ~1.33 landscape. The student's face sits at
    // ~44%, the trainer's at ~68% and the cone and henna hand at ~45–66%; anchoring at 60% keeps
    // both faces and the design in view in every frame (checked at 0.8, 1.0, 1.18 and 1.33).
    focus: "60% 40%",
  },
  "craft-saree": {
    src: "/images/craft-saree.jpg",
    alt: "A trainer guides a student in a KALA apron as she pleats and drapes a bridal silk saree",
    label: "Saree — hands arranging pleats, bridal draping",
    // 16:9 source shown in 4:5 arch frames up to ~1.33 landscape. The trainer's face sits at
    // ~36%, the student's at ~54%, the pleating hands at ~65% and the model's face at ~74%.
    // Anchoring at 62% keeps the student, the pleating and the model's face in the tall 4:5
    // window with the trainer's face just entering at the left; from 1.0 up the whole group fits
    // (checked at 0.8, 1.0, 1.18 and 1.33).
    focus: "62% 40%",
  },
  "craft-fashion": {
    src: "/images/craft-fashion.jpg",
    alt: "A trainer shows a student in a KALA apron how to mark a pattern on fabric",
    label: "Fashion — measuring, cutting, sewing a blouse",
    // 3:2 source shown in 4:5 arch frames up to ~1.33 landscape. The student's face sits at ~47%
    // and the trainer's at ~70%, with the chalk hand at ~45% and the trainer's pointing hand at
    // ~62%. Anchoring at 70% keeps both faces, the pattern and both hands in the tall 4:5
    // window, and keeps the wall logo out of it (checked at 0.8, 1.0, 1.18 and 1.33).
    focus: "70% 40%",
  },
  "story-classroom": {
    src: "/images/story-classroom.jpg",
    alt: "A trainer guides a student in a KALA apron as she brushes blush onto a client's cheek",
    label: "Method — trainer correcting a student, hands in frame",
    // 3:2 source shown in 4:5 frames only (home story section, About experience). The About
    // frame is drawn ~20% taller than it shows (its parallax drift), so its window is narrower
    // (~45% of the width) than the home one (~53%). The trainer's face sits at ~38%, the
    // student's at ~58% and the brush at ~74%; anchoring at 52% keeps both faces, the
    // trainer's guiding hand and the brush nib in view in both, with the wall logo partly
    // visible behind them.
    focus: "52% 40%",
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
    src: "/images/why-hero.jpg",
    alt: "A student in a KALA apron sketches a fashion design while her trainer points out a detail",
    label: "Why KALA — a student mid-technique, natural light, editorial crop (4:5)",
    // The source is 4:5 — the same shape as the arch frame — so nothing is cropped and no focus
    // point is needed. The arch (a full semicircle on top) clears the trainer's hair and both
    // faces; the student's face sits at ~36% down and the trainer's at ~21%.
  },
  "why-craft": {
    src: "/images/why-craft.jpg",
    alt: "A student in a KALA apron stitches a pleat while her trainer guides her hands",
    label: "Craft — close-up of hands working: brush, needle, cone or pleats (4:5)",
    // 4:5 source. The frame sits inside a Parallax, which draws the photograph 20% taller than
    // the frame shows, so the visible window is ~17% narrower than the source: centred, it holds
    // both faces, the needle and the trainer's guiding hand (the student's face at ~32% across,
    // the trainer's at ~75%). No focus point needed.
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
    src: "/images/people-founder.jpg",
    alt: "Portrait of the founder of KALA Beauty & Fashion Academy",
    label: "The founder — environmental portrait in the academy (3:4)",
    focus: "50% 25%",
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
