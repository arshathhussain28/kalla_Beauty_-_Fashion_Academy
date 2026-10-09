# KALA — image brief (exact files and sizes)

Every photograph on the site is a named slot in [`data/images.ts`](../data/images.ts). To go live
with one: save the file in `public/images/` using the **exact file name below**, then tell me the
names (or set `src` and a real `alt` on that slot yourself). Nothing else changes.

**54 slots — 15 filled so far (with AI-generated concept photographs, see "About using ChatGPT"
below), 39 still empty — plus the share image, which is done.** Start with the **P1** rows — they
cover every page's first impression. P2 can follow, or reuse a P1 photo (see "Reusing photos").

---

## Rules for every image

- **Format:** JPG, sRGB, quality ~85 (WebP is fine too). Aim for under 800 KB each (hard max 2 MB).
  The site converts to AVIF/WebP and resizes per device automatically.
- **Exact pixel size** as listed. Each frame is cropped to fit (`object-cover`), so anything near the
  edge can be cut — keep the subject inside the **safe zone** noted in each row.
- **No text, logos, watermarks, borders or frames** inside the picture. The client's two promotional
  posters can't be used: their text and graphics are baked in.
- **Look:** natural light, warm neutral colour, real skin texture (not smoothed or "plastic"),
  unposed and human. Matches the brand — Cream `#FBF1EF`, Wine `#7E1F3D`, soft rose tones.
- **Arch frames** (marked ⌒) have their top two corners cut by a large curve. Keep faces and key
  detail **at least 15% down from the top** and centred.
- **Mobile crops tighter.** Wide images are cropped to a narrower window on phones — keep the subject
  in the **middle half** of the frame unless a row says otherwise.

## The eight sizes (so you only need eight crops)

| Class | Pixels | Ratio | Used for |
|---|---|---|---|
| **A** | 2400 × 1350 | 16:9 landscape | home hero, one gallery lead |
| **B** | 2400 × 1029 | 21:9 ultra-wide | full-bleed bands |
| **C** | 1600 × 2000 | 4:5 portrait, large | big portraits |
| **D** | 1200 × 1500 | 4:5 portrait, small | arches, small portraits |
| **E** | 1200 × 1600 | 3:4 portrait | founder, class, saree |
| **F** | 1600 × 1600 | 1:1 square, large | home journey |
| **G** | 1000 × 1000 | 1:1 square, small | details |
| **H** | 1600 × 1200 | 4:3 landscape | two large gallery tiles |
| **I** | 1500 × 1000 | 3:2 landscape | process shots |

(Plus the share image: **1200 × 630**.)

---

## HOME

