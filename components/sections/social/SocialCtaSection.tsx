"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export default function SocialCtaSection() {
  const t = useTranslations("social.cta")
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      className="pb-24 md:pb-32 px-6 flex flex-col items-center text-center"
      aria-labelledby="social-cta-heading"
    >
      <motion.div
        className="max-w-2xl flex flex-col items-center gap-5"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2
          id="social-cta-heading"
          className="font-sans font-extrabold text-4xl md:text-5xl tracking-tight text-foreground"
        >
          {t("heading")}
        </h2>
        <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
          {t("body")}
        </p>
        <Link
          href="/#contact"
          className="mt-2 inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-8 py-4 text-base font-medium hover:bg-accent transition-all duration-200 font-body"
        >
          {t("cta")}
          <ArrowRight className="h-5 w-5" />
        </Link>
      </motion.div>
    </section>
  )
}
