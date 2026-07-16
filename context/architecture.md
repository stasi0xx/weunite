# Architecture Context

## Stack

| Layer       | Technology                                      | Role                                                              |
| ----------- | ----------------------------------------------- | ----------------------------------------------------------------- |
| Framework   | Next.js 16 + TypeScript (App Router)            | Pages, layouts, API route handlers, RSC by default               |
| UI          | Tailwind CSS v4 + shadcn/ui + Lucide React      | Styling system, component primitives, icons                       |
| Animation   | Framer Motion + GSAP                            | Scroll reveals, micro-interactions, staggered counters            |
| Auth        | Supabase Auth                                   | Admin panel protection — public pages require no auth             |
| Database    | Supabase (PostgreSQL + Edge Functions)          | Lead storage, booking slots, email scheduling via Edge Functions  |
| Email       | Resend                                          | All transactional emails: sequences, confirmations, reminders     |
| Analytics   | PostHog (cookieless by default)                 | Product analytics — pageviews, funnel events, session replay      |
| Ad tracking | Meta Pixel + Conversions API                    | Ad attribution — client-side pixel behind consent, server-side Lead |
| Deployment  | Vercel                                          | Hosting + Edge runtime for Next.js                                |

## System Boundaries

- `app/` — Next.js App Router: pages, layouts, and route handlers only — no business logic
- `app/api/` — API route handlers: lead submission, booking CRUD, admin actions
- `components/` — Reusable UI components: landing sections, lead form, booking widget
- `lib/` — Server-side utilities: Supabase client, Resend helpers, input validators
- `supabase/` — Edge Functions (email sequence, reminders), SQL migrations, seed data
- `context/` — Project documentation for the team and AI agents — nothing here is shipped
- `public/` — Static assets: images, fonts, icons

## Storage Model

- **Supabase (PostgreSQL):** Lead records with status tracking, booking slot templates and blocked dates, email delivery metadata (timestamps, status, template ID — never full HTML)
- **Supabase Storage:** Large generated assets — visualizations and PDFs sent post-call — never stored as Supabase column values

## Auth and Access Model

- Public landing page and lead capture form require no authentication
- Admin panel (`/admin`) is protected by Supabase Auth — only authenticated team members can access it
- Admin capabilities: manage weekly slot availability, block specific dates, trigger the post-visualization email manually
- No per-lead ownership model — all leads are accessible to any authenticated admin

## Invariants

1. Email scheduling logic lives exclusively in Supabase Edge Functions — no external cron services and no in-process timers in route handlers
2. Route handlers do not perform long-running work — background tasks belong in Edge Functions
3. Lead status must be updated on every state transition: `new → nurturing → call_booked → client`
   (the `call_booked` transition is currently set manually by the team — the self-service booking
   flow that used to trigger it automatically is unlinked from the funnel, see `project-overview.md`)
4. Only email delivery metadata is stored in the database — never full email HTML or body content
5. Single source of truth per entity — lead and booking state is not duplicated across tables
6. Consent is read and written only through `lib/consent.ts` — PostHog and the Meta Pixel subscribe
   to it via `onConsentChange`; no component touches the `cookie_consent` localStorage key directly
7. PostHog runs without consent in cookieless (`persistence: "memory"`) mode and upgrades to cookies
   plus session replay only after "Akceptuj wszystkie" — it is never fully opted out, or ad traffic
   becomes unmeasurable
8. The Meta Pixel never loads before consent; the Conversions API is the fallback signal and fires
   server-side on lead submission regardless
9. Any Meta conversion sent from both the browser and the server must carry the same `event_id`,
   or Meta double-counts it
