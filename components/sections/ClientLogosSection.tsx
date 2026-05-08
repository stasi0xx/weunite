"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  { name: "Logo 1",                       src: "/logos/logo1.webp" },
  { name: "Logo 2",                       src: "/logos/logo2.webp" },
  { name: "Logo 3",                       src: "/logos/logo3.webp" },
  { name: "Logo",                         src: "/logos/logo.png" },
  { name: "Shine Hair",                   src: "/logos/shine-hair.jpeg" },
  { name: "Akademia Rozwoju Osobistego",  src: "/logos/akademia-rozwoju-osobistego-columbus.jpeg" },
  { name: "Finanse i Księgowość",         src: "/logos/finanse-i-ksiegowosc.PNG" },
  { name: "Creo",                         src: "/logos/creo-1.jpg" },
  { name: "Images",                       src: "/logos/images.png" },
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
              className="relative h-10 w-28 shrink-0 grayscale opacity-40"
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
