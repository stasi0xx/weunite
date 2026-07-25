"use client"

import { useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

// Placeholder success stories — swap for real client quotes/results.
interface Story {
  company: string
  industry: string
  quote: string
  result: string
}

const stories: Story[] = [
  {
    company: "Marka A (placeholder)",
    industry: "Branża do uzupełnienia",
    quote: "„Tu wstawimy prawdziwą wypowiedź klienta o współpracy z WeUnite.”",
    result: "Wynik do uzupełnienia",
  },
  {
    company: "Marka B (placeholder)",
    industry: "Branża do uzupełnienia",
    quote: "„Tu wstawimy prawdziwą wypowiedź klienta o współpracy z WeUnite.”",
    result: "Wynik do uzupełnienia",
  },
  {
    company: "Marka C (placeholder)",
    industry: "Branża do uzupełnienia",
    quote: "„Tu wstawimy prawdziwą wypowiedź klienta o współpracy z WeUnite.”",
    result: "Wynik do uzupełnienia",
  },
  {
    company: "Marka D (placeholder)",
    industry: "Branża do uzupełnienia",
    quote: "„Tu wstawimy prawdziwą wypowiedź klienta o współpracy z WeUnite.”",
    result: "Wynik do uzupełnienia",
  },
]

function ScrollButton({
  direction,
  onClick,
}: {
  direction: "left" | "right"
  onClick: () => void
}) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Poprzednia historia" : "Następna historia"}
      className="hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-card border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-200"
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  )
}

export default function SocialSuccessCarousel() {
  const prefersReducedMotion = useReducedMotion()
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>("[data-story-card]")
    const amount = (card?.offsetWidth ?? 320) + 24
    el.scrollBy({ left: dir * amount, behavior: prefersReducedMotion ? "auto" : "smooth" })
  }

  return (
    <section className="pb-24 md:pb-32" aria-labelledby="success-heading">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4 mb-8">
        <p id="success-heading" className="text-sm text-muted-foreground font-body">
          Zobacz, jak pomagamy innym markom rosnąć:
        </p>
        <div className="flex gap-2">
          <ScrollButton direction="left" onClick={() => scrollByCard(-1)} />
          <ScrollButton direction="right" onClick={() => scrollByCard(1)} />
        </div>
      </div>

      <div ref={scrollerRef} className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
        <div className="flex gap-6 px-6 max-w-6xl mx-auto w-max md:w-full pb-2">
          {stories.map((story, i) => (
            <motion.div
              key={story.company}
              data-story-card
              className="w-[280px] sm:w-[340px] shrink-0 snap-start rounded-2xl bg-card p-8 flex flex-col gap-4"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
            >
              <Quote className="h-6 w-6 text-primary" aria-hidden="true" />
              <p className="font-body text-base text-foreground leading-relaxed flex-1">
                {story.quote}
              </p>
              <div className="pt-4 border-t border-border">
                <p className="font-sans font-bold text-foreground">{story.company}</p>
                <p className="text-sm text-muted-foreground">{story.industry}</p>
                <p className="mt-2 text-sm font-semibold text-primary">{story.result}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
