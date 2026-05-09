import { NextResponse } from 'next/server'
import { getAvailableSlots } from '@/lib/booking'

export async function GET() {
  try {
    const data = await getAvailableSlots()
    return NextResponse.json(data)
  } catch (err) {
    console.error('Available slots error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
