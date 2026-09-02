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
  truth), `SuccessCounterHero.tsx` (normal-height `min-h-screen` section, no pin/scroll-lock; the
  reach number is a slot-style digit flip, not a count from zero — every digit position is on
  screen from first paint (SSR renders the real `HERO_REACH` = 27 000 000 for no-JS/crawlers, so
  width never changes mid-animation), then once the section enters view (`useInView`,
  `once: true`) each digit flips through a few random values on a `requestAnimationFrame` loop,
  staggered left-to-right, and lands back on its real value (~700ms total, single `font-extrabold`
  weight throughout — no font-weight swap mid-animation); exact `TOTAL_REACH` = 27 200 000 stays
  in `ResultsBlock`'s stat and drives the platform share bars), `ChallengeBlock.tsx` (sticky
  heading + 3-item list with
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

## Multi-Language Support (Feature 0001) — Phase 1 of 4 (Routing Infrastructure)

- Spec: `docs/specs/0001-multi-language-support/index.md`, status **In Progress**
  (advances to `Accepted` once all 4 phases land — see spec's Migration plan).
- **Package**: `next-intl@4.14.1` installed.
- **Routing**: `i18n/routing.ts` (`defineRouting`, locales `pl`/`en`, `defaultLocale: pl`,
  `localePrefix: "as-needed"` — Polish unprefixed, English under `/en/`), `i18n/navigation.ts`
  (`Link`/`redirect`/`usePathname`/`useRouter`/`getPathname`), `i18n/request.ts`
  (`getRequestConfig`, statically imports `messages/pl`/`messages/en`).
- **`proxy.ts`** (this Next.js version renamed `middleware.ts` → `proxy.ts`, confirmed via
  `node_modules/next/dist/docs/.../file-conventions/proxy.md` — no `middleware.md` exists in
  this version's bundled docs): wraps `next-intl/middleware`'s `createMiddleware(routing)`;
  matcher explicitly excludes `/api`, `/booking`, `/_next`, `/ingest` (PostHog proxy),
  `/opengraph-image` (no file extension), `favicon.ico`/`icon.png`/`apple-icon.png`,
  `sitemap.xml`/`robots.txt`, plus any path with a dot.
- **`next.config.ts`**: wrapped with `createNextIntlPlugin()` (`next-intl/plugin`), composed
  inside the existing `withSentryConfig(...)` wrap (next-intl innermost, Sentry outermost).
- **App directory restructure** (Next.js "multiple root layouts" pattern — neither layout wraps
  the other): `app/(main)`, `app/wizualizacja`, `app/dziekujemy`, `app/sentry-example-page`
  moved under `app/[locale]/...` via `git mv` (content unchanged). `app/[locale]/layout.tsx` is
  a new root layout (`<html lang={locale}>` dynamic, `generateStaticParams` over
  `routing.locales`, `setRequestLocale`, `NextIntlClientProvider`) — its `metadata`/JSON-LD are
  still the old static Polish-only object for now, deliberately deferred to build plan task 6
  (locale-aware `generateMetadata` + hreflang). `app/booking/layout.tsx` becomes its own
  independent root layout (`<html lang="pl">`, unchanged behavior) since it can no longer rely
  on the removed shared `app/layout.tsx`. `app/layout.tsx` deleted. `app/not-found.tsx` added
  as the root-level fallback next-intl's `notFound()` needs (fires *before* `app/[locale]/layout.tsx`
  emits `<html>`, e.g. an unsupported locale segment like `/fr/anything` — AC-9) — minimal inline
  styles, no Tailwind, since it renders outside any locale-aware layout.
- **Shared providers, not duplicated**: `lib/fonts.ts` (Syne/DM_Sans, previously inline in the
  old root layout) and `components/shared/RootProviders.tsx` (PostHog, MetaPixel, CookieBanner,
  Toaster) are imported by both root layouts instead of either wrapping the other.
  `app/booking/layout.tsx` also wraps `RootProviders` in a **static** `NextIntlClientProvider`
  (`locale="pl"`, `messages` imported directly from `messages/pl`, no routing/middleware
  involvement) purely so `CookieBanner`'s `useTranslations()` call doesn't throw on `/booking` —
  booking itself stays entirely outside the locale routing system.
- **`components/ui/hover-link.tsx`**: swapped its plain `<a>` for next-intl's `Link` — confirmed
  via `node_modules/next-intl/dist/.../navigation/shared/BaseLink.js` and `utils.js`
  (`isLocalizableHref`) that this correctly auto-prefixes internal paths (`/realizacje`) with the
  current locale while passing fragments (`#services`), `mailto:`, `tel:`, and external `https://`
  hrefs through unchanged — so every existing `HoverLink` call site site-wide becomes
  locale-correct immediately, not just the ones touched in this phase.
- **`messages/pl/common.json` + `messages/en/common.json`** (+ `messages/{pl,en}/index.ts`
  composing namespaces): first namespace, covers Navbar, Footer, and the cookie banner. More
  namespaces get added per page-migration batch in phase 2.
- **`components/layout/LanguageSwitcher.tsx`**: new. Swaps locale while staying on the same
  page (AC-3) and preserves the query string, e.g. `fbclid`/`utm_*` ad tracking params (AC-12).
  Added to `Navbar.tsx` (desktop + mobile) and `Footer.tsx` (mobile row).
- **`Navbar.tsx`, `Footer.tsx`, `CookieBanner.tsx`** migrated to `useTranslations`; logo/internal
  links now use next-intl's `Link` directly (not just via `HoverLink`) so they stay in the
  current locale rather than always resolving to the Polish root.
  **Gotcha (real build regression, not hypothetical):** making `Footer.tsx` and
  `components/layout/MinimalFooter.tsx` render next-intl's `Link` while they were still Server
  Components silently flipped nearly every in-scope route from statically prerendered (`●`) to
  server-rendered on demand (`ƒ`) — a direct violation of the spec's invariant that in-scope
  pages must stay static (tied to `project-overview.md`'s "loads in under 2s on mobile" success
  criterion, paid ad traffic). Root-caused by isolation testing (confirmed `dziekujemy` and
  `sentry-example-page`, which never render `Footer`/`MinimalFooter`, stayed static throughout).
  Fixed by adding `"use client"` to both files. `components/layout/LanguageSwitcher.tsx`
  similarly wraps its `useSearchParams()`-consuming half in `<Suspense>` (same reason
  `app/providers.tsx`'s `PostHogPageView` already does) so it doesn't force the same bailout.
  Verified fixed: full route table re-checked after each fix via `rm -rf .next && next build`
  until every in-scope `[locale]` route read `●`.
  **NOTE (accepted, not fixed):** `/booking/confirmed` went from static (`○`) to dynamic (`ƒ`)
  as a side effect of `app/booking/layout.tsx`'s new `NextIntlClientProvider` wrap. `/booking` is
  explicitly out of the spec's "must stay static" scope (that invariant only covers in-scope
  paid-ad-traffic pages); `/booking/confirmed` itself has no dynamic content, so this is a minor,
  low-impact regression on a parked demo page, not a functional issue. Left as-is; flagged here
  rather than silently accepted.
- **Verification**: `npx tsc --noEmit` clean. `npx eslint` clean on every file touched in this
  phase (one pre-existing, unrelated warning remains in `CookieBanner.tsx` — a `setState` inside
  `useEffect` on a line this phase didn't touch). `rm -rf .next && npx next build` succeeds;
  every in-scope page under `[locale]` renders as `●` (SSG via `generateStaticParams`) at both
  `/path` (pl) and `/en/path`; `/booking`, `/booking/confirmed`, `/api/*` render outside the
  locale tree as before. Not yet run: a live dev-server / browser check of the switcher's actual
  click behavior, the `/fr/anything` 404 path, or the remembered-locale cookie round trip — per
  stored preference this project verifies UI changes via `tsc`/`eslint`/`build` rather than
  launching a browser preview; runtime behavior is `/check verify`'s job, using the verify steps
  this feature will emit once all 4 phases are built.

## Multi-Language Support (Feature 0001) — Phase 2, home page (proof slice) — done

- **`messages/{pl,en}/home.json`** created (new namespace, wired into `messages/{pl,en}/index.ts`):
  `hero`, `clientLogos`, `problem`, `services`, `customerSuccess` (nested: `counterHero`,
  `movementIntro`, `challengeBlock`/`challenges.<id>`, `strategyStack`/`strategists.<id>`,
  `offlineBlock`, `resultsBlock`, `headlineStats.<id>`, `platformResults.<id>`, `outro`),
  `contactForm` (nested: `trustSignals`, `explanations.step1-4`, `offerSelector`, `fields.*`,
  `buttons`, `errors`). English is a first AI draft — per the spec's Follow-up, needs a content
  review before publishing, not a same-day ship.
- **Rich text**: `ProblemSection`'s bolded mission paragraph and `OfflineBlock`'s bolded
  "5 schools" sentence use next-intl's `t.rich("body", { b: (chunks) => <strong>...} })` instead
  of splitting into fragile sub-keys — the message JSON carries `<b>...</b>` inline.
  `t.raw()` used for `platformResults.<id>.details` (a string array, not a single message).
- **`components/sections/customer-success/data.ts`** restructured: locale-invariant structure
  only now (ids, images, hrefs, the client-reported numbers) — see the file's own updated
  header comment. All translatable prose (titles, roles, blurbs, labels, platform metrics/details)
  moved to `home.json`'s `customerSuccess` namespace, looked up by the same `id` each data
  entry already carried. Every `customer-success/*.tsx` component updated to pull its copy via
  `useTranslations("home.customerSuccess...")` + the shared `id`, instead of reading it directly
  off the data array.
- **`components/sections/ServicesSection.tsx`**: the two service cards' copy (title/description/
  imageAlt/CTA labels) moved to `home.json`'s `services` namespace, keyed by `websites` /
  `socialMedia`; the locale-invariant bits (device, image, href) stayed inline as `serviceConfig`.
  Its secondary CTA (`/strony-internetowe`, `/social-media`) now uses next-intl's `Link` instead
  of plain `next/link`, so it stays in the current locale.
- **`components/sections/ContactFormSection.tsx`** (972 lines, the largest single file in this
  migration): every label/placeholder/button/step-explanation/toast string now comes from
  `home.json`'s `contactForm` namespace. The 4 zod validation schemas (`step1Schema`…
  `step4Schema`) moved from module scope into a `buildFormSchema(t)` factory called via
  `useMemo(() => buildFormSchema(t), [t])` inside the component — they can't stay at module
  scope once their error messages need a hook (`useTranslations`). `heading`/`description` props
  lost their hardcoded-Polish-JSX defaults; when omitted, the component now falls back to
  translated copy computed inside the function body instead (no caller currently overrides
  either prop, confirmed via a repo-wide grep before making this change).
- **Real build regression found and fixed (not hypothetical, confirmed by isolation testing):**
  swapping `HoverLink` (`components/ui/hover-link.tsx`) from a plain `<a>` to next-intl's `Link`
  silently flipped nearly every in-scope route from statically prerendered (`●`) to
  server-rendered on demand (`ƒ`) — because `Footer.tsx` and `components/layout/MinimalFooter.tsx`
  render `HoverLink` while still being **Server Components**, and next-intl's Server Component
  `Link` reads request-scoped locale state in a way that isn't static-generation-safe here. This
  directly violates the spec's invariant that in-scope pages must stay static (tied to
  `project-overview.md`'s "loads in under 2s on mobile" criterion, paid ad traffic). Root-caused
  by confirming `dziekujemy` and `sentry-example-page` — the only two in-scope routes that never
  render `Footer`/`MinimalFooter` — stayed static throughout, while every route that does render
  either of them flipped dynamic. **Fix**: added `"use client"` to both `Footer.tsx` and
  `MinimalFooter.tsx`. `components/layout/LanguageSwitcher.tsx` (built in Phase 1) already wraps
  its `useSearchParams()`-consuming half in `<Suspense>` for the same underlying reason (matches
  `app/providers.tsx`'s existing `PostHogPageView` pattern). Verified fixed by re-running
  `rm -rf .next && next build` after each fix until every in-scope route read `●` again.
  **NOTE for whoever migrates `/strony-internetowe`, `/social-media`, `/realizacje`, `/wizualizacja`
  next**: if any Server Component in those trees starts rendering `HoverLink` or next-intl's
  `Link`/`useTranslations` directly (not just via `Footer`/`Navbar`, which are already client
  components), check the build's route table (`●` vs `ƒ`) before moving on — the same class of
  regression can recur silently on any newly-touched Server Component.
- **Verification**: `npx tsc --noEmit` clean. `npx eslint` clean on every file touched this phase
  (pre-existing, unrelated warnings remain elsewhere — a `react-hooks/set-state-in-effect` in
  `SuccessCounterHero.tsx` and a React Compiler incompatible-library warning on
  `form.watch()` in `ContactFormSection.tsx`, neither introduced by this phase). `rm -rf .next &&
  npx next build` succeeds; every in-scope `[locale]` route (home included) still renders `●`.
  A repo-wide grep for Polish diacritics across every file touched this phase turned up only code
  comments, confirming no leftover hardcoded Polish UI text. Not yet run: a live dev-server /
  browser check of the actual rendered English copy, form submission end to end in English, or a
  native-speaker read of the AI-drafted English translations — per this session's stored
  preference, UI changes here are verified via `tsc`/`eslint`/`build` rather than a browser
  preview; deferred to `/check verify` once all 4 phases are built.

## Multi-Language Support (Feature 0001) — Phase 2, remaining pages — done except legal

- **`/strony-internetowe`**: `messages/{pl,en}/websites.json` (hero, 3-step process, 2 case
  study cards). `WebsitesProcessSection.tsx`'s `/#contact` CTA swapped from `next/link` to
  next-intl's `Link`.
- **`/social-media`**: `messages/{pl,en}/social.json` (hero, 3 pillars — Instagram/TikTok/Ads —
  CTA). `SocialPillarsSection.tsx`'s `AdsPanel` counter now formats via
  `(2400).toLocaleString(useLocale())` instead of a hardcoded `"pl-PL"`, so the growing-counter
  animation reads "2,400+" in English instead of "2 400+". `SocialReelsSection.tsx` and
  `SocialSuccessCarousel.tsx` are imported by `social-media/page.tsx` but never actually
  rendered (pre-existing dead imports, confirmed via grep) — left untranslated since they
  produce no visible untranslated text on the page; not part of this migration's scope.
- **`/realizacje`** (list + 4 detail pages): `messages/{pl,en}/caseStudies.json` covers the
  list/intro/cta/breadcrumb/detail-shared strings plus all 4 projects' label/title/teaser/
  description/imageAlt, keyed by camelCased slug (`nowy-relaks` → `nowyRelaks`, via the new
  `toProjectMessageKey()` helper in `case-studies/data.ts`). `case-studies/data.ts` restructured
  the same way as `customer-success/data.ts` (Phase 2 home-page work) — locale-invariant fields
  only (slug, image, liveUrl, variant), translatable copy moved out to messages.
  **Compile-breaking side effect caught and fixed**: `nowy-relaks/page.tsx` and
  `gdynia-padel-club/page.tsx` read `project.title`/`project.teaser` (now-removed fields) for
  their still-static-Polish-only `metadata` exports — restored as literal strings in both files
  (marked with a `TODO(task 6)` comment) rather than left broken.
  The `creo-gedania` deep-dive subtree (`CreoGedaniaSection`, `CreoHero`, `CreoIntro`,
  `CreoVideoBlock`, `CreoResultsBlock`, `NumberedChapter`) got its own
  `messages/{pl,en}/creoGedania.json`, following the identical data.ts-restructure pattern as
  `pierwsze-trzezwe-pokolenie`'s `CustomerSuccessSection` did in Phase 2's home-page work.
  **Same Server-Component gotcha recurred once more, caught proactively this time**:
  `CaseStudyBreadcrumb.tsx` (rendered directly by two Server Component pages,
  `creo-gedania/page.tsx` and `pierwsze-trzezwe-pokolenie/page.tsx`) got `"use client"` added
  *before* building, once the pattern was recognized, rather than needing a build-regression hunt.
- **`/wizualizacja`**: `messages/{pl,en}/visualization.json` (hero incl. the monthly-cap
  progress bar, 2 case study cards). The "N spots left this month" line now uses next-intl's ICU
  plural support (`{count, plural, one {...} other {...}}`) instead of the original's manual
  `remaining === 1 ? "miejsce" : "miejsc"` ternary — deliberately kept the same one-vs-other
  simplification the original already made (real Polish grammar needs a third "few" category for
  2–4, which the original never handled either; not scope creep to leave that as-is).
  `MinimalHeader.tsx` (Server Component, plain `<a href="/">`) converted to a Client Component
  using next-intl's `Link`, matching the Footer/MinimalFooter/CaseStudyBreadcrumb fix.
- **`/dziekujemy`**: `messages/{pl,en}/dziekujemy.json`. Page converted to a Client Component
  (was a trivial Server Component) so its "back to home" link could use next-intl's `Link`
  instead of a hardcoded `href="/"` that would have silently sent an English visitor back to the
  Polish homepage.
- **Verification**: `npx tsc --noEmit` and `npx eslint` clean after every batch above. Full
  `rm -rf .next && npx next build` re-run after `/realizacje` (the largest, riskiest batch,
  given the two Server-Component gotchas found in it) — every in-scope route still `●`.
  Typecheck + lint re-confirmed clean after `/wizualizacja` and `/dziekujemy`; a final full
  build re-run is still owed before this phase is called fully done (not yet re-run since the
  `/dziekujemy` edit — low risk, since that page and `MinimalHeader` follow the exact
  already-verified "use client" + next-intl Link pattern, but flagging it as unconfirmed rather
  than silently assuming green).

## Multi-Language Support (Feature 0001) — Phase 2 complete (legal pages)

- **All 3 legal pages migrated**: `messages/{pl,en}/legal.json` (shared `LegalPageLayout` shell
  strings: "last updated" label, "questions? write to us" footer line) plus one namespace per
  page — `regulamin.json`, `politykaPrywatnosci.json`, `politykaCookies.json` — each keyed by
  section (`s1`…`s10`, sub-items `a`–`e` for Polityka Prywatności's legal-basis breakdown,
  `table.rows` arrays for Polityka Cookies' 3 cookie tables). ~550 lines of dense Polish legal
  text translated into English across the three pages combined.
- **AC-13 (new cookie-preference row)**: added a third cookie category, "c) Cookies preferencji
  językowej" / "c) Language preference cookie", to `/polityka-cookies` documenting `NEXT_LOCALE`
  (confirmed as next-intl's actual cookie name and session-only default lifetime by reading
  `node_modules/next-intl/dist/.../routing/config.js` and `syncLocaleCookie.js` directly, not
  assumed) — in both languages, following the existing table format for the other two categories.
- **Real compile-breaking mistake caught immediately (not shipped)**: the first pass wrote all
  three legal pages as `"use client"` components that still tried to keep their
  `export const metadata` — which Next.js's App Router flatly disallows (`metadata` exports are
  Server-Component-only). Caught before running any check by re-reading what had just been
  written; fixed by splitting each into a thin Server Component `page.tsx` (keeps `metadata`,
  still the pre-existing static Polish-only object, `TODO(task 6)` territory like the rest) that
  renders a new Client Component holding the actual translated body:
  `components/sections/legal/{RegulaminContent,PolitykaPrywatnosciContent,PolitykaCookiesContent}.tsx`.
  `LegalPageLayout.tsx` (the shared shell all three render into) also got `"use client"` added
  pre-emptively, following the now fully-established pattern from every prior batch.
- Legal-page-specific rich text: `regulamin`'s § 9 links to the other two legal pages via
  next-intl's `Link` (`privacyLink`/`cookiesLink` custom tags through `t.rich()`);
  `politykaPrywatnosci`'s § 6 links to `uodo.gov.pl` (external, `target="_blank"`) the same way;
  `politykaCookies`'s cookie tables render from `t.raw("s2.x.table.rows")` (an array of
  `{name, purpose, duration}` objects, not translatable strings — `t.raw()` is the correct
  next-intl call for a non-message JSON value, same pattern already used for
  `platformResults.<id>.details` in the home-page migration).
