"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";

const stats = [
  {
    value: 36,
    suffix: " mln",
    suffixClassName: "text-2xl md:text-3xl lg:text-4xl ",
    label: "Razy wyświetlono nasze materiały w 2026 roku.",
  },
  {
    value: 20,
    suffix: "+",
    suffixClassName: "",
    label: "Zrealizowanych inteligentnych stron w 2026 roku.",
  },
  {
    value: 100,
    suffix: "+",
    suffixClassName: "",
    label: "Zadowolonych klientów, którzy nam zaufali.",
  },
];

function StatItem({
  value,
  suffix,
  suffixClassName,
  label,
  delay,
  prefersReducedMotion,
}: {
  value: number;
  suffix: string;
  suffixClassName?: string;
  label: string;
  delay: number;
  prefersReducedMotion: boolean | null;
}) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const handleViewportEnter = () => {
    if (hasAnimated.current || !numberRef.current) return;
    hasAnimated.current = true;

    if (prefersReducedMotion) {
      numberRef.current.textContent = String(value);
      return;
    }

    const counter = { val: 0 };
    gsap.to(counter, {
      val: value,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent = Math.round(counter.val).toString();
        }
      },
    });
  };

  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={handleViewportEnter}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      <p className="whitespace-nowrap text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground font-sans">
        <span ref={numberRef}>0</span>
        <span className={suffixClassName}>{suffix}</span>
      </p>
      <p className="mt-3 text-base md:text-lg font-semibold text-foreground font-body max-w-[220px]">
        {label}
      </p>
    </motion.div>
  );
}

export default function ProblemSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="mission" className="py-24 md:py-32" aria-labelledby="mission-heading">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.p
          className="text-xs font-semibold tracking-widest uppercase text-muted-foreground font-body"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Nasza misja
        </motion.p>

        <motion.h2
          id="mission-heading"
          className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground font-sans"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          Twój marketing z Gdańska.
        </motion.h2>

        <motion.p
          className="mt-8 text-lg md:text-xl text-muted-foreground font-body leading-relaxed"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          <strong className="font-bold text-foreground">Jednoczymy</strong> społeczności w
          social mediach wokół <strong className="font-bold text-foreground">Twojej firmy</strong> i
          tworzymy <strong className="font-bold text-foreground">inteligentne strony</strong>, które{" "}
          <strong className="font-bold text-foreground">budzą zaufanie</strong>.
        </motion.p>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x md:divide-primary/40">
          {stats.map((stat, i) => (
            <div key={stat.label} className="md:px-8">
              <StatItem
                value={stat.value}
                suffix={stat.suffix}
                suffixClassName={stat.suffixClassName}
                label={stat.label}
                delay={0.3 + i * 0.1}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
