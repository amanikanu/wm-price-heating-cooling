# Wm. Price Heating & Cooling — website rebuild

Production-hardened Next.js (App Router) + TypeScript + Tailwind site built to the
PRD's **§16 Build Spec**. Mobile-first, statically generated, no CMS, no
accessibility overlay, no third-party widgets. It **fails closed**: if booking
email is not configured in production, the form returns 503 with a phone number
instead of pretending to accept a lead.

## Quick start

```bash
npm install
cp .env.example .env.local      # fill in the values listed in HANDOFF.md §4
npm run dev                     # http://localhost:3000
```

```bash
npm run verify                  # typecheck + 4 content gates + 28 unit tests + build
npm run start                   # production server on 0.0.0.0:3000
npx playwright install --with-deps chromium
npm run test:e2e                # 38 Playwright + axe tests (desktop + mobile)
curl localhost:3000/api/health  # deployment probe, no secrets
```

Individual gates: `check:content`, `check:seo`, `check:redirects`, `check:links`,
`npm test`, `npm run typecheck`. The build fails on unfilled blog placeholders,
hard-coded NAP outside `business.ts`, duplicate titles, broken links, redirect
chains, unverified socials, duplicate sections, or >7 required form inputs.

## Architecture

| Layer | Where |
| --- | --- |
| Business facts (single source of truth) | `content/business.ts` |
| Typed content | `content/*.ts`, `content/posts/*.mdx` (54 migrated articles) |
| Routes | `app/` — one `[slug]` route serves all root pages + all blog posts; explicit folders for `/residential/`, `/city/`, `/products/`, `/assurance-and-security-plans/` |
| Components | `components/` — single responsive components incl. `BookingForm`, `WebVitals`, `AnalyticsConsent` |
| SEO | `content/seo.ts`, `lib/seo.ts`, `lib/schema.ts`, `app/sitemap.ts`, `app/robots.ts` |
| Booking | `components/BookingForm.tsx`, `app/api/booking/route.ts`, `lib/booking.ts`, `lib/email.ts`, `lib/rate-limit.ts` |
| 301 map | `content/redirects.ts` (generated from `content/legacy-urls.json`), served by `middleware.ts` |
| Analytics | `lib/analytics.ts` (consent queue), `components/WebVitals.tsx` (INP/LCP/CLS RUM), `components/AnalyticsConsent.tsx` |
| Resilience | `app/error.tsx`, `app/global-error.tsx`, `app/api/health/route.ts`, `NEXT_PUBLIC_NOINDEX` staging support |
| Gates | `scripts/check-*.ts`, `tests/`, `.github/workflows/ci.yml`, `lighthouserc.json` |

`trailingSlash: true` is deliberate: all legacy URLs end in a slash, so the 301
map matches exactly without a normalisation hop. Redirects are exact **301s**
(not Next's default 308) via middleware.

## Key environment variables

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY`, `OFFICE_EMAIL`, `CONFIRMATION_FROM_EMAIL` | **Required at launch.** Without them production returns 503 on booking. |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Shared rate-limit store for serverless/multi-instance. |
| `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_CALL_TRACKING_NUMBER` | Consent-gated analytics and optional call tracking. |
| `NEXT_PUBLIC_NOINDEX` | `true` on staging to noindex and disallow crawlers. |
| `ALLOW_TEST_BOOKINGS` | `true` **only** on staging/CI for the honest test-mode screen. |
| `BOOKING_RATE_LIMIT` | Submissions per IP per 10 min (default 5; CI uses 100). |

See `.env.example` for the full list.

## Facts and guardrails

Only facts from PRD §16.3, plus copy actually published on priceheating.com on
2026-11-17 (plan features, blog articles, logo/mascot, WKBN video ID, Google
review link, social links) are used. Anything unconfirmed is a config flag or
an empty field — see `HANDOFF.md`. No reviews, prices, rebate amounts, financing
terms, response-time promises or town-specific facts were invented.

`EDITING.md` is the one-page office editing guide; `HANDOFF.md` is the client
sign-off checklist and full verification record.
