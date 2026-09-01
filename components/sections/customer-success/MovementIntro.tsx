"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

/**
 * Bridges the counter hero into the case study body: what "Pierwsze Trzeźwe
 * Pokolenie" actually is before the chapters dig into strategy and results.
 */
export default function MovementIntro() {
  const t = useTranslations("home.customerSuccess.movementIntro");
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="mx-auto flex w-full max-w-[1900px] flex-col items-center gap-10 px-6 py-24 md:flex-row md:justify-center md:gap-4 md:py-32 lg:px-8 xl:gap-6">
      <motion.div
        className="w-full max-w-md shrink-0 md:max-w-none md:flex-1 lg:max-w-2xl"
        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        <Image
          src="/statystyki-przed-bez-tla.png"
          alt={t("statsBeforeAlt")}
          width={994}
          height={411}
          className="h-auto w-full"
        />
        <p className="mt-3 text-center font-body text-xs font-semibold uppercase tracking-widest text-dark-foreground/50">
          {t("statsBeforeCaption")}
        </p>
      </motion.div>

      <div className="max-w-3xl shrink-0 text-center">
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

      <motion.div
        className="w-full max-w-md shrink-0 md:max-w-none md:flex-1 lg:max-w-2xl"
        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        <Image
          src="/statystyki-po-bez-tla.png"
          alt={t("statsAfterAlt")}
          width={994}
          height={420}
          className="h-auto w-full"
        />
        <p className="mt-3 text-center font-body text-xs font-semibold uppercase tracking-widest text-dark-foreground/50">
          {t("statsAfterCaption")}
        </p>
      </motion.div>
    </div>
  );
}