- **Verification**: `npx tsc --noEmit` clean, `npx eslint` clean on every file in this batch,
  `rm -rf .next && npx next build` succeeds with every in-scope `[locale]` route (all 16 pages,
  32 including both locales) rendering `●` — the full route table, not spot-checked. A repo-wide
  grep for Polish diacritics across `components/sections/legal/` turned up zero matches, meaning
  Phase 2's own stated finish line ("no leftover untranslated Polish text on the English
  version") is met for every page this phase touched.
- **This closes out Phase 2 entirely** (spec build plan task 5). Session paused here at the
  engineer's explicit request, before Phase 3 begins — Phase 3's first step applies a migration
  to the live production Supabase database, a materially different risk category from the pure
  content work Phase 2 was.

## Multi-Language Support (Feature 0001) — Phase 3, tasks 6–9 — all done, migration applied

- **Task 7 update**: engineer applied `009_leads_locale.sql` to the live Supabase project and
  confirmed via the table editor — `leads.locale` column exists, existing rows show `locale = 'pl'`
  (AC-10 backfill confirmed live, not just generated). Task 7 is now complete; all of Phase 3
  (tasks 6–9) is done. Remaining before this feature reaches `done`: Phase 4 (task 10, full
  regression pass), then `/test` → `/sync`.
