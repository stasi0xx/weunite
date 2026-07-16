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
