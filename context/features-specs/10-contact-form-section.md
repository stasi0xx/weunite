# Feature Spec: Contact Form Section (Final CTA)

## Overview

The Contact Form section is the primary conversion point of the entire landing page.
Every CTA button on the page (`Umów bezpłatną konsultację →`) anchors here.
Visitors submit a short form to claim their free consultation + website visualization.
On submission the route handler stores the lead in Supabase and fires two Resend emails:
a confirmation to the visitor and an internal notification to the WeUnite team.
Section anchor: `id="contact"`.

---

## Layout

- `py-24 md:py-32`, `bg-background`, `relative overflow-hidden`
- Inner wrapper: `max-w-7xl mx-auto px-6`
- Two-column desktop layout: left column (header block) + right column (form card)
  — `grid grid-cols-1 lg:grid-cols-2 gap-16 items-start`
- A single orange gradient blob (`hero-blob` class from globals.css) positioned
  `absolute bottom-0 left-1/2 -translate-x-1/2 opacity-30 blur-3xl pointer-events-none`
  behind the section content — decorative only, `aria-hidden="true"`

---

## Left Column — Header Block

### Eyebrow

```
BEZPŁATNA KONSULTACJA
```

- `text-xs font-medium tracking-widest uppercase text-muted-foreground`
- Framer Motion: `opacity: 0 → 1`, `y: 10px → 0`, duration `0.5s`, delay `0s`

### Headline

```
Zacznijmy
razem.
```

- Font: Syne ExtraBold (`--font-sans`)
- Size: `text-4xl md:text-5xl lg:text-6xl`
- Weight: `font-extrabold`
- Tracking: `tracking-tight`
- Color: `text-foreground`
- Two lines as shown
- Framer Motion: `opacity: 0 → 1`, `y: 20px → 0`, duration `0.5s`, delay `0.1s`

### Sub-copy

```
Powiedz nam, co robisz i co Cię interesuje.
Wrócimy do Ciebie w ciągu 24 godzin z planem działania i bezpłatną wizualizacją Twojej strony.
```

- Font: DM Sans, `text-base text-muted-foreground`, `max-w-md`, `mt-4`
- Framer Motion: `opacity: 0 → 1`, delay `0.2s`

### Trust signals (below sub-copy)

Three inline items stacked vertically, `mt-8 space-y-3`:

| Icon | Text |
|------|------|
| `CheckCircle h-5 w-5 text-primary` | Odpowiadamy w ciągu 24h |
| `CheckCircle h-5 w-5 text-primary` | Bezpłatna wizualizacja strony |
| `CheckCircle h-5 w-5 text-primary` | Zero zobowiązań |

Each row: `flex items-center gap-3`, icon + `text-sm text-foreground`
Framer Motion: stagger 0.05s each, delay starts `0.3s`

---

## Right Column — Form Card

```
bg-card border border-border rounded-3xl p-8 md:p-10
```

Framer Motion: `opacity: 0 → 1`, `y: 30px → 0`, duration `0.5s`, delay `0.25s`

---

## Form Fields

Use shadcn `<Form>` + `react-hook-form` + `zod` for validation.
Form element: `<form onSubmit={...} className="flex flex-col gap-5">`

### Field 1 — Imię i nazwisko

| Property | Value |
|----------|-------|
| Type | `text` |
| Name | `name` |
| Label | `Imię i nazwisko` |
| Placeholder | `Jan Kowalski` |
| Required | Yes |
| Validation | Non-empty string, min 2 chars |
| Error message | `Podaj swoje imię i nazwisko` |

### Field 2 — Adres email

| Property | Value |
|----------|-------|
| Type | `email` |
| Name | `email` |
| Label | `Adres email` |
| Placeholder | `jan@domkiletniskowe.pl` |
| Required | Yes |
| Validation | Valid email format (zod `z.string().email()`) |
| Error message | `Podaj poprawny adres email` |

### Field 3 — Rodzaj działalności

| Property | Value |
|----------|-------|
| Type | shadcn `<Select>` |
| Name | `businessType` |
| Label | `Rodzaj działalności` |
| Placeholder | `Wybierz...` |
| Required | Yes |
| Validation | Must select one option |
| Error message | `Wybierz rodzaj działalności` |

Options:

```
Domki letniskowe
Apartamenty na wynajem
Pensjonat / hotel
Inny rodzaj biznesu
```

### Field 4 — Co Cię interesuje?

| Property | Value |
|----------|-------|
| Type | shadcn `<Select>` |
| Name | `serviceInterest` |
| Label | `Co Cię interesuje?` |
| Placeholder | `Wybierz usługę...` |
| Required | Yes |
| Validation | Must select one option |
| Error message | `Wybierz interesującą Cię usługę` |

Options:

```
Strona internetowa + system rezerwacji
Zarządzanie social media
Automatyzacje
Wszystkie usługi
```

### Field styling

All inputs and selects:
```
rounded-xl border-border bg-background text-foreground
placeholder:text-muted-foreground
focus-visible:ring-primary
```
(`rounded-xl` per ui-context.md border radius spec for inputs)

Labels: `text-sm font-medium text-foreground mb-1.5`

Error messages: `text-xs text-destructive mt-1`

---

## Submit Button

