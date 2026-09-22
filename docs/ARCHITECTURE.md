# KALA Beauty & Fashion Academy — Architecture

Status: **Foundation stage.** This document covers design system, sitemap, component
architecture, data architecture, technical architecture and security architecture.
Homepage visual composition, Navbar/Footer, and full section-level UI are intentionally
**not yet built** — they're scoped for the next stage, after creative-direction sign-off.
Everything below is real, running code (see `npm run dev`), not a mockup.

---

## 1. Design System

### Palette (`app/globals.css`)

| Token | Hex | Usage |
|---|---|---|
| `ivory` | `#F7F2ED` | Primary light background |
| `sand` | `#E9DED7` | Secondary background, borders, cards |
| `charcoal` | `#2A2326` | Primary text, primary dark sections |
| `ink` | `#171416` | Deepest dark, reserved for high-contrast moments |
| `rose-gold` | `#D2938C` | Accent only — target ~10% of any view. Used for eyebrow labels, active states, underlines, small accents. Never as a large fill. |
| `white` | `#FFFFFF` | Cards on dark sections, contrast text |

Tailwind v4 is CSS-first here (no `tailwind.config.ts`) — tokens are declared in
`app/globals.css` under `@theme inline` and generate utilities directly: `bg-ivory`,
`text-charcoal`, `border-rose-gold`, `font-display`, `font-sans`, etc.

### Typography

- **Display:** Playfair Display (variable, vendored locally at `app/fonts/`) — large
  editorial headlines, high contrast serif, reads as fashion-editorial rather than
  generic-AI-SaaS.
- **Body/UI:** Manrope (variable, vendored locally) — modern, geometric, distinct from
  the ubiquitous Inter/system-ui "AI product" look.
- **Fluid scale:** `text-display-xl` (~52–120px), `-lg` (~44–88px), `-md` (~36–60px),
  `-sm` (~28–40px), all via `clamp()` so desktop hits the 80–120px brief without manual
  breakpoints and mobile never overflows.
- Both fonts are self-hosted `next/font/local` files, not fetched from Google at
  request time — zero external font requests, no CLS.

### Surface & shape conventions

- **Radius:** minimal to none (`rounded-none`/`rounded-sm`). No `rounded-xl/2xl/3xl`
  "SaaS card" look anywhere.
- **Buttons:** rectangular, bordered, uppercase, letter-spaced (`tracking-[0.14em]`),
  generous padding — see `LeadForm`'s submit button for the reference implementation.
- **Motion:** slow, intentional, fade/reveal-based. `prefers-reduced-motion` is honored
  globally in `globals.css`. Framer Motion is installed and ready; not yet used —
  section-level reveals belong to the visual implementation stage.
- **Focus/selection:** rose-gold focus ring and text-selection color are set globally
  for accessibility and brand consistency.

---

## 2. Sitemap

| Route | Status | Notes |
|---|---|---|
| `/` | Placeholder (design-token smoke test) | Full 14-section composition is next stage |
| `/courses` | Functional, minimally styled | Data-driven from `data/courses.ts` |
| `/courses/[slug]` | Functional, minimally styled | Full content model + working `LeadForm` + WhatsApp CTA |
| `/why-kala` | Stub | Learn-by-making journey visual pending |
| `/the-work` | Stub | Editorial work grid pending real photography |
| `/about` | Stub | Brand story pending |
| `/contact` | Functional, minimally styled | `LeadForm` + WhatsApp CTA |
| `/api/leads` (POST) | Functional | Validates, honeypot-checks, rate-limits |
| `/sitemap.xml`, `/robots.txt`, `/icon` | Functional | Generated from `data/courses.ts` + env |
| `/*` (404) | Functional | Branded copy per spec §36 |

Primary nav (per spec §6): `Courses · Why KALA · The Work · About` + `Enquire Now` CTA.
Not yet implemented as a component (see Component Architecture).

---

## 3. Component Architecture

Planned inventory, organized by `components/<domain>/`. **Built** = exists and used
today. **Planned** = named and scoped, not yet built (visual stage).

```
components/
  ui/
    PageStub.tsx        [Built]  temporary placeholder for un-designed routes
    Button.tsx           [Planned] canonical CTA — replaces ad-hoc classes in LeadForm
  navigation/
    Navbar.tsx            [Planned]
    MobileMenu.tsx         [Planned]
    StickyMobileBar.tsx     [Planned] WhatsApp + Call, mobile only
  courses/
    CourseCard.tsx           [Planned]
    CourseGrid.tsx            [Planned]
    CategoryCard.tsx           [Planned] hover-reveal, "Find Your Craft"
  sections/
    Hero.tsx                    [Planned]
    SectionHeading.tsx            [Planned]
    BrandStatement.tsx              [Planned]
    StudentWorkCard.tsx               [Planned]
    TrainerCard.tsx                     [Planned]
    TestimonialCard.tsx                   [Planned] before/experience/after structure
    FAQAccordion.tsx                        [Planned]
    FinalCTA.tsx                              [Planned]
  forms/
    LeadForm.tsx        [Built]  used on /contact and /courses/[slug]
  conversion/
    WhatsAppButton.tsx    [Planned] wraps lib/whatsapp.ts helpers
  Footer.tsx               [Planned]
```

`LeadForm` was deliberately built now (not deferred) because it's conversion/data
plumbing, not visual design — it proves the form → validation → API → success path
end-to-end. Its current styling is intentionally plain and will be restyled, not
rebuilt, once Navbar/Button/visual language land.

---

