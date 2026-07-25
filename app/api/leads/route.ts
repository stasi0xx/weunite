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

const step1Schema = z.object({
  step: z.literal(1),
  email: z.string().email('Podaj poprawny adres email'),
  offerType: z.enum(['website_visualization', 'marketing_plan']).optional().default('website_visualization'),
})

const step2Schema = z.object({
  step: z.literal(2),
  leadId: z.string().uuid(),
  projectName: z.string().min(2, 'Podaj nazwę projektu lub firmy'),
  businessType: z.string().min(1, 'Wybierz rodzaj działalności'),
})

const step3Schema = z.object({
  step: z.literal(3),
  leadId: z.string().uuid(),
  projectDescription: z.string().min(10, 'Opisz krótko swój projekt'),
})

const step4Schema = z.object({
  step: z.literal(4),
  leadId: z.string().uuid(),
  colorPreference: z.string().optional(),
  reference: z.string().optional(),
  attachments: z.array(attachmentSchema).max(MAX_FILES).optional().default([]),
  metaEventId: z.string().uuid().optional(),
})

const fullSchema = z.object({
  name: z.string().optional().default(''),
  projectName: z.string().min(2, 'Podaj nazwę projektu lub firmy'),
  businessType: z.string().min(1, 'Wybierz rodzaj działalności'),
  projectDescription: z.string().min(10, 'Opisz krótko swój projekt'),
  colorPreference: z.string().optional(),
  reference: z.string().optional(),
  email: z.string().email('Podaj poprawny adres email'),
  offerType: z.enum(['website_visualization', 'marketing_plan']).optional().default('website_visualization'),
  attachments: z.array(attachmentSchema).max(MAX_FILES).optional().default([]),
  metaEventId: z.string().uuid().optional(),
})

