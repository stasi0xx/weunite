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

export interface LeadConfirmationProps {
  name: string
}

export function LeadConfirmation({ name }: LeadConfirmationProps) {
  return (
    <Html lang="pl">
      <Head />
      <Preview>Twoje zgłoszenie dotarło — sprawdź, co dalej.</Preview>
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
              Hej {name}, dobrze że jesteś!
            </Heading>

            <Text style={{ fontFamily: FONT, fontSize: '16px', color: C.text, lineHeight: '1.6', margin: '0 0 32px 0' }}>
              Zgłoszenie trafiło do nas i już je mamy. Cieszmy się — to naprawdę dobry
              krok. Firmy, które decydują się na profesjonalną stronę internetową,
              przestają tracić klientów na rzecz konkurencji i pośredników, którzy
              biorą prowizję od każdej transakcji.
            </Text>

            {/* "Co dalej?" card */}
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
                Co dalej?
              </Text>
              <Text style={{ fontFamily: FONT, fontSize: '15px', color: C.text, lineHeight: '1.6', margin: '0 0 12px 0' }}>
                <strong>1. Analizujemy Twoje zgłoszenie</strong> — sprawdzamy szczegóły projektu i przygotowujemy wstępny plan działania.
              </Text>
              <Text style={{ fontFamily: FONT, fontSize: '15px', color: C.text, lineHeight: '1.6', margin: '0 0 12px 0' }}>
                <strong>2. Odzywamy się do Ciebie</strong> — napiszemy lub zadzwonimy w ciągu 24h. Zero presji, zero zobowiązań.
              </Text>
              <Text style={{ fontFamily: FONT, fontSize: '15px', color: C.text, lineHeight: '1.6', margin: '0' }}>
                <strong>3. Przygotowujemy wizualizację</strong> — w ciągu 72h wyślemy Ci wstępny projekt Twojej strony, a Ty możesz zdecydować czy w ten sposób chcesz pracować.
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
                Masz pytanie? Napisz do nas →
              </Button>
            </Section>

            <Hr style={{ borderColor: C.border, margin: '0 0 24px 0' }} />

            {/* Signature */}
            <Text style={{ fontFamily: FONT, fontSize: '15px', color: C.text, lineHeight: '1.6', margin: '0 0 32px 0' }}>
              Jan i Stanisław
              <br />
              <strong>WeUnite — Twój SPOTLIGHT</strong>
            </Text>

            {/* Footer */}
            <Text style={{ fontFamily: FONT, fontSize: '13px', color: C.muted, lineHeight: '1.5', margin: '0' }}>
              WeUnite · weunite.pl · Możesz odpowiedzieć bezpośrednio na tego maila
              <br />
              <Link
                href="mailto:kontakt@weunite.pl?subject=Rezygnacja+z+komunikacji"
                style={{ color: C.muted }}
              >
                Zrezygnuj z komunikacji
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
