"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useTranslations } from "next-intl"

// Real monthly capacity of a two-person agency, not a live counter.
// Update MONTHLY_TAKEN by hand as the month's free visualizations get claimed.
const MONTHLY_CAP = 20
const MONTHLY_TAKEN = 13

export default function MonthlyCapProgress() {
  const t = useTranslations("visualization.monthlyCap")
  const prefersReducedMotion = useReducedMotion()
  const remaining = Math.max(MONTHLY_CAP - MONTHLY_TAKEN, 0)
  const percent = Math.min((MONTHLY_TAKEN / MONTHLY_CAP) * 100, 100)

  return (
    <div className="w-full max-w-md">
      <div className="flex items-baseline justify-between mb-2.5 gap-4">
        <p className="font-body text-sm text-muted-foreground">
          {t("label")}
        </p>
        <p className="font-sans font-bold text-sm text-foreground shrink-0">
          {MONTHLY_TAKEN}<span className="text-muted-foreground font-normal"> / {MONTHLY_CAP}</span>
        </p>
      </div>

      <div
        role="progressbar"
        aria-valuenow={MONTHLY_TAKEN}
        aria-valuemin={0}
        aria-valuemax={MONTHLY_CAP}
        aria-valuetext={t("valueText", { taken: MONTHLY_TAKEN, cap: MONTHLY_CAP })}
        className="h-2.5 w-full rounded-full bg-card overflow-hidden"
      >
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: prefersReducedMotion ? `${percent}%` : "0%" }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: [0.25, 1, 0.5, 1] }}
        />
      </div>

      <p className="font-body text-sm text-muted-foreground mt-2.5">
        {remaining > 0
          ? t.rich("remaining", {
              count: remaining,
              b: (chunks) => <span className="text-primary font-semibold">{chunks}</span>,
            })
          : t("full")}
      </p>
    </div>
  )
}
