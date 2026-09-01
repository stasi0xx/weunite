import { describe, it, expect } from "vitest"
import middleware, { config } from "./proxy"

describe("proxy config.matcher", () => {
  const [matcherSource] = config.matcher

  it("is a single matcher pattern", () => {
    expect(config.matcher).toHaveLength(1)
  })

  it.each([
    "api",
    "booking",
    "_next",
    "ingest",
    "opengraph-image",
    "favicon\\.ico",
    "icon\\.png",
    "apple-icon\\.png",
    "sitemap\\.xml",
    "robots\\.txt",
  ])("keeps the %s exclusion in the matcher source (spec key invariant: a missing exclusion silently breaks the feature it protects)", (exclusion) => {
    expect(matcherSource).toContain(exclusion)
  })

  it("excludes any path with a file extension via the generic dot pattern", () => {
    expect(matcherSource).toContain(".*\\..*")
  })
})

describe("proxy middleware export", () => {
  it("exports a callable middleware function", () => {
    expect(typeof middleware).toBe("function")
  })
})
