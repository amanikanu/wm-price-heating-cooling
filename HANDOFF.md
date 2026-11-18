# HANDOFF.md — production hardening complete; client checklist remains

**Last updated:** 2026-11-17 · **Status:** all technical work within the builder's reach is done.
The site is deployable and **fails closed** rather than losing a lead. Only secrets,
approved content and business decisions remain — listed in §4. There are **no TODO
markers on any public page**.

All facts used come from PRD §16.3 or copy/assets actually published on
priceheating.com on 2026-11-17. Nothing was invented.

---

## 1. Verified against the live site (not invented)

Google review link and verified socials (Facebook, X, Nextdoor) · the two mislabelled
footer icons · Assurance/Security benefit rows · 54 blog articles with dates, bodies and
slugs · two `company-state` slugs and blank-city excerpts · special amounts hidden in
image alt text · the two testimonials · WKBN feature article and YouTube ID
`zYASIEINXtM` · logo, mascot and share image · 425 legacy URLs from all eight XML sitemaps.

---

## 2. Discrepancy matrix (§16.4) — all 13 pass

| # | Fix | Test | Status |
| --- | --- | --- | --- |
| 1 | 6-field short form + emergency path, ZIP not 50-state dropdown | `tests/booking.test.ts`, E2E | ✅ |
| 2 | Saturday gated by config flag | unit + E2E | ✅ |
| 3 | One Book Service form; `/request-estimate/` 301 with `?type=Estimate` | `check-redirects`, E2E | ✅ |
| 4 | Offer/financing in replacement flow; banner expiry | `tests/promos.test.ts` | ✅ (copy pending) |
| 5 | Blog placeholder scan, clean slugs + 301s | `check-content`, unit, E2E | ✅ 0 matches, 54 posts |
| 6 | Specials as real text with amount/dates; nothing baked into images | `check-content`, unit | ✅ all hidden until approved |
| 7 | Verified socials only | `check-content`, unit | ✅ |
| 8 | No duplicate sections / H2 | `check-content`, E2E | ✅ |
| 9 | Unique title + meta description per page | `check-seo` | ✅ 103 unique |
| 10 | 7 top-level nav items | `check-content`, E2E | ✅ |
| 11 | One canonical URL per service | `check-content`, unit | ✅ |
| 12 | No overlay, semantic markup | axe on **all 103 routes** | ✅ 0 serious/critical |
| 13 | Zero failed requests / console errors | E2E across all routes | ✅ |

---

## 3. Production-hardening fixes applied in this pass

| Was | Now |
| --- | --- |
| Form returned `ok:true` even when email wasn't configured; a lead could be silently lost | **Fail-closed**: in production with no email config the API returns **503** + a call number; the form shows a call panel. Verified live on a second production-mode server. Staging/CI can opt into an explicit test-mode screen with `ALLOW_TEST_BOOKINGS=true`. |
| Single fetch, no timeout, no retry, no idempotency | Resend sends use an 8 s timeout, up to 3 attempts on 5xx/429/network, an `Idempotency-Key`, and `reply_to` on the office email. Both sends must succeed; partial failures return 502. |
| In-memory-only rate limiter (ineffective on serverless) | **Shared-store-aware** limiter: set `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` for atomic cross-instance counting; falls back locally with a warning if the store is unavailable. `Retry-After` on 429. |
| Responses cacheable; unbounded body | `Cache-Control: no-store` on all booking responses and `/api/health`; 16 KB body cap → 413. |
| Conversion events lost if the user submitted before accepting cookies | Events queue **in memory only** (nothing leaves the device) and flush to `dataLayer` on consent. Added `call_click` tracking on every phone link. |
| Call tracking swapped only the `href`, leaving a visible number mismatch | Swaps `href`, visible number and `aria-label` after consent; real NAP stays in server markup. |
| No field measurement of INP | `web-vitals` (onINP/LCP/CLS/FCP/TTFB) reports into the consent-gated `dataLayer`. First-party, no extra network, no PII. Once GTM is connected you get real-user INP. |
| Generic Lighthouse CI config | Mobile emulation fixed (removed contradictory `preset: desktop`), Chrome path wired from Playwright, `wait-on` fix, `npm run verify` gate script. `NEXT_PUBLIC_NOINDEX=true` for staged deploys (metadata + robots.txt). |
| No error boundaries / health probe | `app/error.tsx`, `app/global-error.tsx`, `/api/health` (reports whether booking email is configured, no secrets). |
| F5 lender link had nowhere to go | `content/financing.ts` holds `prequalificationUrl` + `providerLabel`; the CTA appears only once populated. |
| axe on 6 templates | **All 103 public routes** swept for serious/critical violations, console errors and failed requests. |

---

## 4. YOUR checklist — the remaining work (secrets, approvals, decisions)

