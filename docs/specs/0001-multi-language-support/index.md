# 0001. Add Polish and English bilingual support to the marketing site

**Date**: 2026-09-01
**Status**: In Progress

## Summary

WeUnite's site is Polish only today, with no translation system in place. This spec adds English as a second language across the public marketing site, using the next-intl library (a translation toolkit built for Next.js). Polish keeps its current web addresses exactly as they are today (no change, no risk to existing search rankings); English pages live under a new `/en/` prefix. A visitor can switch language from the navigation bar, and the site remembers their choice. This reverses a decision recorded in `context/project-overview.md`, which had explicitly marked multi language support as out of scope; that document is updated alongside this spec.

## Context

See `rationale.md` for the full context, the options considered, and the rationale behind this decision.

## Requirements

**User stories**:
- As an English speaking visitor, I want to read the whole public site in English so I can understand WeUnite's offer without knowing Polish.
- As a Polish visitor, I want the site to work exactly as it does today (same web addresses, same language) so nothing breaks for existing traffic and search rankings.
- As a visitor, I want a language switcher in the navigation bar that keeps me on the same page when I change language, and remembers my choice on my next visit.
- As the WeUnite team, I want to know which language a lead was browsing in, so we can follow up with them in the right language.
- As a search engine, I want correct signals about which page serves which language, so each version gets indexed and shown to the right audience.

