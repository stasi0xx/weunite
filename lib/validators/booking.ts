import { z } from 'zod'

export const bookingSchema = z.object({
  lead_id: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time_slot: z.string().regex(/^\d{2}:\d{2}$/),
  idempotency_key: z.string().uuid(),
})

export type BookingInput = z.infer<typeof bookingSchema>
