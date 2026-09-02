"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function HeroSection() {
  const t = useTranslations("home.hero");
  const prefersReducedMotion = useReducedMotion();

  function makeVariants(y: number, delay: number): Variants {
    return {
      hidden: { opacity: 0, y: prefersReducedMotion ? 0 : y },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" as const, delay },
      },
    };
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label={t("sectionAria")}
    >
      <span className="sr-only">{t("srDescription")}</span>

      {/* Background photo */}
      <Image
        src="/hero/gdansk-hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden="true"
      />

      {/* Dark overlay for legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/70"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]"
        aria-hidden="true"
      />

      {/* Wordmark */}
      <div className="relative z-10 flex flex-col items-center px-6">
        <h1 className="font-sans font-extrabold tracking-tight text-white text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] leading-none">
          WeUnite
        </h1>
      </div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        onClick={() => scrollTo("services")}
        aria-label={t("scrollAria")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
        initial="hidden"
        animate="visible"
        variants={makeVariants(10, 0.9)}
      >
        <motion.span
          className="block"
          animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, ease: "easeInOut" as const, repeat: Infinity }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.span>
      </motion.button>
    </section>
  );
}
