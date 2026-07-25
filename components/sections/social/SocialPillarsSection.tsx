"use client"

import { useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import Image from "next/image"
import gsap from "gsap"
import { Play, ArrowUpRight, Store } from "lucide-react"

interface Pillar {
  number: string
  title: string
  description: string
}

const pillars: Pillar[] = [
  {
    number: "01",
    title: "Instagram – Najpotężniejsze narzędzie wizualne.",
    description:
      "Opieramy się na estetycznych, regularnych publikacjach, które konsekwentnie budują zasięg co przekłada się na wyniki oraz silny wizerunek Twojej marki. Skalujemy zasięgi poprzez strategiczną współpracę z influencerami, błyskawicznie docierając do nowych, zaangażowanych odbiorców i zamieniając ich w Twoich lojalnych klientów.",
  },
  {
    number: "02",
    title: "TikTok i Formaty Wideo – Wirusowe zasięgi.",
    description:
      "Nie robimy nudnych reklam. Produkujemy dynamiczne, pionowe wideo, które jest natywne dla platform i zatrzymuje scrollowanie. Przyciągamy uwagę w pierwsze 3 sekundy, generując ogromne, organiczne zasięgi.",
  },
  {
    number: "03",
    title: "Kampanie Social Ads – Paliwo dla sprzedaży.",
    description:
      "Nawet najlepszy content potrzebuje dystrybucji. Łączymy piękne kreacje z precyzyjnie targetowanymi kampaniami płatnymi, aby docierać do ludzi gotowych na zakup i domykać proces sprzedażowy.",
  },
]

const instagramPostUrl =
  "https://www.instagram.com/p/Cu5CgwhNWdz/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="

function GhostNumeral({ value, align }: { value: string; align: "left" | "right" }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none select-none absolute -top-6 md:-top-12 ${
        align === "left" ? "left-0" : "right-0"
      } font-sans font-extrabold text-foreground/[0.06] text-[6rem] sm:text-[8rem] md:text-[11rem] leading-none tracking-tighter z-0`}
    >
      {value}
    </span>
  )
}

function InstagramFrame() {
  return (
    <div className="relative max-w-lg md:ml-auto">
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl bg-card"
      />
      <a
        href={instagramPostUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-[3/2] rounded-2xl overflow-hidden ring-1 ring-foreground/10 transition-transform duration-300 ease-out motion-safe:hover:-translate-y-1"
      >
        <Image
          src="/casestudy/ig-socialmedia2.png"
          alt="Zrzut ekranu publikacji na Instagramie — 4854 polubienia, 35 komentarzy"
          fill
          className="object-cover"
          style={{ objectPosition: "top" }}
          sizes="(max-width: 768px) 90vw, 500px"
        />
        <div
          className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-200"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-t from-foreground/70 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-sm font-medium">Zobacz post</span>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </div>
      </a>
    </div>
  )
}

function TikTokFrame() {
  return (
    <div className="relative max-w-xs">
      <div
        aria-hidden="true"
        className="absolute inset-0 -translate-x-4 translate-y-4 rounded-2xl bg-card"
      />
      {/* TODO: swap for <video src="/social/tiktok-reel.mp4"> once the file is provided */}
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-foreground/10 bg-dark rotate-2 transition-transform duration-300 ease-out motion-safe:hover:rotate-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
        <span className="font-sans font-extrabold text-7xl md:text-8xl text-dark-foreground tracking-tight leading-none">
          3s
        </span>
        <p className="font-body text-sm text-dark-foreground/60 max-w-[18ch]">
          Tyle masz, żeby zatrzymać scrollowanie
        </p>
        <div className="mt-1 flex items-center justify-center w-11 h-11 rounded-full bg-primary">
          <Play className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

function AdsPanel() {
  const prefersReducedMotion = useReducedMotion()
  const counterRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  const handleViewportEnter = () => {
    if (hasAnimated.current || !counterRef.current) return
    hasAnimated.current = true

    if (prefersReducedMotion) {
      counterRef.current.textContent = "2 400+"
      return
    }

    const counter = { val: 0 }
    gsap.to(counter, {
      val: 2400,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.round(counter.val).toLocaleString("pl-PL")}+`
        }
      },
    })
  }

  return (
    <div className="relative max-w-xs pb-6 pr-6">
      {/* mock paid social ad unit */}
      <motion.div
        className="relative rounded-2xl overflow-hidden ring-1 ring-foreground/10 bg-background"
        onViewportEnter={handleViewportEnter}
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-card shrink-0">
            <Store className="h-4 w-4 text-primary" aria-hidden="true" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-foreground">Twoja marka</span>
            <span className="text-xs text-muted-foreground">Sponsorowane</span>
          </div>
        </div>

        <div
          className="aspect-[4/3] bg-gradient-to-br from-primary via-accent to-primary/70"
          aria-hidden="true"
        />

        <div className="p-4 flex flex-col gap-3">
          <p className="font-body text-sm text-foreground leading-snug">
            Twoja oferta, przed ludźmi gotowymi kupić już dziś.
          </p>
          <span className="inline-flex self-start items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium px-4 py-2">
            Sprawdź ofertę
          </span>
        </div>
      </motion.div>

      {/* results chip, overlapping the ad's corner — the campaign's payoff */}
      <motion.div
        className="absolute bottom-0 right-0 rounded-2xl bg-card ring-1 ring-border px-4 py-3"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <p className="font-sans font-extrabold text-xl text-foreground leading-none">
          <span ref={counterRef}>0</span>
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground max-w-[16ch]">
          gotowych na zakup
        </p>
      </motion.div>
    </div>
  )
}

