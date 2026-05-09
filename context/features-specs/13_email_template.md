# Feature Spec: Email Templates

## Overview

Two transactional emails sent via Resend using React Email components.
Both must feel like natural extensions of the WeUnite website — same
energy, same voice, same visual identity translated to email.

---

## Brand Translation for Email

Email clients don't support CSS variables or web fonts — translate the
design system to inline-safe equivalents:

| Role           | Hex value | Usage in email                    |
| -------------- | --------- | --------------------------------- |
| Background     | `#F2EDE6` | Email body background             |
| Surface        | `#EBE5DC` | Card / content block background   |
| Primary text   | `#141414` | All body copy                     |
| Muted text     | `#7A7367` | Labels, secondary info, footer    |
| Accent orange  | `#FF5A1F` | CTA buttons, divider accents, highlights |
| Warm accent    | `#FF8C5A` | Gradient on button hover / decorative |
| Border         | `#DDD6CB` | Dividers, card outlines           |

**Fonts:** Fall back to system fonts — `'Helvetica Neue', Helvetica, Arial, sans-serif`.
Use **bold weight (700)** for headings to approximate the Syne display feel.
Use normal weight (400) for body — approximates DM Sans.

**Accent bar:** Each email opens with a 4px solid `#FF5A1F` top border on
the outermost container — the one visual element that immediately signals
the brand.

---

## Email 1 — Lead Confirmation

**Trigger:** Immediately after lead form submission (< 60s)

**Subject line:** `Dobrze, że jesteś 👋 — zobaczmy, co możemy razem zbudować`
*(or English variant: `Great to have you here — let's see what we can build together`)*

**Preview text (preheader):** `Twoje bezpłatne konsultacje + wizualizacja strony są zarezerwowane.`

### Purpose

Warm welcome. Make them feel they made the right call.
Set expectations clearly. Zero sales pressure — this is the friendly handshake.

### Visual Structure

```
┌─────────────────────────────────────────┐  ← #EBE5DC surface
│  ▌▌▌▌  (4px top accent bar, #FF5A1F)   │
│                                         │
│  [WeUnite logo — text mark]             │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  BOLD HEADING (700, ~28px)              │
│  "Hej [Name], dobrze że jesteś!"        │
│                                         │
│  Body paragraph                         │
│                                         │
│  ┌──────────────────────────────────┐   │
│  │  "Co dalej?" card (#F2EDE6 bg)   │   │
│  │  3 numbered steps                │   │
│  └──────────────────────────────────┘   │
│                                         │
│  Soft CTA button (outlined, #FF5A1F     │
│  border + text, transparent fill)       │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  Footer — muted, small                  │
└─────────────────────────────────────────┘
```

### Content

**Heading (28px, bold):**
`Hej [imię], dobrze że jesteś!`

**Opening paragraph (~16px, body):**
Zgłoszenie trafiło do nas i już je mamy. Cieszmy się — to naprawdę dobry
krok. Właściciele domków letniskowych, którzy zdecydowali się na
profesjonalną stronę z systemem rezerwacji, przestają tracić klientów
na rzecz portali, które biorą prowizję od każdej transakcji.

**"Co dalej?" card — 3 steps:**
1. **Umawiamy rozmowę strategiczną** — omówimy twoją sytuacje, zarysujemy plan działania i omówimy następny krok. 
2. **Ty decydujesz** — zero presji. Rozmowa jest bezpłatna i do niczego
   nie zobowiązuje.
   **Przygotowujemy wizualizację** — tworzymy wstępny projekt tego nadczym będziemy pracowac, a Ty możesz zadecydowac czy w ten sposób chcesz pracowac.

**Soft CTA (outlined pill button):**
`Masz pytanie? Napisz do nas →`
→ links to `mailto:kontakt@weunite.pl`

**Signature:**
```
Jan i Stanisław
WeUnite — Twój SPOTLIGHT
```

