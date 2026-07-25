# Feature Spec: Hero Section

## Overview

Full-viewport opening section of the homepage. A brand statement rather than a pitch:
full-bleed photograph of Gdańsk with a dark overlay, and the "WeUnite" wordmark centered
on top with an underline. No sub-headline, no CTA, no service cards — the offer, proof,
and conversion path live in the sections that follow (Client logos → Problem → Services →
Endorsement → Contact form). This is a deliberate exception to the rest of the site's
light, cream/blob theme (see `ui-context.md` → Theme).

---

## Layout

- `min-h-screen`, `relative overflow-hidden`
- Content centered vertically and horizontally: `flex items-center justify-center`

---

## Background — Photo + Overlay

- `next/image` with `fill`, `priority`, `sizes="100vw"`, `object-cover object-center`,
  source `/hero/gdansk-hero.png`, `alt=""` (decorative — the accessible name is carried
  by the sr-only heading text, not the image)
- Dark legibility overlay: `bg-gradient-to-b from-black/65 via-black/45 to-black/70`
- Secondary radial vignette (`transparent` center → `rgba(0,0,0,0.55)` edges) to darken
  the corners further and keep the wordmark centered as the visual focal point

---

## Content

### Wordmark

```
WeUnite
```

- Font: Syne ExtraBold (`--font-sans`)
- Size: `text-6xl sm:text-7xl md:text-8xl lg:text-[9rem]`, `leading-none`
- Color: white, `tracking-tight`
- Framer Motion: fade + `y: 24px → 0` on mount, delay `0.15s`

### Underline

- Full-width bar directly beneath the wordmark, `h-1 md:h-1.5 bg-white rounded-full`
- Framer Motion: `scaleX: 0 → 1` from center (`origin-center`), delay `0.5s`

### Scroll cue

- Small `ChevronDown` icon, bottom-center, `text-white/70`, bobbing loop animation
- `onClick` smooth-scrolls to `#services`
- Fades in last, delay `0.9s`

---

## Accessibility

- `<section aria-label="Sekcja główna">`
- sr-only text carries the agency description for SEO/screen readers, since the visible
  content is just the wordmark: "WeUnite — agencja marketingowa dla domków letniskowych:
  strony internetowe z rezerwacją, social media, automatyzacje"
- Background `<Image>` has empty `alt=""` (purely decorative)
- Reduced motion: `useReducedMotion()` — skip `y` translate and the scroll-cue bob,
  underline still appears (no animated scale) when true

---

## Implementation Notes

- Source photo is 1200×630 (PNG) — soft on large desktop monitors when stretched full-bleed;
  swap in a higher-resolution JPG/WebP (2400px+ wide) when available.
- No blob, no CTA button, no service cards in this section — those patterns still apply to
  every other section per `ui-context.md`.