function PillarRow({
  pillar,
  frame,
  align,
  mediaSpan,
  delay,
}: {
  pillar: Pillar
  frame: React.ReactNode
  align: "left" | "right"
  mediaSpan: 8 | 5
  delay: number
}) {
  const prefersReducedMotion = useReducedMotion()
  const mediaSpanClass = mediaSpan === 8 ? "md:col-span-8" : "md:col-span-5"
  const textSpanClass = mediaSpan === 8 ? "md:col-span-4" : "md:col-span-7"

  const text = (
    <div className="relative z-10">
      <span className="font-body text-xs font-semibold tracking-widest uppercase text-primary">
        Filar {pillar.number}
      </span>
      <h3 className="mt-3 font-sans font-extrabold text-3xl md:text-4xl text-foreground tracking-tight">
        {pillar.title}
      </h3>
      <p className="mt-5 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
        {pillar.description}
      </p>
    </div>
  )

  const media = <div className="relative z-10">{frame}</div>

  return (
    <motion.div
      className="relative grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 items-center"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      <GhostNumeral value={pillar.number} align={align} />

      {align === "left" ? (
        <>
          <div className={textSpanClass}>{text}</div>
          <div className={`${mediaSpanClass} order-first md:order-none`}>{media}</div>
        </>
      ) : (
        <>
          <div className={mediaSpanClass}>{media}</div>
          <div className={textSpanClass}>{text}</div>
        </>
      )}
    </motion.div>
  )
}

export default function SocialPillarsSection() {
  return (
    <section className="py-24 md:py-32" aria-labelledby="pillars-heading">
      <div className="max-w-6xl mx-auto px-6">
        <h2 id="pillars-heading" className="sr-only">
          Trzy filary naszych działań
        </h2>

        <div className="flex flex-col gap-24 md:gap-32">
          <PillarRow pillar={pillars[0]} frame={<InstagramFrame />} align="left" mediaSpan={8} delay={0.1} />
          <PillarRow pillar={pillars[1]} frame={<TikTokFrame />} align="right" mediaSpan={5} delay={0.1} />
          <div className="pt-12 md:pt-16 border-t border-border">
            <PillarRow pillar={pillars[2]} frame={<AdsPanel />} align="left" mediaSpan={5} delay={0.1} />
          </div>
        </div>
      </div>
    </section>
  )
}
