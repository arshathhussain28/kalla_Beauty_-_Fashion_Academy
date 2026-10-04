# KALA Beauty & Fashion Academy — website

Marketing and enquiry site for **KALA Beauty & Fashion Academy** (Thiyagadurugam). It presents the
five real courses, tells the Craft → Confidence → Career story, and routes visitors to WhatsApp, a
phone call or the enquiry form.

> **Status: pre-launch.** The build is feature-complete for the homepage, course catalogue, course
> pages and contact flow. Two things block launch and are tracked in
> [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md#whats-still-open): real photography (every photo is a
> labelled placeholder) and client confirmation of one authoritative fee and duration per course.

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4 — tokens live in `app/globals.css` under `@theme` |
| Motion | Framer Motion (scroll-driven sections) + CSS for the hero |
| Validation | Zod (lead form and `/api/leads`) |
| Fonts | Playfair Display + Jost, self-hosted via `next/font/local` |

> This is a recent Next.js with breaking changes. Before changing framework-level code, read the
> bundled docs in `node_modules/next/dist/docs/` (see [`AGENTS.md`](AGENTS.md)).

## Getting started

Requires Node.js 20.9 or newer (`.nvmrc` pins 22).

```bash
npm ci
cp .env.example .env.local   # then fill in values — never commit .env.local
npm run dev                  # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run lint` | ESLint |
| `npm run build` | Production build, including the TypeScript check |
| `npm start` | Serve the production build |

### Environment variables

All are documented in [`.env.example`](.env.example). None are required for local development; the
site falls back to `http://localhost:3000` and the number in `data/site.ts`. Server-only values
(`LEADS_WEBHOOK_*`) must never be given a `NEXT_PUBLIC_` prefix.

## Project layout

```
app/            routes, layouts, metadata, /api/leads
components/     ui/ (primitives), sections/ (homepage, in page order), courses/, forms/, navigation/
data/           content as typed data: courses, trainers, image slots, journey copy, site facts
lib/            seo, validation, whatsapp links, motion + scroll helpers
public/         brand assets, self-hosted fonts
docs/           ARCHITECTURE.md — design system, sitemap, motion system, decisions
```

Start with [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md); it is kept current and explains why things
are the way they are.

## Conventions that matter

- **No invented facts.** Fees, durations, certifications, placements, trainer credentials, student
  numbers and reviews are never made up. Commercial fields use `ConfirmableValue`
  (`pending_confirmation` / `confirmed`) in `data/courses.ts` and render only once confirmed.
- **Photography goes through the slot registry.** Every photo is a named slot in `data/images.ts`.
  A slot with `src: null` renders a labelled "Photography pending" placeholder (the label is the shot
  brief). To go live, add the file under `public/images/` and set `src` and a real `alt` on that slot.
  No stock imagery.
- **Brand tokens are fixed.** Wine `#7E1F3D`, Cream `#FBF1EF`, Rose Gold `#D2938C` (accent only),
  Deep Wine `#5C1428`, Ink `#2A1D21`; Playfair Display + Jost; square corners, one wine band per page,
  one primary CTA per layout. Change them only via a design review, not inline.
- **Scroll-linked motion uses `useScrub`** (`lib/scrub.ts`), never a bare short-range `useTransform`.
  The reason is documented in the file and in `docs/ARCHITECTURE.md`.
- **Reduced motion is handled in CSS** (`app/globals.css`), not with a JS branch, so server and client
  markup always match.

## Working on this repository

- `main` is the stable branch. Work on a short-lived branch (`feat/…`, `fix/…`, `docs/…`) and open a
  pull request; CI (lint + production build) must pass before merging.
- Commit messages: imperative summary line (≤ 72 chars), then a body explaining *why* when it is not
  obvious.
- Before pushing: `npm run lint && npm run build`.
- Never commit `.env*` files (other than `.env.example`), credentials, or client-supplied source
  documents (brand PDFs, posters).

## Deployment

Hosted on Vercel, deployed from this repository: every push to `main` redeploys production and every
pull request gets its own preview URL. The build is a standard Next.js app and runs on any Node-capable
host. Set the variables from `.env.example` in the host's environment, with `NEXT_PUBLIC_SITE_URL` set
to the real domain so canonical URLs and the sitemap are correct.

**Search indexing is off by default** (`robots.txt` disallows everything and pages are `noindex`) so
review deployments with placeholder photography and unconfirmed fees can't appear in search. At launch,
set `NEXT_PUBLIC_ALLOW_INDEXING=true` on the production environment and redeploy.

## Licence

No licence is granted. All rights are reserved pending the client's decision on how the code and brand
assets may be used.
