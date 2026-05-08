# Feature Spec: Hero Section

## Overview

Full-viewport opening section of the homepage. The goal is to communicate the agency's
core offer in one glance, build instant confidence, and drive the visitor to either book
a free consultation or scroll to the offer. Inspired by Podia's hero layout — bold
centered headline, two CTAs, and three service cards anchored to the bottom of the
section with a staggered reveal animation.

---

## Layout

- `min-h-screen`, `relative overflow-hidden`
- Content centered vertically and horizontally: `flex flex-col items-center justify-center`
- `max-w-7xl mx-auto px-6` wrapper for the text stack
- Three service cards pinned to the bottom of the section — `mt-auto` flex child
  or `absolute bottom-0 left-0 right-0` depending on final layout preference

---

## Background — Animated Blob

Single decorative radial gradient blob positioned in the **top-right quadrant** of the
hero. Never interactive, purely visual.

**Implementation:**

```css
.hero-blob {
  position: absolute;
  top: -10%;
  right: -5%;
  width: 700px;
  height: 700px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    var(--accent-primary) 0%,
    var(--accent-warm) 40%,
    transparent 70%
  );
  opacity: 0.35;
  filter: blur(80px);
  pointer-events: none;
  animation: blobDrift 12s ease-in-out infinite alternate;
  z-index: 0;
}

@keyframes blobDrift {
  0%   { transform: translate(0px, 0px) scale(1); }
  33%  { transform: translate(-30px, 20px) scale(1.05); }
  66%  { transform: translate(20px, -25px) scale(0.97); }
  100% { transform: translate(-15px, 15px) scale(1.03); }
}
```

A second, smaller blob (`opacity: 0.2`, `width: 400px`) may be placed at
bottom-left at `-5% -5%` for depth, using the same keyframe with `animation-delay: -6s`.

---

## Content Stack

### 1. Eyebrow label (optional)

Small all-caps badge above the headline:

```
AGENCJA MARKETINGOWA • POLSKA
```

- `text-xs font-medium tracking-widest text-muted-foreground uppercase`
- Framer Motion: fade in from `opacity-0`, delay `0.1s`

### 2. Main Headline

```
Twój Spotlight
```

- Font: Syne ExtraBold (`--font-sans`)
- Size: `text-6xl md:text-8xl lg:text-[9rem]`
- Weight: `font-extrabold`
- Tracking: `tracking-tight`
- Color: `text-foreground`
- Alignment: centered
- Framer Motion: animate in on mount — `opacity: 0 → 1`, `y: 30px → 0`,
  duration `0.6s`, easing `easeOut`, delay `0.15s`

### 3. Sub-headline

```
Kompleksowa OBSŁUGA MARKETINGOWA Twojej strony internetowej
oraz mediów społecznościowych. W branży od ponad 8 lat.
```

- Font: DM Sans (`--font-body`), weight 400
- Size: `text-base md:text-lg`
- Color: `text-muted-foreground`
- Max width: `max-w-xl` centered
- "OBSŁUGA MARKETINGOWA" rendered in `text-foreground font-semibold` for emphasis
- Framer Motion: fade in, delay `0.3s`, same `y: 20px → 0` translate pattern

### 4. CTA Button Pair

Two pill buttons side by side (`flex gap-3 flex-wrap justify-center`):

| Button | Label | Style | Action |
|--------|-------|-------|--------|
| Primary | `Umów bezpłatną konsultację` | `bg-primary text-primary-foreground hover:bg-accent rounded-full px-6 py-3 text-sm font-medium transition-all duration-200` | Smooth scroll to `#contact` |
| Secondary | `Zobacz ofertę` | Uses `hover-link` component convention — underline-on-hover style, `text-foreground text-sm font-medium` | Smooth scroll to `#services` |

Framer Motion: stagger in after sub-headline, delay `0.45s`

---

## Bottom Service Cards (inspired by Podia)

Three horizontal cards anchored to the bottom edge of the hero section.
On desktop they sit in a full-width row. On mobile they stack vertically.

```
[ Strona + Rezerwacje ]  [ Social Media ]  [ Automatyzacje ]
```

### Card anatomy

Each card contains:
- **Lucide icon** (`h-6 w-6`, stroke only, `text-primary`)
- **Title** — Syne Bold, `text-base text-foreground`
- **One-line teaser** — DM Sans, `text-sm text-muted-foreground`
- **Chevron right** (`ChevronRight`, `h-4 w-4`, `text-muted-foreground`) — right-aligned,
  shifts `4px` to the right on hover (`transition-transform duration-200`)

### Card content

| # | Icon | Title | Teaser |
|---|------|-------|--------|
| 1 | `Globe` | Strona internetowa + rezerwacje | Profesjonalna strona z systemem płatności online |
| 2 | `Layers` | Social media | Regularne treści, kampanie i wzrost zasięgów |
| 3 | `Zap` | Automatyzacje | Procesy bez ręcznej pracy — 24/7 |

### Card styling

```
bg-card border border-border rounded-2xl
px-5 py-4 flex items-center gap-4 cursor-pointer
hover:border-primary/40 hover:shadow-sm
transition-all duration-200
```

Cards are `relative z-10` so they sit above the blob.

### Card animation

- **On mount / scroll entry:** Framer Motion `whileInView`, `viewport={{ once: true }}`
- Each card: `opacity: 0 → 1`, `y: 20px → 0`, duration `0.5s ease-out`
- Stagger: `0.1s` between cards (card 1 first, card 3 last)
- **On hover:** subtle `scale(1.02)` + chevron shifts right (`translateX(4px)`)
- Clicking any card scrolls to `#services`

### Card layout

- Desktop: `grid grid-cols-3 gap-4` inside `max-w-5xl mx-auto`
- Mobile: `grid-cols-1`, full width
- A thin `border-t border-border` visually separates the card row from the text stack above

---

## Section Divider

Below the service cards, a `border-b border-border` marks the transition
to the social proof bar section.

---

## Responsive Behaviour

| Breakpoint | Headline size | Cards layout | Blob size |
|------------|--------------|--------------|-----------|
| Mobile (`< md`) | `text-6xl` | Single column | `400px`, `opacity: 0.25` |
| Tablet (`md`) | `text-7xl` | 2-col + 1 below | `550px` |
| Desktop (`lg+`) | `text-[9rem]` | 3-column row | `700px` |

---

## Accessibility

- Hero `<section>` has `aria-label="Sekcja główna"`
- Blob `<div>` has `aria-hidden="true"`
- Scroll buttons use `<a href="#contact">` / `<a href="#services">` or `onClick`
  with `scrollIntoView({ behavior: 'smooth' })`
- Reduced motion: wrap Framer Motion variants in `useReducedMotion()` — if true,
  skip `y` translate, keep `opacity` only

---

## Implementation Notes

- Blob is a plain `<div>` with inline styles or a CSS class — no SVG, no canvas
- Service cards in the hero are presentational only; they are not the full Services
  section — they just link down to it
- No image or video in the hero — the blob + typography carry the visual weight
- `z-index` layering: blob `z-0`, text content `z-10`, service cards `z-10`
