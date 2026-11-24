# Running the KALA site

What to watch, what to set, and what to do when something breaks. Everything here is either
already in the code or a five-minute setup on a free plan.

---

## 1. Environment variables

Set in **Vercel → Project → Settings → Environment Variables** (Production, and Preview if you
want previews to behave the same). Never commit real values; `.env.example` is the template.

| Variable | Required | What it does if unset |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical URLs, sitemap and share previews point at the wrong host |
| `LEADS_WEBHOOK_URL` | **yes before launch** | **Enquiries are not stored.** The form answers 503 and sends the visitor to WhatsApp/phone |
| `LEADS_WEBHOOK_SECRET` | recommended | Deliveries are unsigned, so the receiver cannot prove they came from this site |
| `ALERT_WEBHOOK_URL` | recommended | Failures are only written to Vercel's runtime log; nobody is actively told |
| `NEXT_PUBLIC_ALLOW_INDEXING` | at launch | Set to exactly `true` to let search engines in. Anything else keeps the site hidden |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | optional | Falls back to the number in `data/site.ts` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | optional | Analytics stays a no-op |

Changing a variable needs a **redeploy** to take effect.

---

## 2. Where enquiries go

The form posts to `/api/leads`, which forwards the lead to `LEADS_WEBHOOK_URL` as JSON.

**The rule the code enforces:** a visitor is only shown "Thank you" when the destination
actually accepted the lead. If delivery fails, they see the WhatsApp and phone fallback
instead. There is a test for this (`tests/enquiry.spec.ts`) because the site shipped the
opposite behaviour once.

### Choose a destination

Two options. Both are free; pick on security vs. setup effort.

| | **A — Automation tool** (Make / Zapier / n8n) | **B — Google Sheet** (Apps Script) |
|---|---|---|
| Extra account | yes, one | no, just Google |
| Signature check | **yes** — the HMAC is verifiable | **no** — a URL token instead (see below) |
| Setup | ~15 min | ~10 min |
| Recommended for | launch | getting started today |

**Option A — automation tool (recommended)**
1. In Make, Zapier or n8n, create a scenario starting with a **Custom webhook**.
2. Add two steps: append a row to a Google Sheet, and send a WhatsApp or email alert to
   whoever handles admissions.
3. Verify the HMAC (below) and reject anything older than a few minutes.
4. Put the webhook URL in `LEADS_WEBHOOK_URL` and a long random string in
   `LEADS_WEBHOOK_SECRET` in Vercel, then redeploy.

**Option B — Google Sheet, no extra account**
1. Create a Google Sheet → **Extensions → Apps Script**.
2. Paste `docs/lead-receiver.gs` over the default file.
3. **Project Settings → Script properties**, add `LEAD_TOKEN` (a long random string) and,
   optionally, `NOTIFY_EMAIL`.
4. **Deploy → New deployment → Web app**; execute as *Me*, access *Anyone*. Copy the `/exec` URL.
5. In Vercel set:
   - `LEADS_WEBHOOK_URL` = that URL **with `?token=<your LEAD_TOKEN>` appended**
   - `LEADS_WEBHOOK_ACCEPTS_REDIRECT` = `1`
   - `LEADS_WEBHOOK_SECRET` = a long random string (sent, but unverifiable here — see below)
6. Redeploy.

> **Why Option B needs that extra flag, and why it is weaker.** An Apps Script web app cannot
> read request headers, so the `X-KALA-Signature` HMAC is invisible to it — the shared token in
> the URL is the check instead. Anyone who learns that URL could post a fake enquiry (they could
> not read your sheet). Apps Script also answers every POST with a 302 *after* the script has
> run and stored the lead; without `LEADS_WEBHOOK_ACCEPTS_REDIRECT=1` the site treats that as a
> failure and shows the visitor the WhatsApp fallback even though the row arrived. Leave that
> flag unset for every other receiver, where a redirect really does mean a wrong URL.

### Prove it works before you rely on it

```bash
npm run verify:leads -- "<your webhook url>" "<your secret>"
```

It sends one clearly-marked test enquiry exactly as the site would — same payload, headers,
signature, 8-second timeout and redirect handling — then tells you what came back and what to
do about it. Check the row arrived, then delete the test row.

Afterwards, submit one real enquiry through the live form as a final check.


---

## 3. Monitoring

### Uptime — `/api/health`

```json
{ "status": "ok", "leadDelivery": "configured", "alerting": "configured", "time": "…" }
```

Two different failures, reported separately on purpose:

| Question | How to watch it |
|---|---|
| Is the site up? | Monitor the **status code** of `/api/health` (or `/`) |
| Can it still take enquiries? | **Keyword check** for `"leadDelivery":"configured"` |

They are not merged into one status code: `leadDelivery` is unset today, so a 503 would leave
the monitor permanently red and a real outage would be lost in the noise.

**Setup (UptimeRobot free tier, 5 minutes):** add an HTTP monitor on
`https://<site>/api/health`, 5-minute interval, alert to email/WhatsApp. Add a second monitor
on the same URL with keyword type "not exists" and keyword `"leadDelivery":"configured"` — that
one tells you the form has gone deaf.

