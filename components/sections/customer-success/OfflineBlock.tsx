"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

import { schools } from "./data";

/**
 * Chapter 03 — the offline expansion. Parallaxed "poster" cards deal in with a
 * slight rotation, echoing the case-study collage pattern in ui-context.
 */
export default function OfflineBlock() {
  const t = useTranslations("home.customerSuccess.offlineBlock");
  const wrapRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  const ghostX = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={wrapRef} className="relative overflow-hidden py-24 md:py-32">
      <motion.p
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-sans text-[22vw] font-extrabold leading-none tracking-tight text-dark-foreground/[0.04]"
        style={{ x: prefersReducedMotion ? 0 : ghostX }}
      >
        OFFLINE
      </motion.p>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
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
              className="mt-4 font-sans text-3xl font-extrabold leading-tight tracking-tight text-dark-foreground md:text-5xl"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              {t("heading")}
            </motion.h3>
            <motion.p
              className="mt-6 max-w-md font-body text-base leading-relaxed text-dark-foreground/70 md:text-lg"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              {t.rich("body", {
                b: (chunks) => <strong className="font-bold text-dark-foreground">{chunks}</strong>,
              })}
            </motion.p>
          </div>

          <ul className="md:col-span-7 md:pt-4">
            {schools.map((school, index) => (
              <motion.li
                key={school}
                className="mb-4 flex items-center gap-4 rounded-2xl border border-dark-foreground/15 bg-dark-foreground/[0.05] px-5 py-5 md:px-7 md:py-6"
                initial={{
                  opacity: 0,
                  y: prefersReducedMotion ? 0 : 30,
                  rotate: prefersReducedMotion ? 0 : index % 2 === 0 ? -2 : 1.5,
                  scale: prefersReducedMotion ? 1 : 0.95,
                }}
                whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.12,
                }}
              >
                <MapPin className="h-6 w-6 shrink-0 text-primary" />
                <span className="font-sans text-lg font-bold tracking-tight text-dark-foreground md:text-xl">
                  {school}
                </span>
              </motion.li>
            ))}

            <motion.li
              className="flex items-center gap-4 rounded-2xl border border-dashed border-dark-foreground/25 px-5 py-5 md:px-7 md:py-6"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: schools.length * 0.12,
              }}
            >
              <span className="font-sans text-lg font-bold tracking-tight text-dark-foreground/60 md:text-xl">
                {t("moreSchools")}
              </span>
            </motion.li>
          </ul>
        </div>
      </div>
    </div>
  );
}
