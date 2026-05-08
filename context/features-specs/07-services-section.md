# Feature Spec: Services Section

## Overview

The Services section expands on the three teaser cards introduced at the bottom
of the hero. It gives each service its own full description, benefits, and a CTA.
The layout uses three expandable cards — collapsed by default, one opens at a time.
Clicking a card reveals bullet points and a CTA inline; the animation is driven by
Framer Motion `layout` + `AnimatePresence`. Inspired by Podia's feature expansion
pattern. Section anchor: `id="services"`.

---

## Layout

- `py-24 md:py-32`, `bg-background`
- Inner wrapper: `max-w-7xl mx-auto px-6`
- Header block stacked above the cards with `mb-16`
- Cards: `grid grid-cols-1 md:grid-cols-3 gap-4 items-start`
  — `items-start` is critical so expanding cards don't stretch siblings

---

## Header Block

### Eyebrow

```
USŁUGI
```

- `text-xs font-medium tracking-widest uppercase text-muted-foreground`
- Framer Motion: `opacity: 0 → 1`, `y: 10px → 0`, duration `0.5s`, delay `0s`

### Headline

```
Trzy obszary.
Jeden zespół.
```

- Font: Syne ExtraBold (`--font-sans`)
- Size: `text-4xl md:text-5xl lg:text-6xl`
- Weight: `font-extrabold`
- Tracking: `tracking-tight`
- Color: `text-foreground`
- Line breaks as shown — two lines, not one
- Framer Motion: `opacity: 0 → 1`, `y: 20px → 0`, duration `0.5s`, delay `0.1s`

### Sub-copy (optional, below headline)

```
Wybierz jedną usługę albo połącz je wszystkie — skalujemy zakres do Twoich potrzeb.
```

- Font: DM Sans, `text-base text-muted-foreground max-w-lg`
- Framer Motion: fade in, delay `0.2s`

---

## Expandable Cards

### Card States

Each card has two states: **collapsed** (default) and **expanded** (active).
Only one card can be expanded at a time — opening a new card collapses the
previously open one.

State is managed with a single `activeCard` index: `null | 0 | 1 | 2`.

### Card Shell

```
bg-card border border-border rounded-2xl
overflow-hidden cursor-pointer
transition-colors duration-200
```

Active card: `border-primary/60` — subtle orange border highlight.
Inactive card: `hover:border-border/80 hover:bg-card` — minimal hover shift.

### Collapsed Header (always visible)

```
px-6 py-5 flex items-center gap-4
```

| Element | Details |
|---------|---------|
| Icon box | `h-10 w-10 rounded-xl bg-background flex items-center justify-center` |
| Icon | Lucide, `h-5 w-5`, `text-primary` when active, `text-muted-foreground` when inactive |
| Title | Syne Bold, `text-base text-foreground` |
| Teaser | DM Sans, `text-sm text-muted-foreground`, hidden on expand (`AnimatePresence`) |
| Chevron | `ChevronDown h-4 w-4 text-muted-foreground ml-auto`, rotates `180deg` when expanded (`transition-transform duration-300`) |

### Expanded Body (revealed on open)

Rendered inside `AnimatePresence`. Use Framer Motion `motion.div` with:

```js
initial={{ height: 0, opacity: 0 }}
animate={{ height: 'auto', opacity: 1 }}
exit={{ height: 0, opacity: 0 }}
transition={{ duration: 0.35, ease: 'easeInOut' }}
```

Content inside the body:

```
px-6 pb-6 pt-2 flex flex-col gap-4
```

1. **Description paragraph** — `text-sm text-muted-foreground` (2–3 sentences)
2. **Bullet list** — 4–5 items, `space-y-2`
   - Each item: `flex items-start gap-2`, `Check h-4 w-4 text-primary mt-0.5 flex-shrink-0`, text `text-sm text-foreground`
3. **CTA button** — pill, full-width on mobile, auto-width on desktop
   ```
   bg-primary text-primary-foreground rounded-full
   px-5 py-2.5 text-sm font-medium
   hover:bg-accent transition-all duration-200
   ```
   Label: `Umów bezpłatną konsultację →`
   Action: smooth scroll to `#contact`

---

## Card Content

### Card 1 — Strona internetowa + rezerwacje

