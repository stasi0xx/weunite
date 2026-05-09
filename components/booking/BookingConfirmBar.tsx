"use client"

import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Loader2 } from "lucide-react"

interface BookingConfirmBarProps {
  selectedDate: string | null
  selectedTime: string | null
  isSubmitting: boolean
  onConfirm: () => void
}

function formatSummary(date: string, time: string): string {
  const [year, month, day] = date.split("-").map(Number)
  const d = new Date(year, month - 1, day)
  const dateStr = d.toLocaleDateString("pl-PL", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })
  return `${dateStr}, ${time}`
}

export default function BookingConfirmBar({
  selectedDate,
  selectedTime,
  isSubmitting,
  onConfirm,
}: BookingConfirmBarProps) {
  const shouldReduceMotion = useReducedMotion()
  const isReady = !!selectedDate && !!selectedTime

  return (
    <AnimatePresence>
      {isReady && (
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 60 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm px-6 py-4"
        >
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-foreground capitalize">
              {formatSummary(selectedDate!, selectedTime!)}
            </p>
            <button
              type="button"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              onClick={onConfirm}
              className="rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium transition-all duration-200 hover:bg-accent disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Rezerwuję...
                </>
              ) : (
                "Potwierdź rezerwację"
              )}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
