"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function EndorsementSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-24 md:py-32 bg-card" aria-label="Referencja">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Quote */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span
              className="font-sans text-[7rem] leading-none text-primary select-none -mb-4"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-foreground leading-snug">
              WeUnite to rzadki przykład agencji, której naprawdę zależy na
              efekcie. Szybko łapią, co jest potrzebne — i po prostu to robią.
              Bez zbędnych spotkań, bez chaosu, z jakością, która mówi sama za
              siebie.
            </blockquote>
            <div className="mt-8 flex flex-col gap-1">
              <p className="font-sans font-bold text-foreground text-base">
                Bartłomiej Glinka
              </p>
              <p className="font-body text-sm text-muted-foreground">
                Współzałożyciel · Omida Group
              </p>
            </div>
          </motion.div>

          {/* Photo */}
          <motion.div
            className="flex justify-center md:justify-end order-first md:order-last"
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          >
            <div className="relative w-72 h-80 md:w-80 md:h-[26rem] rounded-2xl overflow-hidden shadow-xl bg-white">
              <Image
                src="/entrepreneurs/Bartłomej.jpg"
                alt="Bartłomiej Glinka, Współzałożyciel Omida Group"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 288px, 320px"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
