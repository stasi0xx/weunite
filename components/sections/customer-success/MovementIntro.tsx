"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

/**
 * Bridges the counter hero into the case study body: what "Pierwsze Trzeźwe
 * Pokolenie" actually is before the chapters dig into strategy and results.
 */
export default function MovementIntro() {
  const t = useTranslations("home.customerSuccess.movementIntro");
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
        {t("eyebrow")}
      </motion.p>

      <motion.h3
        className="mt-4 font-sans text-3xl font-normal leading-tight tracking-tight text-dark-foreground md:text-4xl lg:text-5xl"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        {t("heading")}
      </motion.h3>

      <motion.p
        className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-dark-foreground/70 md:text-lg"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        {t("body1")}
      </motion.p>

      <motion.p
        className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-dark-foreground/70 md:text-lg"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      >
        {t("body2")}
      </motion.p>
    </div>
  );
}
