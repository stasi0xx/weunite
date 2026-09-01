import { describe, it, expect } from "vitest"
import { routing } from "./routing"

describe("routing config", () => {
  it("supports exactly Polish and English, in that order", () => {
    expect(routing.locales).toEqual(["pl", "en"])
  })

  it("defaults to Polish, so Polish renders unprefixed", () => {
    expect(routing.defaultLocale).toBe("pl")
  })

  it("uses as-needed prefixing, not always-prefixed", () => {
    // A regression here (e.g. to "always") would put every existing indexed
    // Polish address behind a new /pl/ prefix, which the spec explicitly
    // rules out (AC-2: no redirects on today's paid-ad-traffic pages).
    expect(routing.localePrefix).toBe("as-needed")
  })
})
