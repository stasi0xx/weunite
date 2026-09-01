# 0001. Rationale: bilingual (Polish + English) marketing site

## Context

WeUnite's site (`context/project-overview.md`) is the primary paid ad funnel: Facebook and Instagram ads drive traffic to a single page whose whole job is to capture a lead. That document currently lists "Multi-language support" under Out of Scope. This spec exists because the engineer explicitly asked to reverse that call and make the site bilingual, confirmed during this design conversation; `context/project-overview.md` is updated to match once this spec is accepted.

Today the site has zero translation infrastructure. A repository scan found: no `next-intl`, `react-i18next`, or similar package anywhere in `package.json`; roughly 40 to 45 of the site's ~55 non generic component and page files hardcode Polish text directly inside JSX (headings, body copy, button labels, form validation messages); only 3 files centralize copy into a `data.ts` file at all; every page's SEO metadata (`title`, `description`, canonical address) is a static object, not a function, so there is no existing mechanism to vary it per language; and `app/sitemap.ts` is a hardcoded array of Polish addresses. This is a genuinely greenfield i18n (internationalization, supporting more than one language) build, not a partial scaffold to finish.

The forces at play:
- **The existing Polish pages are the whole business.** They are actively running paid ad traffic and, per `context/architecture.md`'s invariants, feed a Meta Pixel and Conversions API pipeline that must not double count or lose events. Whatever this spec builds must not risk today's search ranking or ad tracking for a single existing page.
- **There is no content management system.** Copy lives in code, not a database; per `context/architecture.md`'s storage model, Supabase holds lead and booking data, not marketing copy. A translation approach that assumes a CMS or database backed content layer would not fit this project.
- **The team is two people.** `context/project-overview.md` describes WeUnite as a two person agency. Whatever library and file structure this spec picks has to be something a small team can maintain going forward without a dedicated i18n engineer.
- **The booking system (`app/booking/*`) is explicitly parked**, per `context/project-overview.md`: "Code remains in the repo... but is no longer linked from the lead form." It is a live demo of a client deliverable, not part of the active funnel, and the engineer confirmed during this conversation that it should stay Polish only rather than be pulled into this spec's scope.
- **Compliance sensitive content is in scope.** `/regulamin` (terms), `/polityka-prywatnosci` (privacy policy), and `/polityka-cookies` (cookie policy) are RODO governed (the Polish implementation of GDPR). Their English translations carry real legal weight, not just marketing tone, which is why they get a separate review Follow-up item rather than being treated like ordinary page copy.

## Options considered

### Option 1: next-intl with Polish unprefixed, English under `/en/`

Add the `next-intl` library, restructure in scope routes under `app/[locale]/`, and configure it so the default locale (Polish) renders at today's exact addresses with no prefix, while English lives at the same paths under `/en/`.

**Pros**:
- Every currently indexed Polish address (the home page, `/strony-internetowe`, `/realizacje/nowy-relaks`, and so on) keeps working byte for byte, with no redirect and no risk to existing search rankings, which matter directly because they carry paid ad traffic.
- next-intl is built around the App Router and React Server Components, which is how this codebase already defaults (per `context/code-standards.md`, "Default to React Server Components"), so metadata generation, server rendering, and the message lookup all fit the existing pattern rather than fighting it.
- Message keys are typed, so a missing translation is caught rather than silently falling back to a blank string in production.

**Cons**:
- Still requires a one time restructure of the `app/` directory to introduce the `[locale]` segment, which is mechanically risky: every existing route's file path changes at once, and a missed import breaks a live page.

### Option 2: next-intl with always prefixed addresses (`/pl/...` and `/en/...`)

Same library, but both languages get a prefix, including Polish, so `/` would redirect to `/pl`.

**Pros**:
- Perfectly symmetric routing; no special "this locale has no prefix" case in the middleware to reason about.

**Cons**:
- Every currently ranking Polish address would need a permanent redirect to its `/pl/` equivalent, and a redirect always risks a temporary ranking dip, exactly on the pages that are the entire point of the funnel described in `context/project-overview.md`. This directly conflicts with the project's core goal and was ruled out for that reason alone.

### Option 3: Hand rolled locale routing with JSON dictionaries, no library

Write a small custom middleware to detect and route locale, and store translated strings in plain JSON files read directly by components, without a dedicated i18n package.

**Pros**:
- Zero new runtime dependency; complete control over the exact behavior.

**Cons**:
- Reinvents locale negotiation, the "no prefix for the default locale" routing behavior, and locale aware `generateMetadata` plumbing that next-intl has already solved and is actively maintained. For a two person team, maintaining that hand rolled layer going forward costs more than depending on a well used, purpose built library.

## Rationale

Option 1 is the only one of the three that satisfies the load bearing constraint from Context: the existing Polish pages must not lose their search ranking or break, because they are the live paid ad funnel described in `context/project-overview.md`. Option 2's redirects would put exactly those pages at risk for no material benefit; the risk is not hypothetical, it is directly against the project's stated success criteria ("Page loads in under 2 seconds on mobile," "the full email sequence fires automatically," both premised on the funnel working uninterrupted). Option 3 would work, but reimplements a solved problem for a two person team that has no stated need to avoid a dependency; per the project's own defaults toward React Server Components (`context/code-standards.md`), next-intl is the choice that fits the grain of the codebase rather than working against it.

The engineer's own answers during this conversation independently arrived at the same shape: keep the same web address slugs under `/en/` rather than translating them (ruled out the extra routing table a slug translation would need), default to Polish with a manual switcher rather than browser based auto detection (the client base is Polish, and forcing a guess risks showing a Polish visitor the English site), and exclude `/booking` entirely (it is not part of the active funnel this site's other content is built around). Those answers are folded directly into `AC-2`, `AC-3`, and `AC-4` in `index.md`, not just used as flavor.

The one meaningful thing being traded away: shipping a first, AI drafted pass of the English copy rather than professionally translated copy from day one. The engineer explicitly chose this (an AI draft they review, over waiting for outside translation), which is why `index.md`'s Follow-up section makes the review step explicit and non optional, and why the legal pages get their own, stricter review requirement rather than being lumped in with marketing copy.
