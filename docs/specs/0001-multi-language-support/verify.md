# Verify: multi-language-support · spec 0001 · updated 2026-09-01
_Steps derived from spec 0001 acceptance criteria. `/check verify` runs these; `/test` locks the durable ones._

## UI / manual

- [x] View source (or `curl`) on `/strony-internetowe` and `/en/strony-internetowe` → both carry `<link rel="canonical">` pointing at themselves (never at their sibling), plus `<link rel="alternate" hreflang="pl">`, `hreflang="en"`, and `hreflang="x-default"` pointing at each other correctly → AC-7 — **verified**, evidence: `curl localhost:3000/strony-internetowe` and `/en/strony-internetowe`, both correct self-referencing canonical + full hreflang set
- [x] Repeat the canonical/hreflang check on the home page (`/` vs `/en`), `/social-media`, `/realizacje`, all 4 `/realizacje/<slug>` detail pages, `/wizualizacja`, `/dziekujemy`, `/regulamin`, `/polityka-prywatnosci`, `/polityka-cookies` → AC-7 — **verified**, evidence: same curl loop across all 26 URLs (13 pages × 2 locales), all correct, all HTTP 200
- [x] View source on `/en/*` pages → `<html lang="en">`; on Polish pages → `<html lang="pl">` → AC-7 — **verified**, same curl loop, `<html lang>` correct on every page/locale, including `/booking/confirmed` staying `lang="pl"` unaffected
- [x] View source on `/` and `/en` → the JSON-LD `<script type="application/ld+json">` block's `inLanguage` and business/service descriptions read `pl-PL`/Polish on `/` and `en-US`/English on `/en` → AC-7 (JSON-LD locale awareness) — **verified**, evidence: `grep` on both pages' JSON-LD showed `inLanguage":"pl-PL"` vs `"en-US"`, `og:locale` `pl_PL` vs `en_US`, and all 5 business/service descriptions in the correct language
- [x] Submit the contact form on the English site (`/en` → fill the form → submit) → after redirect, confirm the URL is `/en/dziekujemy`, not `/dziekujemy`, and its "back to home" link points at `/en` → AC-11 — **verified**, evidence: full 4-step Playwright run (`playwright-verify-en@example.com`), landed on `http://localhost:3000/en/dziekujemy`, title "Thank You | WeUnite", "Back to homepage" link href `/en`
- [x] Query the `leads` table (or Supabase dashboard) for the row just created by the English submission above → `locale = 'en'` → AC-5 — **verified**, evidence: PostgREST query on the Playwright-submitted row returned `"locale":"en"`, `"status":"new"`
- [ ] Submit the contact form on the Polish site (`/`) → confirm the resulting lead row has `locale = 'pl'` → AC-5 — **not run as a separate full browser flow this session** (the identical code path was exercised via a direct API call instead, see Commands section — same schema/insert code, lower-cost evidence, not a full UI walkthrough)
- [ ] Check the inbox used for the English submission above → the lead confirmation email arrived in English (subject line included) → AC-6 — **blocked**: submitted with a fake `@example.com` address with no accessible inbox from this session. Indirect evidence only: the step-4 request returned 200, no `Resend error:` appeared in server logs (the code explicitly logs failures), and `lead.locale === 'en'` was confirmed stored before the email call fires
- [ ] Check the inbox used for the Polish submission → the lead confirmation email arrived in Polish → AC-6 — **not run**, no Polish submission made this session (see above)
- [ ] Confirm the internal team notification email (sent to `ai.say.agency@gmail.com`) stays in Polish regardless of which locale the lead submitted from → AC-6 (team-facing email unaffected) — **not independently re-checked this run**; this email's code path was untouched by tasks 6-9 (confirmed by reading the diff, not by re-observing the email)

## Commands

- [x] `npx tsc --noEmit` → no errors → baseline for all of AC-5/6/7/8/11 — **verified**, clean
- [x] `npx eslint app components lib emails app/api` → no new errors (only the two pre-existing warnings already noted in the progress tracker) → baseline — **verified**, only the two pre-existing warnings
- [x] `rm -rf .next && npx next build` → every in-scope `[locale]` route renders `●` (static), both `/pl` and `/en` variants → confirms task 6 didn't regress static rendering — **verified**
- [x] `curl -s http://localhost:3000/sitemap.xml | grep -c '<url>'` → 24 entries (12 in-scope pages × 2 locales) → AC-8 — **verified**, exactly 24
- [x] `curl -s http://localhost:3000/sitemap.xml | grep -A3 '<loc>.*strony-internetowe'` → each `<url>` entry carries `<xhtml:link rel="alternate" hreflang="...">` for both locales → AC-8 — **verified**, correct on the sampled entry (pl + en variants both checked)
- [x] Query `information_schema.columns` for `leads.locale` → confirms migration 009 is actually live (not just generated) → AC-10, task 7 — **verified**, engineer confirmed via Supabase table editor screenshot; independently re-confirmed via PostgREST query this session
- [x] `select locale, count(*) from leads group by locale` equivalent → every row shows a non-null `locale` → AC-10 — **verified**, `leads?locale=is.null` returned `[]` (zero rows with null locale)
- [x] (bonus, not in the original plan) POST `/api/leads` step 1 with an invalid `locale: "xx"` → confirms coercion to `'pl'` rather than rejection, the spec's explicit invariant → **verified**, evidence: response `200 {"success":true}`, stored row showed `"locale":"pl"`
- [x] (bonus) `/fr/anything` → 404, not a crash → AC-9 — **verified**, `curl -w "%{http_code}"` → `404`
- [x] (bonus) `/en/booking` → 404; `/booking` and `/booking/confirmed` unaffected, still `lang="pl"` → AC-4 — **verified** for the routing/lang half; full booking-flow regression (with a real lead id) is Phase 4's job, not re-tested here

_Test leads created during this run (`verify-invalid-locale-*@example.com`, `verify-en-locale-*@example.com`, `playwright-verify-en@example.com`) were deleted from the live `leads` table after verification so they don't appear as false leads to the team._

## Acceptance-criteria coverage

- AC-4 (booking untouched) — partially covered as a bonus check above (routing + `lang`); full flow is Phase 4
- AC-5 (locale stored on lead, invalid/missing coerced to `'pl'`) — met, English side and the coercion invariant both verified with cited evidence; Polish side verified via the coercion test (which stores `'pl'`) and pre-existing production rows, not a fresh full Polish browser submission
- AC-6 (confirmation email in lead's language) — not directly observed (no accessible inbox); code path confirmed error-free at runtime, template branch confirmed present in the diff. Treat as **blocked**, not met, until an inbox check happens
- AC-7 (hreflang, canonical, html lang, JSON-LD locale) — met, verified across all 13 in-scope pages, both locales
- AC-8 (sitemap lists both locale addresses with hreflang) — met, verified
- AC-9 (unsupported locale → 404) — met, verified as a bonus check
- AC-10 (existing leads default to `locale = 'pl'`, migration live) — met, verified
- AC-11 (English form submission redirects to `/en/dziekujemy`) — met, verified via full Playwright run

**Not covered here** (out of scope for tasks 6–9, belongs to Phase 4 / spec build plan task 10): AC-1 through AC-3, AC-12, AC-13 — PostHog/Meta Pixel/cookie banner on `/en/*`, query-string preservation on locale switch, cookie-policy documentation, full page-by-page content review. See spec `index.md`'s Build plan task 10.