**Footer (small, muted #7A7367):**
`WeUnite · weunite.pl · Możesz odpowiedzieć bezpośrednio na tego maila`
Unsubscribe link per CAN-SPAM / GDPR.

### Tone

Warm, direct, zero corporate fluff. Like a message from a capable friend
who just said "got your message, we're on it." Confidence without arrogance.
Polish throughout.

---

## Email 2 — Booking Confirmation

**Trigger:** Immediately after the lead self-books a call slot

**Subject line:** `Rozmowa zarezerwowana ✅ — [Data], [Godzina]`
*(e.g. `Rozmowa zarezerwowana ✅ — 15 maja, 11:00`)*

**Preview text (preheader):** `Wszystkie szczegóły spotkania + link do rozmowy.`

### Purpose

Confirm the meeting. Eliminate uncertainty — give them every detail they
need. Build anticipation for what happens on the call.
This email is primarily functional but must feel crafted, not generic.

### Visual Structure

```
┌─────────────────────────────────────────┐  ← #EBE5DC surface
│  ▌▌▌▌  (4px top accent bar, #FF5A1F)   │
│                                         │
│  [WeUnite logo — text mark]             │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  BOLD HEADING (700, ~28px)              │
│  "Jesteś w kalendarzu, [Name]!"         │
│                                         │
│  Body paragraph                         │
│                                         │
│  ┌──────────────────────────────────┐   │
│  │  Meeting details card             │   │  ← #F2EDE6 bg, border #DDD6CB
│  │  📅  Wtorek, 15 maja 2025        │   │
│  │  🕐  11:00 – 11:30               │   │
│  │  💻  Google Meet                  │   │
│  │  🔗  [Link do spotkania]          │   │
│  └──────────────────────────────────┘   │
│                                         │
│  [Dodaj do kalendarza] ← primary CTA   │  ← filled pill, #FF5A1F
│                                         │
│  "Na rozmowie omówimy..." section       │
│  3 bullet agenda items                  │
│                                         │
│  "Co przygotować?" — 1 short paragraph  │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  Reminder notice (muted, small)         │
│  Footer                                 │
└─────────────────────────────────────────┘
```

### Content

**Heading (28px, bold):**
`Jesteś w kalendarzu, [imię]!`

**Opening paragraph (~16px, body):**
Rozmowa zarezerwowana. Teraz Twoja strona z systemem rezerwacji jest
o jeden krok bliżej. Poniżej znajdziesz wszystkie szczegóły.

**Meeting details card:**
- Date: `[dzień tygodnia], [DD miesiąc YYYY]`
- Time: `[HH:MM] – [HH:MM]` (30-minute slot)
- Platform: `Google Meet`
- Link: prominent `[Dołącz do spotkania →]` anchor — linked directly

**Primary CTA (filled pill, #FF5A1F, white text):**
`Dodaj do kalendarza`
→ Google Calendar deeplink pre-filled with event details

**"Na rozmowie omówimy..." — 3 agenda bullets:**
- Wizualizację Twojej strony, którą dla Ciebie przygotujemy
- Plan wdrożenia systemu rezerwacji i płatności
- Konkretne liczby — ile czasu i pieniędzy możesz zaoszczędzić

**"Co przygotować?":**
Nic specjalnego. Jeśli masz już nazwę swojego obiektu i kilka zdjęć —
świetnie, możemy od razu coś pokazać. Ale nie jest to konieczne.

**Reminder notice (muted, #7A7367, 14px):**
`Wyślemy Ci przypomnienie 24h i 1h przed rozmową.`

**Signature:**
```
Jan i Stanisław
WeUnite - Twój SPOTLIGHT
```

**Footer:**
`WeUnite · weunite.pl`
Reschedule / cancel link if applicable.

### Tone

Confident and warm. The heading celebrates the booking without being
over-the-top. The agenda section builds anticipation — shows the call
has structure and respect for their time. The "Co przygotować?" section
lowers the barrier — zero anxiety.

---

## Shared Layout Rules

1. **Max width:** 600px, centered — standard email safe width
2. **Outer container:** `background: #F2EDE6`, full bleed
3. **Inner card:** `background: #EBE5DC`, `border-radius: 16px`, `padding: 40px 32px`
4. **Top accent bar:** `height: 4px`, `background: linear-gradient(90deg, #FF5A1F, #FF8C5A)`, `border-radius: 4px 4px 0 0`
5. **Logo:** Text-based (`WeUnite` in bold), `color: #141414`, no image dependency
6. **CTA buttons:**
   - Primary (filled): `background: #FF5A1F`, `color: #ffffff`, `border-radius: 9999px`, `padding: 14px 28px`, `font-weight: 700`
   - Secondary (outlined): `background: transparent`, `border: 2px solid #FF5A1F`, `color: #FF5A1F`, same radius and padding
7. **Dividers:** `1px solid #DDD6CB`
8. **Detail cards (inside the email):** `background: #F2EDE6`, `border: 1px solid #DDD6CB`, `border-radius: 12px`, `padding: 20px 24px`
9. **Mobile:** Single column always. No multi-column layouts — email clients handle this poorly
10. **Images:** None required for V1 — typography and color alone carry the brand identity

---

## Implementation Notes

- Build with [React Email](https://react.email/) components (`@react-email/components`)
- All styles inline — no external stylesheets or CSS variables
- Templates live in `emails/` at the project root (React Email convention)
- Rendered and sent via Resend's `sendEmail` helper in `lib/resend.ts`
- Dynamic values injected as props: `name`, `date`, `time`, `meetingLink`, `calendarLink`
- No hardcoded Polish-only content — parameterize strings for future i18n if needed
