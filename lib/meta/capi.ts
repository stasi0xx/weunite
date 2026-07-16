import { createHash } from "crypto"

const GRAPH_VERSION = "v21.0"

export interface MetaEventContext {
  /** Must match the `eventID` passed to the browser pixel for the same action. */
  eventId: string
  eventSourceUrl?: string | null
  /** `_fbp` / `_fbc` cookies — the strongest match signals Meta has. */
  fbp?: string | null
  fbc?: string | null
  clientIp?: string | null
  userAgent?: string | null
}

export interface MetaLeadInput extends MetaEventContext {
  email: string
  name: string
  customData?: Record<string, unknown>
}

interface MetaUserData {
  em?: string[]
  fn?: string[]
  ln?: string[]
  fbp?: string
  fbc?: string
  client_ip_address?: string
  client_user_agent?: string
}

/** Meta requires PII normalised (trimmed, lowercased) before SHA-256. */
function hashPii(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex")
}

function splitName(name: string): { first?: string; last?: string } {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return {}
  if (parts.length === 1) return { first: parts[0] }
  return { first: parts[0], last: parts[parts.length - 1] }
}

function buildUserData(input: MetaLeadInput): MetaUserData {
  const { first, last } = splitName(input.name)
  const userData: MetaUserData = { em: [hashPii(input.email)] }

  if (first) userData.fn = [hashPii(first)]
  if (last) userData.ln = [hashPii(last)]
  if (input.fbp) userData.fbp = input.fbp
  if (input.fbc) userData.fbc = input.fbc
  if (input.clientIp) userData.client_ip_address = input.clientIp
  if (input.userAgent) userData.client_user_agent = input.userAgent

  return userData
}

/**
 * Reports a Lead conversion to Meta server-side, so it survives ad blockers,
 * iOS tracking prevention and a blocked fbevents.js. Deduplicated against the
 * browser pixel via `eventId`.
 *
 * Never throws — a failed analytics call must not fail a lead submission.
 * No-ops when META_PIXEL_ID / META_CAPI_ACCESS_TOKEN are unset.
 */
export async function sendMetaLeadEvent(input: MetaLeadInput): Promise<void> {
  const pixelId = process.env.META_PIXEL_ID ?? process.env.NEXT_PUBLIC_META_PIXEL_ID
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN
  if (!pixelId || !accessToken) return

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: "website",
        ...(input.eventSourceUrl ? { event_source_url: input.eventSourceUrl } : {}),
        user_data: buildUserData(input),
        ...(input.customData ? { custom_data: input.customData } : {}),
      },
    ],
    access_token: accessToken,
    ...(process.env.META_TEST_EVENT_CODE
      ? { test_event_code: process.env.META_TEST_EVENT_CODE }
      : {}),
  }

  try {
    const response = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      console.error("Meta CAPI error:", response.status, await response.text())
    }
  } catch (error) {
    console.error("Meta CAPI request failed:", error)
  }
}
