export type MetaStandardEvent = "PageView" | "ViewContent" | "Lead" | "Contact"

interface FbqFunction {
  (...args: unknown[]): void
  callMethod?: (...args: unknown[]) => void
  queue: unknown[]
  push: FbqFunction
  loaded: boolean
  version: string
}

declare global {
  interface Window {
    fbq?: FbqFunction
    _fbq?: FbqFunction
  }
}

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const SCRIPT_SRC = "https://connect.facebook.net/en_US/fbevents.js"

/**
 * Loads fbevents.js and fires the initial PageView.
 * Safe to call repeatedly — returns early once the pixel exists on `window`.
 * No-ops when NEXT_PUBLIC_META_PIXEL_ID is unset, so local/preview builds stay silent.
 */
export function initMetaPixel(): void {
  if (typeof window === "undefined" || !PIXEL_ID || window.fbq) return

  const fbq = function (this: unknown, ...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod.apply(fbq, args)
    else fbq.queue.push(args)
  } as FbqFunction

  fbq.queue = []
  fbq.push = fbq
  fbq.loaded = true
  fbq.version = "2.0"

  window.fbq = fbq
  window._fbq ??= fbq

  const script = document.createElement("script")
  script.async = true
  script.src = SCRIPT_SRC
  document.head.appendChild(script)

  fbq("init", PIXEL_ID)
  fbq("track", "PageView")
}

/**
 * `eventId` must match the `event_id` sent to the Conversions API for the same
 * action — that pairing is what stops Meta counting one lead twice.
 */
export function trackMetaEvent(
  name: MetaStandardEvent,
  params?: Record<string, unknown>,
  eventId?: string
): void {
  if (typeof window === "undefined" || !window.fbq) return
  if (eventId) window.fbq("track", name, params ?? {}, { eventID: eventId })
  else window.fbq("track", name, params ?? {})
}

export function newMetaEventId(): string {
  return crypto.randomUUID()
}
