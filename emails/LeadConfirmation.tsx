import React from 'react'
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
  Link,
} from '@react-email/components'
import { render } from '@react-email/render'

const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif"

const C = {
  base: '#F2EDE6',
  surface: '#EBE5DC',
  text: '#141414',
  muted: '#7A7367',
  accent: '#FF5A1F',
  accentWarm: '#FF8C5A',
  border: '#DDD6CB',
}

export type LeadConfirmationLocale = 'pl' | 'en'

export interface LeadConfirmationProps {
  name: string
  locale?: LeadConfirmationLocale
}

const COPY = {
  pl: {
    preview: 'Twoje zgłoszenie dotarło — sprawdź, co dalej.',
    greeting: (name: string) => `Hej ${name}, dobrze że jesteś!`,
    intro:
      'Zgłoszenie trafiło do nas i już je mamy. Cieszmy się — to naprawdę dobry krok. Firmy, które decydują się na profesjonalną stronę internetową, przestają tracić klientów na rzecz konkurencji i pośredników, którzy biorą prowizję od każdej transakcji.',
    nextStepsHeading: 'Co dalej?',
    step1Title: '1. Analizujemy Twoje zgłoszenie',
    step1Body: ' — sprawdzamy szczegóły projektu i przygotowujemy wstępny plan działania.',
    step2Title: '2. Odzywamy się do Ciebie',
    step2Body: ' — napiszemy lub zadzwonimy w ciągu 24h. Zero presji, zero zobowiązań.',
    step3Title: '3. Przygotowujemy wizualizację',
    step3Body:
      ' — w ciągu 72h wyślemy Ci wstępny projekt Twojej strony, a Ty możesz zdecydować czy w ten sposób chcesz pracować.',
    cta: 'Masz pytanie? Napisz do nas →',
    signatureLine: 'Jan i Stanisław',
    signatureBrand: 'WeUnite — Twój SPOTLIGHT',
    footer: 'WeUnite · weunite.pl · Możesz odpowiedzieć bezpośrednio na tego maila',
    unsubscribe: 'Zrezygnuj z komunikacji',
    unsubscribeSubject: 'Rezygnacja+z+komunikacji',
  },
  en: {
    preview: 'Your submission is in — here’s what happens next.',
    greeting: (name: string) => `Hey ${name}, great to have you!`,
    intro:
      "Your submission has reached us. That's a genuinely good step. Businesses that invest in a professional website stop losing customers to competitors and to middlemen who take a cut of every transaction.",
    nextStepsHeading: "What's next?",
    step1Title: '1. We review your submission',
    step1Body: ' — we check the project details and put together an initial plan.',
    step2Title: '2. We reach out to you',
    step2Body: " — we'll write or call within 24h. Zero pressure, zero commitment.",
    step3Title: '3. We prepare your visualization',
    step3Body:
      " — within 72h we'll send you an initial design of your website, and you decide whether you'd like to work with us.",
    cta: 'Got a question? Write to us →',
    signatureLine: 'Jan and Stanisław',
    signatureBrand: 'WeUnite — Your SPOTLIGHT',
    footer: 'WeUnite · weunite.pl · You can reply directly to this email',
    unsubscribe: 'Unsubscribe',
    unsubscribeSubject: 'Unsubscribe',
  },
} as const

export function LeadConfirmation({ name, locale = 'pl' }: LeadConfirmationProps) {
  const t = COPY[locale]

  return (
    <Html lang={locale}>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={{ backgroundColor: C.base, margin: '0', padding: '32px 16px', fontFamily: FONT }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto' }}>
          {/* Top accent bar — sits above the card, matching top corners */}
          <Section
            style={{
              background: `linear-gradient(90deg, ${C.accent}, ${C.accentWarm})`,
              height: '4px',
              borderRadius: '4px 4px 0 0',
              lineHeight: '4px',
              fontSize: '4px',
            }}
          >
            {' '}
          </Section>

          {/* Main card */}
          <Section style={{ backgroundColor: C.surface, borderRadius: '0 0 16px 16px', padding: '40px 32px' }}>
            {/* Logo */}
            <Text style={{ fontFamily: FONT, fontWeight: 700, fontSize: '20px', color: C.text, margin: '0 0 24px 0', letterSpacing: '-0.03em' }}>
              WeUnite
            </Text>

            <Hr style={{ borderColor: C.border, margin: '0 0 32px 0' }} />

            <Heading
              as="h1"
              style={{ fontFamily: FONT, fontWeight: 700, fontSize: '28px', color: C.text, margin: '0 0 20px 0', lineHeight: '1.2' }}
            >
              {t.greeting(name)}
            </Heading>

            <Text style={{ fontFamily: FONT, fontSize: '16px', color: C.text, lineHeight: '1.6', margin: '0 0 32px 0' }}>
              {t.intro}
            </Text>

            {/* "What's next?" card */}
            <Section
              style={{
                backgroundColor: C.base,
                border: `1px solid ${C.border}`,
                borderRadius: '12px',
                padding: '20px 24px',
                marginBottom: '32px',
              }}
            >
              <Text style={{ fontFamily: FONT, fontWeight: 700, fontSize: '16px', color: C.text, margin: '0 0 16px 0' }}>
                {t.nextStepsHeading}
              </Text>
              <Text style={{ fontFamily: FONT, fontSize: '15px', color: C.text, lineHeight: '1.6', margin: '0 0 12px 0' }}>
                <strong>{t.step1Title}</strong>
                {t.step1Body}
              </Text>
              <Text style={{ fontFamily: FONT, fontSize: '15px', color: C.text, lineHeight: '1.6', margin: '0 0 12px 0' }}>
                <strong>{t.step2Title}</strong>
                {t.step2Body}
              </Text>
              <Text style={{ fontFamily: FONT, fontSize: '15px', color: C.text, lineHeight: '1.6', margin: '0' }}>
                <strong>{t.step3Title}</strong>
                {t.step3Body}
              </Text>
            </Section>

            {/* Soft CTA — outlined pill */}
            <Section style={{ textAlign: 'center', marginBottom: '40px' }}>
              <Button
                href="mailto:kontakt@weunite.pl"
                style={{
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: '15px',
                  color: C.accent,
                  backgroundColor: 'transparent',
                  border: `2px solid ${C.accent}`,
                  borderRadius: '9999px',
                  padding: '14px 28px',
                  textDecoration: 'none',
                }}
              >
                {t.cta}
              </Button>
            </Section>

            <Hr style={{ borderColor: C.border, margin: '0 0 24px 0' }} />

            {/* Signature */}
            <Text style={{ fontFamily: FONT, fontSize: '15px', color: C.text, lineHeight: '1.6', margin: '0 0 32px 0' }}>
              {t.signatureLine}
              <br />
              <strong>{t.signatureBrand}</strong>
            </Text>

            {/* Footer */}
            <Text style={{ fontFamily: FONT, fontSize: '13px', color: C.muted, lineHeight: '1.5', margin: '0' }}>
              {t.footer}
              <br />
              <Link
                href={`mailto:kontakt@weunite.pl?subject=${t.unsubscribeSubject}`}
                style={{ color: C.muted }}
              >
                {t.unsubscribe}
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export async function renderLeadConfirmation(props: LeadConfirmationProps): Promise<string> {
  return render(<LeadConfirmation {...props} />)
}
