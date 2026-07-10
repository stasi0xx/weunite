---
name: WeUnite
description: Editorial, warm-toned agency landing page and lead funnel for vacation rental owners
colors:
  ember-orange: "#FF5A1F"
  warm-coral-glow: "#FF8C5A"
  toasted-cream: "#F2EDE6"
  warm-ash-surface: "#EBE5DC"
  charcoal-ink: "#141414"
  muted-umber: "#7A7367"
  sand-border: "#DDD6CB"
  charred-umber: "#3D2B1F"
  alert-red: "#DC2626"
  confirmation-green: "#16A34A"
typography:
  display:
    fontFamily: "Syne, sans-serif"
    fontSize: "clamp(3rem, 8vw, 8rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Syne, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Syne, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.1em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  container-x: "24px"
  section-y: "96px"
  card-p: "32px"
components:
  button-primary:
    backgroundColor: "{colors.ember-orange}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "10px 24px"
  button-primary-hover:
    backgroundColor: "{colors.ember-orange}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
  nav-pill-link:
    backgroundColor: "transparent"
    textColor: "{colors.muted-umber}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
  nav-pill-link-hover:
    backgroundColor: "{colors.ember-orange}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
  card:
    backgroundColor: "{colors.warm-ash-surface}"
    textColor: "{colors.charcoal-ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-p}"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal-ink}"
    rounded: "{rounded.lg}"
    padding: "4px 10px"
---

# Design System: WeUnite

## 1. Overview

**Creative North Star: "The Golden Hour Agency"**

WeUnite's landing page reads like golden-hour light on a warm interior: toasted cream and ash
surfaces, one confident ember-orange accent, and massive Syne display type that carries the
pitch without needing decoration to prove it. Nothing here is corporate-cold or Silicon-Valley
sterile — the palette and type are warm on purpose, because the product being sold is trust
from small business owners who are used to being pitched by agencies that feel neither warm
nor capable. The system explicitly rejects the cheap, dated, Wix-template feel of the sites
WeUnite exists to replace: no clutter, no mismatched stock photography, no inconsistent
spacing. Every section is built to demonstrate the same craft quality being sold, so the page
functions as its own case study.

Density is generous, not sparse: `py-24 md:py-32` between sections and `max-w-7xl` content
width give each section room to make one confident claim at a time, backed by bold display
type rather than dense feature lists.

**Key Characteristics:**
- Warm neutral base (cream → ash surface → charred-umber) with a single high-energy accent
- Syne ExtraBold display type as the primary hierarchy tool, not decoration
- Flat, tonal depth (ring outlines, surface-color steps) — no drop shadows anywhere
- Pill-shaped interactive elements (buttons, nav links) against softer 16–24px container radii
- Spring-physics micro-interactions (scale on hover/tap) rather than linear easing

## 2. Colors

Restrained-to-committed: one warm neutral scale carries the page, with ember-orange doing all
the accent work — it should read as rare and confident, never spread thin across the page.

