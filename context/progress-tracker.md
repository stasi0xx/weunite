# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- In Progress

## Current Goal

- Build out page sections per feature specs

## Completed

- **01-design-system:** shadcn/ui (v4, @base-ui/react), framer-motion, gsap, react-email
  installed; all 13 shadcn primitives added (button, input, textarea, select, form, label,
  badge, card, dialog, sheet, avatar, separator, sonner); CSS design tokens configured in
  globals.css; Syne + DM Sans + Geist Mono fonts wired up in layout.tsx; build passes clean.
- **02-layout-setup:** `components/layout/Navbar.tsx` + `components/layout/Footer.tsx` created;
  wired into `app/layout.tsx`; Navbar fixed + scroll-shrink + mobile hamburger (3/4 screen,
  blur backdrop, staggered links); Footer 4-column desktop + mobile logo/social top row +
  vertical links + watermark text; build passes clean.
- **03-links-hover-effect:** Pill-button hover effect applied to all links in Navbar and Footer;
  `scaleX(0) → scaleX(1)` from `origin-center` with `--accent-primary` background + white text;
  `rounded-full` for desktop pill links, `rounded-lg` for mobile full-width rows, `scale-0 → scale-100`
  circle for social icon links; pure CSS (Tailwind group-hover, no extra client state); build passes clean.
- **04-hero-section:** `components/sections/HeroSection.tsx` created; `hero-blob` + `hero-blob-sm`
  CSS classes + `blobDrift` keyframe added to globals.css; eyebrow + headline + sub-headline + CTA pair
  animated with Framer Motion on mount (staggered delays 0.1–0.45s); three service cards (Globe /
  Layers / Zap) in responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) with `whileInView`
  stagger, `whileHover scale(1.02)` + chevron shift; `useReducedMotion` guard (skip y-translate if
  true); `aria-label` + `aria-hidden` on blob; build passes clean.
- **05-client-logos-section:** `components/sections/ClientLogosSection.tsx` created; `border-y
  border-border` strip with "Nasi klienci" label (uppercase tracking-widest muted); horizontally
  scrollable row of 8 inline SVG placeholder logos; `grayscale opacity-40` per spec; wired into
  `app/page.tsx`; build passes clean.
- **06-problem-section:** `components/sections/ProblemSection.tsx` created; eyebrow "Brzmi
  znajomo?" + H2 headline + 3-column card grid (PhoneMissed / TrendingDown / UserX icons);
  `bg-card rounded-2xl` cards with `bg-background rounded-xl` icon boxes; Framer Motion
  `whileInView` stagger (0.1s per card), `useReducedMotion` guard; wired into `app/page.tsx`;
  build passes clean.
- **07-services-section:** `components/sections/ServicesSection.tsx` created; sticky-scroll
  layout — left panel sticks at `top-0 h-screen` (desktop), right column has 3 × `min-h-screen`
  service blocks; `IntersectionObserver` (`rootMargin: -30%`) drives `activeIndex` state;
  `AnimatePresence mode="wait"` crossfades left visual on service change; entrance: left
  visual flies in from `x: -60` and right text from `x: 50` on `sectionInView` (once);
  three JSX mock visuals: `WebsiteVisual` (booking calendar, orange accent), `SocialVisual`
  (post card + stat pill), `AutomationVisual` (dark `--bg-dark` flow diagram); mobile:
  stacked with visual above text, no sticky; `useReducedMotion` guard; wired into
  `app/page.tsx`; build passes clean.
