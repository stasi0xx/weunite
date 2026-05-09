import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { sendLeadConfirmation } from '@/lib/resend'

const schema = z.object({
  name: z.string().min(2, 'Podaj swoje imię i nazwisko'),
  email: z.string().email('Podaj poprawny adres email'),
  businessType: z.string().min(1, 'Wybierz rodzaj działalności'),
  serviceInterest: z.string().min(1, 'Wybierz interesującą Cię usługę'),
})

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const { name, email, businessType, serviceInterest } = parsed.data

  const supabase = createServerClient()
  const { data: lead, error: dbError } = await supabase
    .from('leads')
    .insert({
      name: name.trim(),
      email: email.trim(),
      business_type: businessType,
      service_interest: serviceInterest,
      status: 'new',
    })
    .select('id')
    .single()

  if (dbError || !lead) {
    console.error('Supabase insert error:', dbError)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  const emailResults = await Promise.allSettled([
    sendLeadConfirmation(email, name),
    resend.emails.send({
      from: 'WeUnite Bot <bot@weunite.pl>',
      to: 'ai.say.agency@gmail.com',
      subject: `Nowy lead: ${name} — ${serviceInterest}`,
      html: `
        <p><strong>Imię:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Rodzaj biznesu:</strong> ${businessType}</p>
        <p><strong>Interesująca usługa:</strong> ${serviceInterest}</p>
        <p><strong>Data:</strong> ${new Date().toISOString()}</p>
      `,
    }),
  ])

  for (const result of emailResults) {
    if (result.status === 'rejected') {
      console.error('Resend error:', result.reason)
    }
  }

  return NextResponse.json({ success: true, lead_id: lead.id })
}