### Primary
- **Ember Orange** (#FF5A1F): The single accent. Primary CTA fills, active nav-pill fill,
  icon color inside pain-point/feature icon boxes, focus rings (at reduced opacity), form
  field focus. Used sparingly — large blocks of solid ember-orange are reserved for the hero
  gradient blob and primary buttons, not backgrounds or text.

### Secondary
- **Warm Coral Glow** (#FF8C5A): Paired with Ember Orange only in the radial gradient blobs
  (hero, CTA sections) — never used alone as a flat fill or text color.

### Neutral
- **Toasted Cream** (#F2EDE6): Page background. Warm, never stark white.
- **Warm Ash Surface** (#EBE5DC): Card and elevated-surface background — one step darker than
  the page so cards read as lifted without a shadow.
- **Charcoal Ink** (#141414): Primary text. Near-black, never pure `#000`.
- **Muted Umber** (#7A7367): Secondary text — descriptions, nav links at rest, muted labels.
- **Sand Border** (#DDD6CB): Hairline borders — navbar bottom border, section dividers,
  input strokes.
- **Charred Umber** (#3D2B1F): Dark contrast panel, used deliberately in the Automation
  service visual to signal "the technical/automated side" against the otherwise warm-light
  page — not a general-purpose dark mode.

### Named Rules
**The One Accent Rule.** Ember Orange is the only saturated color on the page. Warm Coral Glow
only ever appears blended into it inside a gradient blob — it is not a second independent
accent to place at will.

## 3. Typography

**Display Font:** Syne (with sans-serif fallback)
**Body Font:** DM Sans (with sans-serif fallback)
**Label/Mono Font:** system monospace stack (`ui-monospace, SFMono-Regular, Menlo, Monaco,
Consolas`) — present as a token for code/data contexts but not currently rendered anywhere on
the marketing page; treat as reserved, not a live brand element.

**Character:** Syne ExtraBold carries all conviction — it's geometric, wide, slightly
unconventional, and does the "confident agency" work on its own. DM Sans stays quiet and
legible underneath it; the pairing works because only one of the two fonts is ever trying to
be interesting at a time.

### Hierarchy
- **Display** (800, `clamp(3rem, 8vw, 8rem)`, line-height 1, `tracking-tight`): Hero headline
  only. Left-aligned or centered, one per page.
- **Headline** (800, `text-4xl md:text-5xl lg:text-6xl`, line-height 1.1, `tracking-tight`):
  Section H2s ("Prowadzisz wynajem...", section intros). One per section, centered or
  left-aligned depending on section layout.
- **Title** (700, `text-xl`, line-height 1.3): Card and component-level headings — pain-point
  card titles, service names, testimonial names.
- **Body** (400, `text-base`, line-height 1.6, `text-muted-foreground` or `text-foreground`):
  Paragraph copy. Cap measure around 65–75ch on any wide single-column block.
- **Label** (600, `text-xs`, letter-spacing `0.1em`, uppercase, `text-muted-foreground`):
  Eyebrows above headlines ("Brzmi znajomo?"), section kickers, logo-strip captions.

### Named Rules
**The Single-Voice Rule.** Only Syne is allowed to be loud (ExtraBold, oversized). DM Sans
never goes above medium weight or above `text-xl` — if body copy needs emphasis, reach for
Charcoal Ink color or Syne weight, not a bigger DM Sans size.

## 4. Elevation

Flat and tonal, deliberately. There is no `box-shadow` anywhere in the codebase. Depth is
conveyed entirely through surface-color stepping (Toasted Cream → Warm Ash Surface → Charred
Umber, darkest = most "elevated"/foregrounded) and a single hairline `ring-1 ring-foreground/10`
on cards — not through blur or shadow.

### Named Rules
**The No-Shadow Rule.** Never introduce `box-shadow` for card, button, or panel elevation.
Depth comes from surface-color stepping and a 1px `ring-foreground/10` outline only. If a new
component needs to feel "above" the page, move it one step warmer/darker in the surface scale
before reaching for a shadow.

## 5. Components

Everything reads as tactile and confident: interactive elements respond immediately with
spring-physics scale, not linear fades, and shape vocabulary is binary — either fully pill
(`rounded-full`) for anything clickable-and-primary, or a soft 16–24px radius for anything
that's a container.

### Buttons
- **Shape:** Pill (`rounded-full`, 9999px) for every primary call-to-action. This is the
  canonical brand-register button — not the `rounded-lg` shadcn `Button` primitive default,
  which exists in the library but is not what ships on the marketing page.
- **Primary:** `bg-primary` (#FF5A1F) fill, white text, `px-6 py-2.5`, `font-medium text-sm`.
- **Hover / Focus:** Spring scale to `1.05` on hover, `0.9` on tap
  (`stiffness: 400, damping: 17`), plus a radial white glow
  (`rgba(255,255,255,0.18)` at center, fading to transparent) fading in over 300ms.
- **Nav / Ghost (HoverLink pattern):** No visible button chrome at rest — on hover, an
  Ember Orange fill sweeps in from `scale-0` to `scale-100` behind the pill-shaped hit area
  over 200ms ease-out, text flips to white.

### Cards
- **Corner Style:** 16px (`rounded-2xl`).
- **Background:** Warm Ash Surface (#EBE5DC).
- **Shadow Strategy:** None — see Elevation. Depth is the surface-color step against the
  Toasted Cream page background plus `ring-1 ring-foreground/10`.
- **Internal Padding:** `p-8` (32px), `gap-4` between internal blocks.
- **Icon boxes inside cards:** 48×48px, `rounded-xl` (12px), `bg-background` (one step
  lighter than the card itself), Ember Orange icon at 24×24px, stroke-only (Lucide, never
  filled).

### Inputs / Fields
- **Style:** Transparent background, `border border-input` (Sand Border), `rounded-lg` (16px),
  `h-8`, `px-2.5`.
- **Focus:** Border shifts to Ember Orange (`focus-visible:border-ring`) with a soft
  `ring-3 ring-ring/50` halo — no glow, no shadow.
- **Error:** Border and ring shift to Alert Red (`aria-invalid:border-destructive`,
  `ring-destructive/20`).

### Navigation
- **Style:** Fixed top, `bg-background/80` with `backdrop-blur-md`, `border-b` in Sand Border.
  Shrinks vertical padding (`py-4` → `py-2`) and gains a soft shadow-free shift (background
  opacity bump to `/90`) on scroll past 20px.
- **Links:** HoverLink pill pattern (see Buttons) at `text-sm font-medium`.
- **Mobile:** Full-screen drawer (`h-3/4`), spring slide down from `y: -100%`
  (`stiffness: 300, damping: 30`), `rounded-b-3xl` (24px), links stagger in at 0.06s
  intervals, full-width pill CTA at the bottom.

### Gradient Blob (signature component)
Radial gradient from Ember Orange through Warm Coral Glow to transparent, `opacity-35`,
`blur(80px)`, slow 12s alternate drift animation. Positioned absolutely in hero/CTA sections
only, always `pointer-events-none` and `aria-hidden`. This is the one place Warm Coral Glow is
allowed to appear on its own gradient stop.

## 6. Do's and Don'ts

### Do:
- **Do** keep Ember Orange to a single accent role — CTAs, active states, icons, focus rings.
  If more than one large area of a section is orange, that's too much.
- **Do** use `rounded-full` for every primary clickable action and reserve 16–24px radii for
  containers (cards, drawers, modals).
- **Do** convey elevation via surface-color stepping and `ring-1 ring-foreground/10` only.
- **Do** use spring-physics hover/tap scale on interactive elements, not linear opacity fades.
- **Do** guard every scroll/hover animation with `useReducedMotion` (already the pattern in
  every shipped section — extend it, don't skip it, on new ones).
- **Do** reference Tailwind utility names mapped in `@theme inline` (`bg-background`,
  `bg-card`, `text-foreground`, `text-muted-foreground`) — never the raw CSS variable syntax.

### Don't:
- **Don't** introduce `box-shadow` anywhere — see The No-Shadow Rule.
- **Don't** use `bg-[--bg-base]` or any other raw `bg-[--css-var]` syntax; always go through
  the mapped Tailwind utility (`bg-background`, `text-foreground`, etc.).
- **Don't** let this page drift toward "cheap local-business site" territory: no mismatched
  stock photography, no cluttered layouts, no inconsistent section spacing — the page must
  stay categorically more capable-looking than what WeUnite replaces for its clients.
- **Don't** use `border-left`/`border-right` colored stripes as an accent on cards or callouts.
- **Don't** use gradient text (`background-clip: text` with a gradient) — emphasis comes from
  Syne weight/size, not gradient fills.
- **Don't** default to glassmorphism outside the navbar's functional scroll blur — no
  decorative frosted-glass cards.
- **Don't** reach for a modal as the first solution to a UI problem — the booking flow and
  contact form are both inline/full-page by design; keep that pattern.
- **Don't** add a second saturated accent color alongside Ember Orange — Warm Coral Glow is a
  gradient partner only, never an independent flat fill.
