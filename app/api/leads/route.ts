import { NextRequest, NextResponse, after } from 'next/server'
import { z } from 'zod'
import { createServerClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { sendLeadConfirmation } from '@/lib/resend'
import { sendMetaLeadEvent } from '@/lib/meta/capi'

const MAX_FILES = 5
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const attachmentSchema = z.object({
  path: z.string().min(1),
  name: z.string().min(1),
  size: z.number().int().positive().max(MAX_FILE_SIZE_BYTES),
  type: z.string(),
})

const schema = z.object({
  name: z.string().min(2, 'Podaj swoje imię i nazwisko'),
  projectName: z.string().min(2, 'Podaj nazwę projektu lub firmy'),
  businessType: z.string().min(1, 'Wybierz rodzaj działalności'),
  projectDescription: z.string().min(10, 'Opisz krótko swój projekt'),
  colorPreference: z.string().optional(),
  email: z.string().email('Podaj poprawny adres email'),
  attachments: z.array(attachmentSchema).max(MAX_FILES).optional().default([]),
  metaEventId: z.string().uuid().optional(),
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

  const { name, projectName, email, businessType, projectDescription, colorPreference, attachments, metaEventId } = parsed.data

  // Read off the request before `after()` — the request context is not guaranteed
  // to still be readable once the response has been sent.
  const metaContext = {
    fbp: request.cookies.get('_fbp')?.value ?? null,
    fbc: request.cookies.get('_fbc')?.value ?? null,
    clientIp: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
    userAgent: request.headers.get('user-agent'),
    eventSourceUrl: request.headers.get('referer'),
  }

  const supabase = createServerClient()
  const { data: lead, error: dbError } = await supabase
    .from('leads')
    .insert({
      name: name.trim(),
      project_name: projectName.trim(),
      email: email.trim(),
      business_type: businessType,
      project_description: projectDescription.trim(),
      color_preference: colorPreference?.trim() || null,
      attachments,
      status: 'new',
    })
    .select('id')
    .single()

  if (dbError || !lead) {
    console.error('Supabase insert error:', dbError)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  after(
    sendMetaLeadEvent({
      ...metaContext,
      eventId: metaEventId ?? crypto.randomUUID(),
      email,
      name,
      customData: { content_name: projectName, business_type: businessType },
    })
  )

  let attachmentsHtml = '<p><strong>Załączniki:</strong> brak</p>'
  if (attachments.length > 0) {
    const { data: signedUrls, error: signError } = await supabase.storage
      .from('lead-attachments')
      .createSignedUrls(
        attachments.map((a) => a.path),
        60 * 60 * 24 * 7 // 7 days
      )
    if (signError) console.error('Supabase signed URL error:', signError)

    const links = (signedUrls ?? [])
      .map((signed, i) => {
        const fileName = escapeHtml(attachments[i].name)
        if (!signed.signedUrl) return `<li>${fileName} (błąd generowania linku)</li>`
        return `<li><a href="${signed.signedUrl}">${fileName}</a></li>`
      })
      .join('')
    attachmentsHtml = `<p><strong>Załączniki (link ważny 7 dni):</strong></p><ul>${links}</ul>`
  }

  const emailResults = await Promise.allSettled([
    sendLeadConfirmation(email, name),
    resend.emails.send({
      from: 'WeUnite Bot <bot@weunite.pl>',
      to: 'ai.say.agency@gmail.com',
      subject: `Nowy lead: ${name} — ${projectName}`,
      html: `
        <p><strong>Imię:</strong> ${name}</p>
        <p><strong>Nazwa projektu / firmy:</strong> ${projectName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Rodzaj biznesu:</strong> ${businessType}</p>
        <p><strong>Opis projektu:</strong> ${projectDescription}</p>
        <p><strong>Kolorystyka:</strong> ${colorPreference || '—'}</p>
        ${attachmentsHtml}
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