- **10-contact-form-section:** `components/sections/ContactFormSection.tsx` created; two-column
  lg layout — left header block (eyebrow + headline "Zacznijmy razem." + sub-copy + 3 trust
  signals with CheckCircle icons) + right form card (`bg-card rounded-3xl`); react-hook-form +
  zod schema with 4 fields (name, email, businessType select, serviceInterest select) using
  `@base-ui/react` Select via `onValueChange`; inline success state + sonner toast on error;
  `Toaster` added to `app/layout.tsx`; `app/api/leads/route.ts` POSTs to Supabase `leads` table
  then fires two Resend emails via `Promise.allSettled`; `lib/supabase/server.ts` server client;
  `supabase/migrations/001_leads.sql` migration; `@supabase/supabase-js` + `resend` installed;
  `useReducedMotion` guard; `aria-label` / `aria-required` / `role="status"` accessibility;
  build passes clean.
  **NOTE:** requires `.env.local` with `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
  and `RESEND_API_KEY` before the form submission pipeline is live.

## In Progress

- None.

## Next Up

- 08 — Case studies section

## Booking Page (Feature 12) — Completed

- **Database:** `supabase/migrations/002_booking_schema.sql` — `booking_slots`, `blocked_dates`,
  `bookings` tables created and applied to Supabase; seeded with Mon/Wed/Fri 10:00/12:00/14:00.
- **API:** `app/api/booking/available/route.ts` (GET — available slots for current month);
  `app/api/booking/route.ts` (POST — create booking, 409 on double-book, idempotency via UUID).
- **Lib:** `lib/booking.ts` (server-side slot computation); `lib/validators/booking.ts` (Zod schema).
- **Components:** `components/booking/BookingCalendar.tsx` (client, manages all state);
  `components/booking/CalendarDay.tsx` (day cell, available/disabled/selected/today states);
  `components/booking/TimeSlotPanel.tsx` (Framer Motion slide-in from right, time chips);
  `components/booking/BookingConfirmBar.tsx` (fixed bottom bar, slides up on date+time selected).
- **Pages:** `app/booking/page.tsx` (server component — validates lead UUID, checks existing booking,
  fetches slots, renders calendar or existing-booking view); `app/booking/confirmed/page.tsx` (static).
- **Layout refactor:** Root layout now has no Navbar/Footer; `app/(main)/layout.tsx` wraps the
  marketing page with Navbar+Footer; `app/booking/layout.tsx` is a clean layout (no nav) for the
  booking flow. Old `app/page.tsx` deleted; marketing page moved to `app/(main)/page.tsx`.
- **Lead API update:** `app/api/leads/route.ts` now returns `lead_id` in the response.
- **Contact form update:** `ContactFormSection.tsx` now redirects to `/booking?lead=<id>` on submit
  instead of showing an inline success state.
- **Build:** passes clean. All routes verified: `/`, `/booking`, `/booking/confirmed`, `/api/booking`,
  `/api/booking/available`, `/api/leads`.

## Endorsement Section

- `components/sections/EndorsementSection.tsx` created; full-width `bg-card` section
  placed after ServicesSection; two-column layout (quote left, photo right on desktop,
  photo stacked above on mobile); Bartłomiej Glinka / Omida Group placeholder quote;
  photo from `public/entrepreneurs/Bartłomej.jpg`; Framer Motion slide-in from opposite
  sides with `useReducedMotion` guard; build passes clean.
  **NOTE:** placeholder quote — needs real sign-off from Bartłomiej Glinka before going live.

## Customer Success Section (replaces Endorsement on the homepage)

- Business decision (from user): the placeholder Bartłomiej Glinka pull-quote was never signed
  off, so the slot between `ServicesSection` and `ContactFormSection` now holds a full
  scroll-driven case study of **Pierwsze Trzeźwe Pokolenie (Fundacja Columbus)** instead.
- `components/sections/CustomerSuccessSection.tsx` — orchestrator; `id="customer-success"`,
  `sr-only` H2, right-edge reading-progress rail (`scaleY` ← section `useScroll`), outro with
  two CTAs (`pierwszetrzezwepokolenie.pl` + `#contact`).
- `components/sections/customer-success/` — `data.ts` (all copy + numbers, single source of
  truth), `SuccessCounterHero.tsx` (pinned `h-[220vh]` track; reach counter 0 → 27 000 000 is
  *scrubbed by scroll position* via `useScroll` → `useTransform` → `useSpring`, written to the
  DOM through `useMotionValueEvent` + a ref so it never re-renders per frame; SSR renders the
  final number so crawlers see it; stops on the rounded `HERO_REACH` = 27 000 000, while the
  exact `TOTAL_REACH` = 27 200 000 stays in `ResultsBlock`'s stat and drives the platform share
  bars), `ChallengeBlock.tsx` (sticky heading + 3-item list with
  line-draw dividers), `StrategyStack.tsx` (sticky card deck — Glinka / Kusznierewicz /
  Tchórzewski; each card pins at a stepped `top`, the next slides over it, covered cards scale
  to 0.94 and dim), `OfflineBlock.tsx` (parallaxed "OFFLINE" ghost word + 5 school cards
  dealing in with rotation), `ResultsBlock.tsx` (3 GSAP counters + 3 platform rows with
  `scaleX` share bars).
- Every animated element is guarded by `useReducedMotion`; all counters degrade to their final
  value, all transforms to identity.
- **Theme decision:** the whole section runs on `bg-dark` / `text-dark-foreground` — a
  deliberate dark "chapter" break in the light page, documented as an exception in
  `ui-context.md`. Reversible by swapping the two classes on the section root.
