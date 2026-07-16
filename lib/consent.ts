export type ConsentValue = "all" | "necessary"

const STORAGE_KEY = "cookie_consent"
const CONSENT_EVENT = "cookie-consent-change"

export function readConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null
  const saved = window.localStorage.getItem(STORAGE_KEY)
  return saved === "all" || saved === "necessary" ? saved : null
}

export function writeConsent(value: ConsentValue): void {
  window.localStorage.setItem(STORAGE_KEY, value)
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }))
}

export function hasMarketingConsent(): boolean {
  return readConsent() === "all"
}

export function onConsentChange(listener: (value: ConsentValue) => void): () => void {
  const handler = (event: Event) => listener((event as CustomEvent<ConsentValue>).detail)
  window.addEventListener(CONSENT_EVENT, handler)
  return () => window.removeEventListener(CONSENT_EVENT, handler)
}
