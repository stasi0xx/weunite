"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import SuccessCounterHero from "./customer-success/SuccessCounterHero";
import MovementIntro from "./customer-success/MovementIntro";
import ChallengeBlock from "./customer-success/ChallengeBlock";
import ChallengeReel from "./customer-success/ChallengeReel";
import StrategyStack from "./customer-success/StrategyStack";
import OfflineBlock from "./customer-success/OfflineBlock";
import ResultsBlock from "./customer-success/ResultsBlock";

/**
 * Customer Success case study — "Pierwsze Trzeźwe Pokolenie".
 *
 * Deliberate one-off dark chapter in an otherwise light/cream page: it frames
 * the case study as a self-contained story and gives the scroll-driven counter
 * somewhere to glow. Replaces the old EndorsementSection slot.
 */
export default function CustomerSuccessSection() {
  const t = useTranslations("home.customerSuccess");
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      id="customer-success"
      className="relative bg-dark text-dark-foreground"
      aria-labelledby="customer-success-heading"
    >
      <h2 id="customer-success-heading" className="sr-only">
        {t("sectionHeading")}
      </h2>

      {/* Reading-progress rail — fills as the chapter is scrolled through. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-5 hidden w-px bg-dark-foreground/10 lg:block"
      >
        <motion.div
          className="h-full w-full origin-top bg-primary"
          style={{ scaleY: prefersReducedMotion ? 1 : scrollYProgress }}
        />
      </div>

      <SuccessCounterHero />
      <MovementIntro />
      <ChallengeBlock />
      <ChallengeReel />
      <StrategyStack />
      <OfflineBlock />
      <ResultsBlock />

      {/* Outro */}
      <div className="mx-auto max-w-4xl px-6 pb-24 text-center md:pb-32">
        <motion.p
          className="font-sans text-2xl font-extrabold leading-snug tracking-tight text-dark-foreground md:text-4xl"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {t("outro.line1")}
        </motion.p>
        <motion.p
          className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-dark-foreground/65 md:text-lg"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          {t("outro.line2")}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <a
            href="https://www.youtube.com/@PierwszeTrze%C5%BAwePokolenie"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-dark-foreground/25 px-6 py-3 font-body text-sm font-semibold text-dark-foreground transition-all duration-200 hover:border-dark-foreground/60 hover:bg-dark-foreground/5"
          >
            {t("outro.viewProject")}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      {/* Sticky Floating CTA — stay visible at bottom throughout the section */}
      <div className="sticky bottom-6 z-40 flex justify-center pointer-events-none pb-6 px-4">
        <Link
          href="/#contact"
          className="group pointer-events-auto inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-2xl shadow-primary/40 ring-1 ring-white/20 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-primary/90"
        >
          {t("outro.ctaSticky")}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