- `components/layout/Navbar.tsx` — nav link "Polecają" → `#endorsement` replaced with
  "Case study" → `#customer-success`.
- `components/sections/EndorsementSection.tsx` left on disk but no longer imported anywhere —
  kept in case the real signed-off quote arrives.
- `tsc --noEmit` and `next build` both pass clean.
  **NOTE (blocking for visuals):** two images are referenced but not yet in the repo —
  `public/casestudy/ptp-podcast.jpg` (the podcast still with Łukasz Tchórzewski) and
  `public/casestudy/ptp-ambasador.jpg` (the Mateusz Kusznierewicz ambassador graphic). Until
  they are added, those two stack cards render an empty tinted panel with alt text.
- **NOTE:** `StrategyStack` stack-card scale/dim is driven by the *container's* scroll progress,
  not per-card — `useScroll` on a `position: sticky` target does not advance, because a pinned
  element's bounding rect stops moving. Do not "fix" it by moving the ref onto the card.

## Email Templates (Feature 13) — Completed

- **`emails/LeadConfirmation.tsx`** — React Email template for post-lead-form email; warm
  welcome tone; "Co dalej?" card with 3 numbered steps; outlined pill CTA (mailto);
  signature + GDPR-compliant unsubscribe link.
- **`emails/BookingConfirmation.tsx`** — React Email template for post-booking email;
  meeting details card (📅 date, 🕐 time, 💻 Google Meet, 🔗 optional meet link);
  filled pill CTA → Google Calendar deeplink; agenda (3 bullets); "Co przygotować?" section;
  reminder notice; signature + reschedule mailto link.
- **`lib/resend.ts`** — Resend singleton + `sendLeadConfirmation(to, name)` +
  `sendBookingConfirmation(props)` + `buildCalendarLink(date, timeSlot)` helper.
- Both API routes updated: `app/api/leads/route.ts` uses `sendLeadConfirmation`;
  `app/api/booking/route.ts` uses `sendBookingConfirmation` + `buildCalendarLink`.
- Brand translation: all colors inline (#F2EDE6 body, #EBE5DC card, #FF5A1F accent bar +
  CTA, gradient top bar), system font stack, 600px max-width, single-column layout.
- Build passes clean.
  **NOTE:** `meetingLink` prop is optional — Google Meet links are not yet generated
  server-side; the field renders when provided, omits gracefully when absent.

## Contact Form Redesign (Field Reorder + New Fields)

- `components/sections/ContactFormSection.tsx` reordered/redesigned: 1. Imię i nazwisko,
  2. Nazwa projektu / firmy (new text field), 3. Rodzaj działalności (select, unchanged),
  4. Opis projektu (new `Textarea`, replaces the old "Co Cię interesuje?" service select),
  5. Kolorystyka — optional text field, right below Opis projektu, 6. Dołącz pliki —
  optional, UI only (native file input styled as dashed drop zone, `useState<File[]>`,
  per-file remove button, `MAX_FILES = 5` / `MAX_FILE_SIZE_MB = 10` client-side caps with
  `sonner` toasts), 7. Adres email.
- `app/api/leads/route.ts` zod schema + Supabase insert updated to `projectName` /
  `projectDescription` / `colorPreference` (optional), `serviceInterest` removed;
  internal notification email updated to reference the new fields.
- `supabase/migrations/003_leads_project_fields.sql` — adds `project_name` /
  `project_description` (`not null`, backfilled via `default ''` then dropped), drops
  `service_interest` column.
- `supabase/migrations/004_leads_color_preference.sql` — adds nullable `color_preference`.
- `context/features-specs/10-contact-form-section.md` updated to match (field list,
  API contract, DB schema, email trigger subject).
  **NOTE:** requires applying `003_leads_project_fields.sql` and
  `004_leads_color_preference.sql` to the live Supabase project before deploying, or
  inserts will fail against the old schema.

## Case Study Section Redesign (Wizualizacja Page)

- `components/sections/visualization/CaseStudySection.tsx` redesigned from a single
  before/after case study (Nowy Relaks only) into a two-card portfolio grid: "Ostatnie
  realizacje" — Nowy Relaks (Filipek Investment, reuses `nowyrelaks-after.jpg`) and
  Fundacja Pierwsze Trzeźwe Pokolenie (new project, links to
  `https://www.pierwszetrzezwepokolenie.pl/`). Each `ProjectCard` keeps the browser-chrome
  frame styling, shows one screenshot (no before/after split), title, short description,
  and an external link. `tsc --noEmit` passes clean.
  **NOTE:** `public/casestudy/pierwszetrzezwepokolenie.jpg` does not exist yet — the user
  is providing this screenshot directly; the `<Image>` will 404 until it's added.

