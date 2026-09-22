# KALA Beauty & Fashion Academy — Architecture

Status: **Real brand system implemented.** The design tokens, typography, component
specs and homepage below are transcribed from the client's own brand documents —
`KALA Brand System.pdf` (46pp, "Version 1.0 · Implementation Ready") and
`KALA — Master Brand Design System.pdf` / `.pptx` (21pp, "Client Presentation") —
supplied 2026-09-22, not invented or guessed. Where those two documents disagreed (see
§1), a judgment call is flagged explicitly so it can be corrected in one place.

Course/trainer/testimonial *content* is still placeholder (clearly marked in
`data/*.ts`); the *system* — colour, type, spacing, components, motifs, copy voice —
is real.

---

## 1. Design System

### The one open discrepancy between the two brand documents

Colour is identical in both documents. **Typography differs**:

- `KALA Brand System.pdf` (46pp, detailed, "Implementation Ready," reconciles exact
  values against "the uniform sheet"): **Playfair Display + Jost**, and explicitly
  justifies Playfair because "it carries the same fashion-magazine authority as the
  logo's own lettering, which is why it is the match."
- `Master Brand Design System` (21pp, "Client Presentation" deck): **Cormorant
  Garamond + Montserrat/Manrope**, with no justification given.

This build uses **Playfair Display + Jost** — the 46-page document is more rigorous,
reconciles itself against real production artefacts (the uniform sheet, the logo
lettering), and reads as the later/authoritative system. If the client actually
confirmed Cormorant + Montserrat as final, this is a two-file change
(`app/layout.tsx` font loading + `app/globals.css` `--font-display`/`--font-sans`) —
flag it and it's a fast fix, not a rebuild.

### Colour (`app/globals.css`, confirmed identical in both documents)

| Token | Hex | Use | Share |
|---|---|---|---|
| `cream` (Blush Cream) | `#FBF1EF` | Default ground for every surface | 60% |
| `wine` (KALA Wine) | `#7E1F3D` | Logo, headlines, CTA fill, uniform embroidery | 25% |
| `rose` (Rose Gold) | `#D2938C` | Hairlines, dividers, small accents only — never a fill | 10% |
| `wine-deep` (Deep Wine) | `#5C1428` | Shadow, CTA pressed state, footer ground | 5% |
| `wine-soft` | `#9A3A56` | Link hover, secondary accents | — |
| `rose-light` | `#E8C4BC` | Tinted fills, hover tints | — |
| `rose-deep` | `#B87168` | Eyebrow labels on cream (rose at 2.4:1 fails body-text contrast) | — |
| `ink` | `#2A1D21` | All body copy — never pure black | — |
| `ink-muted` | `#6B5358` | Captions, metadata, form hints | — |
| `border` / `border-strong` | `#E3D2CE` / `#D2938C` | Hairlines, card edges | — |

Hold 60/25/10/5. "If a design feels heavy, the fault is almost always wine over 25% —
add cream, do not add a new colour" (brand doc, verbatim).

### Typography

- **Display — Playfair Display**, vendored locally at `app/fonts/` (not fetched via
  `next/font/google` — see §6). Title Case or CAPS, never lowercase.
- **Body/UI — Jost**, vendored locally. Sentence case body, CAPS labels at
  wide tracking.
