"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Bridges the hero into the case study body: who Creo Gedania is and what
 * the campaign had to solve before the chapters dig into strategy and results.
 */
export default function CreoIntro() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center md:py-24">
      <motion.p
        className="font-body text-xs font-semibold uppercase tracking-widest text-primary"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        O kliencie
      </motion.p>

      <motion.h3
        className="mt-4 font-sans text-3xl font-normal leading-tight tracking-tight text-dark-foreground md:text-4xl lg:text-5xl"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        Kameralne klasy, niszowa grupa docelowa, jeden precyzyjny strzał
      </motion.h3>

      <motion.p
        className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-dark-foreground/70 md:text-lg"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        Creo Gedania to nowoczesna placówka na edukacyjnej mapie Gdańska,
        wyróżniająca się kameralnymi klasami i naciskiem na wszechstronny
        rozwój dzieci. Przed zbliżającymi się Dniami Otwartymi szkoła
        potrzebowała skutecznego sposobu na dotarcie do bardzo konkretnej
        niszy — rodziców dzieci w wieku szkolnym z Trójmiasta.
      </motion.p>

      <motion.p
        className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-dark-foreground/70 md:text-lg"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      >
        Cel: promocja Dni Otwartych i rekrutacja nowych uczniów. Potrzebne
        było rozwiązanie, które zagwarantuje precyzyjne dotarcie, uwiarygodni
        placówkę i natychmiastowo zaangażuje lokalną społeczność.
      </motion.p>
    </div>
  );
}
