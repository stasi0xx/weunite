# UI Context

## Theme

Light mode only. Warm cream background — not pure white. The design language is editorial
and bold: massive display typography dominates each section, generous whitespace creates
breathing room, and vivid orange/coral gradient blobs provide energy and warmth. The overall
feeling is a confident, modern agency — approachable but clearly capable.

## Colors

All components must use these tokens — no hardcoded hex values.

| Role              | CSS Variable         | Value     |
| ----------------- | -------------------- | --------- |
| Page background   | `--bg-base`          | `#F2EDE6` |
| Surface           | `--bg-surface`       | `#EBE5DC` |
| Primary text      | `--text-primary`     | `#141414` |
| Muted text        | `--text-muted`       | `#7A7367` |
| Primary accent    | `--accent-primary`   | `#FF5A1F` |
| Accent warm       | `--accent-warm`      | `#FF8C5A` |
| Border            | `--border-default`   | `#DDD6CB` |
| Error             | `--state-error`      | `#DC2626` |
| Success           | `--state-success`    | `#16A34A` |

### Gradient blobs

Decorative radial gradient blobs using `--accent-primary` → `--accent-warm` → transparent.
Position them absolutely in hero and CTA sections, `opacity-40 blur-3xl`, never interactive.

## Typography

| Role          | Font       | Weight          | Variable       |
| ------------- | ---------- | --------------- | -------------- |
| Display / H1  | Syne       | 800 (ExtraBold) | `--font-sans`  |
| Headings H2–H4| Syne       | 700 (Bold)      | `--font-sans`  |
| Body / UI     | DM Sans    | 400 / 500       | `--font-body`  |
| Code / mono   | Geist Mono | 400             | `--font-mono`  |

Load via `next/font`. Syne ExtraBold is the hero — display sizes start at `text-6xl`
on mobile and scale to `text-[8rem]` or larger on desktop. Letter-spacing on display
text: `tracking-tight`.

## Border Radius

| Context             | Class          | Value  |
| ------------------- | -------------- | ------ |
| Buttons (pill)      | `rounded-full` | 9999px |
| Cards / panels      | `rounded-2xl`  | 16px   |
| Modals / overlays   | `rounded-3xl`  | 24px   |
| Inline / badges     | `rounded-md`   | 6px    |
| Input fields        | `rounded-xl`   | 12px   |

## Component Library

shadcn/ui on top of Tailwind CSS. Components live in `components/ui/`.
Use the shadcn CLI to add new primitives rather than writing from scratch.
Framer Motion handles scroll-triggered reveals and micro-interactions.
GSAP handles complex sequential animations (e.g. staggered counters in stats section).

## Animation Principles

- **Scroll reveals:** Framer Motion `whileInView` + `viewport={{ once: true }}`, fade + translateY(20px) → 0, duration 0.5s ease-out
- **Stagger:** children staggered at 0.1s intervals within sections
- **Stats counters:** GSAP `countTo` triggered on viewport entry
- **Blob movement:** slow CSS keyframe drift, `animation-duration: 12s`, `ease-in-out`, `alternate`
- **Hover states:** `transition-all duration-200` — no heavy transitions on hover
- **Page load:** hero text animates in on mount via Framer Motion
- **Expandable cards (Services):** Framer Motion `layout` + `AnimatePresence` — card expands in-place on click, siblings compress. Only one card open at a time.
- **Collage reveal (Case studies):** cards enter viewport staggered with slight rotation (`rotate-[-2deg]` → `rotate-0`) and scale (`0.95` → `1`), creating a "dealing cards" feel

## Layout Patterns

- **Page structure:** single-column, full-width sections, `max-w-7xl mx-auto px-6` for content
- **Section spacing:** `py-24 md:py-32` between sections — generous breathing room
- **Hero:** full-viewport (`min-h-screen`), display text left-aligned or centered, blob in top-right corner, two CTA buttons (filled pill + outline pill)
- **Navbar:** sticky top, `bg-[--bg-base]/80 backdrop-blur-md`, logo left — nav center — CTAs right, bottom border `border-b border-[--border-default]`
- **Logo bar:** full-width marquee/scroll strip for client logos, `border-y border-[--border-default]`, muted opacity
- **Cards:** CSS grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, gap-6, `rounded-2xl bg-[--bg-surface]`
- **Services (expandable):** 3 cards in a row, each with icon + title + one-line teaser. On click, the active card expands vertically (Framer Motion `layout`) revealing details, bullet points, and a CTA. One card open at a time. Inspired by Podia's feature expansion pattern.
- **Case studies (collage):** cards positioned with slight overlap and varied subtle rotations (`-1deg` to `1deg`), each with its own background color (warm tones from palette). On scroll-entry, cards animate in staggered with scale + rotation correction. Inspired by Fluz's scene-based card layout.
- **Stats row:** 3–4 large numbers in a horizontal row, bold display size, label below in muted text
- **Testimonials:** 2-column grid on desktop, each card with avatar + name + company + quote
- **Final CTA:** full-width section with centered text + large single CTA button, optional blob background

## Icons

Lucide React. Stroke-based only. Never filled variants.

| Context        | Size class    |
| -------------- | ------------- |
| Inline / text  | `h-4 w-4`    |
| Buttons        | `h-5 w-5`    |
| Feature icons  | `h-6 w-6`    |
| Section icons  | `h-8 w-8`    |

## Page Sections (in order)

1. **Navbar** — sticky, logo + nav links + 2 CTAs
2. **Hero** — hook headline + subheadline + CTA pair + gradient blob
3. **Social proof bar** — client logo marquee strip
4. **Problem** — 3 pain points of the target client (vacation rental owners); doubles as audience qualifier — no separate "for whom" section needed, pain recognition handles self-selection
5. **Services** — 3 services: websites + booking, social media, automations
6. **Case studies** — 2–3 project cards with results (numbers as placeholders)
7. **Stats** — agency-level numbers (clients, results, etc. — placeholders)
8. **Testimonials** — quotes from experienced business owners
9. **How it works** — 3-step process: consultation → visualization → delivery
10. **Final CTA** — form or button to claim free consultation
11. **Footer** — minimal: logo, links, social icons
