"use client"

import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

interface TimeSlotPanelProps {
  selectedDate: string | null
  slots: string[]
  selectedTime: string | null
  onSelectTime: (time: string) => void
}

function formatDateHeader(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })
}

export default function TimeSlotPanel({
  selectedDate,
  slots,
  selectedTime,
  onSelectTime,
}: TimeSlotPanelProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <AnimatePresence mode="wait">
      {selectedDate && (
        <motion.div
          key={selectedDate}
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: shouldReduceMotion ? 0 : 40 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full"
        >
          <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-3">
            Dostępne godziny
          </p>
          <p className="font-sans font-bold text-lg text-foreground mb-4 capitalize">
            {formatDateHeader(selectedDate)}
          </p>
          <div className="flex flex-wrap gap-2">
            {slots.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => onSelectTime(time)}
                className={[
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
                  selectedTime === time
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-foreground hover:border-primary hover:text-primary",
                ].join(" ")}
              >
                {time}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
