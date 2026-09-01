"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useTranslations } from "next-intl"

export default function CaseStudiesIntro() {
  const t = useTranslations("caseStudies.intro")
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative pt-14 pb-16 md:pt-20 md:pb-20" aria-label={t("sectionAria")}>
      <div
        className="hero-blob absolute top-0 right-0 opacity-30 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-5">
        <motion.p
          className="text-xs font-semibold tracking-widest uppercase text-muted-foreground font-body"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h1
          className="font-sans font-extrabold tracking-tight text-4xl md:text-5xl lg:text-6xl text-foreground"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          {t("heading")}
        </motion.h1>

        <motion.p
          className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          {t("body")}
        </motion.p>
      </div>
    </section>
  )
}