**Acceptance criteria** (the contract, each criterion is IDed and independently checkable):
- **AC-1**: Every in scope public page (home, `/strony-internetowe`, `/social-media`, `/realizacje` and its 4 project detail pages, `/wizualizacja`, `/dziekujemy`, `/regulamin`, `/polityka-prywatnosci`, `/polityka-cookies`) renders fully in Polish at its current web address, and fully in English at the same path under `/en/`, with no layout breakage and no leftover untranslated Polish text on the English version.
- **AC-2**: Existing Polish web addresses (e.g. `/strony-internetowe`, `/realizacje/nowy-relaks`) keep working exactly as they do today: same path, no `/pl/` prefix, no redirect, same rendered page structure for search engines and existing bookmarks or backlinks.
- **AC-3**: A language switcher in the Navbar (desktop and mobile) lets a visitor toggle between Polish and English from any in scope page, landing on the equivalent page in the other language (not the home page). The choice is remembered across page navigation and future visits, via a cookie.
- **AC-4**: `/booking` and `/booking/confirmed` stay Polish only, unaffected by this change (explicit decision, see `rationale.md`), and keep returning their normal page (HTTP 200) once the locale middleware is live. `/en/booking` does not exist and returns a normal "page not found."
- **AC-5**: The multi step contact form and its validation messages (both the ones shown instantly in the browser and the ones checked again on the server) render in the visitor's current language. Submitting the form on the English site, at every step that writes to Supabase (the first step that creates the lead, and the older single step fallback path), stores `locale = 'en'` on the resulting lead record.
- **AC-6**: The lead confirmation email is sent in the lead's stored language (an English lead gets an English email). The booking confirmation email and the internal team notification email always send in Polish, since booking stays Polish only and the notification is for the Polish speaking WeUnite team, not the visitor.
- **AC-7**: Each page carries correct "alternate language" link tags (`hreflang`), including a default fallback (`x-default`), pointing at its sibling language page; each page's canonical link points at itself, never at its Polish sibling; and the page's declared language (`<html lang>`) matches what is shown.
- **AC-8**: `app/sitemap.ts` lists both the Polish and English address for every in scope page, with correct alternate language annotations. `app/robots.ts` needs no change.
- **AC-9**: Visiting an address with an unsupported language segment (e.g. `/fr/anything`) returns a normal "page not found," not a crash.
- **AC-10**: Existing lead records (from before this change) default to `locale = 'pl'` after the migration. Specifically unaffected by the locale routing going live: PostHog page view capture still reaches `/ingest` on both the Polish and English trees; the Meta Pixel `PageView` still fires once per navigation; the browser side and server side (Conversions API) `Lead` events still share the same `event_id` (per `architecture.md`'s invariant against double counting); and the cookie consent banner still renders and persists its choice on `/en/*`.
- **AC-11**: Submitting the contact form on `/en/*` redirects to `/en/dziekujemy`, not `/dziekujemy`; that page's "back to home" link points at `/en`, not `/`.
- **AC-12**: The language switcher preserves the current query string (e.g. `fbclid`, `utm_*` ad tracking parameters) when it swaps locale, so switching language mid session does not break ad attribution.
- **AC-13**: `/polityka-cookies` documents the new locale preference cookie, in both languages.

## Options considered

See `rationale.md`.

## Decision

**Chosen option**: Option 1: next-intl with Polish unprefixed, English under `/en/`

Add next-intl to the existing Next.js App Router site, restructure the in scope routes under an `app/[locale]/` segment, and configure it so Polish keeps rendering at today's exact web addresses while English lives at the same paths under `/en/`.

## Feature design

**Data model sketch**:
- `leads` (existing table): add `locale text not null default 'pl' check (locale in ('pl','en'))`. Set automatically from the page the form was submitted on; not a field the visitor can type into. Existing rows backfill to `'pl'` in the migration.
- No other tables change. `/booking`'s tables (`booking_slots`, `blocked_dates`, `bookings`) are untouched, since booking stays Polish only.

**State transitions**: none, `locale` is set once at lead creation and never changes afterward.

**API surface**:
| Endpoint | Method | Key inputs | Key outputs | Auth | Key errors |
|---|---|---|---|---|---|
| `/api/leads` | POST | existing step 1 to 4 fields, plus `locale: 'pl' \| 'en'` (derived from the current page's path by the client, sent on the step 1 create call and on the older single step fallback payload alike, validated against the enum on the server) | existing response shape, unchanged | none (public form, as today) | unchanged; an invalid or missing `locale` value is coerced to `'pl'` rather than rejected, so a malformed value never blocks a real lead submission |

**Key invariants**:
- A Polish page never has an address containing `/en/`; an English page always does. No third state.
- `locale` on a lead is client supplied (the client knows which route it is on and sends that), validated on the server against the two value enum and coerced to `'pl'` if missing or invalid. It is never trusted as arbitrary free text, but it is not derived server side either, because `/api/*` sits outside the locale routing middleware (see below) and so has no server observed locale to read.
- `/booking`, `/booking/confirmed`, and everything under `app/api/booking/*` stay entirely outside the locale routing system, both in code structure and in behavior.
- The locale routing middleware's matcher excludes, in addition to `/booking/*` and `/api/*`: `/ingest/*` (the PostHog ingestion rewrite defined in `next.config.ts`, load bearing per `architecture.md` invariant 7, "or ad traffic becomes unmeasurable") and `/opengraph-image` (it has no file extension, so a matcher that only excludes files "with a dot in the path" does not catch it on its own). Missing either exclusion silently breaks analytics capture or the social preview image rather than throwing a visible error, so both are explicit, named exclusions, not left to a generic catch all pattern.
- The visitor's locale cookie only ever decides the outcome of an *ambiguous* request (the bare `/` address with no language information in the path, and the language switcher's own target). It never redirects an already locale explicit address (`/strony-internetowe` or `/en/strony-internetowe`) to the other language; this is what lets AC-2 (Polish addresses never redirect) and AC-3 (the chosen language is remembered) both hold at the same time.
- Because `/booking` and `/api/*` must stay entirely outside the locale system while still needing a working HTML page shell, the `app/` directory uses Next.js's multiple root layouts pattern rather than one shared root layout: `app/[locale]/layout.tsx` becomes its own root layout (`<html lang={locale}>`, dynamic), `app/booking/layout.tsx` becomes a separate root layout of its own (`<html lang="pl">`, unchanged from today), and the single `app/layout.tsx` this project has today, which currently wraps both, is removed. The shared pieces it currently renders (PostHog provider, Meta Pixel, cookie banner, fonts) move into one shared component both root layouts render, so neither reimplements them.
- In scope pages keep rendering statically (via `generateStaticParams` for the `[locale]` segment and next-intl's `setRequestLocale`), not falling back to per request dynamic rendering, since `context/project-overview.md`'s success criterion 3 ("page loads in under 2 seconds on mobile") depends on it and this is paid ad traffic.

**Security model**: No new access control. The public lead form remains unauthenticated, exactly as today; `locale` is validated at the boundary the same way every other form field already is (see `context/code-standards.md`, "Validate unknown external input at system boundaries"). It carries no sensitive meaning beyond which language to reply in.

**Configuration required**: none. next-intl is a library, not a hosted service; no new environment variables or credentials.

**Critical test scenarios** (each maps to an acceptance criterion in ## Requirements):
- Happy path: a visitor opens `/`, reads it in Polish, switches to English via the Navbar, lands on `/en`, browses to the services page, submits the contact form, and receives an English confirmation email, verifies **AC-1**, **AC-3**, **AC-5**, **AC-6**.
- Failure case: a crawler or user requests `/de/strony-internetowe` (an unsupported language), verifies **AC-9**.
- Regression check: `/booking` is opened directly and completes a booking exactly as before this change, with no language switcher present and no `/en/booking` address existing, verifies **AC-4**.
- SEO check: `curl` or view source on `/strony-internetowe` and `/en/strony-internetowe` shows the two pages linking to each other via `hreflang`, and both appear in `app/sitemap.ts`'s output, verifies **AC-7**, **AC-8**.

## Build plan

1. Add the `next-intl` package. Create `middleware.ts` for locale detection and routing (Polish unprefixed as the default locale, English under `/en/`), with its matcher explicitly excluding `/api/*`, `/booking/*`, `/_next/*`, `/ingest/*` (the PostHog rewrite), `/opengraph-image` (has no file extension), and other static files. Satisfies **AC-2**, **AC-4**, **AC-9**.
2. Restructure `app/(main)`, `app/wizualizacja`, and `app/dziekujemy` under `app/[locale]/...`, following the multiple root layouts pattern from the invariants above: `app/[locale]/layout.tsx` becomes its own root layout with a dynamic `<html lang>`; `app/booking/layout.tsx` becomes a separate root layout of its own, unchanged in behavior; the current shared `app/layout.tsx` is removed, and the providers/fonts/cookie banner it renders move into a shared component both new root layouts use. `app/booking` and `app/api` otherwise stay exactly where they are, outside the `[locale]` tree. Satisfies **AC-2**, **AC-4**.
3. Scaffold `messages/pl/*.json` and `messages/en/*.json`, starting with a `common.json` namespace (Navbar, Footer, cookie banner). Wire the locale provider into `app/[locale]/layout.tsx`. Migrate `Navbar.tsx` and `Footer.tsx` to read from messages, and add the language switcher: it swaps locale while staying on the same page and preserves the current query string (ad tracking parameters). Satisfies **AC-3**, **AC-12**.
4. Migrate the home page section by section (Hero, Problem, Services, client logos, the customer success case study tree, the contact form) to translated message keys, writing the first draft of the English copy. Verify the home page renders correctly at `/` (Polish) and `/en` (English) end to end before moving on, this is the thin proof slice the rest of the build repeats. Satisfies **AC-1** (home page).
5. Migrate the remaining in scope pages the same way, in small verifiable batches: `/strony-internetowe`, `/social-media`, `/realizacje` and its 4 project detail pages, `/wizualizacja`, `/dziekujemy`, then the three legal pages last. Add a new row to `/polityka-cookies`, in both languages, documenting the locale preference cookie this feature introduces (see the legal review note in `## Follow-up` for the rest of the legal pages). Satisfies **AC-1** (remaining pages), **AC-13**.
6. Convert the 14 static `metadata` exports on in scope pages to locale aware `generateMetadata` functions using `generateStaticParams` for the `[locale]` segment and next-intl's `setRequestLocale` (so pages stay statically rendered, not per request dynamic). Each page's metadata sets its own self referencing `alternates.canonical` and `alternates.languages` (the hreflang links, including `x-default`), rather than relying on inheriting the values this project's current single root layout hardcodes (`BASE_URL`, `pl_PL`). Make the JSON-LD data in the new `app/[locale]/layout.tsx` locale aware. Extend `app/sitemap.ts` to list both language addresses per page with the matching hreflang annotations. Satisfies **AC-7**, **AC-8**.
7. Write and apply migration `009_leads_locale.sql`: add `locale text not null default 'pl' check (locale in ('pl','en'))` to `leads`, backfilling existing rows. Satisfies **AC-10**.
8. Update `app/api/leads/route.ts`'s Zod schemas to accept and validate `locale`; update `ContactFormSection.tsx` to derive the current locale from the route and include it on the step 1 create call and the older single step fallback payload alike. Replace the two hardcoded `router.push("/dziekujemy")` calls with a locale aware navigation call (next-intl's router, which keeps the current locale prefix), and update `app/dziekujemy/page.tsx`'s "back to home" link to do the same instead of a hardcoded `/`. Satisfies **AC-5**, **AC-11**.
9. Add a `locale` prop to `emails/LeadConfirmation.tsx` with Polish and English copy branches; update `lib/resend.ts`'s `sendLeadConfirmation` to pass the lead's stored locale through. `BookingConfirmation` and the internal team notification email are unchanged, they always send in Polish. Satisfies **AC-6**.
10. Full regression pass: confirm `/booking` and `/booking/confirmed` return their normal page with the locale middleware live and that `/en/booking` returns "page not found" (**AC-4**); confirm PostHog capture still reaches `/ingest`, the Meta Pixel `PageView` still fires once per navigation, the browser and server side `Lead` events still share one `event_id`, and the cookie consent banner still renders and persists on `/en/*` (**AC-10**); confirm every page's canonical link points at itself (**AC-7**); and confirm `tsc --noEmit` and `next build` both pass clean.

## Consequences

**Positive**:
- Opens the lead funnel to English speaking prospects without touching a single existing Polish web address, so today's paid ad landing pages keep their search ranking untouched.
- The `/en/` prefix and next-intl's routing give every future page a ready made pattern to add translations to, rather than each new section inventing its own approach.
- Storing `locale` on the lead means the team's manual follow up (call or email) can start in the right language immediately, without guessing.

**Negative / tradeoffs**:
- Roughly 40 to 45 files with hardcoded Polish copy need to be migrated to translated message keys; this is a real, multi step piece of work, not a drop in library install.
- The `app/` directory restructure (moving pages under `[locale]`) touches every existing route at once, mechanically. A missed import or route reference could break a live, currently ranking marketing page if not caught before deploy.
- Keeping `/booking` and `/api` genuinely untouched by the locale system costs more than a simple `app/[locale]` move: it needs Next.js's multiple root layouts pattern (two independent root layouts instead of the one shared one this project has today), because a single root layout cannot have both a dynamic `<html lang>` and a fixed one at the same time.
- English copy starts as an AI generated first draft; it must be reviewed before publishing (see `## Follow-up`), so this is not a same day ship.
- Two languages to keep in sync going forward: every future content change to an in scope page now needs its English counterpart updated too, or the two versions drift.

**Neutral**:
- The social preview image (Open Graph) keeps its Polish text for both languages for now; a locale aware version is a separate, smaller follow up.
- `/booking` stays a Polish only, self contained subsystem, exactly as it already was described as "parked, kept as a demo" in `context/project-overview.md`.

## Follow-up

- [ ] Review and approve the AI drafted English translations before publishing, checking accuracy and brand voice, not just grammar.
- [ ] Have the English translations of `/regulamin`, `/polityka-prywatnosci`, and `/polityka-cookies` reviewed by someone with legal or RODO (the Polish GDPR equivalent) competence before publishing; this is compliance sensitive text, not ordinary marketing copy.
- [ ] Consider a locale aware version of the Open Graph social preview image; the current one has Polish text drawn directly into the graphic.
- [ ] Consider translating `/booking` and `/booking/confirmed` later if the self service booking demo ever needs to be shown to English speaking prospects.
- [ ] This project has no `docs/scope/` tracking; `/develop` should record progress against this spec in `context/progress-tracker.md`, this project's existing tracking convention, per `CLAUDE.md`.
- [ ] Consider installing the `seo-hreflang` community skill (hreflang and international SEO audit/validation) and referencing it in `AGENTS.md`; it can validate the hreflang implementation this spec introduces once built.
- [ ] When the Day 2 / Day 4 automated email sequence (not yet built, per `context/progress-tracker.md`'s "Next Up") is eventually implemented, it must branch on `leads.locale` the same way `LeadConfirmation` does in this spec; flag this to whoever builds it, since nothing forces that connection automatically.
- [ ] Revisit the "same slug under `/en/`" choice specifically for the two commercial service pages, `/en/strony-internetowe` and `/en/social-media`: a Polish word in an English page's address carries no English search signal and reads oddly to an English visitor. If English search visibility for those two pages matters later, next-intl supports a small `pathnames` map to translate just those two addresses (e.g. `/en/websites`, `/en/social-media`) without building a full slug translation table for every route.

## Migration plan

**Strategy**: Feature-flagged-style additive rollout (not a strangler pattern in the classic sense, since there is no existing i18n system to retire; "additive" because the existing Polish site is never rewritten, only extended alongside).

**Phases**:
1. Infrastructure and routing (build plan tasks 1 to 3): add next-intl, restructure routes, ship the language switcher, with only Polish content live and English falling back to Polish where not yet migrated. Deployable and reversible on its own.
2. Content migration (build plan tasks 4 to 6): migrate pages in small batches, home page first as the proof slice, each batch independently verifiable and deployable.
3. Data and email (build plan tasks 7 to 9): add the `locale` column, wire it through the lead form and confirmation email. Independent of the content migration, can ship in parallel or after.
4. Regression and sign off (build plan task 10).

**Rollback**: Because Polish renders at the exact same web addresses with no redirects at any point in the rollout, a broken deploy can be rolled back by reverting the offending commit or commits; Polish visitors are never mid migration in a way that a revert would strand. The `locale` column is additive and nullable-safe (has a default), so it can be left in place or dropped without affecting anything else if the feature is abandoned.

**Risks**:
- The one time `app/` directory restructure (phase 1) is the highest risk step: a missed import path or route reference could silently break a live, currently ranking marketing page. Mitigated by task 4's explicit "verify before continuing" gate on the first migrated page.
- A wrong middleware matcher could accidentally intercept `/api/*`, `/booking/*`, `/ingest/*` (PostHog's ad blocker resistant analytics rewrite), or `/opengraph-image` (the social preview image route, which has no file extension so a generic "skip anything with a dot in the path" matcher does not exclude it on its own). Any of these would fail silently rather than throw, breaking the lead form, the booking flow, analytics capture, or the social preview image without an obvious error. Mitigated by naming every one of these exclusions explicitly in task 1, rather than relying on the library's default matcher, plus the regression pass in task 10.
- Shipping AI drafted English copy without review risks a tone or accuracy mismatch with the brand. Mitigated by the review Follow-up item, which should happen before phase 2 content goes live, not after.

## Rationale

See `rationale.md` for the full reasoning behind this decision.
