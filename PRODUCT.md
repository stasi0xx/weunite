# Product

## Register

brand

## Users

Small local business owners reached via paid Facebook/Instagram ads — currently the primary
niche is vacation rental property owners (domki letniskowe) who manage bookings by phone or
through commission-taking third-party platforms. They land on this page mid-scroll, skeptical
of agency pitches, and need to be convinced in one sitting that WeUnite is capable and worth a
free consultation call. The job to be done: recognize their own pain (manual bookings, no
online presence, no automation), see credible proof WeUnite solves it, and self-book a call
without ever talking to a human first.

## Product Purpose

WeUnite is a two-person digital agency (social media management, custom websites with
booking/payment integration, business automations) using this landing page as its sole,
fully-automated sales funnel: ad click → offer → lead form → automated email sequence →
self-service booking → reminders → call. Success is a submitted lead that becomes a booked
call with zero manual team involvement up to that point.

## Brand Personality

Confident, warm, capable. An agency that is clearly more competent than what its target
clients (small local business owners) are used to seeing, but never cold or corporate about
it — editorial and bold rather than sterile. Voice should read as capable and direct, not
salesy or hype-driven.

## Anti-references

- **Cheap local-business site**: cluttered, dated, Wix-template feel, mismatched stock photos,
  inconsistent spacing. This is exactly the category of site WeUnite exists to replace for its
  clients — the agency's own page must never resemble one, or the pitch undermines itself.
- No other explicit anti-references flagged; defer to the visual system already defined in
  DESIGN.md / ui-context.md for everything else.

## Design Principles

1. **Prove the capability, don't just claim it.** Every section should demonstrate the quality
   WeUnite sells (interaction polish, typography, layout craft) — the site is itself the case
   study.
2. **One conversion path, no distractions.** Every section should either build the case for the
   free consultation or move the visitor toward the form/booking flow — no dead-end content.
3. **Confident restraint, not clutter.** Bold display typography and generous whitespace over
   cramming in features; let the orange/coral accent and editorial type carry the energy rather
   than decoration.
4. **Automated feels human.** Since the entire funnel (emails, reminders, booking) runs without
   a person, copy and interaction design must compensate with warmth so it doesn't read as a
   cold, automated pipeline.
5. **Niche-specific proof over generic agency claims.** Favor vacation-rental-specific language,
   case studies, and visuals over generic "we do marketing" agency boilerplate.

## Accessibility & Inclusion

Target WCAG 2.1 AA as a formal baseline: sufficient color contrast (verify orange accent
`#FF5A1F` against cream `#F2EDE6` for text use), visible focus states, semantic landmark
structure, and `prefers-reduced-motion` support on all scroll/hover animations (already
partially implemented via `useReducedMotion` guards — extend to any new motion).