| File name | Size | What the picture shows | Where it appears | Pri |
|---|---|---|---|---|
| `hero-founder.jpg` | A 2400×1350 | The founder in the academy, dark or neutral background. Person on the **right half**, **empty space on the left** for the headline. Face within the centre 40% so the phone crop still works. | Home hero, full width | **P1** |
| `journey-intro.jpg` | F 1600×1600 | A student absorbed in her practice, natural light, candid. Subject centred. | Home "The KALA Idea" journey — opening frame | **P1** |
| `journey-craft.jpg` | F 1600×1600 | Hands at work — brush, needle, mehendi cone or saree pleats. Tight crop, hands centred. | Home journey stage 1 · About "Craft" | **P1** |
| `journey-confidence.jpg` | F 1600×1600 | Trainer and student together, guidance in progress (hands and faces in frame). | Home journey stage 2 · About "Confidence" | **P1** |
| `journey-career.jpg` | F 1600×1600 | A finished look, garment or drape, presented with pride. | Home journey stage 3 · About "Career" | **P1** |
| `craft-makeup.jpg` | C 1600×2000 ⌒ | Makeup in progress — trainer or student at work, close and natural. | Home craft section · Courses · Makeup course page | **P1** |
| `craft-beauty.jpg` | C 1600×2000 ⌒ | A facial, threading or hair-care treatment in progress. | same, Beauty course | **P1** |
| `craft-mehendi.jpg` | C 1600×2000 ⌒ | Hands, cone work, an intricate bridal design. | same, Mehendi course | **P1** |
| `craft-saree.jpg` | C 1600×2000 ⌒ | Hands arranging pleats; bridal draping. | same, Saree course | **P1** |
| `craft-fashion.jpg` | C 1600×2000 ⌒ | Measuring, cutting or sewing a blouse. | same, Fashion course | **P1** |
| `journey-closing.jpg` | A 16:9 **flat lay** (1672×941 supplied; 3200×1800 ideal): the five crafts' tools clustered in the left ~30% and right ~30%, the middle 40% plain cream. **Objects only — no people.** Guide: `docs/journey-closing-guide.png`. | Home journey close ("Craft Your Confidence.") — drawn as two edge-anchored halves on desktop, as top and bottom bands on phones | ✅ done |
| `story-classroom.jpg` | C 1600×2000 | Trainer correcting a student's technique, hands in frame. | Home "Learn professionally" · About "What students experience" | P2 |
| `made-makeup.jpg` | H 1600×1200 | A finished makeup look (large tile). | Home "Made at KALA" | P2 |
| `made-saree.jpg` | H 1600×1200 | A finished saree drape (large tile). | Home "Made at KALA" | P2 |
| `made-beauty.jpg` | G 1000×1000 | Skin or hair work, detail. | Home "Made at KALA" | P2 |
| `made-mehendi.jpg` | G 1000×1000 | A finished mehendi hand, detail. | Home "Made at KALA" | P2 |
| `made-fashion.jpg` | G 1000×1000 | A finished garment, detail. | Home "Made at KALA" | P2 |
| `made-student.jpg` | G 1000×1000 | A student with her finished work. | Home "Made at KALA" · About | P2 |
| `trainer-1.jpg` | D 1200×1500 | A trainer in the academy (environmental portrait). **Real person only.** | Home "The people" | P2 |
| `trainer-2.jpg` | D 1200×1500 | A second trainer, same style. | Home "The people" | P2 |
| `trainer-3.jpg` | D 1200×1500 | A third trainer, same style. | Home "The people" | P2 |

## WHY KALA

| File name | Size | What the picture shows | Where it appears | Pri |
|---|---|---|---|---|
| `why-hero.jpg` | D 1200×1500 ⌒ | A student mid-technique, natural light, editorial crop. | Why KALA cover | **P1** |
| `why-craft.jpg` | C 1600×2000 | Close-up of hands working: brush, needle, cone or pleats. | "Learn the craft" | P2 |
| `why-watch.jpg` | D 1200×1500 ⌒ | A trainer demonstrating a technique to the class. | Journey step 1 (sticky arch) | P2 |
| `why-practice.jpg` | D 1200×1500 ⌒ | A student repeating the technique, trainer nearby. | Journey step 2 | P2 |
| `why-create.jpg` | D 1200×1500 ⌒ | A student building a complete look, drape or garment. | Journey step 3 | P2 |
| `why-refine.jpg` | D 1200×1500 ⌒ | Detail work: finishing, fitting, correcting. | Journey step 4 | P2 |
| `why-present.jpg` | D 1200×1500 ⌒ | A finished piece, shown with pride. | Journey step 5 | P2 |
| `why-career.jpg` | B 2400×1029 | Finished student work composed like a portfolio piece. **Subject in the middle 40%.** | "Turn your skill into opportunity" | P2 |
| `why-making-1.jpg` | C 1600×2000 | Hands styling hair or applying makeup. | "Made by hands" collage | P2 |
| `why-making-2.jpg` | D 1200×1500 ⌒ | Fabric, needle and thread, tight detail. | collage | P2 |
| `why-making-3.jpg` | I 1500×1000 | A student working beside a trainer. | collage | P2 |
| `why-making-4.jpg` | G 1000×1000 | Tools laid out: brushes, cones, pins. | collage | P2 |

## PEOPLE (Why KALA + About)

| File name | Size | What the picture shows | Where it appears | Pri |
|---|---|---|---|---|
| `people-founder.jpg` | E 1200×1600 | The founder, environmental portrait in the academy. **Real person only.** | About "Why KALA exists" | **P1** |
| `people-trainer.jpg` | C 1600×2000 | A trainer guiding a student, hands in frame. | Why KALA "Learn from people" · About | P2 |
| `people-student.jpg` | D 1200×1500 | A student concentrating on her work. Keep face central (also shown square). | Why KALA · About | P2 |
| `people-class.jpg` | E 1200×1600 ⌒ | The class together — a small group at work. Keep the group central (also shown square). | Why KALA · About | P2 |

