"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { CaseStudyBreadcrumb } from "./CaseStudyBreadcrumb"
import CaseStudiesCta from "./CaseStudiesCta"
import { toProjectMessageKey, type CaseStudyProject } from "./data"

export default function CaseStudyDetail({ project }: { project: CaseStudyProject }) {
  const t = useTranslations("caseStudies")
  const key = toProjectMessageKey(project.slug)
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      <CaseStudyBreadcrumb />

      <section className="pt-8 pb-16 md:pb-24" aria-labelledby="case-study-detail-heading">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.span
            className="text-xs font-semibold tracking-widest uppercase text-muted-foreground font-body"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {t(`projects.${key}.label`)}
          </motion.span>

          <motion.h1
            id="case-study-detail-heading"
            className="mt-3 font-sans font-extrabold tracking-tight text-4xl md:text-5xl lg:text-6xl text-foreground"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            {t(`projects.${key}.title`)}
          </motion.h1>
        </div>

        <motion.div
          className="mt-12 max-w-5xl mx-auto px-6"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="rounded-2xl bg-foreground p-2.5 md:p-3 shadow-2xl">
            <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-background">
              <Image
                src={project.image}
                alt={t(`projects.${key}.imageAlt`)}
                fill
                className="object-cover"
                style={{ objectPosition: "top" }}
                sizes="(max-width: 768px) 100vw, 1024px"
                priority
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 max-w-2xl mx-auto px-6 text-center"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
            {t(`projects.${key}.description`)}
          </p>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
            >
              {t("detail.viewLive")}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          )}
        </motion.div>
      </section>

      <CaseStudiesCta />
    </>
  )
}
