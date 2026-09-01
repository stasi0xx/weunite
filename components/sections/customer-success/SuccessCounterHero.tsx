"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { HERO_REACH, formatCount } from "./data";

const HERO_TEXT = formatCount(HERO_REACH);
const HERO_CHARS = HERO_TEXT.split("");

const FLIP_STAGGER_MS = 45;
const FLIP_DURATION_MS = 380;
const FLIP_INTERVAL_MS = 45;

/**
 * Opener: each digit flips through a few random values before landing on its
 * real value — a quick slot-style reveal, not a count from zero. Every
 * position is present from first paint (SSR renders the real number for
 * no-JS/crawlers), so the string never changes width and nothing reflows.
 */
export default function SuccessCounterHero() {
  const t = useTranslations("home.customerSuccess.counterHero");
  const sectionRef = useRef<HTMLDivElement>(null);
  const digitRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (prefersReducedMotion || !isInView) return;

    const digitIndices = HERO_CHARS.reduce<number[]>((acc, char, index) => {
      if (/\d/.test(char)) acc.push(index);
      return acc;
    }, []);

    const start = performance.now();
    const lastFlipAt = new Map<number, number>();
    let rafId: number;

    function frame(now: number) {
      const elapsed = now - start;
      let allSettled = true;

      digitIndices.forEach((charIndex, order) => {
        const el = digitRefs.current[charIndex];
        if (!el) return;

        const localElapsed = elapsed - order * FLIP_STAGGER_MS;
        if (localElapsed < 0) {
          allSettled = false;
          return;
        }
        if (localElapsed >= FLIP_DURATION_MS) {
          el.textContent = HERO_CHARS[charIndex];
          return;
        }

        allSettled = false;
        const lastFlip = lastFlipAt.get(charIndex) ?? -Infinity;
        if (now - lastFlip >= FLIP_INTERVAL_MS) {
          el.textContent = String(Math.floor(Math.random() * 10));
          lastFlipAt.set(charIndex, now);
        }
      });

      if (!allSettled) rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, prefersReducedMotion]);

  return (
    <div
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      <Image
        src="/casestudy/logo-ptp.png"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-dark/80" />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--accent-primary) 0%, var(--accent-warm) 45%, transparent 70%)",
        }}
        initial={{ opacity: 0.2, scale: 0.5 }}
        animate={
          prefersReducedMotion || !isInView ? undefined : { opacity: 0.5, scale: 1.2 }
        }
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.p
          className="font-body text-base font-bold uppercase tracking-widest text-dark-foreground md:text-xl"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {t("badge")}
        </motion.p>

        <p className="mt-10 font-body text-sm uppercase tracking-[0.3em] text-dark-foreground/50">
          {t("fromZeroTo")}
        </p>

        {/* 8vw max: "27 000 000+" is ~10em wide in Syne ExtraBold, so anything
            above that overflows the viewport at every breakpoint. Every digit
            is on screen from first paint, so this never reflows mid-animation. */}
        <p className="mt-4 font-sans text-[clamp(1.5rem,8vw,8rem)] font-extrabold leading-[0.9] tracking-tight tabular-nums text-dark-foreground">
          {HERO_CHARS.map((char, index) => (
            /\d/.test(char) ? (
              <span
                key={index}
                ref={(el) => {
                  digitRefs.current[index] = el;
                }}
              >
                {char}
              </span>
            ) : (
              <span key={index}>{char}</span>
            )
          ))}
          <span className="text-primary">+</span>
        </p>

        <p className="mt-3 font-body text-sm uppercase tracking-[0.3em] text-dark-foreground/50">
          {t("viewsLabel")}{" "}
          <span className="font-bold text-dark-foreground">{t("viewsLabelBold")}</span>
        </p>
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-10 flex flex-col items-center gap-2 text-dark-foreground/50"
        initial={{ opacity: 1 }}
        animate={prefersReducedMotion || isInView ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <span className="font-body text-[0.65rem] uppercase tracking-[0.25em]">
          {t("scrollCue")}
        </span>
        <motion.span
          animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.div>
    </div>
  );
}
