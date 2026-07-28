"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import CreoHero from "./CreoHero";
import CreoIntro from "./CreoIntro";
import NumberedChapter from "./NumberedChapter";
import CreoVideoBlock from "./CreoVideoBlock";
import CreoResultsBlock from "./CreoResultsBlock";
import { challenges, strategySteps } from "./data";

/**
 * Case study — "Creo Gedania". Same dark, scroll-driven chapter architecture
 * as CustomerSuccessSection (Pierwsze Trzeźwe Pokolenie), with a photo-led
 * hero in place of the abstract counter opener — see CreoHero for why.
 */
export default function CreoGedaniaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      id="creo-gedania"
      className="relative bg-dark text-dark-foreground"
      aria-labelledby="creo-gedania-heading"
    >
      <h2 id="creo-gedania-heading" className="sr-only">
        Case study: Creo Gedania — 10 nowych uczniów z dwóch rolek
      </h2>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-5 hidden w-px bg-dark-foreground/10 lg:block"
      >
        <motion.div
          className="h-full w-full origin-top bg-primary"
          style={{ scaleY: prefersReducedMotion ? 1 : scrollYProgress }}
        />
      </div>

      <CreoHero />
      <CreoIntro />
      <NumberedChapter
        chapterLabel="01 — Wyzwanie"
        heading="Jak dotrzeć do rodziców, nie przepalając budżetu poza regionem?"
        items={challenges}
      />
      <NumberedChapter
        chapterLabel="02 — Strategia i realizacja"
        heading="Scenariusz, twórca i precyzyjne ads’y."
        items={strategySteps}
      />
      <CreoVideoBlock />
      <CreoResultsBlock />

      {/* Outro */}
      <div className="mx-auto max-w-4xl px-6 pb-24 text-center md:pb-32">
        <motion.p
          className="font-sans text-2xl font-extrabold leading-snug tracking-tight text-dark-foreground md:text-4xl"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Precyzyjne planowanie w lokalnym marketingu działa jak skalpel.
        </motion.p>
        <motion.p
          className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-dark-foreground/65 md:text-lg"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          Klient: Creo Gedania. Konsultacje strategiczne, scenariusz, dobór
          twórcy i punktowe wsparcie reklamowe — 10 nowych, pełnowymiarowych
          czesnych z dwóch materiałów wideo.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <a
            href="https://www.tiktok.com/@poznajtrojmiasto"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-dark-foreground/25 px-6 py-3 font-body text-sm font-semibold text-dark-foreground transition-all duration-200 hover:border-dark-foreground/60 hover:bg-dark-foreground/5"
          >
            Zobacz profil @poznajtrojmiasto
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      {/* Sticky Floating CTA — stays visible throughout the section. */}
      <div className="sticky bottom-6 z-40 flex justify-center pointer-events-none pb-6 px-4">
        <Link
          href="/#contact"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-2xl shadow-primary/40 ring-1 ring-white/20 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-primary/90 hover:gap-3"
        >
          Chcę takie wyniki
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
