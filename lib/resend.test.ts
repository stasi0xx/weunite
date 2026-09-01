import { describe, it, expect, vi, beforeEach } from "vitest"

const sendMock = vi.fn()
vi.mock("resend", () => ({
  // A plain function, not an arrow function: `new Resend(...)` needs a
  // real constructor, and returning an object from one overrides `this`.
  Resend: vi.fn().mockImplementation(function () {
    return { emails: { send: sendMock } }
  }),
}))

const renderLeadConfirmationMock = vi.fn()
vi.mock("@/emails/LeadConfirmation", () => ({
  renderLeadConfirmation: renderLeadConfirmationMock,
}))

const { sendLeadConfirmation, buildCalendarLink } = await import("./resend")

describe("sendLeadConfirmation", () => {
  beforeEach(() => {
    sendMock.mockReset().mockResolvedValue({ data: { id: "email-1" }, error: null })
    renderLeadConfirmationMock.mockReset().mockResolvedValue("<html>rendered</html>")
  })

  it("defaults to Polish when no locale is given", async () => {
    await sendLeadConfirmation("visitor@example.com", "Jan")

    expect(renderLeadConfirmationMock).toHaveBeenCalledWith({ name: "Jan", locale: "pl" })
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "visitor@example.com",
        subject: expect.stringContaining("Dobrze, że jesteś"),
      })
    )
  })

  it("sends the Polish subject line for locale 'pl'", async () => {
    await sendLeadConfirmation("visitor@example.com", "Jan", "pl")

    const [sentArgs] = sendMock.mock.calls[0]
    expect(sentArgs.subject).toContain("Dobrze, że jesteś")
  })

  it("sends the English subject line for locale 'en'", async () => {
    await sendLeadConfirmation("visitor@example.com", "John", "en")

    expect(renderLeadConfirmationMock).toHaveBeenCalledWith({ name: "John", locale: "en" })
    const [sentArgs] = sendMock.mock.calls[0]
    expect(sentArgs.subject).toContain("Great to have you")
    expect(sentArgs.subject).not.toContain("Dobrze")
  })

  it("uses the rendered HTML from renderLeadConfirmation as the email body", async () => {
    renderLeadConfirmationMock.mockResolvedValue("<html>english body</html>")

    await sendLeadConfirmation("visitor@example.com", "John", "en")

    const [sentArgs] = sendMock.mock.calls[0]
    expect(sentArgs.html).toBe("<html>english body</html>")
  })

  it("always sends from the same verified address regardless of locale", async () => {
    await sendLeadConfirmation("visitor@example.com", "John", "en")

    const [sentArgs] = sendMock.mock.calls[0]
    expect(sentArgs.from).toBe("WeUnite <hello@weunite.pl>")
  })
})

describe("buildCalendarLink", () => {
  it("builds a 30 minute Google Calendar event starting at the given date and time", () => {
    const link = buildCalendarLink("2026-05-15", "14:00")

    expect(link).toContain("https://calendar.google.com/calendar/render?")
    expect(link).toContain("dates=20260515T140000%2F20260515T143000")
  })

  it("URL-encodes the event text and location params", () => {
    const link = buildCalendarLink("2026-01-01", "09:30")

    expect(link).toContain("action=TEMPLATE")
    expect(link).toMatch(/text=.*WeUnite/)
  })
})
