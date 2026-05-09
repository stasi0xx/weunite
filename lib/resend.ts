import { Resend } from 'resend'
import { renderLeadConfirmation } from '@/emails/LeadConfirmation'
import { renderBookingConfirmation } from '@/emails/BookingConfirmation'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendLeadConfirmation(to: string, name: string) {
  const html = await renderLeadConfirmation({ name })
  return resend.emails.send({
    from: 'WeUnite <hello@weunite.pl>',
    to,
    subject: `Dobrze, że jesteś 👋 — zobaczmy, co możemy razem zbudować`,
    html,
  })
}

export interface BookingEmailProps {
  to: string
  name: string
  /** Formatted Polish date, e.g. "wtorek, 15 maja 2025" */
  date: string
  /** HH:MM */
  time: string
  meetingLink?: string
  calendarLink: string
}

export async function sendBookingConfirmation(props: BookingEmailProps) {
  const { to, name, date, time, meetingLink, calendarLink } = props
  const html = await renderBookingConfirmation({ name, date, time, meetingLink, calendarLink })
  return resend.emails.send({
    from: 'WeUnite <hello@weunite.pl>',
    to,
    subject: `Rozmowa zarezerwowana ✅ — ${date}, ${time}`,
    html,
  })
}

/** Builds a Google Calendar deeplink pre-filled with a 30-minute event. */
export function buildCalendarLink(date: string, timeSlot: string): string {
  const [year, month, day] = date.split('-').map(Number)
  const [hours, minutes] = timeSlot.split(':').map(Number)
  const start = new Date(year, month - 1, day, hours, minutes)
  const end = new Date(start.getTime() + 30 * 60 * 1000)

  const fmt = (d: Date) =>
    `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}` +
    `T${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}00`

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Rozmowa strategiczna — WeUnite',
    dates: `${fmt(start)}/${fmt(end)}`,
    details: 'Bezpłatna rozmowa strategiczna z zespołem WeUnite.',
    location: 'Google Meet',
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export { resend }
