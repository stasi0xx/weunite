# WeUnite — Landing Page & Lead Funnel

## Overview

WeUnite is a two-person digital agency offering social media management, custom websites with integrated booking and payment systems, and business automations for small local businesses. This landing page is the agency's primary sales funnel: paid ads drive traffic to a single conversion point where visitors sign up for a free consultation and website visualization. From form submission to booked strategy call the entire process is fully automated — no manual involvement from the WeUnite team. Current focus niche is vacation rental property owners (domki letniskowe) who need a professional website with an online booking and payment system, replacing manual phone bookings and third-party platforms that take commission.

## Goals

1. Capture and store leads in a database with status tracking across the full funnel lifecycle
2. Send a timed email sequence (Day 0 / Day 2 / Day 4) driven by backend scheduled functions — no manual involvement
3. Provide a self-service booking system where leads pick their own call slot from a weekly availability template
4. Send automated call reminders at 48h, 24h, and 1h before the booked slot
5. Expose a minimal admin interface for managing available slots and triggering the post-visualization email

## Core User Flow

1. User sees a paid ad on Facebook or Instagram
2. Lands on the WeUnite homepage, reads the offer and social proof
3. Fills out a short form to claim a free consultation + website visualization
4. **Email 1 (immediate):** confirmation + what happens next
5. **Email 2 (Day 2):** social proof — case studies, results, example vacation rental site
6. **Email 3 (Day 4):** CTA to book the free strategy call via the embedded booking system
7. Lead self-books a call from available slots → automated confirmation email
8. **Reminder: 48h before call** — automated email
9. **Reminder: 24h before call** — automated email
10. **Reminder: 1h before call** — automated email
11. Call happens → WeUnite presents the action plan + sends visualization → project begins

## Features

### Lead Capture

- Short form: name, email, business type, service interest
- Leads stored in Supabase with status tracking: `new → nurturing → call_booked → client`
- Immediate automated confirmation email (Resend)
- Internal notification email to the WeUnite team on every new lead

### Automated Email Sequence

- 3-email automated sequence from lead capture to booking CTA (Day 0 / Day 2 / Day 4)
- Triggers: form submission, time-based Supabase Edge Functions
- Reminder emails: 48h, 24h, and 1h before the booked call
- Built with Resend + Supabase Edge Functions

### Booking System

- Lead self-selects a call date and time from available slots
- Availability managed via a weekly slot template (admin sets recurring available times once; manually blocks specific days when unavailable)
- Automated confirmation email on booking
- Automated reminders at 48h, 24h, and 1h before the call
- This system is a live demo of the product WeUnite builds for vacation rental clients

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
- Custom booking system with weekly slot template and manual blocking
- Automated booking confirmation and 48h / 24h / 1h reminder emails
- Simple admin interface: manage available slots + trigger post-visualization email manually
- Mobile-first responsive design

### Out of Scope

- Payment processing / Stripe (no deposit in V1)
- Full CRM (Supabase dashboard + status field is sufficient)
- Email marketing newsletters (separate tool, e.g. Brevo)
- Client-facing booking systems (separate client deliverables — this booking system serves as their template)
- SMS reminders
- Google Calendar sync (planned for V2)
- Multi-language support

## Tech Stack

- **Framework:** Next.js
- **Database:** Supabase (lead storage, status tracking, booking slots, Edge Functions for scheduled emails)
- **Email:** Resend (all transactional emails — PDF delivery, sequence, deposit confirmation, booking confirmation, reminders)
## Success Criteria

1. A visitor can submit the lead form and receive a confirmation email within 60 seconds
2. The full email sequence fires automatically with correct timing without any manual action from the team
3. A lead can self-book a strategy call and receive a confirmation + 48h / 24h / 1h reminders with no team involvement
4. The team can manage available booking slots via the admin interface
5. Page loads in under 2 seconds on mobile
