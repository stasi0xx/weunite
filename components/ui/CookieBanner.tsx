"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { readConsent, writeConsent, type ConsentValue } from "@/lib/consent"

export default function CookieBanner() {
  const t = useTranslations("common.cookieBanner")
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!readConsent()) setVisible(true)
  }, [])

  // PostHog and the Meta Pixel both subscribe to this via `onConsentChange`.
  const save = (value: ConsentValue) => {
    writeConsent(value)
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:bottom-6 md:left-auto md:right-6 md:max-w-sm"
        >
          <div className="bg-card border border-border rounded-2xl p-5 shadow-xl shadow-foreground/5">
            <p className="font-sans font-bold text-sm text-foreground mb-1">
              {t("title")}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              {t("body")}{" "}
              <Link
                href="/polityka-cookies"
                className="underline underline-offset-4 text-foreground"
              >
                {t("learnMore")}
              </Link>
              .
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => save("all")}
                className="flex-1 rounded-full bg-primary text-white text-xs font-medium py-2.5 px-4 transition-opacity duration-150 hover:opacity-90 cursor-pointer"
              >
                {t("acceptAll")}
              </button>
              <button
                onClick={() => save("necessary")}
                className="flex-1 rounded-full border border-border text-foreground text-xs font-medium py-2.5 px-4 transition-colors duration-150 hover:bg-muted cursor-pointer"
              >
                {t("necessaryOnly")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
