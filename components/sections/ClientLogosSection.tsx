"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const clientNames = [
  "Shine Hair",
  "Akademia Rozwoju Osobistego Columbus",
  "Polska Akademia Dzieci",
  "Gedania 1922",
  "Creo",
  "PTP",
  "Filipek Investment",
  "LanLab",
];

const logoSrcs = [
  "/logos/shine.png",
  "/logos/columbus.webp",
  "/logos/polska akademia.webp",
  "/logos/gedania.webp",
  "/logos/creo-1.webp",
  "/logos/ptp.png",
  "/logos/filipek.png",
  "/logos/lanlab.webp",
];

export default function ClientLogosSection() {
  const t = useTranslations("home.clientLogos");
  const logos = clientNames.map((name, i) => ({
    name: `${name} — ${t("clientSuffix")}`,
    src: logoSrcs[i],
  }));

  return (
    <section className="border-y border-border py-10" aria-label={t("sectionAria")}>
      <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-8 text-center font-body">
        {t("trustedBy")}
      </p>

      <div className="max-w-5xl mx-auto overflow-hidden">
        <motion.div
          className="flex items-center gap-16 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="relative h-14 w-36 shrink-0 grayscale opacity-100"
              aria-hidden={i >= logos.length}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                className="object-contain"
                sizes="144px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
