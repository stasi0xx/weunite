"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { videoRef } from "./data";

/**
 * Links out to the creator's original TikTok post rather than self-hosting
 * a downloaded copy — same reasoning as the Instagram/TikTok placeholders in
 * SocialPillarsSection: no rehosting or embedding third-party creator video.
 */
export default function CreoVideoBlock() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <motion.p
        className="font-body text-xs font-semibold uppercase tracking-widest text-primary"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        03 — Materiał
      </motion.p>
      <motion.h3
        className="mt-4 max-w-2xl font-sans text-3xl font-extrabold leading-tight tracking-tight text-dark-foreground md:text-5xl"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        Rolka, która zrobiła robotę.
      </motion.h3>

      <motion.a
        href={videoRef.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-10 flex items-center gap-6 rounded-3xl border border-dark-foreground/15 bg-dark-foreground/[0.05] p-6 transition-colors duration-200 hover:border-primary/40 md:p-8"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary transition-transform duration-200 group-hover:scale-105">
          <Play className="h-5 w-5 fill-primary-foreground text-primary-foreground" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="font-sans text-lg font-bold text-dark-foreground">
            {videoRef.handle}
          </p>
          <p className="mt-1 font-body text-sm text-dark-foreground/60">
            {videoRef.label}
          </p>
        </div>
        <ArrowUpRight
          className="ml-auto h-5 w-5 shrink-0 text-dark-foreground/50 transition-colors duration-200 group-hover:text-primary"
          aria-hidden="true"
        />
      </motion.a>
    </div>
  );
}
