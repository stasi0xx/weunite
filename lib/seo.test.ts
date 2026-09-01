import { describe, it, expect } from "vitest"
import { buildAlternates, BASE_URL } from "./seo"

describe("buildAlternates", () => {
  it("builds a self-referencing canonical for the Polish (default) locale at the root path", () => {
    const result = buildAlternates("/", "pl")

    // next-intl's getPathname keeps the root "/" for the unprefixed default
    // locale; Next's own metadata resolution normalizes the trailing slash
    // away when it renders the actual <link> tag (confirmed via /check
    // verify), so this level asserts the raw, pre-normalization value.
    expect(result.canonical).toBe(`${BASE_URL}/`)
  })

  it("builds a self-referencing canonical for the English locale at the root path", () => {
    const result = buildAlternates("/", "en")

    expect(result.canonical).toBe(`${BASE_URL}/en`)
  })

  it("never points the canonical at the sibling locale's address for a nested path", () => {
    const pl = buildAlternates("/strony-internetowe", "pl")
    const en = buildAlternates("/strony-internetowe", "en")

    expect(pl.canonical).toBe(`${BASE_URL}/strony-internetowe`)
    expect(en.canonical).toBe(`${BASE_URL}/en/strony-internetowe`)
    expect(pl.canonical).not.toBe(en.canonical)
  })

  it("includes both locales and x-default in the languages map", () => {
    const result = buildAlternates("/realizacje", "pl")

    expect(result.languages).toEqual({
      pl: `${BASE_URL}/realizacje`,
      en: `${BASE_URL}/en/realizacje`,
      "x-default": `${BASE_URL}/realizacje`,
    })
  })

  it("keeps the same languages map regardless of which locale is being rendered", () => {
    const pl = buildAlternates("/regulamin", "pl")
    const en = buildAlternates("/regulamin", "en")

    expect(pl.languages).toEqual(en.languages)
  })

  it("x-default always points at the Polish (default locale) address, never English", () => {
    const result = buildAlternates("/polityka-cookies", "en")

    expect(result.languages["x-default"]).toBe(`${BASE_URL}/polityka-cookies`)
  })

  it("handles a nested multi-segment path correctly for both locales", () => {
    const pl = buildAlternates("/realizacje/nowy-relaks", "pl")
    const en = buildAlternates("/realizacje/nowy-relaks", "en")

    expect(pl.canonical).toBe(`${BASE_URL}/realizacje/nowy-relaks`)
    expect(en.canonical).toBe(`${BASE_URL}/en/realizacje/nowy-relaks`)
    expect(pl.languages.en).toBe(en.canonical)
    expect(en.languages.pl).toBe(pl.canonical)
  })
})