## Contact Form File Uploads (Wired to Supabase Storage)

- Decision: Supabase Storage bucket (persisted, no email size limit) over direct Resend
  attachments — resolves the prior Open Question.
- `supabase/migrations/005_leads_attachments.sql` — adds `leads.attachments` (`jsonb not null
  default '[]'`); creates private bucket `lead-attachments` (10 MB/file limit, mime allowlist:
  jpeg/png/webp/gif/pdf/doc/docx); RLS policy allows `anon` to `insert` only (no list/read/
  update/delete) — enough for a public lead form without exposing prior uploads.
- `lib/supabase/client.ts` — new browser Supabase client (anon key), used only for the direct
  file upload from `ContactFormSection.tsx`.
- `components/sections/ContactFormSection.tsx` — `onSubmit` now uploads each selected file
  straight to `lead-attachments` (path `${crypto.randomUUID()}-${file.name}`) before POSTing
  the lead; per-file upload failure aborts submission with a named-file toast instead of the
  generic error. File input gained an `accept` attribute matching the bucket's mime allowlist.
  Upload happens client → Storage directly (not proxied through the API route) because Vercel's
  serverless body limit (4.5 MB) is well under `MAX_FILE_SIZE_MB = 10`.
- `app/api/leads/route.ts` — zod schema gained `attachments` (array, max 5, matches Storage
  bucket's 10 MB cap); attachments are stored on the lead row and used to generate 7-day
  Supabase signed URLs, listed as links in the internal notification email (file names are
  HTML-escaped before interpolation — they're client-supplied strings).
- `tsc --noEmit` passes clean.
  **NOTE:** requires `NEXT_PUBLIC_SUPABASE_ANON_KEY` added to `.env.local` (not previously
  needed — only the service-role key existed) and migration `005_leads_attachments.sql`
  applied to the live Supabase project before uploads will work.

## Booking Confirmation Email — Fire-and-Forget Bug Fix

- `app/api/booking/route.ts` sent the booking confirmation email via `sendBookingConfirmation(...).catch(...)`
  without `await` — on Vercel Serverless the function can freeze/terminate right after the HTTP
  response is returned, so the in-flight Resend request could be silently killed mid-send with
  no error ever logged. Inconsistent with `app/api/leads/route.ts`, which correctly awaits its
  Resend calls via `Promise.allSettled` before responding.
- Fix: wrapped the send in Next.js's `after()` (`next/server`, stable in Next 16) — guarantees
  the email finishes sending even after the response goes out, without slowing down the booking
  response for the user.
- Reminder emails (48h/24h/1h) are a separate, still-open gap: `supabase/functions/send-reminders`
  only implements 24h/1h (no `reminder_48h_sent_at` column) and nothing currently invokes it on a
  schedule (no pg_cron migration found) — deferred, not part of this fix.

## Booking Step Removed From Lead Flow

- Business decision: WeUnite no longer self-books strategy calls with leads — the team follows
  up manually (email/phone) instead. `components/sections/ContactFormSection.tsx` now redirects
  to a new static `/dziekujemy` (thank-you) page instead of `/booking?lead=<id>`.
- New `app/dziekujemy/page.tsx` + `app/dziekujemy/layout.tsx` (noindex) — mirrors the old
  `/booking/confirmed` page's styling (CheckCircle icon, heading, CTA back to home).
- `app/sitemap.ts` — removed the `/booking` entry (no longer part of the linked funnel).
- `emails/LeadConfirmation.tsx` — reworded the "Co dalej?" 3-step card and preview text to
  drop "Umawiamy rozmowę strategiczną" (booking-specific copy); now says the team will reach
  out directly within 24h instead of the lead self-booking a call.
- **Decision (explicitly confirmed by user):** booking infrastructure was NOT deleted — `app/booking/*`,
  `app/api/booking/*`, `components/booking/*`, `lib/booking.ts`, `lib/validators/booking.ts`,
  `supabase/functions/send-reminders`, and the `booking_slots` / `blocked_dates` / `bookings`
  Supabase tables all remain in place, just unlinked from the active lead flow. Kept as a
  live demo of the booking product WeUnite builds for vacation rental clients.
- `context/project-overview.md` and `context/architecture.md` updated to reflect the flow
  change (Goals, Core User Flow, Features, Scope, Success Criteria, invariant #3 note).
  **NOTE:** `context/features-specs/11_forward_to_choosing_date.md` and
  `12_booking_page.md` still describe the old redirect-to-booking flow — left as historical
  spec records, not updated.

## Meta Pixel + Conversions API, PostHog Consent Fix

- **Problem:** a Facebook ad drove ~150 link clicks to `/wizualizacja` and PostHog recorded
  essentially nothing. Two causes: (1) `providers.tsx` set `opt_out_capturing_by_default: true`
  and the only opt-in path was clicking "Akceptuj wszystkie" in the cookie banner — cold ad
  traffic never clicks it, so ~0 events were captured; (2) `NEXT_PUBLIC_POSTHOG_HOST` pointed
  straight at `eu.i.posthog.com`, which adblockers and mobile DNS filters drop. There was also
  no Meta Pixel in the codebase at all, so FB's "150" was link clicks, not landing page views.
- **`lib/consent.ts`** — single source of truth for consent: `readConsent` / `writeConsent` /
  `hasMarketingConsent` / `onConsentChange` (custom `cookie-consent-change` window event).
  Keeps the existing `cookie_consent` localStorage key, so returning visitors keep their choice.
- **`app/providers.tsx`** — `opt_out_capturing_by_default` removed. PostHog now always captures:
  `persistence: "memory"` + `disable_session_recording: true` before consent (cookieless, no
  device storage → no cookie consent required), upgrading to `localStorage+cookie` + session
  replay on "Akceptuj wszystkie" via `onConsentChange`.
  **Tradeoff:** in memory mode a visitor is re-counted per page load — pageviews are exact,
  unique visitor counts skew high.
- **`next.config.ts`** — `/ingest/static/:path*` → `eu-assets.i.posthog.com`, `/ingest/:path*` →
  `eu.i.posthog.com` rewrites + `skipTrailingSlashRedirect: true`; `NEXT_PUBLIC_POSTHOG_HOST`
  changed to `/ingest`.
- **`lib/meta/pixel.ts`** — typed `fbq` wrapper: `initMetaPixel()` (loads fbevents.js + first
  PageView, no-ops without `NEXT_PUBLIC_META_PIXEL_ID`), `trackMetaEvent(name, params, eventId)`,
  `newMetaEventId()`.
- **`components/analytics/MetaPixel.tsx`** — loads the pixel only when consent is `"all"` (on
  mount or later via `onConsentChange`); fires PageView on client-side navigations (the initial
  one comes from `initMetaPixel`). Mounted in `app/layout.tsx` inside `PostHogProvider`.
- **`lib/meta/capi.ts`** — `sendMetaLeadEvent()` posts a `Lead` event to
  `graph.facebook.com/v21.0/{pixel_id}/events`; SHA-256 hashes email + first/last name per Meta's
  normalisation rules, forwards `_fbp` / `_fbc` / IP / user-agent as match signals. Never throws;
  no-ops without `META_PIXEL_ID` + `META_CAPI_ACCESS_TOKEN`.
- **`app/api/leads/route.ts`** — fires the CAPI Lead event via `after()` (same pattern as the
  booking route) after a successful insert; reads `_fbp`/`_fbc` cookies and headers off the
  request *before* `after()` runs. Zod schema gained optional `metaEventId` (uuid).
- **`components/sections/ContactFormSection.tsx`** — generates one `metaEventId` per submit,
  sends it to the API and passes it to `trackMetaEvent("Lead", ...)` so browser + server events
  deduplicate.
- **`components/ui/CookieBanner.tsx`** — now writes through `lib/consent.ts` instead of calling
  `posthog.opt_in_capturing()` directly; copy updated (traffic measured anonymously without
  cookies; consent covers cross-visit recognition + Meta Pixel).
- `tsc --noEmit` and `next build` both pass clean.
  **NOTE:** requires `NEXT_PUBLIC_META_PIXEL_ID` and `META_CAPI_ACCESS_TOKEN` in `.env.local`
  *and in Vercel*, plus `NEXT_PUBLIC_POSTHOG_HOST=/ingest` updated in Vercel — placeholders are
  empty, so both Meta integrations silently no-op until filled.
  **NOTE:** `app/(main)/polityka-cookies/page.tsx` still documents only PostHog analytics cookies
  — it needs a marketing-cookies section for Meta Pixel (`_fbp` / `_fbc`, 90 days) and the PostHog
  section needs rewording (cookieless before consent). Not written yet — legal copy needs sign-off.
  **DECISION (open):** the CAPI Lead event currently fires on every submission regardless of banner
  consent — that is the point of CAPI, but strict RODO reading would gate it too. One-line change
  in `app/api/leads/route.ts` if the call goes the other way.

## Hero Section Redesign (Photographic Brand Statement)

- `components/sections/HeroSection.tsx` rewritten: replaced the light-theme headline +
  sub-headline + CTA pair + 3 fan-layout service cards with a full-bleed photo hero
  (`public/hero/gdansk-hero.png`, Gdańsk waterfront/Żuraw) + dark gradient/vignette
  overlay + centered "WeUnite" wordmark (Syne ExtraBold, white) with an animated white
  underline bar, plus a bottom scroll-cue chevron linking to `#services`. No sub-headline,
  no CTA button, no cards — those already exist independently in `ServicesSection.tsx`,
  so nothing was lost, just de-duplicated.
- Decision (explicit, from user): this is a deliberate one-off exception to the
  light/cream/blob theme documented in `ui-context.md` — a brand-statement opener before
  the light theme resumes from `ClientLogosSection` onward. `ui-context.md` (Theme note +
  Hero layout pattern) and `context/features-specs/04-hero-section.md` updated to match.
- `next/image` `fill` + `priority` used for the background photo (LCP element).
- `tsc --noEmit` and `next build` both pass clean.
  **NOTE:** source photo is 1200×630 PNG — will look soft on large desktop monitors when
  stretched full-bleed; recommend swapping in a higher-resolution JPG/WebP (2400px+ wide)
  before this goes live in production.
  **NOTE:** dropping the sub-headline/CTA from the Hero means the first conversion prompt
  on the page is now further down the scroll (Problem → Services → Contact form) — flagged
  as an open question, not blocking, since it was an explicit design call.

## Service Subpages: Strony Internetowe + Social Media

- **`/strony-internetowe`** (`app/(main)/strony-internetowe/page.tsx`) — new marketing subpage
  for the websites service. `components/sections/websites/`: `WebsitesHero.tsx` (headline +
  inline SVG/CSS browser-chrome mockup with a chatbot bubble, no image asset needed),
  `WebsitesProcessSection.tsx` (3-step process cards + "Umów konsultację" CTA linking to
  `/#contact`), `WebsitesCaseStudies.tsx` (2 real case studies — Nowy Relaks, Gdynia Padel
  Club — reused from `CaseStudySection.tsx`'s data; desktop: clickable mockup left / ~5-sentence
  description right; mobile: mockup on top capped at `h-[32vh]`, text below). Only 2 projects
  shown, not 3 — no third client screenshot exists yet in `public/casestudy/` (explicit user
  decision, layout is ready for a third `ProjectRow` when one is supplied).
- **`/social-media`** (`app/(main)/social-media/page.tsx`) — new marketing subpage for the
  social media service. `components/sections/social/`: `SocialHero.tsx`, `SocialPillarsSection.tsx`
  (redesigned per explicit user feedback — the original 3-column icon-card grid "nie podobało
  się"; rewritten via `/impeccable` as three asymmetric editorial rows instead: Instagram row
  uses the real screenshot `public/casestudy/ig-socialmedia2.png` — a full Instagram-UI capture
  with visible engagement numbers, `aspect-[3/2]`, shown straight/uncropped-content for
  credibility, media-dominant `md:col-span-8`; TikTok row is an honest stylized placeholder — a
  tilted `bg-dark` panel with a large "3s" typographic moment tied to the "pierwsze 3 sekundy"
  copy, text-dominant `md:col-span-7`, no fake icon-box filler; Social Ads (pillar 03, no media
  asset at all) got a custom animated `AdsPanel`, rewritten twice: v1 was an abstract radar/target
  animation that the user flagged as unclear ("problem z adspanel jest taki że jego przekaz jest
  nie jasny"); v2 replaced it with a literal, unmistakable mock paid-ad unit instead — sponsored-post
  chrome (avatar + "Twoja marka" / "Sponsorowane"), a gradient creative block, illustrative ad copy
  + a real CTA pill in the site's own button style, and a results chip (GSAP `countTo`, same pattern
  as `ProblemSection.tsx`'s stat counters) overlapping the corner reading "2 400+ gotowych na zakup"
  — the phrase pulled directly from the pillar's own copy ("ludzi gotowych na zakup"). Row 03 uses
  the same `PillarRow` (`align="left"`, `mediaSpan={5}`) behind a `border-t` divider instead of a
  text-only breakout. All three rows share a huge low-opacity "ghost numeral"
  (`text-foreground/[0.06]`, Syne ExtraBold) as the unifying motif, alternating left/right per row.
  Added `--color-dark` / `--color-dark-foreground` to `@theme inline` in `globals.css` (maps the
  previously-unused `--bg-dark` token to proper `bg-dark`/`text-dark-foreground` Tailwind
  utilities — this token existed in `:root` but had no utility mapping before). **Caught before
  shipping:** an early draft used template-literal Tailwind classes
  (`` `md:col-span-${mediaSpan}` ``) for the responsive column spans — Tailwind's static scanner
  can't see interpolated class names, so those spans would have silently done nothing at build
  time; fixed by branching to fully static literal class strings instead. A second bug in the v1
  radar rings (absolutely positioned with no offsets, so they'd have rendered at their flow-position
  origin instead of centered on the target dot) was also caught and fixed before the v1→v2 rewrite.
  **NOTE:** TikTok panel is still a placeholder pending the real video file from Załącznik 2.
  `SocialReelsSection.tsx` (horizontally scrollable reel strip,
  `snap-x snap-mandatory` + `.scrollbar-hide`), `SocialCtaSection.tsx`, `SocialSuccessCarousel.tsx`
  (scroll-snap carousel, arrow buttons desktop / native swipe mobile, `scrollBy` via ref).
  **NOTE (placeholder content, explicit user decisions):** Instagram pillar links out to the
  real post (`instagram.com/p/Cu5CgwhNWdz`) via a static card rather than an embedded widget
  (avoids loading Meta's third-party embed script/cookies outside the existing consent gate —
  see `lib/consent.ts` + architecture invariants #6–#8). TikTok pillar and the reels strip are
  visual placeholders (`Play` icon, "Wkrótce" labels) with a one-line `TODO` marking where to
  swap in `<video src="/social/tiktok-reel.mp4">` once the file from Załącznik 2 is provided.
  Customer Success carousel uses clearly-labeled placeholder story cards ("(placeholder)"),
  not fabricated client quotes — needs real success-story content before shipping.
- Both pages follow the same subpage skeleton: `ScrollToTop`, `Metadata` with canonical URL,
  hero → content → CTA linking to the homepage's `ContactFormSection` (`id="contact"` by default).
- **Bug found + fixed:** both new hero sections use the shared `.hero-blob` decoration (a 700px
  circle, `filter: blur(80px)`) inside a `relative overflow-hidden` section. That class was only
  ever used before in tall sections (`ContactFormSection`, full-viewport hero layouts) where the
  blob fits inside the box; in these short intro-header sections the section's own `overflow-hidden`
  clipped straight through the blob's still-visible blurred edge, producing a hard-edged cutoff
  (reported by user via screenshot). Fix: removed `overflow-hidden` from `WebsitesHero.tsx` and
  `SocialHero.tsx` (the blob now fades to fully transparent before it would be clipped, and simply
  bleeds harmlessly into the next section's top padding) and added a global `overflow-x: hidden`
  on `html, body` in `globals.css` as the safety net against horizontal scroll from any full-bleed
  absolutely-positioned decoration sitewide (this was a latent, pre-existing gap — no prior page
  had this protection). **Gotcha:** a plain CSS rule placed between `@import "tailwindcss"` and
  `@theme inline { ... }` at the top of `globals.css` was silently dropped by the Tailwind v4/
  Lightning CSS build — plain custom CSS must go in the existing custom-CSS block near the bottom
  of the file (alongside `.hero-blob`, `.marquee-track`, etc.), not interleaved with the Tailwind
  directives at the top.
- `tsc --noEmit` and `eslint` both pass clean on all new files.

## Multi-Stage Progressive Contact Form Redesign

- **`components/sections/ContactFormSection.tsx`** refactored into a 4-step wizard:
  - **Etap 1 (Email)**: Email input (`email`). Triggers draft lead creation (`status: 'draft'`, `current_step: 1`), returns `leadId`.
  - **Etap 2 (Projekt & Działalność)**: Project name (`projectName`) and business type (`businessType`). Progressive DB save (`current_step: 2`).
  - **Etap 3 (Opis projektu)**: Project description (`projectDescription`). Progressive DB save (`current_step: 3`).
  - **Etap 4 (Wizualia & Logo)**: Optional color preference (`colorPreference`), reference link (`reference`), and logo/attachments (`attachments`). Progressive DB update (`status: 'new'`, `current_step: 4`), triggers Resend emails, Meta CAPI event, and redirects to `/dziekujemy`.
- **"Po co nam to?" Explanations**: Prominent badge box at the top of each step explaining why the specific information is requested.
- **`app/api/leads/route.ts`** updated to support step-based payload discriminated by `step` (1, 2, 3, 4), allowing real-time DB progressive saves. Fallback for legacy single-step POST preserved.
- **`supabase/migrations/007_leads_progressive_saving.sql`** created: drops NOT NULL constraints on `name`, `business_type`, `project_name`, `project_description`, and adds `current_step integer default 1`.
- `tsc --noEmit` and `next build` pass clean.

## Services Section CTA Buttons Update

- `components/sections/ServicesSection.tsx`:
  - **Strony internetowe**: Przycisk główny (primary): `"Odbierz wizualizację"` (`#contact`), Przycisk pomocniczy (secondary): `"Zobacz projekty"` (`/strony-internetowe`).
  - **Social media i wideo**: Przycisk główny (primary): `"Odbierz plan"` (`#contact`), Przycisk pomocniczy (secondary): `"Zobacz więcej"` (`/social-media`).
- `tsc --noEmit` passes clean.

## Customer Success Section Buttons Update

- `components/sections/CustomerSuccessSection.tsx`:
  - Przycisk **"Chcę takie wyniki"** zmieniony na element przyklejony do dołu ekranu (`sticky bottom-6 z-40`), dzięki czemu jest stale widoczny podczas przewijania całej sekcji case study (`#customer-success`).
  - Przycisk **"Zobacz projekt"** zaktualizowany o nowy odnośnik prowadzący do kanału YouTube: `https://www.youtube.com/@PierwszeTrze%C5%BAwePokolenie` (`target="_blank"`).
- `tsc --noEmit` passes clean.

## Contact Form Offer Type Selector (Websites vs Marketing Plan Splitter)

- `components/sections/ContactFormSection.tsx`:
  - Dodano rozgałęźnik na Etapie 1 ("Wybierz, co chcesz bezpłatnie otrzymać"): `Darmowa wizualizacja strony` (`website_visualization`) vs `Darmowy plan marketingowy` (`marketing_plan`).
  - Wybór dynamicznie dostosowuje box z wyjaśnieniem ("Po co nam to?"), sygnalizatory zaufania oraz treść przycisku końcowego wysyłki ("Wyślij i odbierz plan →" / "Wyślij i odbierz wizualizację →").
  - Wspiera opcjonalny prop `defaultOfferType`.
- `app/api/leads/route.ts`:
  - Dodano walidację `offerType` do schematów `step1Schema` i `fullSchema`.
  - Zapis pola `offer_type` w tabeli Supabase `leads` (z bezpiecznym fallbackiem w przypadku braku kolumny w cache PostgREST).
  - Wzbogacono treść wewnętrznej wiadomości email z powiadomieniem (Resend) o informację o wybranym materiale.
- `supabase/migrations/008_leads_offer_type.sql`:
  - Tworzy migrację dodającą kolumnę `offer_type text default 'website_visualization'` do tabeli `leads`.
- `tsc --noEmit` przechodzi czysto.

## Navbar & Footer Links & CTA Update

- `components/layout/Navbar.tsx`:
  - Zaktualizowano linki w nawigacji: `"Dla kogo"` poprawnie wskazuje `#mission` (zamiast nieistniejącego `#problem`), a pozostałe linki zachowują wskazanie na `#services` oraz `#customer-success`.
  - Zmieniono etykietę przycisku CTA (zarówno w wersji desktop, jak i w menu mobilnym) na `"Odbierz wizualizację"`.
- `components/layout/Footer.tsx`:
  - Zaktualizowano listę `sectionLinks` w stopce (`"Co robimy"` → `#services`, `"Dla kogo"` → `#mission`, `"Case study"` → `#customer-success`, `"Kontakt"` → `#contact`), wyrównując odnośniki z rzeczywistymi identyfikatorami sekcji na stronie.
- `tsc --noEmit` przechodzi czysto.

## Architecture Decisions

- shadcn/ui v4 uses `@base-ui/react` instead of `@radix-ui/react-*` — form.tsx was written
  by hand without the Radix Slot primitive (not available); FormControl uses a `<div>` wrapper
  instead of Slot, which is functionally equivalent for this project's use case.
- Tailwind CSS v4 used (`@import "tailwindcss"`) — CSS tokens defined in `@theme inline` +
  `:root` blocks inside globals.css.
- Project is light-mode only — `.dark` class block removed from globals.css; `@custom-variant
  dark` kept to avoid shadcn component class errors but will never activate.

## Session Notes

- All components import without errors; `cn()` works; build is clean.
- Design token variables: `--bg-base`, `--bg-surface`, `--text-primary`, `--text-muted`,
  `--accent-primary`, `--accent-warm`, `--border-default`, `--state-error`, `--state-success`.
- Font CSS variables: `--font-syne`, `--font-dm-sans`, `--font-geist-mono`.
