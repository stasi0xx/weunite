import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { getAvailableSlots } from "@/lib/booking"
import BookingCalendar from "@/components/booking/BookingCalendar"

interface Props {
  searchParams: Promise<{ lead?: string }>
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export default async function BookingPage({ searchParams }: Props) {
  const { lead: leadId } = await searchParams

  if (!leadId || !UUID_RE.test(leadId)) {
    redirect("/")
  }

  const supabase = createServerClient()

  const { data: lead } = await supabase
    .from("leads")
    .select("id, name")
    .eq("id", leadId)
    .maybeSingle()

  if (!lead) {
    redirect("/")
  }

  const { data: existingBooking } = await supabase
    .from("bookings")
    .select("date, time_slot")
    .eq("lead_id", leadId)
    .eq("status", "confirmed")
    .maybeSingle()

  const { available, month } = await getAvailableSlots()

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {existingBooking ? (
          <ExistingBooking
            name={lead.name}
            date={existingBooking.date}
            time={existingBooking.time_slot}
          />
        ) : (
          <BookingCalendar leadId={leadId} available={available} month={month} />
        )}
      </div>
    </div>
  )
}

function ExistingBooking({ name, date, time }: { name: string; date: string; time: string }) {
  const [year, month, day] = date.split("-").map(Number)
  const d = new Date(year, month - 1, day)
  const dateLabel = d.toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  const timeLabel = (time as string).slice(0, 5)

  return (
    <div className="text-center py-12">
      <h1 className="font-sans font-extrabold tracking-tight text-3xl text-foreground mb-4">
        Masz już zarezerwowany termin, {name}!
      </h1>
      <p className="text-muted-foreground mb-2">Twoja rozmowa strategiczna:</p>
      <p className="text-foreground font-medium text-lg capitalize">
        {dateLabel}, godz. {timeLabel}
      </p>
      <a
        href="/"
        className="inline-block mt-8 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-accent transition-colors duration-200"
      >
        Wróć do strony głównej
      </a>
    </div>
  )
}