## 4. Homepage Section Architecture

Per spec §7, 14 sections in this order, alternating light/dark/sand and
image/text/full-width for visual rhythm — none of these are built yet:

1. Hero — large type + real photography, two CTAs (Explore Courses / Talk to an Advisor)
2. Brand Statement — "Your talent deserves a craft"
3. Discover Your Craft — category hover cards (Beauty/Makeup/Hair, Fashion/Tailoring/Design)
4. Why KALA — Watch → Practice → Create → Refine → Present
5. Craft → Confidence → Career
6. The Work / Student Work
7. Learn by Making
8. Inside KALA — studio/classroom/tools/trainers
9. Trainers / People
10. Testimonials
11. Courses
12. FAQ
13. Final Admission CTA
14. Footer

---

## 5. Data Architecture

TypeScript-first, framework-agnostic today so a CMS can own this data later without a
UI rewrite (spec §23) — components consume typed accessor functions, not raw arrays.

- **`data/courses.ts`** — `Course` (slug, category, discipline, duration, level,
  curriculum modules, career paths, FAQs, trainer reference, images) +
  `getAllCourses()` / `getCourseBySlug()` / `getCoursesByCategory()`.
- **`data/trainers.ts`** — `Trainer` + `getTrainerBySlug()`.
- **`data/testimonials.ts`** — `Testimonial` with the before/experience/after shape
  from spec §15, + `getTestimonialsForCourse()`.
- **`data/faqs.ts`** — site-level `SiteFaq[]` for the homepage FAQ section (course-level
  FAQs live on the course record itself).
- **`lib/validation.ts`** — `leadFormSchema` (Zod), shared verbatim by the client form
  and the server route so they can never drift.

All current records are **explicitly placeholder** (see file-header comments) —
structure is real, content is not, per instruction not to invent facts about KALA.

---

## 6. Technical Architecture

- **Stack:** Next.js 16.3 (App Router, Turbopack), React 19, TypeScript (strict),
  Tailwind CSS v4, Framer Motion (installed, unused so far), Zod, `clsx` +
  `tailwind-merge` (`lib/utils.ts#cn`).
- **Rendering:** static generation by default; `/courses/[slug]` uses
  `generateStaticParams`; `/api/leads` is the one dynamic route. Cache Components is
  **not** enabled — standard Next.js rendering model, no `"use cache"` requirements.
- **Routing:** file-system App Router. Route groups (e.g. `(marketing)`) are available
  if/when Navbar variants are needed, not used yet since there's only one section today.
- **Fonts:** vendored locally at `app/fonts/*.woff2` and loaded via `next/font/local`
  rather than `next/font/google`. This sandbox's Turbopack build could not reach
  `fonts.gstatic.com` at build time (TLS/proxy quirk specific to Turbopack's fetcher —
  plain Node `fetch` and `curl` both reached it fine), so the files are self-hosted
  directly. This is equal-or-better practice regardless of environment; no action
  needed when this moves to a normal dev machine or CI.
- **Env vars:** documented in `.env.example` (site URL, WhatsApp number, analytics IDs,
  leads webhook placeholders, rate-limit tuning). Nothing secret is required yet because
  no real CRM/analytics/WhatsApp Business API is wired in.
- **Lead backend:** `POST /api/leads` validates with the shared Zod schema, checks a
  honeypot field, applies a best-effort in-memory rate limit, and currently
  console-logs the structured lead (dev only) in place of real persistence — clearly
  marked `TODO(lead-backend)` for the real CRM/DB/webhook integration.

---

## 7. Security Architecture

**Done now** (doesn't need creative or product input):

- Security headers via `next.config.ts#headers()`: `X-Content-Type-Options: nosniff`,
  `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`,
  restrictive `Permissions-Policy`, HSTS.
- Server-side validation on `/api/leads` via the same Zod schema as the client — the
  client check is a UX nicety, never trusted alone.
- Honeypot field on `LeadForm` (visually hidden, `aria-hidden`, `tabIndex={-1}`); a
  filled honeypot returns a fake-success response so bots don't learn to skip it.
- Best-effort in-memory rate limiting on the leads endpoint (per-IP, sliding window).
- No secrets in client code — the WhatsApp number is intentionally public (it's a
  click-to-chat link, not an API credential); actual WhatsApp Business API tokens, a
  future CMS's credentials, and any DB/webhook secrets are server-only env vars per
  `.env.example` and are never referenced from a Client Component.
- Generic error responses from `/api/leads` — no stack traces or internal details
  reach the client.

**Deliberately deferred** to the dedicated Security phase (spec §42 Phase 14), once
there's a real surface of third-party scripts to tune against:

- Content-Security-Policy — needs to be written against the actual analytics/WhatsApp/
  maps scripts this project ends up loading, not guessed in advance. A guessed CSP
  either does nothing (`unsafe-inline` everywhere) or breaks the app in ways that are
  hard to diagnose without those scripts present yet.
- Nonce-based script hardening.
- Real persistence + auth for `/api/leads` (currently no DB/CMS exists to authorize
  against).
- Dependency audit as part of CI (no CI pipeline exists yet).

---

## What's deliberately *not* in this stage

Per the project's own staged workflow (architecture → creative direction → visual
implementation → design review → launch QA), this stage stops short of: Navbar/Footer,
Hero and all 14 homepage sections, the category-hover "Find Your Craft" interaction,
photography/imagery treatment, and any Framer Motion usage. Building those now would
lock in visual decisions before creative direction has reviewed the design system —
the next message in this project should be the Creative Director pass.