1. **Email delivery (the only hard functional blocker).** Set `RESEND_API_KEY`, `OFFICE_EMAIL`, `CONFIRMATION_FROM_EMAIL` (from a verified sending domain). Then submit one real test booking and confirm **both** the office email and the customer confirmation arrive. `/api/health` will report `bookingEmailConfigured: true`. Definition of done #4.
2. **Shared rate limiting.** Set `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` on the production host. Without them the limiter still works per instance but not across serverless instances.
3. **Analytics & call tracking.** Set `NEXT_PUBLIC_GTM_ID`; optionally `NEXT_PUBLIC_CALL_TRACKING_NUMBER`. Capture GA4 + Search Console baselines before launch. RUM/INP data starts flowing once GTM is connected.
4. **Approved promotional copy.** Populate `content/specials.ts` (`approved: true`, amount, fine print, start/end dates) and `content/promos.ts` (banner). Supply the current rebate / 0% terms and end dates, lender language, and the lender pre-qualification URL into `content/financing.ts`. Confirm Carrier brand / co-op rules before using logo or award artwork.
5. **Content approvals.** Approve or remove the two testimonials (`content/testimonials.ts`) and set `showAggregateRating` if compliant visible reviews exist. Confirm the migrated plan feature rows, supply full service-page copy exports, real team/van/install photos and a real service-area map.
6. **City local proof.** Fill `landmarks` (2–3 verifiable references) and `reviews` for each of the 15 towns in `content/cities.ts` — F15 is not fully met without them.
7. **Business decisions.** Saturday service (`saturdayServiceEnabled`), commercial HVAC (`commercialEnabled`), Yelp/HomeAdvisor profiles, WKBN embed rights, CRM/field-service software for F6/F7 (P2), and whether to merge Request Service + Estimate (the build merged them per §16.4 #3).
8. **F21 / CMS decision.** §16.2 mandates typed files + MDX with no CMS, so editing = files + `npm run build` via `EDITING.md` (satisfies §16.12 #6) but is **not** a browser CMS. If the office needs a browser editor, that is a separate build decision.
9. **SEO review of bulk redirects.** 229 legacy product URLs and 57 testimonial URLs 301 to the nearest live page, not dedicated equivalents. Promote any high-value URL to its own page before launch. Confirm domain/hosting/DNS/GBP/Analytics ownership and any vendor contract, and cancel the accessibility-overlay contract if separate.
10. **Launch.** Avoid a cold snap / heat wave and Carrier programme deadlines. Confirm `NEXT_PUBLIC_SITE_URL`, submit `sitemap.xml`, and monitor 404s + form delivery daily for two weeks.

**Open questions from PRD §14 remain open** (hosting/ownership, CRM and booking API, Saturday scope, commercial scope, review platforms, photo assets, lead-volume baseline, overlay contract, seasonal deadlines).

---

## 5. Deliberate implementation decisions

- **Exact 301s via `middleware.ts`** (Next config redirects emit 308); `trailingSlash: true` keeps legacy paths exact with no normalisation hop.
- **No CMS** per §16.2; `EDITING.md` is the one-page guide.
- **`aggregateRating` omitted** until compliant, on-page visible reviews exist.
- **Specials, banner and testimonials hidden, not faked** — no invented amounts, terms or quotes.
- **Blog migration** via `scripts/migrate-posts.py` (54 posts, placeholder repair, internal-link rewrite, clean slugs + 301s).
- **Preview server** runs with `ALLOW_TEST_BOOKINGS=true BOOKING_RATE_LIMIT=100` so E2E and demos work; production defaults are fail-closed and 5/IP/10 min.

---

## 6. Verification results (2026-11-17, local production build)

| Gate | Result |
| --- | --- |
| `npm run verify` (typecheck + 4 content/SEO/redirect/link gates + unit tests + build) | pass |
| Unit tests | **28/28** (incl. fail-closed 503, 413, 400, test-mode, rate-limit fallback, consent queue) |
| `npm run build` | 109 static pages; homepage First Load JS 114 kB (< 150 kB) |
| Live sweep of all 425 legacy URLs | **425/425** resolve (100×200, 325×301→200), 0 chains, 0 failures |
| Playwright E2E (chromium + mobile) | **38/38** pass |
| axe | **all 103 routes**, 0 serious/critical, 0 failed requests, 0 console errors |
| Lighthouse mobile (home / service / city / booking) | Perf **98/99/99/98** · A11y **100** · BP **100** · SEO **100** · LCP 2.2–2.4 s · CLS **0** |
| Production fail-closed, live | POST → `503 {"unavailable":true}` with call number; homepage still 200 |
| `/api/health` | `{status:"ok", bookingEmailConfigured:false}` (no secrets exposed) |

**Definition of done:** #1, #2, #3, #5, #6 met. #4 needs the email variables in §4.1.
CI (`.github/workflows/ci.yml`) runs every gate, E2E and Lighthouse CI.