- **Script — intentionally not loaded.** The brand doc locks it to the exact string
  "Craft Your Confidence" *as it appears inside the logo artwork* and says it "may
  never set a headline, a name, a price, a caption or a button." Adding a script
  webfont to set the live hero headline would violate that rule, so the tagline's
  script treatment lives only in the logo image (`public/brand/`); live headline text
  uses Playfair Title Case instead (which is also how the brand doc's own "10
  Headlines" list writes it).

Exact type scale (desktop; Hero is the one documented mobile exception, 64px → 40px):

| Role | Family | Weight | Size | Line | Tracking | Case |
|---|---|---|---|---|---|---|
| Display | Playfair | 600 | 64px | 1.05 | +0.01em | Title |
| H1 | Playfair | 600 | 44px | 1.10 | +0.01em | Title |
| H2 | Playfair | 500 | 32px | 1.20 | +0.01em | Title |
| H3 | Jost | 500 | 22px | 1.30 | +0.06em | CAPS |
| Body | Jost | 400 | 17px | 1.60 | 0 | Sentence |
| Small | Jost | 400 | 14px | 1.55 | 0 | Sentence |
| Eyebrow | Jost | 500 | 12px | 1.30 | +0.24em | CAPS |
| Button | Jost | 500 | 15px | 1.00 | +0.12em | CAPS |
| Quote | Playfair italic | 400 | 26px | 1.45 | 0 | Sentence |
| Descriptor | Jost | 400 | 11px | 1.20 | +0.30em | CAPS |

All ten are Tailwind v4 `--text-*` tokens in `globals.css` (size + line-height baked
in; weight/tracking/case applied as explicit utility classes at each call site, not
relied on as implicit token behaviour).

### Shape, spacing, shadow, motif

- **Radius** — cards/frames `rounded-none` (0), buttons/inputs `rounded-sm` (2px),
  image tiles `rounded` (4px, the bare Tailwind default), modals `rounded-lg` (8px),
  avatars `rounded-full`. Buttons are **never** a pill.
- **Arch** — the brand's one soft shape: `rounded-t-[200px]` on photograph top
  corners only (see `CourseCard`). Tailwind's arbitrary-value syntax covers this with
  no custom token needed.
- **Spacing** — the brand's 4px scale (xs4/sm8/md16/lg24/xl32/2xl48/3xl64/4xl96) maps
  exactly onto Tailwind's default spacing scale (`p-1`…`p-24`), so no custom spacing
  tokens were needed either.
- **Shadow** — Tailwind's built-in `shadow-sm/md/lg` are overridden in `@theme` to the
  brand's warm wine-tinted values (`rgba(92,20,40,…)`), so every ordinary
  `shadow-*` utility is brand-correct by default, everywhere.
- **Thread Rule** (`components/ui/ThreadRule.tsx`) — the signature 1px rose-gold rule
  broken by one diamond. Used once per layout, never twice.
- **Double frame** and **lotus motif** exist in the brand doc but are not yet used —
  reserved for a future certificate/festival-artwork context, not the current pages.

---

## 2. Sitemap

| Route | Status |
|---|---|
| `/` | **Real homepage**, 9 sections per the brand doc's own hierarchy (§4) |
| `/courses` | Real, `CourseCard` grid |
| `/courses/[slug]` | Real, full content model + `LeadForm` + WhatsApp CTA |
| `/why-kala`, `/the-work`, `/about` | Stub (`PageStub`) — pending photography/content |
| `/contact` | Real, `LeadForm` + WhatsApp CTA |
| `/privacy`, `/terms` | Stub — placeholder routes so footer links resolve |
| `/api/leads` (POST) | Real — Zod validation, honeypot, rate limit |
| `/sitemap.xml`, `/robots.txt`, `/icon` | Real |

---

## 3. Component Architecture

```
components/
  ui/
    Button.tsx            primary/secondary, 2px radius, never a pill
    SectionHeading.tsx     eyebrow → headline → body, enforced order
    ThreadRule.tsx           the signature motif divider
    PageStub.tsx               placeholder for un-designed routes
  navigation/
    Navbar.tsx             cream, 72px, sticky, scroll border, mobile menu
  Footer.tsx                deep wine, 3 columns, monogram bottom-left
  conversion/
    FloatingWhatsApp.tsx   mobile bottom bar + desktop floating button
  courses/
    CourseCard.tsx          white/shadow-md/arched image/eyebrow→H3→summary→link
  forms/
    LeadForm.tsx            shared by /contact and /courses/[slug]
  sections/                (homepage only, in page order)
    Hero.tsx
    FeaturedCourses.tsx
    WhyKala.tsx
    StudentWorkTeaser.tsx
    Faculty.tsx
    Testimonials.tsx
    Statistics.tsx
    EnquirySection.tsx
```

Not yet built: `TrainerCard`/`TestimonialCard` as standalone reusable components
(currently inlined in their one section each — genuine premature abstraction to
extract before a second use case exists); a real masonry+lightbox gallery for
`/the-work` (the homepage teaser is a simple 4-tile grid, not the full gallery); GSAP
(not yet needed — Framer Motion is installed but also not yet used, since no page
uses scroll-triggered motion yet).

---

## 4. Homepage Section Architecture

The brand doc's own page hierarchy (§16 Website System), not the longer 13–14 section
version from the generic planning prompt — "one dominant element per layout" and the
brand's overall restraint principle argue for the tighter structure:

1. **Hero** — promise + one CTA (wine photo-band, 70vh, never 100vh)
2. **Courses** — the reason they came (cream)
3. **Why KALA** — three proof points: Craft / Confidence / Career (white)
4. **Student work** — the evidence (cream)
5. **Faculty** — the credibility (white)
6. **Testimonials** — the reassurance (cream)
7. **Statistics** — **the one wine band per page** (never doubled with the CTA)
8. **Enquiry** — the form (white)
9. **Footer** — deep wine

Section background rhythm alternates cream/white down the page with exactly one wine
interruption, per the brand doc's explicit rule.

---

## 5. Data Architecture

Unchanged in shape from Stage 1 (`data/courses.ts`, `trainers.ts`, `testimonials.ts`,
`faqs.ts` — see git history for the original notes); course/trainer/testimonial
*content* is still placeholder. Course duration/category copy was left as originally
placeholders rather than swapped to the brand doc's example course lines ("Professional
Beauty · 12 weeks · 120 practice hours" etc.) — those examples illustrate voice, not a
confirmed catalogue, and mixing "voice example" numbers into structured data risked
them being read as real. Statistics section numerals (`components/sections/Statistics.tsx`)
do use the brand doc's own example figures (120 practice hours, 14 students, 6 weeks),
clearly commented as illustrative pending real confirmation.

---

## 6. Technical Architecture

Unchanged from Stage 1 (Next.js 16.3 App Router/Turbopack, React 19, TypeScript
strict, Tailwind v4, Zod, `clsx`+`tailwind-merge`) plus:

- **`lucide-react`** — the brand's specified icon family (1.5px stroke, outline only,
  wine default / rose-gold decorative / cream-on-wine). Only icons from the brand
  doc's approved per-category list are used.
