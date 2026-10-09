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
| `/` | **Real homepage**, 10 sections as a visual narrative (§4) |
| `/courses` | Real, `CourseCard` grid — all 5 real courses (§5) |
| `/courses/[slug]` | Real, full content model + module accordion + `LeadForm` + WhatsApp CTA |
| `/why-kala` | **Real** — 11-section belief page: the wine "Confidence" journey, `LeadForm` at the close (§3b) |
| `/the-work` | **Real** — editorial gallery: five chapters, five compositions, one full-bleed pause (§3b) |
| `/about` | **Real** — story → beliefs → method → experience → directions → people, `LeadForm` at the close (§3b) |
| `/contact` | Real, `LeadForm` + WhatsApp CTA |
| `/privacy`, `/terms` | Stub — placeholder routes so footer links resolve |
| `/api/leads` (POST) | Real — origin + content-type checks, Zod validation, honeypot, rate limit, signed webhook delivery (503 until a destination is configured — see §7) |
| `/sitemap.xml`, `/robots.txt`, `/icon` | Real |

---

## 3. Component Architecture

```
components/
  ui/
    Button.tsx            primary / secondary / inverse (for wine + photographic fields)
    ArrowLink.tsx          editorial text link: underline draws in, arrow drifts
    SectionHeading.tsx     eyebrow → headline → body, enforced order
    ImageSlot.tsx          the photography system — see "Image system" below
    Reveal.tsx             Reveal (fade + rise) and CurtainReveal (wine curtain lifts)
    ThreadRule.tsx         the signature motif divider
    PageStub.tsx           placeholder for un-designed routes
  navigation/
    Navbar.tsx             cream, 72px, sticky, scroll border, mobile menu
  Footer.tsx               deep wine, 3 columns, monogram bottom-left
  conversion/
    FloatingWhatsApp.tsx   mobile bottom bar + desktop floating button
  courses/
    CourseCard.tsx         brand "image card": arched photo, type beneath, no box
    CourseModules.tsx      expandable numbered modules — progressive disclosure
  forms/
    LeadForm.tsx           shared by /contact, /courses/[slug] and the homepage
  sections/                homepage, in page order (see §4)
    Hero · KalaJourney (+ KalaJourneyPinned) · CraftDiscovery (+ CraftPinned) · LearningMethod ·
    EditorialStory · MadeAtKala · Faculty · CareerDirections · FinalCTA · EnquirySection
    Testimonials.tsx       built but not rendered — see "Open items"
```

### 3b. Editorial pages — Why KALA, The Work, About

These three were stubs; they are now full pages built **without touching any existing
section or page** (the homepage, courses and contact are unchanged). New code only:

```
components/
  editorial/
    ClipReveal.tsx      photograph reveal: clip-path opens + image settles from 1.1 → 1
    Parallax.tsx        gentle vertical drift of a photo inside its frame (≤ 8%)
    PageEnquiry.tsx     the closing conversion block: Talk to KALA (WhatsApp), course link,
                        phone + location, and the real LeadForm (validated, rate-limited)
  why/                  WhyHero · IdeaPillars · CraftSection · ConfidenceJourney (the one
                        wine band) · CareerSection · LearnByMaking · MentorshipSection ·
                        KalaDifference · AudienceSection · ClosingStatement
  work/                 WorkHero · WorkChapter (5 layouts) · WorkWide
  about/                AboutHero · AboutStory · AboutBeliefs · AboutMethod (the one wine
                        band) · AboutExperience · AboutDirections · AboutPeople
data/
  why-kala.ts · work.ts · about.ts     all copy and structure, one file per page
```

Rules these pages follow, so the next person doesn't have to rediscover them:

- **Copy is bounded.** Every claim is KALA's own brand language or sits in the client's
  course document (`KALA_TRAINING_STANDARDS`, the module lists, `careerDirections`).
  No founder biography, trainer credentials, dates, numbers or outcomes exist anywhere in
  these pages; `data/about.ts` (`PEOPLE`, `ABOUT_STORY`) is where real ones go. Audience and
  career copy is worded as possibility, never placement.
- **One wine band per page** — `ConfidenceJourney` on Why KALA, `AboutMethod` on About,
  `FinalCTA` on The Work. Everything else alternates cream / white around it.
- **Scroll-linked values** use full 0 → 1 ranges (`Parallax`, the progress lines) or are
  time-based `whileInView` — the `useScrub` rule in §3 applies.
