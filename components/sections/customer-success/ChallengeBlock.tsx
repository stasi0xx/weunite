"use client";

import { motion, useReducedMotion } from "framer-motion";

import { challenges } from "./data";

/**
 * Chapter 01 — the three problems the campaign had to solve. Sticky left
 * heading, right column scrolls past it so the list reveals one item at a time.
 */
export default function ChallengeBlock() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <motion.p
              className="font-body text-xs font-semibold uppercase tracking-widest text-primary"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              01 — Wyzwanie
            </motion.p>
            <motion.h3
              className="mt-4 font-sans text-3xl font-normal leading-tight tracking-tight text-dark-foreground md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              Jak rozmawiać o trzeźwości, żeby młodzież chciała słuchać?
            </motion.h3>
          </div>
        </div>

        <ol className="md:col-span-8">
          {challenges.map((challenge, index) => (
            <motion.li
              key={challenge.id}
              className="border-t border-dark-foreground/15 py-10 first:border-t-0 first:pt-0 md:py-14"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-baseline gap-6">
                <span
                  aria-hidden="true"
                  className="font-sans text-4xl font-extrabold tabular-nums text-dark-foreground/20 md:text-5xl"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="font-sans text-2xl font-bold tracking-tight text-dark-foreground md:text-3xl">
                    {challenge.title}
                  </h4>
                  <motion.span
                    aria-hidden="true"
                    className="mt-4 block h-px origin-left bg-primary"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  />
                  <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-dark-foreground/70 md:text-lg">
                    {challenge.body}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