## ABOUT

| File name | Size | What the picture shows | Where it appears | Pri |
|---|---|---|---|---|
| `about-academy.jpg` | D 1200×1500 ⌒ | The academy's learning space in natural light, composed and calm. | About cover | **P1** |

## THE WORK  (3 frames per craft: lead, detail, process)

Also used on each course page's "Student work" strip, cropped to a square.

| File name | Size | What the picture shows | Pri |
|---|---|---|---|
| `work-makeup-1.jpg` | C 1600×2000 | A finished bridal makeup look, face and shoulders. | **P1** |
| `work-makeup-2.jpg` | G 1000×1000 | Eye and lash detail on a finished look. | P2 |
| `work-makeup-3.jpg` | I 1500×1000 | Makeup in progress, brush in frame. | P2 |
| `work-beauty-1.jpg` | C 1600×2000 | A finished facial or skin-care result, calm and natural. | **P1** |
| `work-beauty-2.jpg` | G 1000×1000 ⌒ | Threading or brow-shaping detail. | P2 |
| `work-beauty-3.jpg` | I 1500×1000 | Hair spa or colour work in progress. | P2 |
| `work-mehendi-1.jpg` | **A 2400×1350** | A finished bridal mehendi hand, full design. **Landscape** — spans the full page width. | **P1** |
| `work-mehendi-2.jpg` | D 1200×1500 | Close detail of floral or mandala linework. | P2 |
| `work-mehendi-3.jpg` | I 1500×1000 | Cone work in progress, steady hands. | P2 |
| `work-saree-1.jpg` | E 1200×1600 | A finished bridal saree drape, full length. | **P1** |
| `work-saree-2.jpg` | G 1000×1000 | Pleats arranged by hand, close crop. | P2 |
| `work-saree-3.jpg` | I 1500×1000 | Pinning and finishing in progress. | P2 |
| `work-fashion-1.jpg` | C 1600×2000 | A finished blouse or garment, styled simply. | **P1** |
| `work-fashion-2.jpg` | G 1000×1000 | Stitching and seam detail. | P2 |
| `work-fashion-3.jpg` | I 1500×1000 ⌒ | Measuring, pattern or cutting in progress. | P2 |
| `work-wide.jpg` | B 2400×1029 | A wide, composed shot of finished projects from every craft together. **Subject in the middle 40%.** | **P1** |

## LINK-PREVIEW IMAGE

| File name | Size | What it shows | Pri |
|---|---|---|---|
| `public/og-image.jpg` | **1200 × 630** | The card shown when the site link is shared on WhatsApp, Facebook or Google. **Done:** the approved KALA logo on the brand cream, 50 KB. | ✅ |

> Shared links used to show **no picture** (every page pointed at `/opengraph-image`, which didn't
> exist). They now point at `/og-image.jpg`. Keep any replacement **under ~300 KB** — WhatsApp drops
> heavier link-preview images. A real, approved photograph can replace it later (change the default in
> `lib/seo.ts`).

---

## Reusing photos (if you don't have all of them)

One photograph can fill several slots — I just point each slot's `src` at the same file, and each frame
crops it differently. Sensible reuse:

- `journey-craft` ↔ `why-craft` ↔ `why-making-1` (hands at work)
- `journey-confidence` ↔ `story-classroom` ↔ `people-trainer` ↔ `why-practice` (trainer + student)
- `journey-career` ↔ `why-present` ↔ `made-student` (proud with finished work)
- each `craft-<x>` ↔ `work-<x>-1` (the same craft, a different crop)
- `people-founder` ↔ `hero-founder` (a different crop of the founder)

Reuse across **different crafts** or different **people** looks wrong (a mehendi photo on the saree
course) — keep those separate.

## About using ChatGPT to make these

The site's content rule is "nothing invented". These photos are presented as KALA's real people and
real student work, so:

- **Good uses:** cropping, extending a background to reach the exact size, removing clutter,
  matching colour/brightness, sharpening — all starting from a **real client photo**.
- **Avoid:** generating people, trainers, "students" or "finished work" that don't exist. It misleads
  visitors, changes the founder's and trainers' real faces, and AI still gets hands, fabric and
  mehendi linework visibly wrong — exactly the detail this site shows up close.
- If a slot truly has no real photo yet, leave it empty — the site shows a clean blush frame, not
  placeholder text.