- **`/check verify` run (2026-09-01)**: dev server + real Supabase project, curl across all 26
  in-scope URLs (13 pages × 2 locales) confirmed correct `html lang`, self-referencing canonical,
  and full hreflang set on every one (AC-7); JSON-LD `inLanguage`/`og:locale`/descriptions
  confirmed locale-aware (AC-7); `sitemap.xml` confirmed 24 entries with hreflang (AC-8); `/fr/
  anything` → 404 (AC-9); `/en/booking` → 404, `/booking`/`/booking/confirmed` still `lang="pl"`
  (AC-4 routing half). Full Playwright run of the English contact form (all 4 steps) redirected to
  `/en/dziekujemy` with the "back to home" link at `/en` (AC-11), and the resulting lead row
  confirmed `locale = 'en'` (AC-5). A direct API call with an invalid `locale: "xx"` confirmed it
  coerces to `'pl'` rather than being rejected, matching the spec's invariant (AC-5). Confirmed
  zero `leads` rows have a null `locale` (AC-10). All 3 test leads created during this run were
  deleted from the live table afterward so they don't show up as false leads to the team.
  **Blocked, not verified**: AC-6 (the actual received confirmation email content) — submissions
  used a fake `@example.com` address with no accessible inbox from this session; the send
  completed without error and the correct `locale` was confirmed stored before the email call, but
  nobody actually read a received English or Polish confirmation email. **Not run**: a full
  Polish-locale browser submission (the coercion test exercises the same insert code path but
  isn't a full UI walkthrough). Full `verify.md` at `docs/specs/0001-multi-language-support/
  verify.md` has the per-step evidence. Overall: Phase 3 (tasks 6–9) conformance is a partial PASS
  — every AC-7/8/9/10/11 check passed with cited evidence; AC-6 needs a real inbox check before
  it can be called done, which is a task for whoever reviews the AI-drafted English copy anyway
  (see the spec's Follow-up section) — worth doing in the same pass.

- **Task 6 (locale-aware metadata + hreflang + sitemap) — done.** New `lib/seo.ts`:
  `buildAlternates(pathname, locale)` builds a self-referencing `{ canonical, languages }` object
  (all locales + `x-default`) off next-intl's `getPathname` (`i18n/navigation.ts`), so every
  in-scope page's canonical points at itself, never its sibling locale (AC-7). All 14 static
  `metadata` exports converted to `generateMetadata`: the root `app/[locale]/layout.tsx`
  (title/description/OG/Twitter from a new `common.json` → `seo` namespace, plus its inline
  `jsonLd` — `inLanguage`/OG `locale` now branch `pl-PL`/`pl_PL` vs `en-US`/`en_US`, and the
  business/website/3-service descriptions now come from `t("common.seo.*")` instead of hardcoded
  Polish strings), the home page (`app/[locale]/(main)/page.tsx`, previously had **no** metadata
  export at all — deliberately omits its own `title` so it inherits the layout's locale-aware
  `title.default` rather than doubling up "WeUnite | WeUnite"), `strony-internetowe`,
  `social-media`, `realizacje` (list) + all 4 detail pages, `wizualizacja` (layout-level),
  `dziekujemy` (layout-level, stays `noindex`), and the 3 legal pages. Every existing Polish
  title/description string was preserved verbatim as the `pl` message value (no copy drift on
  already-indexed pages); English is a first AI draft, same Follow-up caveat as Phase 2.
  New `meta: { title, description }` keys added to `websites.json`, `social.json`,
  `caseStudies.json` (list + all 4 `projects.<id>` entries), `visualization.json`,
  `dziekujemy.json`, `regulamin.json`, `politykaPrywatnosci.json`, `politykaCookies.json` (pl+en).
  `app/sitemap.ts` rewritten: was a hardcoded 9-URL Polish-only array missing
  `strony-internetowe`/`social-media`/`wizualizacja` entirely; now emits both locale URLs for
  all 12 indexable in-scope pages (24 entries) via `getPathname` + `buildAlternates(...).languages`
  per AC-8. `/dziekujemy` deliberately excluded from the sitemap (stays `noindex`, same precedent
  as `/booking`'s existing exclusion) — flagging this as a judgment call, not literal AC-8 text.
  Verified: `npx tsc --noEmit` clean, `npx eslint` clean (only pre-existing unrelated warnings:
  `social-media/page.tsx` unused imports, `ContactFormSection.tsx` `form.watch()` React Compiler
  note, both flagged in earlier phases). `rm -rf .next && npx next build` succeeds; every in-scope
  `[locale]` route still renders `●` (static via `generateStaticParams`), both `/pl` and `/en`.
  **NOTE (pre-existing, not touched):** the build prints
  `metadataBase property in metadata export is not set... using "http://localhost:3000"` twice,
  traced to `app/opengraph-image.tsx` — it lives outside the `[locale]` tree (excluded from
  locale routing by the spec's own invariant) and so has never inherited `metadataBase` from any
  layout since `app/layout.tsx` was deleted in Phase 1; out of this task's scope (the spec's
  Consequences section explicitly keeps the OG image Polish-only/unlocalized), flagged for a
  possible separate follow-up.
- **Task 7 (`009_leads_locale.sql`) — migration written, NOT yet applied.**
  `supabase/migrations/009_leads_locale.sql` adds
  `locale text not null default 'pl' check (locale in ('pl','en'))` to `leads`, backfills existing
  rows to `'pl'`, matches the exact style of migrations 007/008. **Not applied to the live
  Supabase project**: the Supabase CLI here isn't linked and `.env` only holds the project URL +
  service-role/anon keys, not a DB password or personal access token, so `supabase link` /
  `db push` and a direct Postgres connection are both unavailable from this session. Asked the
  engineer how to proceed; they chose to apply it themselves (dashboard SQL editor or CLI once
  linked) — **this must be applied before deploying tasks 8–9's code**, since the API route's
  step-1 and legacy-fallback inserts now write a `locale` column that doesn't exist in the live
  schema yet (no `PGRST204` fallback was added for it, matching the existing precedent that only
  `current_step` — the very first progressive-saving column — got that retry-without-column
  treatment; `offer_type` didn't get one either).
- **Task 8 (API + form locale wiring) — done.** `app/api/leads/route.ts`: `step1Schema` and
  `fullSchema` (the legacy single-step fallback) both gained
  `locale: z.enum(['pl','en']).catch('pl')` — `.catch()` coerces both a missing *and* an invalid
  value to `'pl'` rather than rejecting the request, per the spec's key invariant. `locale` added
  to the step-1 `baseInsert` and the legacy `baseFullInsert`. `components/sections/
  ContactFormSection.tsx`: swapped its `useRouter` import from `next/navigation` to next-intl's
  `@/i18n/navigation` (so both existing `router.push("/dziekujemy")` calls — the marketing-plan
  single-step flow and the normal step-4 final submit — automatically resolve to `/en/dziekujemy`
  on the English site, satisfying AC-11, with no change needed at the call sites themselves), added
  `useLocale()` and threaded `locale` onto all 3 client-constructed payloads that reach a
  locale-accepting schema: the step-1 create call, the marketing-plan variant's own step-1 call,
  and the no-`leadId` legacy fallback payload in `handleFinalSubmit`. `app/[locale]/dziekujemy/
  page.tsx`'s "back to home" link was already using next-intl's `Link` (built in Phase 2) — no
  change needed there, confirmed rather than assumed.
- **Task 9 (email locale) — done.** `emails/LeadConfirmation.tsx` gained a
  `locale?: 'pl' | 'en'` prop (default `'pl'`), `<Html lang={locale}>`, and every hardcoded string
  (preview text, greeting, intro paragraph, the 3-step "what's next" card, CTA, signature line,
  footer, unsubscribe link) now branches through a local `COPY` map instead of next-intl (this
  component renders outside the app's request/locale context, so a plain per-locale object is the
  right tool here, not `useTranslations`). `lib/resend.ts`'s `sendLeadConfirmation(to, name,
  locale = 'pl')` gained the third param, passes it to `renderLeadConfirmation`, and now also
  branches the **subject line** per locale (`LEAD_CONFIRMATION_SUBJECT` map) — the spec only
  named the email body copy, but a Polish subject on an English lead's confirmation would still
  violate AC-6's spirit, so this was extended to match. `app/api/leads/route.ts`'s two
  `sendLeadConfirmation(...)` call sites (step-4 success branch, legacy fallback branch) now pass
  the third argument — step-4 reads `lead.locale` off the just-refetched row (available once
  migration 009 is live), the legacy branch reads `fullParsed.data.locale` directly.
  `BookingConfirmation` and the internal Polish team-notification email are untouched, exactly as
  the spec calls for.
- **Verification**: `npx tsc --noEmit` clean across all of tasks 6–9. `npx eslint` clean (same
  pre-existing warnings noted above, none new). `rm -rf .next && npx next build` succeeds, full
  route table re-confirmed static for every in-scope page. Not yet run: any live behavior check
  (submitting the form end-to-end, confirming the `locale` column round-trips, opening the actual
  rendered English confirmation email) — blocked on migration 009 being applied first, and this
  project's stored convention is to verify UI via `tsc`/`eslint`/`build` rather than a browser
  preview, deferring live behavior to `/check verify`.

## Next Up (Multi-Language Support, phase 3 migration + phase 4 — not started)

- **Finish task 7**: engineer applies `supabase/migrations/009_leads_locale.sql` to the live
  Supabase project (dashboard SQL editor, or `supabase link` + `db push` once the CLI has
  credentials), then confirm the `locale` column is actually live (query or introspect — a
  generated-but-unapplied migration doesn't count as done) before this task is marked complete.
- **Phase 4** (spec build plan task 10): full regression pass per the spec's verify protocol —
  `/booking` + `/booking/confirmed` unaffected by the locale middleware, `/en/booking` 404s,
  PostHog/Meta Pixel/cookie banner still work on `/en/*`, every canonical self-references,
  `tsc`/`next build` clean (already true going into phase 4).
- After phase 4 lands: run `/check verify` against the verify steps this feature will emit, then
  `/test` to lock the durable ones, then `/sync`. Spec `**Status**` advances to `Accepted` only
  once the whole feature is `done`.

## Customer Statistics Assets

- Added the two losslessly extracted customer-statistics screenshots with transparent outer
  backgrounds to `public/statystyki-przed-bez-tla.png` and
  `public/statystyki-po-bez-tla.png`. File hashes match the verified source exports in
  `output/statystyki/`, so no chart data, labels, dates, or numeric values changed during the
  move.
- Replaced `public/casestudy/1.png` and `public/casestudy/2.png` in place with deterministic
  transparent-background versions. Both assets retain their original 940×788 canvas and all
  panel/chart pixels; only the surrounding red-orange and green gradient backgrounds were
  removed. Both files now use 32-bit ARGB PNG output.

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
