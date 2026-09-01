"use client"

import { motion, useReducedMotion } from "framer-motion"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

type Project = {
  label: string
  title: string
  description: string
  href: string
  image: string
  alt: string
}

const projectConfig = [
  { id: "nowyRelaks" as const, href: "https://www.nowyrelaks.fi-invest.pl/", image: "/casestudy/nowyrelaks-after.jpg" },
  { id: "gdyniaPadelClub" as const, href: "https://www.gdyniapadelclub.pl/", image: "/casestudy/gdyniapadelclub.jpg" },
]

function useProjects(): Project[] {
  const t = useTranslations("websites.caseStudies")
  return projectConfig.map(({ id, href, image }) => ({
    href,
    image,
    label: t(`${id}.label`),
    title: t(`${id}.title`),
    description: t(`${id}.description`),
    alt: t(`${id}.alt`),
  }))
}

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

function ProjectRow({ project, delay }: { project: Project; delay: number }) {
  const t = useTranslations("websites.caseStudies")
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-center"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
        aria-label={t("viewAria", { title: project.title })}
      >
        <ProjectMockup
          image={project.image}
          alt={project.alt}
          wrapperClassName="h-[32vh] md:hidden"
        />
        <ProjectMockup
          image={project.image}
          alt={project.alt}
          wrapperClassName="hidden md:block aspect-[16/10]"
        />
      </a>

      <div>
        <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground font-body">
          {project.label}
        </span>
        <h3 className="mt-2 font-sans font-bold text-2xl md:text-3xl text-foreground">
          {project.title}
        </h3>
        <p className="mt-4 font-body text-base text-muted-foreground leading-relaxed">
          {project.description}
        </p>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 w-fit"
        >
          {t("viewLive")}
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-200 ease-out motion-safe:group-hover/link:translate-x-0.5 motion-safe:group-hover/link:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </motion.div>
  )
}

export default function WebsitesCaseStudies() {
  const t = useTranslations("websites.caseStudies")
  const projects = useProjects()
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="projekty" className="py-24 md:py-32" aria-labelledby="projects-heading">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          id="projects-heading"
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground text-center font-sans max-w-3xl mx-auto"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {t("heading")}
        </motion.h2>

        <motion.p
          className="mt-4 font-body text-base md:text-lg text-muted-foreground text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          {t("subheading")}
        </motion.p>

        <div className="mt-16 flex flex-col gap-20 md:gap-28">
          {projects.map((project, i) => (
            <ProjectRow key={project.href} project={project} delay={0.1 + i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
