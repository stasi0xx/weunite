# Code Standards

## General

- Keep modules small and single-purpose.
- Fix root causes — do not layer workarounds.
- Do not mix unrelated concerns in one component or route.
- Respect the system boundaries defined in `architecture-context.md`.

## TypeScript

- Strict mode is required throughout the project.
- Avoid `any`; use explicit interfaces or narrowly scoped types.
- Validate unknown external input at system boundaries before trusting it.
- Use `interface` for object contracts.

## Next.js

- Default to React Server Components.
- Add `"use client"` only when the component needs browser interactivity, hooks, or real-time state.
- Keep route handlers focused on a single responsibility.
- Long-running work belongs in background tasks, not in request handlers.

## Styling

- Use Tailwind utility names derived from `@theme inline` in `globals.css` — never raw `bg-[--css-var]` syntax, hardcoded hex values, or bare `zinc-*` / `slate-*` Tailwind palette classes.
- The `@theme inline` block maps `--color-*` variables onto Tailwind utilities. Use the utility name, not the CSS variable directly.

### Token → Tailwind utility reference

| Role             | CSS variable (`:root`)  | Tailwind utility                      |
| ---------------- | ----------------------- | ------------------------------------- |
| Page background  | `--bg-base`             | `bg-background`                       |
| Surface / cards  | `--bg-surface`          | `bg-card`                             |
| Primary text     | `--text-primary`        | `text-foreground`                     |
| Muted text       | `--text-muted`          | `text-muted-foreground`               |
| Accent (orange)  | `--accent-primary`      | `bg-primary` / `text-primary`         |
| Accent warm      | `--accent-warm`         | `bg-accent` / `text-accent`           |
| Border           | `--border-default`      | `border-border`                       |
| Error            | `--state-error`         | `bg-destructive` / `text-destructive` |
| White on primary | `--primary-foreground`  | `text-primary-foreground`             |

> **Note:** `text-primary` = orange accent, NOT the dark copy color. Dark copy = `text-foreground`.
> When in doubt: open `globals.css` and trace `--color-X` → `@theme inline` → Tailwind utility `X`.


## API Routes

- Validate and parse request input before any logic runs.
- Enforce auth and project ownership checks before any mutation.
- Return consistent, predictable response shapes.
- Keep route handlers thin — push complexity into shared modules or background tasks.

## Data and Storage

- Lead records belong in Supabase with a `status` column tracking the full funnel lifecycle: `new → nurturing → call_booked → client` — always update status on every state transition
- Booking availability is managed via a weekly slot template in Supabase — admins define recurring slots once and manually block specific dates; do not build a per-day calendar from scratch
- Email scheduling logic belongs exclusively in Supabase Edge Functions — do not introduce external cron services or in-process timers
- Store only email delivery metadata in the database (timestamps, status, template ID) — never store full email HTML or body content in Supabase
- Large generated assets (visualizations, PDFs sent post-call) belong in file or blob storage, not in Supabase columns
- Do not duplicate lead or booking state across tables — a single source of truth per entity, joined when needed


## File Organization

- `app/` — Next.js App Router: pages, layouts, and route handlers only — no business logic
- `app/api/` — API route handlers: lead submission, booking CRUD, admin actions
- `components/` — Reusable UI components: landing sections, lead form, booking widget
- `lib/` — Server-side utilities: Supabase client, Resend helpers, input validators
- `supabase/` — Edge Functions (email sequence, reminders), SQL migrations, seed data
- `context/` — Project documentation for the team and AI agents — nothing here is shipped
- `public/` — Static assets: images, fonts, icons
- Name files after the responsibility they contain, not the technology.
