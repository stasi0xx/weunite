import { NextRequest, NextResponse, after } from 'next/server'
import { bookingSchema } from '@/lib/validators/booking'
import { createServerClient } from '@/lib/supabase/server'
import { sendBookingConfirmation, buildCalendarLink } from '@/lib/resend'

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = bookingSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const { lead_id, date, time_slot, idempotency_key } = parsed.data

  const now = new Date()
  const requestDate = new Date(date + 'T00:00:00')
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const lastOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  if (requestDate < today || requestDate < firstOfMonth || requestDate > lastOfMonth) {
    return NextResponse.json({ error: 'Date out of range' }, { status: 410 })
  }

  const supabase = createServerClient()

  const { data: lead } = await supabase.from('leads').select('id, name, email').eq('id', lead_id).single()
  if (!lead) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
  }

  const { data: existingByKey } = await supabase
    .from('bookings')
    .select('*')
    .eq('idempotency_key', idempotency_key)
    .maybeSingle()

  if (existingByKey) {
    return NextResponse.json(existingByKey, { status: 201 })
  }

  const { data: booking, error } = await supabase
    .from('bookings')
    .insert({ lead_id, date, time_slot, idempotency_key })
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Slot already taken' }, { status: 409 })
    }
    console.error('Booking insert error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }

  await supabase.from('leads').update({ status: 'call_booked' }).eq('id', lead_id)

  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('pl-PL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const calendarLink = buildCalendarLink(date, time_slot)

  after(() =>
    sendBookingConfirmation({
      to: lead.email,
      name: lead.name,
      date: formattedDate,
      time: time_slot,
      calendarLink,
    }).catch(e => console.error('Resend booking confirmation error:', e))
  )

  return NextResponse.json(booking, { status: 201 })
}