```
w-full rounded-full bg-primary text-primary-foreground
px-6 py-3 text-sm font-medium
hover:bg-accent transition-all duration-200
disabled:opacity-60 disabled:cursor-not-allowed
mt-2
```

Default label: `Zgłoś się po bezpłatną konsultację →`
Loading label (while submitting): `Wysyłamy...` + `Loader2 h-4 w-4 animate-spin` inline

---

## Success State

On successful API response replace the form with an inline success message.
Do not navigate away; do not reload the page.

```tsx
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  className="flex flex-col items-center text-center gap-4 py-8"
>
  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
    <CheckCircle className="h-7 w-7 text-primary" />
  </div>
  <h3 className="font-sans font-bold text-xl text-foreground">
    Gotowe! Wrócimy do Ciebie wkrótce.
  </h3>
  <p className="text-sm text-muted-foreground max-w-xs">
    Sprawdź swoją skrzynkę — wysłaliśmy Ci email z potwierdzeniem.
    Odezwiemy się w ciągu 24 godzin.
  </p>
</motion.div>
```

State: `const [submitted, setSubmitted] = useState(false)` — render success block when `true`.

---

## Error State (API failure)

If the API call fails show a single `sonner` toast (already installed):

```ts
toast.error('Coś poszło nie tak. Spróbuj ponownie lub napisz do nas bezpośrednio.')
```

Field-level validation errors are shown inline (react-hook-form `formState.errors`).

---

## API Contract

### `POST /api/leads`

**Request body** (JSON):

```ts
interface LeadPayload {
  name: string            // min 2 chars
  email: string           // valid email
  businessType: string    // one of the four select options
  serviceInterest: string // one of the four select options
}
```

**Handler logic (in order):**

1. Parse and validate body with zod — return `400` on invalid input
2. Insert row into Supabase `leads` table with `status: 'new'`
3. Fire Resend email: confirmation to visitor (template: `lead-confirmation`)
4. Fire Resend email: internal notification to `ai.say.agency@gmail.com` (template: `lead-internal`)
5. Return `200 { success: true }`

Both Resend calls use `Promise.allSettled` — email failure must not fail the API response.
Log email send errors server-side but return success if the DB insert succeeded.

---

## Database Schema

Table: `leads`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | `uuid` | `primary key default gen_random_uuid()` |
| `name` | `text` | `not null` |
| `email` | `text` | `not null` |
| `business_type` | `text` | `not null` |
| `service_interest` | `text` | `not null` |
| `status` | `text` | `not null default 'new'` — enum: `new`, `nurturing`, `call_booked`, `client` |
| `created_at` | `timestamptz` | `not null default now()` |

Migration file: `supabase/migrations/001_leads.sql`

---

## Email Triggers

### Confirmation email — sent to visitor

- **From:** `WeUnite <hello@weunite.pl>`
- **To:** `{email}` (from form)
- **Subject:** `Cześć {name} — odezwiemy się wkrótce!`
- **Template ID:** `lead-confirmation`
- **Content summary:** thank the visitor, confirm receipt, set expectation (reply within 24h), preview what comes next (visualization, strategy call)

### Internal notification — sent to team

- **From:** `WeUnite Bot <bot@weunite.pl>`
- **To:** `ai.say.agency@gmail.com`
- **Subject:** `Nowy lead: {name} — {serviceInterest}`
- **Template ID:** `lead-internal`
- **Content summary:** name, email, businessType, serviceInterest, timestamp

> Email template bodies are not in scope for this spec — see email templates spec when ready.

---

## Animation

- Section: `whileInView`, `viewport={{ once: true, margin: '-100px' }}`
- Left column: eyebrow → headline → sub-copy → trust signals stagger as described above
- Right column (form card): single `opacity + y` reveal, delay `0.25s`
- Success state: `opacity + y` fade-in via Framer Motion on mount
- `useReducedMotion` guard: skip `y` translate; keep opacity only; duration `0`

---

## Responsive Behaviour

| Breakpoint | Layout |
|------------|--------|
| Mobile (`< lg`) | Single column stacked — header block above form card |
| Desktop (`lg+`) | Two-column grid — header left, form card right |

On mobile the form card fills full width; `p-6` padding replaces `p-10`.

---

## Accessibility

- `<section id="contact" aria-label="Formularz kontaktowy">`
- Form: `<form aria-label="Formularz zgłoszeniowy">`
- All inputs have associated `<label>` elements (shadcn FormLabel)
- `aria-required="true"` on required inputs
- `aria-invalid="true"` + `aria-describedby` pointing to error message when field is invalid
- Submit button `aria-busy="true"` during submission
- Success state: `role="status"` + `aria-live="polite"` so screen readers announce it
- Blob: `aria-hidden="true"`

---

## Implementation Notes

- `"use client"` required — form state + submission are interactive
- Use `react-hook-form` + `zod` resolver for field-level validation before any API call
- Submit handler: set `isLoading = true` → call `fetch('/api/leads', { method: 'POST', body })` → on success set `submitted = true` → on failure show sonner toast
- Keep form field definitions in a typed schema object at the top of the component (not scattered inline)
- Route handler lives at `app/api/leads/route.ts`
- Supabase client used in route handler must be the server-side client from `lib/supabase/server.ts`
- Do not call Resend directly from the component — only from the API route handler
- Input sanitization: trim whitespace on all text fields before DB insert
