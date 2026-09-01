"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

/**
 * Photo-led opener for Creo Gedania — a deliberate variant of the abstract
 * gradient hero used elsewhere in customer-success: the source image and
 * campaign title carry the chapter instead of a scroll-scrubbed counter.
 * Framed at contained width (not full-bleed) since the source photo is
 * only 596×335px — stretching it edge-to-edge would read soft on desktop.
 */
export default function CreoHero() {
  const t = useTranslations("creoGedania.hero");
  const frameRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div className="pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.p
          className="font-body text-xs font-semibold uppercase tracking-widest text-primary"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {t("badge")}
        </motion.p>

        <motion.div
          ref={frameRef}
          className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl"
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <motion.div
            className="absolute inset-0 scale-110"
            style={{ y: prefersReducedMotion ? 0 : parallaxY }}
          >
            <Image
              src="/casestudy/casestudy2.jpg"
              alt={t("imageAlt")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </motion.div>

          {/* Darken + bottom scrim so the overlaid title stays readable. */}
          <div
            className="absolute inset-0 bg-dark/35"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-dark via-dark/35 to-transparent"
            aria-hidden="true"
          />

          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
            <motion.h1
              className="font-sans text-2xl font-extrabold leading-tight tracking-tight text-dark-foreground md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
            >
              {t("heading")}
            </motion.h1>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
