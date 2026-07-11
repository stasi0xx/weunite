# WeUnite — Landing Page & Lead Funnel

## Overview

WeUnite is a two-person digital agency offering social media management, custom websites with integrated booking and payment systems, and business automations for small local businesses. This landing page is the agency's primary sales funnel: paid ads drive traffic to a single conversion point where visitors sign up for a free consultation and website visualization. From form submission the lead is captured and nurtured by automated emails; the WeUnite team then follows up directly (email/phone) rather than the lead self-booking a call slot. Current focus niche is vacation rental property owners (domki letniskowe) who need a professional website with an online booking and payment system, replacing manual phone bookings and third-party platforms that take commission.

## Goals

1. Capture and store leads in a database with status tracking across the full funnel lifecycle
2. Send a timed email sequence (Day 0 / Day 2 / Day 4) driven by backend scheduled functions — no manual involvement
3. ~~Provide a self-service booking system where leads pick their own call slot~~ — removed from the active
   funnel; the WeUnite team now follows up with leads directly instead of leads self-booking a call.
4. ~~Send automated call reminders at 48h, 24h, and 1h before the booked slot~~ — parked along with the
   booking step above.
5. Expose a minimal admin interface for managing available slots and triggering the post-visualization email

## Core User Flow

1. User sees a paid ad on Facebook or Instagram
2. Lands on the WeUnite homepage, reads the offer and social proof
3. Fills out a short form to claim a free consultation + website visualization
4. Redirected to a static "Dziękujemy" (thank you) page — no calendar/booking step
5. **Email 1 (immediate):** confirmation + what happens next
6. **Email 2 (Day 2):** social proof — case studies, results, example vacation rental site
7. **Email 3 (Day 4):** follow-up nudge (no longer a booking CTA — see Open Questions)
8. WeUnite team reaches out to the lead directly (email/phone) to arrange next steps
9. Call happens → WeUnite presents the action plan + sends visualization → project begins

## Features

### Lead Capture

- Short form: name, email, business type, service interest
- Leads stored in Supabase with status tracking: `new → nurturing → call_booked → client`
  (the `call_booked` transition is currently set manually by the team, not by a self-service booking flow)
- Immediate automated confirmation email (Resend)
- Internal notification email to the WeUnite team on every new lead

### Automated Email Sequence

- 3-email automated sequence from lead capture (Day 0 / Day 2 / Day 4)
- Triggers: form submission, time-based Supabase Edge Functions
- Built with Resend + Supabase Edge Functions

### Booking System (parked, not in active flow)

- Code remains in the repo (`app/booking`, `lib/booking.ts`, `components/booking/`,
  `supabase/functions/send-reminders`) but is no longer linked from the lead form — the
  agency does not currently self-book strategy calls with leads.
- Kept as a live demo of the booking product WeUnite builds for vacation rental clients.

### Marketing Content

- Hero section with clear offer: free consultation + website visualization
- Services section: social media management, websites + booking systems, automations
- Niche highlight: vacation rental websites with booking and payment integration
- Social proof: client results, case studies, testimonials

## Scope

### In Scope

- Next.js marketing landing page
- Lead capture form + Supabase storage with status tracking
- Automated email sequence (Resend + Supabase Edge Functions)
- Static "Dziękujemy" thank-you page after form submission
- Simple admin interface: manage available slots + trigger post-visualization email manually
- Mobile-first responsive design

### Out of Scope

- Payment processing / Stripe (no deposit in V1)
- Full CRM (Supabase dashboard + status field is sufficient)
- Email marketing newsletters (separate tool, e.g. Brevo)
- Self-service call booking for leads (parked — the booking system code stays in the repo as a
  demo of the client product, but is unlinked from the funnel; the team follows up manually instead)
- Automated booking confirmation / 48h / 24h / 1h reminder emails (parked with the booking step above)
- Client-facing booking systems (separate client deliverables — the parked booking system serves as their template)
- SMS reminders
- Google Calendar sync (planned for V2)
- Multi-language support

## Tech Stack

- **Framework:** Next.js
- **Database:** Supabase (lead storage, status tracking, booking slots, Edge Functions for scheduled emails)
- **Email:** Resend (all transactional emails — PDF delivery, sequence, deposit confirmation, booking confirmation, reminders)
## Success Criteria

1. A visitor can submit the lead form, land on the "Dziękujemy" page, and receive a confirmation
   email within 60 seconds
2. The full email sequence fires automatically with correct timing without any manual action from the team
3. Page loads in under 2 seconds on mobile
