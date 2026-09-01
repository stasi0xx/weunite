"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Compass, Code2, Zap, ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

const stepConfig = [
  { id: "audit" as const, number: "01", icon: Compass },
  { id: "design" as const, number: "02", icon: Code2 },
  { id: "automation" as const, number: "03", icon: Zap },
]

function StepCard({
  step,
  delay,
}: {
  step: (typeof stepConfig)[number] & { title: string; description: string }
  delay: number
}) {
  const prefersReducedMotion = useReducedMotion()
  const Icon = step.icon

  return (
    <motion.div
      className="rounded-2xl bg-card p-8 flex flex-col gap-4"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-background">
          <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
        </div>
        <span className="font-sans font-extrabold text-3xl tracking-tight text-primary/30">
          {step.number}
        </span>
      </div>
      <h3 className="font-sans font-bold text-xl text-foreground">{step.title}</h3>
      <p className="font-body text-base text-muted-foreground leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  )
}

export default function WebsitesProcessSection() {
  const t = useTranslations("websites.process")
  const prefersReducedMotion = useReducedMotion()
  const steps = stepConfig.map((step) => ({
    ...step,
    title: t(`steps.${step.id}.title`),
    description: t(`steps.${step.id}.description`),
  }))

  return (
    <section id="proces" className="py-24 md:py-32" aria-labelledby="process-heading">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          id="process-heading"
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground text-center font-sans max-w-3xl mx-auto"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {t("heading")}
        </motion.h2>

        <motion.p
          className="mt-4 font-body text-base md:text-lg text-muted-foreground text-center"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          {t("subheading")}
        </motion.p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} delay={0.15 + i * 0.1} />
          ))}
        </div>

        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.45 }}
        >
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-8 py-4 text-base font-medium hover:bg-accent transition-all duration-200 font-body"
          >
            {t("cta")}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