| Field | Value |
|-------|-------|
| Icon | `Globe` |
| Title | Strona internetowa + rezerwacje |
| Teaser | Profesjonalna strona z własnym systemem płatności |
| Description | Tworzymy strony internetowe dla właścicieli domków letniskowych, które zastępują rezerwacje telefoniczne i drogi OTB. Twoja strona pracuje 24/7 — zbiera rezerwacje i płatności, nawet gdy śpisz. |
| Bullets | Projekt i wdrożenie strony od zera / System rezerwacji z wyborem terminu i płatnością online / Własna domena — zero prowizji dla pośredników / Integracja z bramką płatności / Responsywny design na każde urządzenie |
| CTA | Umów bezpłatną konsultację → |

### Card 2 — Social media

| Field | Value |
|-------|-------|
| Icon | `Layers` |
| Title | Social media |
| Teaser | Regularne treści, kampanie i wzrost zasięgów |
| Description | Przejmujemy pełne zarządzanie Twoimi profilami — od tworzenia treści po płatne kampanie. Budujesz rozpoznawalność marki, a Ty skupiasz się na prowadzeniu biznesu. |
| Bullets | Miesięczny kalendarz treści dopasowany do sezonu / Copywriting + projekt graficzny każdego posta / Prowadzenie i optymalizacja kampanii Meta Ads / Bieżące odpowiedzi na komentarze i wiadomości / Miesięczny raport zasięgów i wyników |
| CTA | Umów bezpłatną konsultację → |

### Card 3 — Automatyzacje

| Field | Value |
|-------|-------|
| Icon | `Zap` |
| Title | Automatyzacje |
| Teaser | Powtarzalne procesy bez ręcznej pracy — całą dobę |
| Description | Wdrażamy automatyzacje, które eliminują ręczną pracę przy rutynowych zadaniach. Potwierdzenia rezerwacji, follow-upy, powiadomienia — wszystko dzieje się samo. |
| Bullets | Automatyczne potwierdzenia rezerwacji i płatności / Sekwencje emailowe po złożeniu zapytania / Przypomnienia dla gości przed przyjazdem / Powiadomienia wewnętrzne dla właściciela / Integracja z istniejącymi narzędziami (kalendarz, e-mail) |
| CTA | Umów bezpłatną konsultację → |

---

## Section-Level Animation

- Section `whileInView`, `viewport={{ once: true, margin: '-100px' }}`
- Header block animates first (staggered eyebrow → headline → sub-copy)
- Cards stagger in after header: each card `opacity: 0 → 1`, `y: 20px → 0`,
  duration `0.5s ease-out`, stagger `0.1s` (card 1 first, card 3 last)
- Card 1 is open by default (pre-expanded on mount, no animation on initial open)

---

## Responsive Behaviour

| Breakpoint | Cards layout | Expanded body |
|------------|-------------|---------------|
| Mobile (`< md`) | Single column stacked | Full width, always below title |
| Tablet (`md`) | 3-column grid, `items-start` | Expands downward only — no reflow on siblings |
| Desktop (`lg+`) | 3-column grid, full width | Same as tablet |

On mobile the grid collapses to single column — cards stack vertically and the
expand/collapse interaction remains the same.

---

## Accessibility

- `<section id="services" aria-label="Nasze usługi">`
- Each card root: `role="button"` if rendered as `<div>`, or use `<button>` wrapper
- `aria-expanded` on each card header reflecting open state
- `aria-controls` pointing to the expanded body `id`
- Chevron icon: `aria-hidden="true"`
- `useReducedMotion` guard: if true, skip `y` translate and height transition — use
  opacity only and set height transitions to `duration: 0`

---

## Implementation Notes

- `"use client"` required — card open/close state is interactive
- `activeCard` state: `const [activeCard, setActiveCard] = useState<number | null>(0)`
  — defaults to `0` so card 1 is pre-expanded
- Do **not** use `layout` prop on the grid wrapper — only on individual card shells if
  needed; prefer the `height: 0 → auto` approach via `AnimatePresence` to avoid
  unintended sibling reflow
- Keep the three card objects in a typed array (`services: ServiceCard[]`) at the top
  of the component for easy content editing — no hardcoded JSX repetition
- Icon components are passed as React elements (`icon: React.ReactNode`) in the data
  array, not as string names
- The CTA button inside each expanded card is an `<a href="#contact">` with
  `onClick` for smooth scroll — same pattern as the hero CTA
