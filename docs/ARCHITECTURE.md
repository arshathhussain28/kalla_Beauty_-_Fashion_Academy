# KALA Beauty & Fashion Academy — Architecture

Status: **Real brand system implemented.** The design tokens, typography, component
specs and homepage below are transcribed from the client's own brand documents —
`KALA Brand System.pdf` (46pp, "Version 1.0 · Implementation Ready") and
`KALA — Master Brand Design System.pdf` / `.pptx` (21pp, "Client Presentation") —
supplied 2026-09-22, not invented or guessed. Where those two documents disagreed (see
§1), a judgment call is flagged explicitly so it can be corrected in one place.

Trainer/testimonial *content* is still placeholder (clearly marked in `data/*.ts`);
the *system* — colour, type, spacing, components, motifs, copy voice — is real, and
as of 2026-09-27 the **course catalogue is real too** — curriculum content is
transcribed from the client's own "course details overview.txt," not invented (see
§5). Course *fee and duration* are the one exception: they stay unpublished pending
client confirmation because the supplied sources disagree — see §5's commercial-data
policy before touching `data/courses.ts`.

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
| `/courses` | Real, `CourseCard` grid — all 5 real courses (§5) |
| `/courses/[slug]` | Real, full content model + module accordion + `LeadForm` + WhatsApp CTA |
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
    CourseModules.tsx       expandable numbered modules — progressive disclosure for
                            curriculum, not a flat 15-20 item bullet wall
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

### The real course catalogue

`data/courses.ts` holds five real courses, transcribed from the client's own
"course details overview.txt" (curriculum, module grouping, category names) —
**not** the earlier four-course placeholder set (`professional-makeup`,
`hair-styling`, `professional-tailoring`, `fashion-design`), which never matched
what KALA actually teaches:

| Slug | Category | Curriculum source |
|---|---|---|
| `advanced-makeup-artist` | `makeup` | 16 topics → 7 modules |
| `advanced-beautician` | `beauty` | 12 topics → 4 modules |
| `advanced-mehendi-artist` | `mehendi` | 12 topics → 4 modules |
| `advanced-saree-pleating-draping` | `saree` | 11 topics → 4 modules |
| `advanced-tailoring-fashion-design` | `fashion` | 16 topics → 5 modules |

Curriculum topics are grouped into named modules (e.g. Makeup's "Bridal & Occasion"
groups Bridal/Engagement/Party makeup) so `CourseModules` can render them as
progressive-disclosure accordions instead of a 15-item bullet wall — the grouping is
editorial packaging of the client's real content, not new content.

### Commercial-data policy — read this before touching fee or duration

The supplied course document's own pricing notes conflict with a supplied
promotional poster:

- The document prices Makeup and Beautician as **separate** courses — ₹15,000/20
  days and ₹25,000/1 month respectively (with Mehendi ₹5,000/1 month, Saree
  pre-pleating ₹1,000/1 day, and Tailoring ₹6,000/3 months noted alongside).
- A poster instead sells a **combined** "Professional Beautician & Makeup Artist"
  package at ₹35,000/45 days — a different product structure, not just a different
  number for the same course.

Rather than guess which is current (or silently pick one), every course's `duration`
and `fee` field uses:

```ts
export interface ConfirmableValue<T> {
  value: T | null;
  status: "confirmed" | "pending_confirmation";
}
```

All five courses currently ship `{ value: null, status: "pending_confirmation" }` for
both fields — not just the two that visibly conflict, since an academy showing two
different prices for overlapping offerings in its own current marketing casts doubt
on whether *any* of the informal notes reflect final, current pricing. **Never
render `.value` without checking `.status === "confirmed"` first** — `CourseCard` and
the course-detail snapshot both fall back to "Contact for Details" /
"Contact us for current fees/duration" when pending. Once the client confirms actual
current figures (and clarifies whether Makeup + Beautician are now sold bundled, or
the bundle is a separate/additional offer), flip the relevant fields to
`{ value: "20 Days", status: "confirmed" }` and the UI will start displaying them
automatically — no template changes needed.

### Other data files

`trainers.ts` and `testimonials.ts` are unchanged in shape but their
`disciplines`/`courseSlug` references were updated to the real category names and
slugs above. Content itself (names, bios, quotes) is still placeholder.

`data/site.ts` holds the one piece of real, non-commercial business data available:
phone `9942893601` and location "Thiyagadurugam," both confirmed by appearing
identically on two independently supplied posters — used in the Footer, the mobile
sticky call button, and as the default WhatsApp number in `lib/whatsapp.ts`.

Statistics section numerals (`components/sections/Statistics.tsx`) still use the
brand doc's own example figures (120 practice hours, 14 students, 6 weeks) plus a
now-corrected "5 Craft Disciplines" (was "2," left over from the old 2-category
placeholder structure) — all clearly commented as illustrative pending real
confirmation, same policy as course fees.

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
- **Logo assets**: `public/brand/kala-logo-primary.jpg` (1254×1254, the client's
  supplied primary illustrated lockup — full illustration + wordmark + descriptor +
  script tagline, extracted from the brand PDF's own embedded copy rather than the
  lower-resolution pptx export, kept as the master reference) and
  `public/brand/kala-icon.jpg` (950×695, a crop of the illustration only — crown,
  profile, K, needle/thread, spool, dress form — with the wordmark and descriptor
  cropped out). Navbar and Footer both use `kala-icon.jpg` paired with **live** "KALA"
  text and a "Beauty & Fashion Academy" descriptor, rather than the full raster
  lockup — raster text baked into a JPEG never stays crisp at small display sizes or
  under zoom the way real HTML text does, which was the original complaint. This is
  still an approximation of the brand doc's proper L2 (horizontal)/L3 (compact)/L4
  (monogram) lockups, which don't exist as separate source files — get the real
  exports from whoever holds the vector master before this goes further; it's the
  brand audit's own "outstanding action #1" (vector redraw).

---

## 7. Security Architecture

Unchanged from Stage 1 — see git history. Nothing in this pass touched
`/api/leads`, headers, or validation.

---

## What's still open

- Real photography (the brand doc is explicit: authentic over stock is "the single
  biggest differentiator available" — every image slot in this build is a tinted
  placeholder, deliberately not a stock photo, ready to swap).
- **Client confirmation of one authoritative fee + duration per course** (§5) —
  the single biggest blocker to launch; nothing commercial can go live until this
  is resolved.
- Real trainer bios, testimonials, and admissions statistics (course *curriculum*
  is now real — see §5 — only these remain placeholder).
- L2/L3/L4 logo lockup files and a vector master (flagged as the brand audit's own
  blocking gap).
- `/why-kala`, `/the-work`, `/about` full compositions (currently stubs).
- A real masonry+lightbox gallery for `/the-work`.
- CSP hardening, once real third-party scripts (analytics, maps) exist to tune it
  against.
