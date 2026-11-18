# One-page editing guide (no developer needed)

All content lives in `/content`. Edit a file, save, run `npm run build`, deploy.
Never edit the phone number, address, licence or rating in a page — change them
once in `content/business.ts` and every page, footer and schema updates.

| I want to… | Edit | Notes |
| --- | --- | --- |
| Publish a special | `content/specials.ts` | Set `approved: true`, fill `amount`, `finePrint`, `startDate`, `endDate` (`YYYY-MM-DD`). Offers with `approved: false` or no dates are hidden automatically. Never put the amount inside an image. |
| Change the top announcement | `content/promos.ts` | Set `enabled: true`, `message`, `startDate`, `endDate`. It disappears by itself after the end date. |
| Add / change an FAQ | `content/faqs.ts` (site-wide) or `content/services.ts` / `content/cities.ts` (per page) | Questions and answers become an accessible `<details>` accordion and FAQPage schema. |
| Add a news article | add `content/posts/my-article.mdx` | Copy an existing file's `export const meta = {…}` line, then write MDX below it. Run `npm run migrate:posts` only to re-import the old WordPress site. Add the slug to `content/posts/index.ts` and a title/description to `content/seo.ts`. |
| Change NAP, hours, rating, socials | `content/business.ts` | `google.rating` / `reviewCount` / `lastUpdated` are editable values, not a live feed. |
| Add a town's local proof | `content/cities.ts` | Fill `landmarks` (2–3 verifiable references) and `reviews` (approved excerpts). The page shows those blocks only when the arrays are non-empty. |
| Update plan benefits | `content/plans.ts` | `security` / `assurance` booleans. The Saturday row only appears if `business.config.saturdayServiceEnabled` is `true`. |
| Enable Saturday service | `content/business.ts` | `config.saturdayServiceEnabled = true` — this adds Saturday to the booking form **and** the plan table. |
| Add a lender pre-qualification link | `content/financing.ts` | Set `prequalificationUrl` and `providerLabel` once the lender approves. The CTA appears on the replacement and financing pages only when populated. |
| Enable commercial HVAC | `content/business.ts` | `config.commercialEnabled = true` — nav/section still needs client scope approval. |
| Approve the two existing testimonials | `content/testimonials.ts` | Set `approved: true` on each quote the client permits. |
| Change navigation | `content/nav.ts` | Keep 7 or fewer top-level items; the build fails otherwise. |

## Before every deploy

```bash
npm run verify
```

(This runs typecheck, all four content gates, 28 unit tests and the production build.)

The build **fails** on: unfilled blog placeholders, hard-coded phone/address
values outside `business.ts`, duplicate page titles, missing/overlong meta
descriptions, broken internal links, redirect chains, unverified social links,
duplicate homepage sections, or a booking form with more than 7 required inputs.

## Launch checklist

1. Fill `.env.local` from `.env.example` (`RESEND_API_KEY`, `OFFICE_EMAIL`,
   `CONFIRMATION_FROM_EMAIL`). **In production, without these the form returns 503**
   and tells the visitor to call — it never pretends to send. On staging/CI set
   `ALLOW_TEST_BOOKINGS=true` to see the explicit test-mode screen. Also set
   `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` for shared rate limiting.
2. Submit one real test booking. Confirm the office inbox and customer
   confirmation both arrive.
3. Set `NEXT_PUBLIC_SITE_URL` to the live domain and `NEXT_PUBLIC_NOINDEX=false`,
   submit `sitemap.xml` in Search Console, set `NEXT_PUBLIC_GTM_ID`, and capture
   GA4 / GSC baselines. Check `/api/health` reports `bookingEmailConfigured: true`.
4. Confirm the items in `HANDOFF.md` with the client.
