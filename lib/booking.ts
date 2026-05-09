import { createServerClient } from '@/lib/supabase/server'

export interface AvailableSlots {
  month: string
  available: Record<string, string[]>
}

export async function getAvailableSlots(): Promise<AvailableSlots> {
  const supabase = createServerClient()
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  const todayDate = now.getDate()
  const lastDay = new Date(year, month + 1, 0).getDate()

  const { data: slots } = await supabase
    .from('booking_slots')
    .select('day_of_week, time_slot')
    .eq('is_active', true)

  if (!slots || slots.length === 0) {
    return { month: fmtMonth(year, month), available: {} }
  }

  const mm = String(month + 1).padStart(2, '0')
  const monthStart = `${year}-${mm}-01`
  const monthEnd = `${year}-${mm}-${String(lastDay).padStart(2, '0')}`

  const [{ data: blockedDates }, { data: existingBookings }] = await Promise.all([
    supabase.from('blocked_dates').select('date').gte('date', monthStart).lte('date', monthEnd),
    supabase
      .from('bookings')
      .select('date, time_slot')
      .eq('status', 'confirmed')
      .gte('date', monthStart)
      .lte('date', monthEnd),
  ])

  const blockedSet = new Set((blockedDates ?? []).map((b: { date: string }) => b.date))

  const bookedMap = new Map<string, Set<string>>()
  for (const b of existingBookings ?? []) {
    if (!bookedMap.has(b.date)) bookedMap.set(b.date, new Set())
    bookedMap.get(b.date)!.add((b.time_slot as string).slice(0, 5))
  }

  const slotsByDow = new Map<number, string[]>()
  for (const s of slots) {
    if (!slotsByDow.has(s.day_of_week)) slotsByDow.set(s.day_of_week, [])
    slotsByDow.get(s.day_of_week)!.push((s.time_slot as string).slice(0, 5))
  }

  const available: Record<string, string[]> = {}
  for (let d = todayDate; d <= lastDay; d++) {
    const date = new Date(year, month, d)
    const dateStr = `${year}-${mm}-${String(d).padStart(2, '0')}`
    if (blockedSet.has(dateStr)) continue

    const dow = date.getDay()
    const templateSlots = slotsByDow.get(dow) ?? []
    if (templateSlots.length === 0) continue

    const booked = bookedMap.get(dateStr) ?? new Set()
    const open = templateSlots.filter((t) => !booked.has(t)).sort()
    if (open.length > 0) available[dateStr] = open
  }

  return { month: fmtMonth(year, month), available }
}

function fmtMonth(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}`
}
