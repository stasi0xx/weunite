"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Bridges the counter hero into the case study body: what "Pierwsze Trzeźwe
 * Pokolenie" actually is before the chapters dig into strategy and results.
 */
export default function MovementIntro() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
      <motion.p
        className="font-body text-xs font-semibold uppercase tracking-widest text-primary"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        Idea
      </motion.p>

      <motion.h3
        className="mt-4 font-sans text-3xl font-normal leading-tight tracking-tight text-dark-foreground md:text-4xl lg:text-5xl"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        Pierwsze pokolenie, dla którego trzeźwość to wybór, nie zakaz
      </motion.h3>

      <motion.p
        className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-dark-foreground/70 md:text-lg"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        Pierwsze Trzeźwe Pokolenie to inicjatywa Fundacji Columbus — ruch,
        który chce być dokładnie tym, na co wskazuje nazwa: pierwszym
        pokoleniem, w którym odroczenie inicjacji alkoholowej stanie się
        normą, nie wyjątkiem.
      </motion.p>

      <motion.p
        className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-dark-foreground/70 md:text-lg"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      >
        Zamiast pogadanek i zakazów — autentyczni ambasadorowie i szczere
        historie w języku, którym młodzież mówi do siebie nawzajem. Mateusz
        Kusznierewicz pokazuje, że sukces i emocje można budować bez używek.
        Łukasz Tchórzewski, znany jako „Alkoholik z TikToka”, opowiada wprost,
        czym naprawdę jest uzależnienie. Efekt: edukacja, która nie brzmi jak
        edukacja.
      </motion.p>
    </div>
  );
}
