"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PhoneMissed, TrendingDown, UserX } from "lucide-react";

const pains = [
  {
    icon: PhoneMissed,
    title: "Telefony, SMS-y, arkusze Excela",
    body: "Każda rezerwacja to ręczna robota — potwierdzenia, zmiany terminu, ryzyko podwójnej rezerwacji.",
  },
  {
    icon: TrendingDown,
    title: "15–20% prowizji za każdą rezerwację",
    body: "Booking.com i Airbnb zarabiają na Twoich gościach. Przy każdej rezerwacji oddajesz im część swoich przychodów.",
  },
  {
    icon: UserX,
    title: "Nie wiesz, kto do Ciebie przyjeżdża",
    body: "Platformy trzymają dane kontaktowe gości u siebie. Nie możesz dotrzeć do stałych klientów ani budować własnej bazy.",
  },
];

export default function ProblemSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-24 md:py-32" aria-labelledby="problem-heading">
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          className="text-xs font-semibold tracking-widest uppercase text-muted-foreground text-center font-body"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Brzmi znajomo?
        </motion.p>

        <motion.h2
          id="problem-heading"
          className="mt-4 mb-16 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground text-center font-sans"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          Prowadzisz wynajem.{" "}
          <br className="hidden md:block" />
          Ale czy naprawdę na nim zarabiasz?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pains.map((pain, i) => {
            const Icon = pain.icon;
            return (
              <motion.div
                key={pain.title}
                className="bg-card rounded-2xl p-8 flex flex-col gap-4"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 + i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center shrink-0">
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-sans font-bold text-xl text-foreground">
                  {pain.title}
                </h3>
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  {pain.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