- **Utility border colours need `!`.** `globals.css` sets `* { border-color }` unlayered,
  which outranks Tailwind's layered `border-wine` / `border-white`. On these pages a
  coloured border is written `border-wine!`, or avoided (hairlines are `h-px bg-*`). The
  rule itself was left alone because changing it would alter existing pages.
- **Type scale:** headlines stay on the brand scale (`text-display` 64px max), with one
  deliberate exception — The Work's title is 96px on desktop, as a typographic cover.
- **Mobile is its own layout** — frames go full-bleed → inset right → inset left, the sticky
  journey panel is dropped for per-stage inline images, and the `IdeaPillars` names use
  `clamp()` so "CONFIDENCE" fits at 320px. Checked at 320/360/390/414/768/820 with no
  horizontal overflow.

### Image system (`data/images.ts` + `ImageSlot`)

There is no real KALA photography yet, and the brand system forbids stock. Rather than
scatter placeholders through components, every photograph is a **named slot** in one
registry. A slot with `src: null` renders a calm blush frame with a faint KALA monogram —
**nothing a visitor could read as unfinished; production never prints "Photography
pending"**. The slot's `label` is the shot brief for the photographer, and it shows only in
development (or on a review deploy that sets `NEXT_PUBLIC_SHOW_PHOTO_BRIEFS=true`). A slot
with a `src` renders `next/image` (`fill` + `object-cover`, so any aspect ratio works).
**To go live with a photo: drop the file in `/public/images/`, set `src` and a real
`alt` on that slot — nothing else changes.** (`next.config.ts` allows `/images/**` for
`next/image`; before that pattern existed, the first real photo would have thrown.)
Posters/promotional artwork were deliberately *not* cropped into slots: they have text and
graphics baked in. The Work's lightbox only opens for frames that have a `src`. A slot can
also carry a `focus` (CSS `object-position`, e.g. `"74% 10%"`) so a narrow phone crop of a wide
photograph stays on the subject — the home hero uses it to keep the founder in frame.

### 3c. Navigation, conversion and shell

- **Navbar** — cream, 72px (fixed: pinned sections are positioned against it). On scroll it
  turns 85% cream with a soft blur and a border; links draw an underline on hover and keep
  it on the current page (`aria-current`); "Enquire Now" is wrapped in `Magnetic` (fine
  pointers only). Below `lg` it opens a **full-screen menu** — large display links that
  stagger in, WhatsApp CTA, phone + location; Escape closes, focus moves in and returns,
  the page behind is frozen. The menu renders *outside* `<header>` because the header's
  `backdrop-filter` would otherwise become the containing block for its `fixed` child.
- **Mobile action bar** — WhatsApp · Call · Enquire, 56px targets, padded by
  `env(safe-area-inset-bottom)` (`viewport-fit=cover` is set in `layout.tsx`; body reserves
  matching room). Desktop keeps the floating "Talk to KALA".
- **WhatsApp context** — `wa.me` ignores everything but `text`, so UTM-style parameters
  would be dropped. `lib/whatsapp.ts` instead appends a visible `Ref: website · <source> ·
  <course>` line to the pre-filled message so the advisor sees where a chat began.
- **Page transition** — `app/template.tsx` re-mounts per route, replaying a 520ms CSS
  fade/rise (`.kala-page`). CSS only, so nothing waits on JavaScript.
- **Scroll progress** — a 2px wine hairline (`ScrollProgress`), bound straight to scroll.
- **Courses** — an editorial index (`CourseIndex`): one course per row, photo and text
  swapping sides; the title link is stretched over the row (one tab stop), hover zooms the
  photo, draws a rule, lengthens the number hairline and nudges the arrow. Facts shown are
  level + the programme-wide "hands-on practice" and "completion certificate"; duration
  appears only once confirmed. `CourseCard` remains for the homepage carousel.
- **FAQ** — `Faq` (accessible accordion, CSS grid-row open/close) fed by `data/faqs.ts`,
  whose answers are limited to confirmed facts. Rendered on every course page.
- **Instagram** — `SITE_INSTAGRAM_URL` in `data/site.ts` is `null` until the real profile
  URL is supplied; the footer previously linked to instagram.com itself.

### Motion system

Six signature moments, deliberately not "animate everything":

