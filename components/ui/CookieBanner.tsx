"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import posthog from "posthog-js"
import Link from "next/link"

type Consent = "all" | "necessary"

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("cookie_consent")
    if (!saved) setVisible(true)
  }, [])

  const save = (value: Consent) => {
    localStorage.setItem("cookie_consent", value)
    if (value === "all") {
      posthog.opt_in_capturing()
    } else {
      posthog.opt_out_capturing()
    }
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
              Ta strona używa cookies
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Używamy plików cookies do analizy ruchu (PostHog) i poprawy jakości Serwisu.
              Możesz zaakceptować wszystkie lub wybrać tylko niezbędne.{" "}
              <Link
                href="/polityka-cookies"
                className="underline underline-offset-4 text-foreground"
              >
                Dowiedz się więcej
              </Link>
              .
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => save("all")}
                className="flex-1 rounded-full bg-primary text-white text-xs font-medium py-2.5 px-4 transition-opacity duration-150 hover:opacity-90 cursor-pointer"
              >
                Akceptuj wszystkie
              </button>
              <button
                onClick={() => save("necessary")}
                className="flex-1 rounded-full border border-border text-foreground text-xs font-medium py-2.5 px-4 transition-colors duration-150 hover:bg-muted cursor-pointer"
              >
                Tylko niezbędne
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
