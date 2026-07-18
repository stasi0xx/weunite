"use client"

import { motion, useReducedMotion } from "framer-motion"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

type Project = {
  label: string
  title: string
  description: string
  href: string
  image: string
  alt: string
}

const projects: Project[] = [
  {
    label: "Deweloper",
    title: "Nowy Relaks — Filipek Investment",
    description:
      "Domy jednorodzinne pod Białą Podlaską. W miejsce darmowego szablonu z Wixa zbudowaliśmy stronę od podstaw: pełną prezentację lokalizacji i etapów budowy oraz formularz zapytań o dostępność domu.",
    href: "https://www.nowyrelaks.fi-invest.pl/",
    image: "/casestudy/nowyrelaks-after.jpg",
    alt: "Strona inwestycji Nowy Relaks zaprojektowana przez WeUnite",
  },
  {
    label: "Klub sportowy",
    title: "Gdynia Padel Club",
    description:
      "Strona klubu padlowego w Gdyni. Dynamiczna prezentacja kortów i oferty wraz z systemem rezerwacji online, który ułatwia klientom szybkie umówienie gry.",
    href: "https://www.gdyniapadelclub.pl/",
    image: "/casestudy/gdyniapadelclub.jpg",
    alt: "Strona Gdynia Padel Club zaprojektowana przez WeUnite",
  },
]

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="group/card flex-1 flex flex-col rounded-2xl overflow-hidden ring-1 ring-foreground/10 bg-card transition-shadow duration-300 ease-out motion-safe:hover:ring-primary/30"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      whileHover={{ y: prefersReducedMotion ? 0 : -8 }}
    >
      <div className="flex items-center gap-4 px-4 py-2.5 bg-background">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-border"
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: delay + 0.25 + i * 0.06 }}
            />
          ))}
        </div>
        <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
          {project.label}
        </span>
      </div>

      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] motion-safe:group-hover/card:scale-105"
          style={{ objectPosition: "top" }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="flex flex-col gap-3 p-6 flex-1">
        <h3 className="font-sans font-bold text-lg text-foreground">{project.title}</h3>
        <p className="font-body text-sm text-muted-foreground flex-1">{project.description}</p>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 w-fit"
        >
          Zobacz stronę na żywo
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-200 ease-out motion-safe:group-hover/link:translate-x-0.5 motion-safe:group-hover/link:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </motion.div>
  )
}

export default function CaseStudySection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="realizacja" className="py-24 md:py-32" aria-labelledby="case-study-heading">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          id="case-study-heading"
          className="mt-4 mb-6 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground text-center font-sans max-w-3xl mx-auto"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Ostatnie realizacje
        </motion.h2>

        <motion.p
          className="font-body text-base text-muted-foreground text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        >
          Od dewelopera domów jednorodzinnych po klub sportowy — projektujemy dedykowane
          strony, które prezentują ofertę, budują zaufanie i ułatwiają kontakt.
        </motion.p>

        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          {projects.map((project, index) => (
            <ProjectCard key={project.href} project={project} delay={0.2 + index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