| Moment | Where | How |
|---|---|---|
| Hero reveal | `Hero` | **Pure CSS** (`.kala-rise`, `.kala-settle`) — plays on first paint, no JS, no LCP penalty |
| The KALA Journey | `KalaJourneyPinned` | Pinned stage (270svh tablet / 340svh desktop), one scroll progress drives five states: intro → 01 Craft → 02 Confidence → 03 Career → closing "Craft Your Confidence." Image frame is one arch that never leaves — each stage's photo is revealed over the last by an animated `clip-path` + scale, so the scenes feel continuous. A 01/02/03 rail fills as you go. <768px and reduced motion get `KalaJourneyStatic`, a dedicated vertical story. The closing line sits on a flat-lay backdrop (`ClosingBackdrop`, slot `journey-closing`): two edge-anchored halves that fade toward the text on the pinned stage (narrower on landscape tablets, a top band when the screen is portrait), top and bottom bands on phones and small tablets (the photograph's upper half across the top, its lower half across the bottom, the words in the plain middle on the photograph's own background colour), and on the pinned stage it only mounts once the visitor is ~45 % through the scroll so it costs nothing at page load. The Craft / Confidence / Career frames share one shape on the stacked layout and on About |
| Pinned craft scroll | `CraftPinned` | Framer `useScroll` drives a translateX track inside a `sticky` stage (section is n × 100svh). Desktop only |
| Curtain reveal | `CurtainReveal` | wine panel `scaleY 1→0` + image `scale 1.12→1`; transform-only |
| Learning journey | `LearningMethod` | scroll-drawn connecting line; stages light up at viewport centre and stay lit |
| Final CTA | `FinalCTA` | calm staggered `Reveal` — no parallax |

Rules that keep it safe: transform/opacity only (GPU, no layout shift — measured CLS
0.012); one easing curve (`lib/motion.ts`); the pinned section is `sticky`, not
scroll-jacking. **Reduced motion** is handled in CSS (`globals.css`): `data-reveal` /
`data-curtain` hooks force the final state, and the pinned section is swapped for the
static swipe carousel. CSS rather than a `useReducedMotion` branch so server and client
markup match (no hydration mismatch, and no way to strand content at `opacity: 0`).
On mobile the pinned section is replaced by a CSS scroll-snap carousel of `CourseCard`s.

**Scroll-linked values must go through `useScrub` (`lib/scrub.ts`), never a bare
`useTransform` with a short range.** Framer accelerates scroll-linked opacity / clip-path /
filter / transform with native scroll timelines and hands the input range to the browser
as animation offsets. If the range stops short of 0→1, the browser animates from the last
stop *back to the element's base style*, so a layer that should stay hidden after its
window fades back in (seen: a grid meant to be gone read 0.41 opacity at 0.9 progress).
`useScrub` pads the first and last stop out to 0 and 1, which makes every mapping hold
its end values.

The journey's two renderings are switched in CSS (`.journey-pinned` /
`.journey-static-wrap` — hidden/shown by breakpoint, and swapped under
`prefers-reduced-motion`), not by a JS media query, so there is no hydration mismatch.
Keyboard: the stage uses `overflow-clip` (not `hidden`) so focus can't scroll it
internally, and focus reaching the closing CTAs early scrolls the page to that state.

Not yet built: `TrainerCard`/`TestimonialCard` as standalone components (inlined in
their one section each — premature to extract); a lightbox for `/the-work`; GSAP (not
needed — Framer Motion covers every moment above).

---

## 4. Homepage Section Architecture

A visual narrative, per the "visual transformation" directive, rather than a brochure.
No two consecutive sections share a layout:

1. **Hero** — cinematic reveal, one primary action + one quiet text link (wine, 70vh)
2. **The KALA Journey** — the Craft → Confidence → Career idea as a pinned, scroll-driven
   story with an arch image that changes scene by scene (cream). Replaces the earlier
   three-equal-columns statement, which read as a feature grid and carried no motion
3. **Find your craft** — pinned horizontal scroll / swipe carousel (white)
4. **The KALA Method** — Learn → Practice → Create → Refine → Present (cream)
5. **Editorial story** — 7/12 photo with an overlapping type panel (white)
6. **Made at KALA** — asymmetric image composition, curtain reveals (cream)
7. **People** — environmental trainer portraits (white)
8. **Career direction** — ruled index of *possible* directions per craft (cream)
9. **Final CTA** — **the one wine band** (brand rule: one per page)
10. **Enquiry** — the lead form (white)

**Removed from the homepage on purpose:** the *Statistics* band (its figures — "120+
practice hours", "14 students per cohort", "6 weeks" — were the brand doc's voice
*examples*, not confirmed facts, and the brief forbids invented numbers; the file is
deleted) and *Testimonials* (only placeholder quotes exist). `Testimonials.tsx` is kept
for when real student stories arrive.