const payloadSchema = z.discriminatedUnion('step', [
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
])

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const supabase = createServerClient()

  // Try step-based schema first
  const stepParsed = payloadSchema.safeParse(body)

  if (stepParsed.success) {
    const data = stepParsed.data

    if (data.step === 1) {
      const offerType = data.offerType || 'website_visualization'
      const baseInsert = {
        email: data.email.trim(),
        offer_type: offerType,
        name: '',
        project_name: '',
        business_type: '',
        project_description: '',
        status: 'draft',
      }

      // Try inserting with current_step first
      let { data: lead, error: dbError } = await supabase
        .from('leads')
        .insert({ ...baseInsert, current_step: 1 })
        .select('id')
        .single()

      // Fallback if current_step or offer_type column is missing in live Supabase DB schema cache
      if (dbError && dbError.code === 'PGRST204') {
        const { offer_type, ...baseWithoutOfferType } = baseInsert
        const retry = await supabase
          .from('leads')
          .insert(baseWithoutOfferType)
          .select('id')
          .single()
        lead = retry.data
        dbError = retry.error
      }

      if (dbError || !lead) {
        console.error('Supabase insert step 1 error:', dbError)
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
      }

      return NextResponse.json({ success: true, leadId: lead.id })
    }

    if (data.step === 2) {
      const baseUpdate = {
        project_name: data.projectName.trim(),
        business_type: data.businessType.trim(),
      }

      let { error: dbError } = await supabase
        .from('leads')
        .update({ ...baseUpdate, current_step: 2 })
        .eq('id', data.leadId)

      if (dbError && dbError.code === 'PGRST204') {
        const retry = await supabase
          .from('leads')
          .update(baseUpdate)
          .eq('id', data.leadId)
        dbError = retry.error
      }

      if (dbError) {
        console.error('Supabase update step 2 error:', dbError)
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
      }

      return NextResponse.json({ success: true, leadId: data.leadId })
    }

    if (data.step === 3) {
      const baseUpdate = {
        project_description: data.projectDescription.trim(),
      }

      let { error: dbError } = await supabase
        .from('leads')
        .update({ ...baseUpdate, current_step: 3 })
        .eq('id', data.leadId)

      if (dbError && dbError.code === 'PGRST204') {
        const retry = await supabase
          .from('leads')
          .update(baseUpdate)
          .eq('id', data.leadId)
        dbError = retry.error
      }

      if (dbError) {
        console.error('Supabase update step 3 error:', dbError)
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
      }

      return NextResponse.json({ success: true, leadId: data.leadId })
    }

    if (data.step === 4) {
      const baseUpdate = {
        color_preference: data.colorPreference?.trim() || null,
        reference: data.reference?.trim() || null,
        attachments: data.attachments,
        status: 'new',
      }

      let { error: dbError } = await supabase
        .from('leads')
        .update({ ...baseUpdate, current_step: 4 })
        .eq('id', data.leadId)

      if (dbError && dbError.code === 'PGRST204') {
        const retry = await supabase
          .from('leads')
          .update(baseUpdate)
          .eq('id', data.leadId)
        dbError = retry.error
      }

      if (dbError) {
        console.error('Supabase update step 4 error:', dbError)
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
      }

      // Fetch the full lead record for sending emails
      const { data: lead } = await supabase
        .from('leads')
        .select('*')
        .eq('id', data.leadId)
        .single()

      if (lead) {
        const metaContext = {
          fbp: request.cookies.get('_fbp')?.value ?? null,
          fbc: request.cookies.get('_fbc')?.value ?? null,
          clientIp: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
          userAgent: request.headers.get('user-agent'),
          eventSourceUrl: request.headers.get('referer'),
        }

        after(
          sendMetaLeadEvent({
            ...metaContext,
            eventId: data.metaEventId ?? crypto.randomUUID(),
            email: lead.email,
            name: lead.name || lead.email.split('@')[0],
            customData: { content_name: lead.project_name, business_type: lead.business_type },
          })
        )

        let attachmentsHtml = '<p><strong>Załączniki:</strong> brak</p>'
        if (data.attachments.length > 0) {
          const { data: signedUrls, error: signError } = await supabase.storage
            .from('lead-attachments')
            .createSignedUrls(
              data.attachments.map((a) => a.path),
              60 * 60 * 24 * 7 // 7 days
            )
          if (signError) console.error('Supabase signed URL error:', signError)

          const links = (signedUrls ?? [])
            .map((signed, i) => {
              const fileName = escapeHtml(data.attachments[i].name)
              if (!signed.signedUrl) return `<li>${fileName} (błąd generowania linku)</li>`
              return `<li><a href="${signed.signedUrl}">${fileName}</a></li>`
            })
            .join('')
          attachmentsHtml = `<p><strong>Załączniki (link ważny 7 dni):</strong></p><ul>${links}</ul>`
        }

        const offerLabel = lead.offer_type === 'marketing_plan' 
          ? 'Darmowy plan marketingowy' 
          : 'Darmowa wizualizacja strony'

        const emailResults = await Promise.allSettled([
          sendLeadConfirmation(lead.email, lead.name || lead.email.split('@')[0]),
          resend.emails.send({
            from: 'WeUnite Bot <bot@weunite.pl>',
            to: 'ai.say.agency@gmail.com',
            subject: `Nowy lead: ${lead.email} — ${offerLabel} (${lead.project_name || 'Brak nazwy'})`,
            html: `
              <p><strong>Wybrany bezpłatny materiał:</strong> ${offerLabel}</p>
              <p><strong>Email:</strong> ${lead.email}</p>
              <p><strong>Nazwa projektu / firmy:</strong> ${lead.project_name || '—'}</p>
              <p><strong>Rodzaj biznesu:</strong> ${lead.business_type || '—'}</p>
              <p><strong>Opis projektu:</strong> ${lead.project_description || '—'}</p>
              <p><strong>Kolorystyka:</strong> ${lead.color_preference || '—'}</p>
              <p><strong>Referencja:</strong> ${lead.reference ? escapeHtml(lead.reference) : '—'}</p>
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
      }

      return NextResponse.json({ success: true, lead_id: data.leadId })
    }
  }

  // Fallback for full legacy payload without step discriminator
  const fullParsed = fullSchema.safeParse(body)
  if (!fullParsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const { name, projectName, email, businessType, projectDescription, colorPreference, reference, offerType, attachments, metaEventId } = fullParsed.data

  const metaContext = {
    fbp: request.cookies.get('_fbp')?.value ?? null,
    fbc: request.cookies.get('_fbc')?.value ?? null,
    clientIp: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
    userAgent: request.headers.get('user-agent'),
    eventSourceUrl: request.headers.get('referer'),
  }

  const baseFullInsert = {
    name: name.trim(),
    project_name: projectName.trim(),
    email: email.trim(),
    business_type: businessType,
    project_description: projectDescription.trim(),
    color_preference: colorPreference?.trim() || null,
    reference: reference?.trim() || null,
    offer_type: offerType || 'website_visualization',
    attachments,
    status: 'new',
  }

  let { data: lead, error: dbError } = await supabase
    .from('leads')
    .insert({ ...baseFullInsert, current_step: 4 })
    .select('id')
    .single()

  if (dbError && dbError.code === 'PGRST204') {
    const { offer_type, ...baseWithoutOfferType } = baseFullInsert
    const retry = await supabase
      .from('leads')
      .insert(baseWithoutOfferType)
      .select('id')
      .single()
    lead = retry.data
    dbError = retry.error
  }

  if (dbError || !lead) {
    console.error('Supabase insert error:', dbError)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  after(
    sendMetaLeadEvent({
      ...metaContext,
      eventId: metaEventId ?? crypto.randomUUID(),
      email,
      name: name || email.split('@')[0],
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

  const offerLabel = offerType === 'marketing_plan' 
    ? 'Darmowy plan marketingowy' 
    : 'Darmowa wizualizacja strony'

  const emailResults = await Promise.allSettled([
    sendLeadConfirmation(email, name || email.split('@')[0]),
    resend.emails.send({
      from: 'WeUnite Bot <bot@weunite.pl>',
      to: 'ai.say.agency@gmail.com',
      subject: `Nowy lead: ${email} — ${offerLabel} (${projectName})`,
      html: `
        <p><strong>Wybrany bezpłatny materiał:</strong> ${offerLabel}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nazwa projektu / firmy:</strong> ${projectName}</p>
        <p><strong>Rodzaj biznesu:</strong> ${businessType}</p>
        <p><strong>Opis projektu:</strong> ${projectDescription}</p>
        <p><strong>Kolorystyka:</strong> ${colorPreference || '—'}</p>
        <p><strong>Referencja:</strong> ${reference ? escapeHtml(reference) : '—'}</p>
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
