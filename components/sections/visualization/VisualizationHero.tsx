"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import { usePostHog } from "posthog-js/react"
import { CtaButton } from "@/components/ui/CtaButton"
import MonthlyCapProgress from "./MonthlyCapProgress"

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

export default function VisualizationHero() {
  const prefersReducedMotion = useReducedMotion()
  const posthog = usePostHog()

  function makeVariants(y: number, delay: number): Variants {
    return {
      hidden: { opacity: 0, y: prefersReducedMotion ? 0 : y },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const, delay },
      },
    }
  }

  return (
    <section
      className="flex flex-col pt-14 pb-10 md:pt-18 md:pb-14"
      aria-label="Sekcja główna"
    >
      <div className="max-w-4xl mx-auto w-full px-6 flex flex-col items-center text-center gap-5">


        <motion.h1
          className="font-sans font-extrabold tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={makeVariants(24, 0.1)}
        >
          Bezpłatna wizualizacja
        </motion.h1>

        <motion.p
          className="font-body text-base md:text-lg text-muted-foreground max-w-xl"
          initial="hidden"
          animate="visible"
          variants={makeVariants(16, 0.2)}
        >
          Opowiedz nam o swojej firmie, a przygotujemy bezpłatny projekt wizualny Twojej nowej, inteligentnej strony internetowej. Bez żadnych zobowiązań i bez kosztów najpierw zobacz efekt, a dopiero potem zdecyduj o współpracy.
        </motion.p>

        <motion.div
          className="w-full flex justify-center pt-6 mt-2 border-t border-border"
          initial="hidden"
          animate="visible"
          variants={makeVariants(12, 0.3)}
        >
          <MonthlyCapProgress />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={makeVariants(12, 0.4)}
        >
          <CtaButton
            label="Odbieram"
            onClick={() => {
              posthog?.capture("cta_clicked", { location: "wizualizacja_hero" })
              scrollTo("contact")
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
