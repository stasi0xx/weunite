import { createClient } from 'jsr:@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

interface Lead {
  name: string
  email: string
}

interface Booking {
  id: string
  date: string
  time_slot: string
  reminder_24h_sent_at: string | null
  reminder_1h_sent_at: string | null
  leads: Lead
}

function formatDate(date: string): string {
  return new Date(date + 'T00:00:00Z').toLocaleDateString('pl-PL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function computeEndTime(timeSlot: string): string {
  const [h, m] = timeSlot.split(':').map(Number)
  const total = h * 60 + m + 30
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

async function sendReminderEmail(
  lead: Lead,
  date: string,
  timeSlot: string,
  type: '24h' | '1h',
): Promise<void> {
  const timeEnd = computeEndTime(timeSlot)
  const formattedDate = formatDate(date)
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
  const timeLabel = type === '24h' ? 'jutro' : 'za godzinę'

  const subject =
    type === '24h'
      ? `Przypomnienie ⏰ — jutro rozmowa o ${timeSlot}`
      : `Przypomnienie ⏰ — za godzinę rozmowa o ${timeSlot}`

  const html = `<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8"></head>
<body style="background:#F2EDE6;margin:0;padding:32px 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;">
    <tr><td>
      <div style="height:4px;background:linear-gradient(90deg,#FF5A1F,#FF8C5A);border-radius:4px 4px 0 0;"></div>
      <div style="background:#EBE5DC;border-radius:0 0 16px 16px;padding:40px 32px;">
        <p style="font-weight:700;font-size:20px;color:#141414;margin:0 0 24px 0;letter-spacing:-0.03em;">WeUnite</p>
        <hr style="border:none;border-top:1px solid #DDD6CB;margin:0 0 32px 0;">
        <h1 style="font-weight:700;font-size:24px;color:#141414;margin:0 0 20px 0;line-height:1.2;">
          Hej ${lead.name}, pamiętaj o rozmowie ${timeLabel}!
        </h1>
        <p style="font-size:16px;color:#141414;line-height:1.6;margin:0 0 24px 0;">
          Twoja bezpłatna rozmowa strategiczna z zespołem WeUnite odbędzie się ${timeLabel}.
        </p>
        <div style="background:#F2EDE6;border:1px solid #DDD6CB;border-radius:12px;padding:20px 24px;margin-bottom:32px;">
          <p style="font-size:15px;color:#141414;line-height:2;margin:0;">
            &#128197;&nbsp; <strong>${capitalize(formattedDate)}</strong><br>
            &#128336;&nbsp; <strong>${timeSlot} – ${timeEnd}</strong><br>
            &#128187;&nbsp; Google Meet
          </p>
        </div>
        <p style="font-size:14px;color:#7A7367;line-height:1.5;margin:0 0 24px 0;">
          Jeśli masz pytania przed rozmową, po prostu odpowiedz na tego maila.
        </p>
        <hr style="border:none;border-top:1px solid #DDD6CB;margin:0 0 24px 0;">
        <p style="font-size:15px;color:#141414;line-height:1.6;margin:0;">
          Jan i Stanisław<br>
          <strong>WeUnite — Twój SPOTLIGHT</strong>
        </p>
      </div>
    </td></tr>
  </table>
</body>
</html>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'WeUnite <hello@weunite.pl>',
      to: lead.email,
      subject,
      html,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Resend error ${res.status}: ${body}`)
  }
}

Deno.serve(async () => {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  const now = new Date()

  const today = now.toISOString().split('T')[0]
  const dayAfterTomorrow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]

  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('id, date, time_slot, reminder_24h_sent_at, reminder_1h_sent_at, leads(name, email)')
    .eq('status', 'confirmed')
    .gte('date', today)
    .lte('date', dayAfterTomorrow)

  if (error) {
    console.error('DB query error:', error)
    return new Response('db error', { status: 500 })
  }

  let sent = 0
  const errors: string[] = []

  for (const booking of (bookings ?? []) as Booking[]) {
    // Postgres time type comes as "HH:MM:SS" — trim seconds
    const timeSlot = (booking.time_slot as string).slice(0, 5)
    const [hours, minutes] = timeSlot.split(':').map(Number)

    // Convert Warsaw local time to UTC
    // Probe noon UTC on the booking date to get the Warsaw offset (handles DST automatically)
    const probe = new Date(`${booking.date}T12:00:00Z`)
    const warsawHour = parseInt(
      new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Warsaw', hour: 'numeric', hour12: false }).format(probe),
    )
    const offsetHours = warsawHour - 12 // e.g. 14 - 12 = 2 for CEST, 13 - 12 = 1 for CET
    const callTime = new Date(
      Date.UTC(
        parseInt(booking.date.split('-')[0]),
        parseInt(booking.date.split('-')[1]) - 1,
        parseInt(booking.date.split('-')[2]),
        hours - offsetHours,
        minutes,
      ),
    )
    const minutesUntilCall = (callTime.getTime() - now.getTime()) / 60_000

    try {
      // 24h reminder — ±5 min window
      if (minutesUntilCall >= 1435 && minutesUntilCall <= 1445 && !booking.reminder_24h_sent_at) {
        await sendReminderEmail(booking.leads, booking.date, timeSlot, '24h')
        await supabase
          .from('bookings')
          .update({ reminder_24h_sent_at: new Date().toISOString() })
          .eq('id', booking.id)
        console.log(`24h reminder sent: booking ${booking.id}`)
        sent++
      }

      // 1h reminder — ±5 min window
      if (minutesUntilCall >= 55 && minutesUntilCall <= 65 && !booking.reminder_1h_sent_at) {
        await sendReminderEmail(booking.leads, booking.date, timeSlot, '1h')
        await supabase
          .from('bookings')
          .update({ reminder_1h_sent_at: new Date().toISOString() })
          .eq('id', booking.id)
        console.log(`1h reminder sent: booking ${booking.id}`)
        sent++
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`Error processing booking ${booking.id}:`, msg)
      errors.push(msg)
    }
  }

  return new Response(JSON.stringify({ sent, errors }), {
    status: errors.length > 0 ? 207 : 200,
    headers: { 'Content-Type': 'application/json' },
  })
})
