// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest"
import { NextRequest } from "next/server"

vi.mock("next/server", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/server")>()
  return {
    ...actual,
    // after() accepts either a callback or an already-invoked promise (the
    // route uses both forms). Runs the callback form immediately instead of
    // deferring past the response; a promise form is already in flight and
    // needs no action (after() requires a real request-scoped Next.js
    // runtime to actually defer, which a unit test doesn't have).
    after: (cbOrPromise: unknown) => {
      if (typeof cbOrPromise === "function") (cbOrPromise as () => unknown)()
    },
  }
})

type QueryResult = { data: unknown; error: { code?: string } | null }

function makeBuilder(result: QueryResult): PromiseLike<QueryResult> & Record<string, unknown> {
  const builder: PromiseLike<QueryResult> & Record<string, unknown> = {
    insert: vi.fn(() => builder),
    update: vi.fn(() => builder),
    select: vi.fn(() => builder),
    eq: vi.fn(() => builder),
    single: vi.fn(() => Promise.resolve(result)),
    then: ((onFulfilled, onRejected) => Promise.resolve(result).then(onFulfilled, onRejected)) satisfies PromiseLike<QueryResult>["then"],
  }
  return builder
}

const fromMock = vi.fn()
const createSignedUrlsMock = vi.fn().mockResolvedValue({ data: [], error: null })
const mockSupabase = {
  from: fromMock,
  storage: { from: vi.fn(() => ({ createSignedUrls: createSignedUrlsMock })) },
}
vi.mock("@/lib/supabase/server", () => ({
  createServerClient: () => mockSupabase,
}))

const internalNotifySendMock = vi.fn().mockResolvedValue({ data: { id: "notify-1" }, error: null })
vi.mock("resend", () => ({
  // A plain function, not an arrow function: `new Resend(...)` needs a
  // real constructor, and returning an object from one overrides `this`.
  Resend: vi.fn().mockImplementation(function () {
    return { emails: { send: internalNotifySendMock } }
  }),
}))

const sendLeadConfirmationMock = vi.fn().mockResolvedValue({ data: { id: "confirm-1" }, error: null })
vi.mock("@/lib/resend", () => ({
  sendLeadConfirmation: sendLeadConfirmationMock,
}))

vi.mock("@/lib/meta/capi", () => ({
  sendMetaLeadEvent: vi.fn().mockResolvedValue(undefined),
}))

const { POST } = await import("./route")

function postRequest(body: unknown, raw?: string) {
  return new NextRequest("http://localhost/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: raw ?? JSON.stringify(body),
  })
}

