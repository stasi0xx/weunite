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

export interface BookingConfirmationProps {
  name: string
  /** Formatted Polish date, e.g. "wtorek, 15 maja 2025" */
  date: string
  /** HH:MM, e.g. "11:00" */
  time: string
  /** Google Meet link — optional until generated */
  meetingLink?: string
  /** Google Calendar deeplink pre-filled with event details */
  calendarLink: string
}

function computeEndTime(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const total = h * 60 + m + 30
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function BookingConfirmation({
  name,
  date,
  time,
  meetingLink,
  calendarLink,
}: BookingConfirmationProps) {
  const timeEnd = computeEndTime(time)

  return (
    <Html lang="pl">
      <Head />
      <Preview>Wszystkie szczegóły spotkania + link do rozmowy.</Preview>
      <Body style={{ backgroundColor: C.base, margin: '0', padding: '32px 16px', fontFamily: FONT }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto' }}>
          {/* Top accent bar */}
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
              Jesteś w kalendarzu, {name}!
            </Heading>

            <Text style={{ fontFamily: FONT, fontSize: '16px', color: C.text, lineHeight: '1.6', margin: '0 0 32px 0' }}>
              Rozmowa zarezerwowana. Teraz Twoja strona z systemem rezerwacji jest
              o jeden krok bliżej. Poniżej znajdziesz wszystkie szczegóły.
            </Text>

            {/* Meeting details card */}
            <Section
              style={{
                backgroundColor: C.base,
                border: `1px solid ${C.border}`,
                borderRadius: '12px',
                padding: '20px 24px',
                marginBottom: '32px',
              }}
            >
              <Text style={{ fontFamily: FONT, fontSize: '15px', color: C.text, lineHeight: '2', margin: '0' }}>
                📅&nbsp; <strong>{capitalize(date)}</strong>
                <br />
                🕐&nbsp; <strong>{time} – {timeEnd}</strong>
                <br />
                💻&nbsp; Google Meet
                {meetingLink ? (
                  <>
                    <br />
                    🔗&nbsp;{' '}
                    <Link href={meetingLink} style={{ color: C.accent, fontWeight: 700 }}>
                      Dołącz do spotkania →
                    </Link>
                  </>
                ) : null}
              </Text>
            </Section>

            {/* Primary CTA — filled pill */}
            <Section style={{ textAlign: 'center', marginBottom: '40px' }}>
              <Button
                href={calendarLink}
                style={{
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: '15px',
                  color: '#ffffff',
                  backgroundColor: C.accent,
                  borderRadius: '9999px',
                  padding: '14px 28px',
                  textDecoration: 'none',
                }}
              >
                Dodaj do kalendarza
              </Button>
            </Section>

            {/* Agenda */}
            <Text style={{ fontFamily: FONT, fontWeight: 700, fontSize: '16px', color: C.text, margin: '0 0 12px 0' }}>
              Na rozmowie omówimy:
            </Text>
            <Text style={{ fontFamily: FONT, fontSize: '15px', color: C.text, lineHeight: '1.6', margin: '0 0 8px 0' }}>
              · Wizualizację Twojej strony, którą dla Ciebie przygotujemy
            </Text>
            <Text style={{ fontFamily: FONT, fontSize: '15px', color: C.text, lineHeight: '1.6', margin: '0 0 8px 0' }}>
              · Plan wdrożenia systemu rezerwacji i płatności
            </Text>
            <Text style={{ fontFamily: FONT, fontSize: '15px', color: C.text, lineHeight: '1.6', margin: '0 0 32px 0' }}>
              · Konkretne liczby — ile czasu i pieniędzy możesz zaoszczędzić
            </Text>

            {/* Co przygotować? */}
            <Text style={{ fontFamily: FONT, fontWeight: 700, fontSize: '16px', color: C.text, margin: '0 0 12px 0' }}>
              Co przygotować?
            </Text>
            <Text style={{ fontFamily: FONT, fontSize: '15px', color: C.text, lineHeight: '1.6', margin: '0 0 32px 0' }}>
              Nic specjalnego. Jeśli masz już nazwę swojego obiektu i kilka zdjęć —
              świetnie, możemy od razu coś pokazać. Ale nie jest to konieczne.
            </Text>

            <Hr style={{ borderColor: C.border, margin: '0 0 24px 0' }} />

            {/* Reminder notice */}
            <Text style={{ fontFamily: FONT, fontSize: '14px', color: C.muted, lineHeight: '1.5', margin: '0 0 24px 0' }}>
              Wyślemy Ci przypomnienie 24h i 1h przed rozmową.
            </Text>

            {/* Signature */}
            <Text style={{ fontFamily: FONT, fontSize: '15px', color: C.text, lineHeight: '1.6', margin: '0 0 32px 0' }}>
              Jan i Stanisław
              <br />
              <strong>WeUnite — Twój SPOTLIGHT</strong>
            </Text>

            {/* Footer */}
            <Text style={{ fontFamily: FONT, fontSize: '13px', color: C.muted, lineHeight: '1.5', margin: '0' }}>
              WeUnite · weunite.pl
              <br />
              <Link
                href="mailto:kontakt@weunite.pl?subject=Zmiana+terminu"
                style={{ color: C.muted }}
              >
                Zmień lub odwołaj termin
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export async function renderBookingConfirmation(props: BookingConfirmationProps): Promise<string> {
  return render(<BookingConfirmation {...props} />)
}
