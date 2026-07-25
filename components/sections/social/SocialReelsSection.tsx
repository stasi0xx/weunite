"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Play } from "lucide-react"

// TODO: swap the first card for <video src="/social/tiktok-reel.mp4"> once
// the file from Załącznik 2 is provided; remaining cards stay as placeholders
// until more reels are supplied.
const reels = [
  { label: "TikTok reel" },
  { label: "Wkrótce" },
  { label: "Wkrótce" },
  { label: "Wkrótce" },
  { label: "Wkrótce" },
  { label: "Wkrótce" },
]

export default function SocialReelsSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="nagrania" className="py-24 md:py-32" aria-labelledby="reels-heading">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          id="reels-heading"
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground text-center font-sans max-w-3xl mx-auto"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Nasze nagrania wideo
        </motion.h2>

        <motion.p
          className="mt-4 font-body text-base md:text-lg text-muted-foreground text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          Krótkie, dynamiczne wideo, jakie tworzymy dla naszych klientów. Przewiń w bok, żeby zobaczyć więcej.
        </motion.p>
      </div>

      <div className="mt-12 md:mt-16 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
        <div className="flex gap-4 px-6 max-w-6xl mx-auto w-max md:w-full pb-2">
          {reels.map((reel, i) => (
            <div
              key={i}
              className="w-40 sm:w-48 shrink-0 snap-start rounded-2xl bg-card p-2"
            >
              <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-background flex flex-col items-center justify-center gap-2 text-muted-foreground">
                <Play className="h-6 w-6" aria-hidden="true" />
                <span className="text-xs font-medium">{reel.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
