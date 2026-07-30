"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";

import { HERO_REACH, formatCount } from "./data";

/**
 * Pinned opener: the reach counter is scrubbed by scroll position, so scrolling
 * is what makes the number climb from 0 to 27 200 000.
 */
export default function SuccessCounterHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [finished, setFinished] = useState(false);
  const [isBold, setIsBold] = useState(() => !!prefersReducedMotion);
  const lockedRef = useRef(false);
  const lockYRef = useRef<number | null>(null);

  // Reduced motion skips the scroll-scrubbed climb and shows the final value
  // right away, so it should be bold from the start too.
  useEffect(() => {
    if (prefersReducedMotion) setIsBold(true);
  }, [prefersReducedMotion]);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const rawCount = useTransform(scrollYProgress, [0.05, 0.7], [0, HERO_REACH]);
  const count = useSpring(rawCount, {
    stiffness: 140,
    damping: 32,
    restDelta: 500,
  });

  // Gate the section: once scroll has driven the raw count up to the target,
  // freeze scroll position (any input — wheel, touch, keyboard) until the
  // spring actually settles on 27 000 000, so users can't scroll past the
  // hero while the number is still visibly climbing.
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (prefersReducedMotion || finished || lockedRef.current) return;
    if (progress >= 0.7) {
      lockedRef.current = true;
      lockYRef.current = window.scrollY;
    }
  });

  useEffect(() => {
    if (prefersReducedMotion) return;

    function handleScroll() {
      if (!lockedRef.current || lockYRef.current === null) return;
      if (window.scrollY > lockYRef.current) {
        window.scrollTo(0, lockYRef.current);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  const glowScale = useTransform(scrollYProgress, [0, 0.7], [0.5, 1.4]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.2, 0.6, 0.35]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const captionOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.55, 0.75], [24, 0]);

  useMotionValueEvent(count, "change", (value) => {
    if (!numberRef.current || prefersReducedMotion) return;
    const rounded = Math.round(value);

    if (!isBold && rounded >= 25_000_000) {
      setIsBold(true);
    }

    if (!finished && rounded >= HERO_REACH - 500) {
      numberRef.current.textContent = formatCount(HERO_REACH);
      lockedRef.current = false;
      setFinished(true);
      return;
    }

    numberRef.current.textContent = formatCount(rounded);
  });

  // Reset to the scroll-derived value on mount so the SSR fallback (the final
  // number, kept for crawlers) does not linger once the animation can run.
  useEffect(() => {
    if (!numberRef.current || prefersReducedMotion) return;
    numberRef.current.textContent = formatCount(Math.round(count.get()));
  }, [count, prefersReducedMotion]);

  return (
    <div ref={trackRef} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <Image
          src="/casestudy/logo-ptp.png"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-dark/80"
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--accent-primary) 0%, var(--accent-warm) 45%, transparent 70%)",
            scale: prefersReducedMotion ? 1 : glowScale,
            opacity: prefersReducedMotion ? 0.35 : glowOpacity,
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            className="flex items-center gap-3 rounded-full border border-dark-foreground/20 bg-dark-foreground/5 py-2 pl-2 pr-5 backdrop-blur-sm"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="relative h-8 w-8 overflow-hidden rounded-full bg-dark-foreground">
              <Image
                src="/logos/ptp.png"
                alt=""
                fill
                className="object-contain p-1"
                sizes="32px"
              />
            </span>
            <span className="font-body text-base font-bold uppercase tracking-widest text-dark-foreground md:text-xl">
              Customer Success · Pierwsze Trzeźwe Pokolenie
            </span>
          </motion.div>

          <p className="mt-10 font-body text-sm uppercase tracking-[0.3em] text-dark-foreground/50">
            Od zera do
          </p>

          {/* 8vw max: "27 000 000+" is ~10em wide in Syne ExtraBold, so anything
              above that overflows the viewport at every breakpoint. */}
          <p
            className={`mt-4 font-sans text-[clamp(1.5rem,8vw,8rem)] leading-[0.9] tracking-tight tabular-nums text-dark-foreground ${isBold ? "font-extrabold" : "font-normal"
              }`}
          >
            <span ref={numberRef}>{formatCount(HERO_REACH)}</span>
            <span className="text-primary">+</span>
          </p>

          <p className="mt-3 font-body text-sm uppercase tracking-[0.3em] text-dark-foreground/50">
            organicznych <span className="font-bold text-dark-foreground">wyświetleń</span>
          </p>


        </div>

        <motion.div
          aria-hidden="true"
          className="absolute bottom-10 flex flex-col items-center gap-2 text-dark-foreground/50"
          style={{ opacity: prefersReducedMotion ? 0 : cueOpacity }}
        >
          <span className="font-body text-[0.65rem] uppercase tracking-[0.25em]">
            Scrolluj
          </span>
          <motion.span
            animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}