describe("POST /api/leads", () => {
  beforeEach(() => {
    fromMock.mockReset()
    createSignedUrlsMock.mockClear()
    internalNotifySendMock.mockClear()
    sendLeadConfirmationMock.mockClear()
  })

  it("returns 400 Invalid JSON when the body cannot be parsed", async () => {
    const res = await POST(postRequest(undefined, "{not valid json"))

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: "Invalid JSON" })
  })

  describe("step 1 (draft creation)", () => {
    it("stores the locale the client sent when it's a supported value", async () => {
      fromMock.mockReturnValueOnce(makeBuilder({ data: { id: "lead-en" }, error: null }))

      const res = await POST(postRequest({ step: 1, email: "visitor@example.com", offerType: "website_visualization", locale: "en" }))
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body).toEqual({ success: true, leadId: "lead-en" })
      const builder = fromMock.mock.results[0].value
      expect(builder.insert).toHaveBeenCalledWith(expect.objectContaining({ locale: "en" }))
    })

    it("coerces an invalid locale value to 'pl' instead of rejecting the request", async () => {
      fromMock.mockReturnValueOnce(makeBuilder({ data: { id: "lead-coerced" }, error: null }))

      const res = await POST(postRequest({ step: 1, email: "visitor@example.com", offerType: "website_visualization", locale: "xx" }))

      expect(res.status).toBe(200)
      const builder = fromMock.mock.results[0].value
      expect(builder.insert).toHaveBeenCalledWith(expect.objectContaining({ locale: "pl" }))
    })

    it("defaults to 'pl' when locale is omitted entirely", async () => {
      fromMock.mockReturnValueOnce(makeBuilder({ data: { id: "lead-default" }, error: null }))

      const res = await POST(postRequest({ step: 1, email: "visitor@example.com", offerType: "website_visualization" }))

      expect(res.status).toBe(200)
      const builder = fromMock.mock.results[0].value
      expect(builder.insert).toHaveBeenCalledWith(expect.objectContaining({ locale: "pl" }))
    })

    it("returns 500 when the insert fails for a reason other than a stale schema cache", async () => {
      fromMock.mockReturnValueOnce(makeBuilder({ data: null, error: { code: "23505" } }))

      const res = await POST(postRequest({ step: 1, email: "visitor@example.com", offerType: "website_visualization", locale: "pl" }))

      expect(res.status).toBe(500)
      expect(await res.json()).toEqual({ error: "Database error" })
    })

    it("rejects a malformed email address", async () => {
      const res = await POST(postRequest({ step: 1, email: "not-an-email", offerType: "website_visualization", locale: "pl" }))

      // Falls through to the legacy schema, which also requires the other
      // required fields, so this is the "Invalid input" branch.
      expect(res.status).toBe(400)
      expect(fromMock).not.toHaveBeenCalled()
    })
  })

  describe("legacy single-step fallback (no step discriminator)", () => {
    const validLegacyBody = {
      projectName: "Lakeside Cabins",
      businessType: "Vacation rentals",
      projectDescription: "A new booking site for our cabins.",
      email: "visitor@example.com",
    }

    it("returns 400 Invalid input when a required field is missing", async () => {
      const res = await POST(postRequest({ projectName: "Only a name" }))

      expect(res.status).toBe(400)
      expect(await res.json()).toEqual({ error: "Invalid input" })
      expect(fromMock).not.toHaveBeenCalled()
    })

    it("coerces an invalid locale to 'pl' on both the insert and the confirmation email", async () => {
      fromMock.mockReturnValueOnce(makeBuilder({ data: { id: "legacy-lead-1" }, error: null }))

      const res = await POST(postRequest({ ...validLegacyBody, locale: "de" }))

      expect(res.status).toBe(200)
      const builder = fromMock.mock.results[0].value
      expect(builder.insert).toHaveBeenCalledWith(expect.objectContaining({ locale: "pl" }))
      expect(sendLeadConfirmationMock).toHaveBeenCalledWith("visitor@example.com", expect.any(String), "pl")
    })

    it("passes a valid 'en' locale through to both the insert and the confirmation email", async () => {
      fromMock.mockReturnValueOnce(makeBuilder({ data: { id: "legacy-lead-2" }, error: null }))

      const res = await POST(postRequest({ ...validLegacyBody, locale: "en" }))

      expect(res.status).toBe(200)
      const builder = fromMock.mock.results[0].value
      expect(builder.insert).toHaveBeenCalledWith(expect.objectContaining({ locale: "en" }))
      expect(sendLeadConfirmationMock).toHaveBeenCalledWith("visitor@example.com", expect.any(String), "en")
    })

    it("never sends the internal team notification email in anything but its fixed Polish copy", async () => {
      fromMock.mockReturnValueOnce(makeBuilder({ data: { id: "legacy-lead-3" }, error: null }))

      await POST(postRequest({ ...validLegacyBody, locale: "en" }))

      const [notifyArgs] = internalNotifySendMock.mock.calls[0]
      expect(notifyArgs.to).toBe("ai.say.agency@gmail.com")
      expect(notifyArgs.subject).toContain("Nowy lead")
    })
  })

  describe("step 4 (final submission)", () => {
    it("sends the confirmation email in the lead's stored locale, not a client-supplied one", async () => {
      // First from('leads') call: the step-4 update. Second: the refetch for email sending.
      fromMock
        .mockReturnValueOnce(makeBuilder({ data: null, error: null }))
        .mockReturnValueOnce(
          makeBuilder({
            data: {
              id: "lead-123",
              email: "stored@example.com",
              name: "Stored Name",
              locale: "en",
              offer_type: "website_visualization",
              project_name: "Cabin Co",
              business_type: "Vacation rentals",
              project_description: "desc",
              color_preference: null,
              reference: null,
            },
            error: null,
          })
        )

      const res = await POST(
        postRequest({
          step: 4,
          leadId: "11111111-1111-4111-8111-111111111111",
          colorPreference: "",
          reference: "",
          attachments: [],
        })
      )

      expect(res.status).toBe(200)
      expect(sendLeadConfirmationMock).toHaveBeenCalledWith("stored@example.com", "Stored Name", "en")
    })

    it("falls back to Polish when the stored lead has no recognizable locale", async () => {
      fromMock
        .mockReturnValueOnce(makeBuilder({ data: null, error: null }))
        .mockReturnValueOnce(
          makeBuilder({
            data: {
              id: "lead-456",
              email: "legacy-row@example.com",
              name: "",
              locale: null,
              offer_type: "website_visualization",
              project_name: "",
              business_type: "",
              project_description: "",
              color_preference: null,
              reference: null,
            },
            error: null,
          })
        )

      await POST(
        postRequest({
          step: 4,
          leadId: "22222222-2222-4222-8222-222222222222",
          colorPreference: "",
          reference: "",
          attachments: [],
        })
      )

      expect(sendLeadConfirmationMock).toHaveBeenCalledWith("legacy-row@example.com", expect.any(String), "pl")
    })
  })
})
