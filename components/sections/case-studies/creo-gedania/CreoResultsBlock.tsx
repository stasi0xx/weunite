"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { useTranslations } from "next-intl";

import { formatCount } from "../../customer-success/data";
import { headlineStat, secondaryStat } from "./data";

function CountUp({
  value,
  suffix,
  label,
  delay,
  numberClassName,
  prefersReducedMotion,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
  numberClassName: string;
  prefersReducedMotion: boolean | null;
}) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const handleViewportEnter = () => {
    if (hasAnimated.current || !numberRef.current) return;
    hasAnimated.current = true;

    if (prefersReducedMotion) {
      numberRef.current.textContent = formatCount(value);
      return;
    }

    const counter = { val: 0 };
    gsap.to(counter, {
      val: value,
      duration: 2,
      delay,
      ease: "power2.out",
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent = formatCount(Math.round(counter.val));
        }
      },
    });
  };

  return (
    <motion.div
      className="flex min-w-0 flex-col"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={handleViewportEnter}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      <p
        className={`font-sans font-extrabold leading-none tracking-tight tabular-nums text-dark-foreground ${numberClassName}`}
      >
        <span ref={numberRef}>{formatCount(value)}</span>
        <span className="text-primary">{suffix}</span>
      </p>
      <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-dark-foreground/60 md:text-base">
        {label}
      </p>
    </motion.div>
  );
}

/**
 * Chapter 04 — the numbers. Lead counter is the headline "10 nowych uczniów"
 * metric the client called the real proof of ROI; the "wysoka frekwencja"
 * claim from the brief has no reported figure, so it stays qualitative
 * rather than getting an invented number.
 */
export default function CreoResultsBlock() {
  const t = useTranslations("creoGedania.resultsBlock");
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
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
        className="mt-4 max-w-3xl font-sans text-3xl font-extrabold leading-tight tracking-tight text-dark-foreground md:text-5xl"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        {t("heading")}
      </motion.h3>

      <div className="mt-16 border-t border-dark-foreground/15 pt-12 md:mt-20 md:pt-16">
        <CountUp
          value={headlineStat.value}
          suffix={headlineStat.suffix}
          label={t("headlineStatLabel")}
          delay={0}
          numberClassName="text-[clamp(3.5rem,14vw,9rem)]"
          prefersReducedMotion={prefersReducedMotion}
        />

        <div className="mt-14 md:mt-16">
          <CountUp
            value={secondaryStat.value}
            suffix={secondaryStat.suffix}
            label={t("secondaryStatLabel")}
            delay={0.15}
            numberClassName="text-[clamp(1.75rem,5vw,4rem)]"
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>
      </div>

      <motion.div
        className="mt-14 flex items-start gap-4 rounded-2xl border border-dark-foreground/15 bg-dark-foreground/[0.05] p-6 md:mt-16 md:p-8"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
        <p className="font-body text-base leading-relaxed text-dark-foreground/80 md:text-lg">
          {t("qualitativeHighlight")}
        </p>
      </motion.div>
    </div>
  );
}
