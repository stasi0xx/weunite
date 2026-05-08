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

## Endorsement Section

- `components/sections/EndorsementSection.tsx` created; full-width `bg-card` section
  placed after ServicesSection; two-column layout (quote left, photo right on desktop,
  photo stacked above on mobile); Bartłomiej Glinka / Omida Group placeholder quote;
  photo from `public/entrepreneurs/Bartłomej.jpg`; Framer Motion slide-in from opposite
  sides with `useReducedMotion` guard; build passes clean.
  **NOTE:** placeholder quote — needs real sign-off from Bartłomiej Glinka before going live.

## Open Questions

- `@react-email/components@1.0.12` is deprecated upstream; newer react-email uses individual
  package imports. Confirm whether the email templates should be updated to use current
  `react-email` API before building email templates.

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
