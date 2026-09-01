"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { useTranslations } from "next-intl";

import { formatCount, headlineStats, platformResults } from "./data";

function CountUp({
  value,
  suffix,
  label,
  delay,
  numberClassName,
  labelClassName,
  prefersReducedMotion,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
  numberClassName: string;
  labelClassName?: string;
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
      duration: 2.2,
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
      <p
        className={`mt-4 font-body text-sm leading-relaxed text-dark-foreground/60 md:text-base ${
          labelClassName ?? "max-w-[18rem]"
        }`}
      >
        {label}
      </p>
    </motion.div>
  );
}

/**
 * Chapter 04 — the numbers. Headline counters run on viewport entry, the
 * per-platform bars fill left-to-right in sequence.
 */
export default function ResultsBlock() {
  const t = useTranslations("home.customerSuccess");
  const prefersReducedMotion = useReducedMotion();
  const [leadStat, ...secondaryStats] = headlineStats;

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <motion.p
        className="font-body text-xs font-semibold uppercase tracking-widest text-primary"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {t("resultsBlock.eyebrow")}
      </motion.p>
      <motion.h3
        className="mt-4 max-w-3xl font-sans text-3xl font-extrabold leading-tight tracking-tight text-dark-foreground md:text-5xl"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        {t("resultsBlock.heading")}
      </motion.h3>

      {/* The reach figure is ~9.5em wide in Syne ExtraBold — far too long to
          share a third of the grid with the other two, so it gets its own row. */}
      <div className="mt-16 border-t border-dark-foreground/15 pt-12 md:mt-20 md:pt-16">
        <CountUp
          value={leadStat.value}
          suffix={leadStat.suffix}
          label={t(`headlineStats.${leadStat.id}.label`)}
          delay={0}
          numberClassName="text-[clamp(1.75rem,7vw,5.5rem)]"
          labelClassName="max-w-lg text-base md:text-lg"
          prefersReducedMotion={prefersReducedMotion}
        />

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 md:mt-16">
          {secondaryStats.map((stat, index) => (
            <CountUp
              key={stat.id}
              value={stat.value}
              suffix={stat.suffix}
              label={t(`headlineStats.${stat.id}.label`)}
              delay={0.15 + index * 0.15}
              numberClassName="text-[clamp(1.75rem,5vw,4rem)]"
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>

      <div className="mt-20 md:mt-28">
        {platformResults.map((platform, index) => (
          <motion.div
            key={platform.id}
            className="border-t border-dark-foreground/15 py-8 md:py-10"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h4 className="font-sans text-2xl font-extrabold tracking-tight text-dark-foreground md:text-3xl">
                {platform.platform}
              </h4>
              <p className="font-sans text-xl font-extrabold tabular-nums tracking-tight text-dark-foreground md:text-2xl">
                {formatCount(platform.value)}{" "}
                <span className="font-body text-sm font-normal text-dark-foreground/50">
                  {t(`platformResults.${platform.id}.metric`)}
                </span>
              </p>
            </div>

            <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-dark-foreground/10">
              <motion.div
                className="h-full origin-left rounded-full bg-primary"
                style={{ width: `${Math.round(platform.share * 100)}%` }}
                initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{
                  duration: 1.1,
                  ease: "easeOut",
                  delay: 0.15 + index * 0.1,
                }}
              />
            </div>

            <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-3">
              {t.raw(`platformResults.${platform.id}.details`).map((detail: string) => (
                <li
                  key={detail}
                  className="font-body text-sm leading-relaxed text-dark-foreground/65"
                >
                  {detail}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
