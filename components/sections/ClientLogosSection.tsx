"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  { name: "Shine Hair — klient WeUnite", src: "/logos/shine.png" },
  { name: "Akademia Rozwoju Osobistego Columbus — klient WeUnite", src: "/logos/columbus.webp" },
  { name: "Polska Akademia Dzieci — klient WeUnite", src: "/logos/polska akademia.webp" },
  { name: "Gedania 1922 — klient WeUnite", src: "/logos/gedania.webp" },
  { name: "Creo — klient WeUnite", src: "/logos/creo-1.webp" },
];

export default function ClientLogosSection() {
  return (
    <section className="border-y border-border py-10" aria-label="Nasi klienci">
      <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-8 text-center font-body">
        Nasi klienci
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
