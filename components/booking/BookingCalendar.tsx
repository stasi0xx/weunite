"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"
import { toast } from "sonner"
import CalendarDay from "@/components/booking/CalendarDay"
import TimeSlotPanel from "@/components/booking/TimeSlotPanel"
import BookingConfirmBar from "@/components/booking/BookingConfirmBar"

interface BookingCalendarProps {
  leadId: string
  available: Record<string, string[]>
  month: string
}

const DOW_LABELS = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"]

export default function BookingCalendar({ leadId, available, month }: BookingCalendarProps) {
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [year, monthNum] = month.split("-").map(Number)
  const firstDay = new Date(year, monthNum - 1, 1)
  const lastDay = new Date(year, monthNum, 0).getDate()

  const now = new Date()
  const todayStr = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-")

  // European week: Mon=0 … Sun=6
  const startOffset = (firstDay.getDay() + 6) % 7
  const mm = String(monthNum).padStart(2, "0")

  const days = [
    ...Array.from({ length: startOffset }, () => ({ day: null as number | null, date: null as string | null })),
    ...Array.from({ length: lastDay }, (_, i) => {
      const d = i + 1
      return { day: d, date: `${year}-${mm}-${String(d).padStart(2, "0")}` }
    }),
  ]

  const monthLabel = new Date(year, monthNum - 1, 1).toLocaleDateString("pl-PL", {
    month: "long",
    year: "numeric",
  })

  const slots = selectedDate ? (available[selectedDate] ?? []) : []

  function handleSelectDate(date: string) {
    setSelectedDate(date)
    setSelectedTime(null)
  }

  async function handleConfirm() {
    if (!selectedDate || !selectedTime) return
    setIsSubmitting(true)

    let idempotencyKey = sessionStorage.getItem("booking_idem_key")
    if (!idempotencyKey) {
      idempotencyKey = crypto.randomUUID()
      sessionStorage.setItem("booking_idem_key", idempotencyKey)
    }

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: leadId,
          date: selectedDate,
          time_slot: selectedTime,
          idempotency_key: idempotencyKey,
        }),
      })

      if (res.status === 409) {
        toast.error("Ten termin zajął właśnie ktoś inny. Wybierz inny termin.")
        setSelectedDate(null)
        setSelectedTime(null)
        return
      }

      if (!res.ok) {
        toast.error("Coś poszło nie tak. Spróbuj jeszcze raz.")
        return
      }

      sessionStorage.removeItem("booking_idem_key")
      router.push("/booking/confirmed")
    } catch {
      toast.error("Coś poszło nie tak. Spróbuj jeszcze raz.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const hasAnySlots = Object.keys(available).length > 0

  return (
    <div className="pb-28">
      <motion.p
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2"
      >
        WYBIERZ TERMIN
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="font-sans font-extrabold tracking-tight text-3xl md:text-4xl text-foreground mb-8 capitalize"
      >
        {monthLabel}
      </motion.h1>

      {!hasAnySlots ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground text-sm"
        >
          Brak wolnych terminów w tym miesiącu.{" "}
          <a href="/#contact" className="text-primary underline underline-offset-2">
            Napisz do nas.
          </a>
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,280px] gap-10 items-start">
          {/* Calendar grid */}
          <div>
            <div className="grid grid-cols-7 gap-1 mb-1">
              {DOW_LABELS.map((label) => (
                <div
                  key={label}
                  className="text-center text-xs font-medium text-muted-foreground py-2"
                >
                  {label}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((d, i) => (
                <motion.div
                  key={d.date ?? `empty-${i}`}
                  initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: shouldReduceMotion ? 0 : i * 0.012 }}
                >
                  <CalendarDay
                    day={d.day}
                    date={d.date}
                    isToday={d.date === todayStr}
                    isAvailable={!!d.date && !!available[d.date]}
                    isPast={!!d.date && d.date < todayStr}
                    isSelected={d.date === selectedDate}
                    onSelect={handleSelectDate}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Time slot panel */}
          <TimeSlotPanel
            selectedDate={selectedDate}
            slots={slots}
            selectedTime={selectedTime}
            onSelectTime={setSelectedTime}
          />
        </div>
      )}

      <BookingConfirmBar
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        isSubmitting={isSubmitting}
        onConfirm={handleConfirm}
      />
    </div>
  )
}
