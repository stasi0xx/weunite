"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { useTranslations } from "next-intl"

export default function WebsitesHero() {
  const t = useTranslations("websites.hero")
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
        className="hero-blob absolute top-0 right-0 opacity-30 blur-3xl pointer-events-none"
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

        <motion.div
          className="w-full max-w-lg mx-auto mt-10"
          initial="hidden"
          animate="visible"
          variants={makeVariants(30, 0.25)}
        >
          <div className="relative rounded-2xl bg-foreground p-2.5 md:p-3 shadow-2xl">
            <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-background flex flex-col">
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="w-2 h-2 rounded-full bg-border" />
                ))}
              </div>

              {/* Wireframe content */}
              <div className="flex-1 p-5 md:p-6 flex flex-col gap-4" aria-hidden="true">
                <div className="h-2.5 w-1/3 rounded-full bg-border" />
                <div className="flex-1 rounded-xl bg-card flex flex-col justify-center gap-2.5 px-5 py-6">
                  <div className="h-3 w-2/3 rounded-full bg-border" />
                  <div className="h-3 w-1/2 rounded-full bg-border" />
                  <div className="h-7 w-28 rounded-full bg-primary mt-2" />
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="h-8 rounded-lg bg-card" />
                  ))}
                </div>
              </div>

              {/* Chatbot bubble */}
              <motion.div
                className="absolute bottom-3 right-3 md:bottom-4 md:right-4 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary shadow-lg"
                initial={{ scale: prefersReducedMotion ? 1 : 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.6 }}
                aria-hidden="true"
              >
                <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
