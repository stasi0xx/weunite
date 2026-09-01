"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { caseStudyProjects, toProjectMessageKey, type CaseStudyProject } from "./data"

function ProjectMockup({
  image,
  alt,
  wrapperClassName,
}: {
  image: string
  alt: string
  wrapperClassName?: string
}) {
  return (
    <div className={cn("rounded-2xl bg-foreground p-2.5 md:p-3 shadow-2xl", wrapperClassName)}>
      <div className="relative w-full h-full rounded-lg overflow-hidden bg-background">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] motion-safe:group-hover:scale-105"
          style={{ objectPosition: "top" }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  )
}

function ProjectRow({
  project,
  reversed,
  delay,
}: {
  project: CaseStudyProject
  reversed: boolean
  delay: number
}) {
  const t = useTranslations("caseStudies")
  const key = toProjectMessageKey(project.slug)
  const title = t(`projects.${key}.title`)
  const alt = t(`projects.${key}.imageAlt`)
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      <Link
        href={`/realizacje/${project.slug}`}
        className="group grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center"
        aria-label={t("list.viewAria", { title })}
      >
        <div className={cn(reversed && "md:order-2")}>
          <ProjectMockup
            image={project.image}
            alt={alt}
            wrapperClassName="h-[32vh] md:hidden"
          />
          <ProjectMockup
            image={project.image}
            alt={alt}
            wrapperClassName="hidden md:block aspect-[16/10]"
          />
        </div>

        <div className={cn(reversed && "md:order-1")}>
          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground font-body">
            {t(`projects.${key}.label`)}
          </span>
          <h2 className="mt-2 font-sans font-bold text-2xl md:text-3xl text-foreground">
            {title}
          </h2>
          <p className="mt-4 font-body text-base text-muted-foreground leading-relaxed">
            {t(`projects.${key}.teaser`)}
          </p>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200 w-fit">
            {t("list.viewCaseStudy")}
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export default function CaseStudiesList() {
  const t = useTranslations("caseStudies.list")
  return (
    <section className="pb-24 md:pb-32" aria-label={t("sectionAria")}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col gap-16 md:gap-20">
          {caseStudyProjects.map((project, i) => (
            <div
              key={project.slug}
              className={cn(i > 0 && "border-t border-border pt-16 md:pt-20")}
            >
              <ProjectRow project={project} reversed={i % 2 === 1} delay={0.1 + i * 0.1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
