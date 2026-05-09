# Booking Page — Feature Spec

## Overview

After submitting the lead form, the user is immediately redirected to the booking page
where they can self-select a call date and time for the current calendar month.
The lead's `id` is passed in the URL so the booking is tied to the correct lead record.
No additional login or email entry is required.

## User Flow

1. Lead form submits → `POST /api/leads` creates lead record → returns `lead_id`
2. Browser redirects to `/booking?lead=<lead_id>`
3. Page renders current-month calendar with available days highlighted
4. User clicks an available day → time slots slide in from the right
5. User selects a time slot → "Potwierdź rezerwację" button becomes active
6. User clicks confirm → `POST /api/booking` with idempotency key
7. On success → redirect to `/booking/confirmed`
8. Supabase Edge Function fires booking confirmation email (Resend)
9. Lead status updated: `nurturing → call_booked`

## Route & File Structure

```
app/
  booking/
    page.tsx              # Server Component — fetches available slots for current month
    confirmed/
      page.tsx            # Static success page
  api/
    booking/
      route.ts            # POST — create booking
      available/
        route.ts          # GET — available dates + times for current month

components/
  booking/
    BookingCalendar.tsx   # Client Component — calendar grid + slot panel
    CalendarDay.tsx       # Single day cell
    TimeSlotPanel.tsx     # Sliding panel with time chips
    BookingConfirmBar.tsx # Bottom bar with selected summary + confirm button

lib/
  booking.ts              # Server-side helpers: fetch slots, check availability
  validators/
    booking.ts            # Zod schema for POST /api/booking input

supabase/
  migrations/
    XXXXXX_booking_schema.sql
```

## Database Schema

### `booking_slots` — weekly availability template

```sql
CREATE TABLE booking_slots (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week   smallint NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sun, 1=Mon...
  time_slot     time NOT NULL,
  is_active     boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE (day_of_week, time_slot)
);
```

Admin sets recurring patterns once (e.g. Mon/Wed/Fri at 10:00, 12:00, 14:00).

### `blocked_dates` — manual overrides by admin

```sql
CREATE TABLE blocked_dates (
  id      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date    date NOT NULL UNIQUE,
  reason  text
);
```

### `bookings` — confirmed bookings

```sql
CREATE TABLE bookings (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id           uuid NOT NULL REFERENCES leads(id),
  date              date NOT NULL,
  time_slot         time NOT NULL,
  idempotency_key   uuid NOT NULL,
  status            text NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled')),
  created_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE (date, time_slot),        -- prevents double booking at DB level
  UNIQUE (idempotency_key)         -- prevents duplicate submissions
);
```

## Availability Logic

`GET /api/booking/available` computes available slots for the current calendar month:

1. Enumerate all days in the current month from today onward (skip past days)
2. For each day, find matching `booking_slots` rows by `day_of_week` where `is_active = true`
3. Exclude any date present in `blocked_dates`
4. Exclude time slots already taken in `bookings` for that date
5. Return: `{ dates: Date[], slotsByDate: Record<string, string[]> }`

## Race Condition Prevention

Two concurrent users may attempt to book the same slot simultaneously.
Prevention strategy: **Postgres transaction + `FOR UPDATE` + unique constraint**.

```sql
BEGIN;
  SELECT id FROM bookings
  WHERE date = $1 AND time_slot = $2
  FOR UPDATE;           -- locks the check; second transaction waits here
  -- if row found → ROLLBACK → return 409
  INSERT INTO bookings (lead_id, date, time_slot, idempotency_key)
  VALUES ($lead_id, $date, $time_slot, $key);
COMMIT;
```

The `UNIQUE (date, time_slot)` constraint is the last line of defense if the transaction
logic is ever bypassed. Frontend on 409 response: refresh available slots, show toast
"Ten termin właśnie zajął ktoś inny — wybierz inny."

## Server Restart / Request Failure (Idempotency)

Client generates `crypto.randomUUID()` before the first submission attempt and stores
it in `sessionStorage`. Sent as `idempotency_key` in the POST body every time.

Server:
```sql
INSERT INTO bookings (lead_id, date, time_slot, idempotency_key)
VALUES (...)
ON CONFLICT (idempotency_key) DO NOTHING
RETURNING *;
```

- Server crashed before INSERT → retry inserts normally ✓
- Server crashed after INSERT, before response → retry hits `ON CONFLICT DO NOTHING`,
  returns the existing row → client receives success ✓
- Accidental double-click → second request ignored ✓

## API Contract

### `GET /api/booking/available`

Query params: none (always current calendar month)