### Failure alerts — `ALERT_WEBHOOK_URL`

When an enquiry cannot be delivered, the server sends a JSON alert (Slack- and
Discord-compatible, and any automation tool accepts it):

```json
{ "text": "KALA website — …", "level": "error", "event": "lead.delivery_failed",
  "site": "…", "at": "…", "leadId": "…", "source": "…" }
```

**No visitor name or phone number is ever put in an alert** — only the random lead id — because
these land in a chat channel that is usually wider than the admissions team.

Unset, this is a no-op and the structured `[alert:error]` line in Vercel's runtime log is the
only record.

### Error monitoring — still open

`app/error.tsx` and `app/global-error.tsx` currently log to the browser console, which nobody
sees. To close this properly, add Sentry (free tier):

```bash
npx @sentry/wizard@latest -i nextjs
```

It needs a Sentry account and DSN, so it is a setup step for the owner rather than something
that can be committed blind. Add the Sentry host to `script-src`/`connect-src` in the CSP in
`next.config.ts` at the same time, or the browser will block it.

---

## 4. Tests

```bash
npm test              # full suite (builds and starts the production server itself)
npm run test:ui       # interactive runner
npm run test:report   # open the last HTML report
```

Playwright builds and serves a **production** build, because several behaviours only exist
there: the error boundary (dev shows Next's overlay), static generation, and the bundle split
that keeps the smooth-scroll library off phones.

| File | Protects |
|---|---|
| `smoke.spec.ts` | Every route loads, one `<h1>`, no console errors, no broken images, navigation works |
| `enquiry.spec.ts` | **Success only on real delivery**, WhatsApp fallback on failure, validation, honeypot |
| `integrity.spec.ts` | No placeholder text, no empty photo frames, no invented fees, draft notices, The Work gating, sitemap contents |
| `resilience.spec.ts` | API rejects GET/non-JSON/cross-site/oversized, security headers, health endpoint, 404 page, robots |
| `accessibility.spec.ts` | No sideways scroll at 3 widths, no text left invisible by an animation, reduced motion honoured, alt text, accessible names |

Browser coverage: **chromium** runs everything; **firefox**, **webkit** and an **iPhone 13**
profile run the `@xbrowser` subset. WebKit is what makes Safari/iOS testable at all from a
Windows machine.

> **Firefox does not run on this Windows machine.** Its Playwright binary is blocked from
> executing (`spawn UNKNOWN`, and the exe reports "Permission denied" — security software or a
> filesystem restriction). It runs normally on the Ubuntu CI runner, so Firefox coverage comes
> from CI rather than from a local run. Chromium, WebKit and the iPhone profile all run locally.

### The `E2E_HTTP` flag — read before touching security headers

The harness builds and serves with `E2E_HTTP=1`, which drops exactly two things:
`Strict-Transport-Security` and the CSP's `upgrade-insecure-requests`. Both force https, and
WebKit — unlike Chromium — applies them to loopback too, so over a plain `next start` every
stylesheet, script, font and image fails with an SSL error and the page renders completely
unstyled. That looks exactly like a catastrophic Safari layout bug and is purely an artefact.

**The trap:** Next.js evaluates `headers()` at *build* time and freezes the result into
`.next/routes-manifest.json`. A build made with the flag therefore ships without those two
directives and looks entirely normal. Vercel builds without it, so production is unaffected —
and `npm run check:headers` (run in CI's lint-and-build job, which never sets the flag) fails
the build if any security header or CSP directive is missing. Those two directives are
verified against the live site instead of in the suite.

CI runs lint + build + the header check, and the full browser suite, on every push and pull
request, and uploads the HTML report as an artifact.

---

## 5. Deploying and rolling back

Pushing to `main` deploys to production automatically.

**Rollback:** Vercel → Deployments → the last good one → **Instant Rollback**. That reverts the
served build without touching git; follow it with a `git revert` so the repository matches.

Tags are left at known-good points (for example `rollback-pre-phase0`).

**After any deploy that matters:**
1. `/api/health` returns 200
2. The home page and one course page load
3. Submit a test enquiry and confirm it arrives
4. `curl -I` the site and check the security headers survived

---

## 6. Before the site goes public

- [ ] `LEADS_WEBHOOK_URL` set, and one real enquiry received end to end
- [ ] `ALERT_WEBHOOK_URL` set, uptime monitor live
- [ ] Privacy and Terms reviewed, `LEGAL_STATUS` flipped to `"approved"` in `data/legal.ts`
- [ ] Real photographs in, AI concept images gone, the "illustrative images" line removed from the Terms
- [ ] Fees, durations, address and opening hours confirmed and entered
- [ ] Custom domain live, `NEXT_PUBLIC_SITE_URL` updated
- [ ] `NEXT_PUBLIC_ALLOW_INDEXING=true`, sitemap submitted to Search Console
- [ ] Hosting on a plan that permits commercial use
- [ ] Ownership of the repository and the Vercel project transferred
