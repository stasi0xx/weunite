"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { strategists, type Strategist } from "./data";

function StackCard({
  person,
  index,
  total,
  progress,
  prefersReducedMotion,
}: {
  person: Strategist;
  index: number;
  total: number;
  progress: MotionValue<number>;
  prefersReducedMotion: boolean | null;
}) {
  const isLast = index === total - 1;
  // While the next card slides over this one, push it back a little.
  const scale = useTransform(progress, [index / total, (index + 1) / total], [1, 0.94]);
  const dim = useTransform(progress, [index / total, (index + 1) / total], [0, 0.35]);

  return (
    <motion.article
      className="sticky mb-[14vh] last:mb-0"
      style={{
        top: `calc(7rem + ${index * 1.25}rem)`,
        scale: prefersReducedMotion || isLast ? 1 : scale,
      }}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative overflow-hidden rounded-3xl border border-dark-foreground/15 bg-dark shadow-2xl">
        {/* Opaque tint layer — keeps the card solid so stacked cards occlude cleanly. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-dark-foreground/[0.06]"
        />

        <div className="relative grid grid-cols-1 gap-8 p-6 md:grid-cols-12 md:items-center md:gap-10 md:p-10">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-dark-foreground/10">
              <Image
                src={person.image}
                alt={person.imageAlt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 90vw, 40vw"
              />
            </div>
          </div>

          <div className="md:col-span-7">
            <span
              aria-hidden="true"
              className="font-sans text-sm font-extrabold tabular-nums text-primary"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h4 className="mt-2 font-sans text-2xl font-extrabold tracking-tight text-dark-foreground md:text-4xl">
              {person.name}
            </h4>
            <p className="mt-2 font-body text-sm uppercase tracking-widest text-dark-foreground/50">
              {person.role}
            </p>
            <p className="mt-5 font-body text-base leading-relaxed text-dark-foreground/75 md:text-lg">
              {person.blurb}
            </p>

            {person.stats && (
              <div className="mt-6 flex flex-wrap gap-3">
                {person.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-dark-foreground/15 px-4 py-3"
                  >
                    <p className="font-sans text-xl font-extrabold tracking-tight text-dark-foreground">
                      {stat.value}
                    </p>
                    <p className="font-body text-xs text-dark-foreground/60">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {person.href && (
              <a
                href={person.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-body text-sm font-semibold text-primary-foreground transition-all duration-200 hover:gap-3"
              >
                {person.hrefLabel}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl bg-dark"
        style={{ opacity: prefersReducedMotion || isLast ? 0 : dim }}
      />
    </motion.article>
  );
}

/**
 * Chapter 02 — the three faces of the campaign, as a stacked card deck: each
 * card pins, then the next slides over it.
 */
export default function StrategyStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <motion.p
        className="font-body text-xs font-semibold uppercase tracking-widest text-primary"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        02 — Strategia
      </motion.p>
      <motion.h3
        className="mt-4 max-w-3xl font-sans text-3xl font-extrabold leading-tight tracking-tight text-dark-foreground md:text-5xl"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        Twarze kampanii, obok których nie da się przejść obojętnie.
      </motion.h3>

      <div ref={containerRef} className="relative mt-16">
        {strategists.map((person, index) => (
          <StackCard
            key={person.id}
            person={person}
            index={index}
            total={strategists.length}
            progress={scrollYProgress}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </div>
  );
}