- **Fonts**: Playfair Display *and* Jost are both vendored locally at
  `app/fonts/*.woff2` via `next/font/local`, for the same reason noted in Stage 1 —
  this sandbox's Turbopack build can't reach `fonts.gstatic.com` at build time even
  though plain Node `fetch`/`curl` can. Not an issue outside this sandbox, but
  self-hosting is equal-or-better practice regardless, so no reason to revert it.
- **Logo asset**: `public/brand/kala-logo-primary.jpg` — the client's supplied primary
  illustrated lockup (crowned profile + K + needle/thread + dress form + wordmark).
  This is the *only* lockup variant supplied as a file; the brand doc's L2
  (horizontal)/L3 (compact)/L4 (monogram) variants don't exist as separate assets yet.
  The Navbar approximates L2 by pairing a small crop of the primary mark with a plain
  "KALA" wordmark and dropping the descriptor (per the brand doc's own rule: step down
  the lockup ladder rather than shrinking the descriptor into illegibility). Get the
  real L2–L4 exports from whoever holds the source file before this goes further —
  it's the audit's own "outstanding action #1" (vector redraw).

---

## 7. Security Architecture

Unchanged from Stage 1 — see git history. Nothing in this pass touched
`/api/leads`, headers, or validation.

---

## What's still open

- Real photography (the brand doc is explicit: authentic over stock is "the single
  biggest differentiator available" — every image slot in this build is a tinted
  placeholder, deliberately not a stock photo, ready to swap).
- Real course catalogue, trainer bios, testimonials, admissions statistics.
- L2/L3/L4 logo lockup files and a vector master (flagged as the brand audit's own
  blocking gap).
- `/why-kala`, `/the-work`, `/about` full compositions (currently stubs).
- A real masonry+lightbox gallery for `/the-work`.
- CSP hardening, once real third-party scripts (analytics, maps) exist to tune it
  against.