Response `200`:
```json
{
  "month": "2026-05",
  "available": {
    "2026-05-12": ["10:00", "12:00", "14:00"],
    "2026-05-14": ["10:00"],
    "2026-05-16": ["12:00", "16:00"]
  }
}
```

### `POST /api/booking`

Body:
```json
{
  "lead_id": "uuid",
  "date": "2026-05-14",
  "time_slot": "10:00",
  "idempotency_key": "uuid"
}
```

Responses:
- `201` — booking created, returns booking record
- `400` — invalid input (missing fields, malformed date)
- `404` — lead_id not found
- `409` — slot already taken (refresh slots, show message)
- `410` — date is in the past or outside current month
- `500` — unexpected server error

## UI Design

### Calendar (`BookingCalendar.tsx`)

- Layout: 7-column grid (Mon–Sun header row), 5–6 rows of day cells
- Shows only current month; cells for days before today are rendered but disabled
- **Available day cell:** `bg-primary text-primary-foreground rounded-xl` + hover scale
- **Unavailable / past day:** `text-muted-foreground opacity-40 cursor-not-allowed`
- **Today (if available):** ring: `ring-2 ring-primary ring-offset-2`
- **Selected day:** `bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2`
- Month label top-left in Syne Bold; no month navigation (current month only)

### Time Slot Panel (`TimeSlotPanel.tsx`)

- Slides in from the right on desktop; slides up from bottom on mobile
- Framer Motion: `x: 40 → 0` + `opacity: 0 → 1`, duration 0.3s ease-out on desktop
- Mobile: `y: 40 → 0` + `opacity: 0 → 1`
- Time chips: `rounded-full border border-border px-4 py-2 text-sm font-medium`
- Selected chip: `bg-primary text-primary-foreground border-primary`
- Hover: `hover:border-primary hover:text-primary transition-colors duration-200`
- Panel header: selected date in human-readable format ("Środa, 14 maja")

### Confirm Bar (`BookingConfirmBar.tsx`)

- Appears at the bottom after both date and time are selected
- Framer Motion slide-up: `y: 60 → 0`, `opacity: 0 → 1`
- Shows: date + time summary on the left, "Potwierdź rezerwację" pill button on the right
- Button: `bg-primary text-primary-foreground rounded-full px-6 py-3` with loading spinner

### Loading & Error States

- Calendar skeleton on initial load (shimmer placeholders for day cells)
- Slot panel skeleton while fetching (3 pill-shaped placeholders)
- Toast on 409: "Ten termin zajął właśnie ktoś inny. Wybierz inny termin."
- Toast on 500: "Coś poszło nie tak. Spróbuj jeszcze raz."
- Confirm button disabled + spinner during submission

### `/booking/confirmed`

- Centered layout, no navbar
- Large checkmark icon (Lucide `CheckCircle`, `h-16 w-16 text-primary`)
- Heading: "Rezerwacja potwierdzona"
- Subtext: "Wysłaliśmy potwierdzenie na Twój email. Do zobaczenia!"
- Single CTA: link back to homepage

## Animations

| Interaction          | Animation                                      |
|----------------------|------------------------------------------------|
| Page load            | Calendar fades in, staggered day cells 0.05s  |
| Day selected         | Slot panel slides in (x+40 desktop, y+40 mob) |
| Slot selected        | Confirm bar slides up (y+60)                  |
| Day deselected       | Slot panel slides out, confirm bar hides       |
| Submitting           | Button shows spinner, panel locked             |

## Edge Cases

| Case                                    | Handling                                              |
|-----------------------------------------|-------------------------------------------------------|
| No slots available this month           | Empty state: "Brak wolnych terminów w tym miesiącu. Napisz do nas." |
| `lead_id` missing or invalid in URL     | Redirect to `/` with error param                      |
| Lead already has a confirmed booking    | Show existing booking details, no calendar            |
| User navigates back after success       | `/booking/confirmed` is static, no booking created again |
| Month changes while user is on page     | Available slots fetched fresh on page load only; stale slots resolved by 409 |

## Post-Booking Automation (Edge Function)

Triggered by INSERT on `bookings` table via Supabase webhook:

1. Send booking confirmation email (Resend) to lead
2. Schedule reminders: 48h before, 24h before, 1h before (via Edge Function cron or `pg_cron`)
3. Update lead status: `nurturing → call_booked`

## Out of Scope (V1)

- Calendar navigation between months
- Cancellation or rescheduling by the lead
- Google Calendar sync
- Timezone detection (all times shown in Warsaw time)