**Where the pasted directive was overridden by client-supplied brand documents:** it
specifies Warm Charcoal `#2A2326`, Cormorant Garamond/Manrope and a two-CTA hero. The
client's own Brand System PDF specifies Wine `#7E1F3D`, Playfair Display + Jost and one
CTA per layout, so those stay (§1). The hero keeps a second action but as a quiet
`ArrowLink`, not a second button.

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

The former homepage Statistics band was **deleted** (see §4): its figures were the
brand doc's example numbers, not confirmed facts. If real cohort/placement figures are
ever supplied, treat them under the same confirmed/pending policy as course fees.

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

**Lead delivery (`app/api/leads/route.ts`).** The only server endpoint. In order, a request is:
rate-limited per client (5 / 60 s, in-memory, best-effort), rejected if its `Origin` is another
site (403), rejected unless `Content-Type: application/json` (415) or if the body is over 4 KB
(413), checked for the honeypot field (a bot gets a fake success and nothing is delivered),
validated with the shared Zod schema (400), and then **delivered** to `LEADS_WEBHOOK_URL` as a
signed JSON POST (HMAC-SHA256 in `X-KALA-Signature`, 8 s timeout, https only in production).
The route never returns success for a lead it did not deliver: with no destination configured,
or if the destination fails, it answers 503 and the form shows WhatsApp / phone links instead.
`.env.example` documents the payload and signature format. Only the lead id is ever logged.

**Headers (`next.config.ts`).** HSTS, `X-Content-Type-Options`, `X-Frame-Options: DENY`,
`Referrer-Policy`, `Permissions-Policy`, and — in production builds — a Content-Security-Policy
built from what the site really loads (self-hosted scripts/styles/fonts/images, one same-origin
POST). `'unsafe-inline'` remains on `script-src` and `style-src` because Next.js and Framer
Motion write inline scripts/styles; a nonce policy would end static rendering. `X-Powered-By`
is off. When GA4 / Meta Pixel are added, extend `script-src` and `connect-src`.

**Dependencies.** `npm audit` is part of the release gate. At the time of writing the only
open advisories are in the dev-only lint toolchain (`braces` → `micromatch` → `fast-glob` →
`@next/eslint-plugin-next`), which ships nothing to visitors and has no patched release.

**Content gating.** `data/trainers.ts` carries `confirmed: boolean`; nothing renders a trainer
(the home "people" section, a course page's Trainer line) until it is `true`, so placeholder
names and invented titles cannot reach a visitor.

---

## What's still open

- **Photography** — 15 of the 54 slots in `data/images.ts` now carry a photograph (hero,
  founder, the three journey stages, the five course crafts, the "learn professionally"
  story frame, the two Why KALA frames and the closing flat-lay backdrop); the other 39 are still empty frames, each `label` being the shot brief. Exact
  file names and pixel sizes are in [`IMAGE-BRIEF.md`](IMAGE-BRIEF.md). The photographs wired
  so far are AI-generated or AI-assisted concepts (the founder, a uniform and wall signage
  that are not the academy's real ones), so they are placeholders for review — authentic
  photography of the real academy is still the goal, and the brand doc is explicit that
  authentic beats stock.
- **Client confirmation of one authoritative fee + duration per course** (§5) —
  the single biggest blocker to launch; nothing commercial can go live until this
  is resolved.
- Real trainer bios and testimonials (course *curriculum* is now real — see §5 —
  only these remain placeholder; `Testimonials.tsx` waits unrendered for real quotes).
- L2/L3/L4 logo lockup files and a vector master (flagged as the brand audit's own
  blocking gap).
- Real content for the editorial pages: the founder's story and name, real trainer
  names/roles (`data/about.ts` `PEOPLE` / `ABOUT_STORY`), and real captions for The Work
  once its photographs exist (`data/work.ts`). Optional: a lightbox for `/the-work`.
- **Lead destination** — set `LEADS_WEBHOOK_URL` (and `LEADS_WEBHOOK_SECRET`) in the
  production environment. Until then the enquiry form shows its WhatsApp / phone fallback
  instead of accepting leads (§7). The single most important launch task.
- **Visible placeholder copy:** `/privacy` and `/terms` still say "pending legal review —
  placeholder route"; the legal text has to come from the client, and the privacy notice is
  linked from the enquiry form, so it is a launch requirement. (The home "people" section and
  course-page Trainer line are now hidden until `data/trainers.ts` has confirmed people.)
- FAQ: `data/faqs.ts` is still placeholder and is not rendered anywhere yet.
- CSP hardening, once real third-party scripts (analytics, maps) exist to tune it
  against.
