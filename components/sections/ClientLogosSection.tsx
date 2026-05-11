"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  { name: "Klient WeUnite", src: "/logos/logo1.webp" },
  { name: "Klient WeUnite", src: "/logos/logo2.webp" },
  { name: "Klient WeUnite", src: "/logos/logo3.webp" },
  { name: "Klient WeUnite", src: "/logos/logo.png" },
  { name: "Shine Hair — klient WeUnite", src: "/logos/shine-hair.jpeg" },
  { name: "Akademia Rozwoju Osobistego Columbus — klient WeUnite", src: "/logos/akademia-rozwoju-osobistego-columbus.jpeg" },
  { name: "Finanse i Księgowość — klient WeUnite", src: "/logos/finanse-i-ksiegowosc.PNG" },
  { name: "Creo — klient WeUnite", src: "/logos/creo-1.jpg" },
  { name: "Klient WeUnite", src: "/logos/images.png" },
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
              className="relative h-10 w-28 shrink-0 grayscale opacity-100"
              aria-hidden={i >= logos.length}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                className="object-contain"
                sizes="112px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
