"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import { useTranslations } from "next-intl"

export default function SocialHero() {
  const t = useTranslations("social.hero")
  const prefersReducedMotion = useReducedMotion()

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
      className="relative pt-14 pb-10 md:pt-20 md:pb-16"
      aria-label={t("sectionAria")}
    >
      <div
        className="hero-blob absolute top-0 left-0 opacity-30 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-5">
        <motion.p
          className="text-xs font-semibold tracking-widest uppercase text-muted-foreground font-body"
          initial="hidden"
          animate="visible"
          variants={makeVariants(16, 0)}
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h1
          className="font-sans font-extrabold tracking-tight text-4xl md:text-5xl lg:text-6xl text-foreground max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={makeVariants(24, 0.1)}
        >
          {t("heading")}
        </motion.h1>
      </div>
    </section>
  )
}
