"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion, useInView } from "framer-motion";
import { Globe, Layers, Zap, Check, Heart, MessageCircle, Share2 } from "lucide-react";

/* ─── Left-panel visual mockups ─── */

function WebsiteVisual() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const booked = [12, 13, 14, 19, 20, 21];
  const avail = [8, 9, 10, 11, 15, 16, 17, 18, 22, 23];
  return (
    <div className="w-full rounded-3xl overflow-hidden shadow-2xl border border-border bg-card">
      {/* Browser bar */}
      <div className="bg-background px-4 py-2.5 flex items-center gap-2 border-b border-border">
        <div className="flex gap-1.5">
          {["bg-destructive/30", "bg-primary/30", "bg-green-400/30"].map((c, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
          ))}
        </div>
        <div className="flex-1 bg-muted rounded-md px-2.5 py-1 text-[10px] text-muted-foreground font-mono truncate">
          domkiletniskowe.pl
        </div>
      </div>
      {/* Page content */}
      <div className="p-5 space-y-4">
        {/* Hero strip */}
        <div className="bg-primary rounded-2xl px-5 py-4">
          <p className="text-[10px] text-primary-foreground/70 font-medium uppercase tracking-widest mb-1">
            Domki Pod Lasem
          </p>
          <p className="font-sans font-extrabold text-lg text-primary-foreground leading-tight">
            Zarezerwuj pobyt
          </p>
          <p className="text-[11px] text-primary-foreground/70 mt-0.5">
            Bezpośrednio — bez prowizji dla platform
          </p>
        </div>
        {/* Calendar */}
        <div>
          <p className="text-[10px] font-medium text-muted-foreground mb-2 font-body">
            Maj 2025
          </p>
          <div className="grid grid-cols-7 gap-[3px] text-center text-[9px]">
            {["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"].map((d) => (
              <span key={d} className="text-muted-foreground font-medium pb-1">
                {d}
              </span>
            ))}
            {days.map((day) => (
              <span
                key={day}
                className={[
                  "py-[3px] rounded-md",
                  booked.includes(day)
                    ? "bg-primary text-primary-foreground font-semibold"
                    : avail.includes(day)
                    ? "bg-primary/15 text-primary font-medium"
                    : "text-foreground",
                ].join(" ")}
              >
                {day}
              </span>
            ))}
          </div>
        </div>
        {/* CTA */}
        <button className="w-full bg-primary text-primary-foreground rounded-full py-2 text-xs font-semibold">
          Sprawdź dostępność
        </button>
        {/* Trust badges */}
        <div className="flex gap-4 text-[10px] text-muted-foreground font-body">
          <span>✓ Bez prowizji</span>
          <span>✓ Płatność online</span>
          <span>✓ Instant book</span>
        </div>
      </div>
    </div>
  );
}

function SocialVisual() {
  return (
    <div className="w-full space-y-3">
      {/* Post card */}
      <div className="rounded-3xl overflow-hidden shadow-2xl border border-border bg-card">
        <div className="px-4 pt-4 pb-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
            <Globe className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground font-sans">
              domki_nad_jeziorem
            </p>
            <p className="text-[10px] text-muted-foreground font-body">
              Właśnie teraz
            </p>
          </div>
          <div className="text-[10px] text-muted-foreground">···</div>
        </div>
        {/* Post image placeholder */}
        <div className="h-44 bg-gradient-to-br from-primary/20 via-accent/10 to-card relative overflow-hidden">
          <div className="absolute bottom-3 left-4">
            <span className="font-sans font-extrabold text-xl text-foreground/10">
              Sezon otwarty! 🌊
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-card/40 to-transparent" />
        </div>
        <div className="px-4 py-3 space-y-2">
          <div className="flex items-center gap-4">
            {[
              { icon: Heart, label: "312" },
              { icon: MessageCircle, label: "28" },
              { icon: Share2, label: "Udostępnij" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1 text-[10px] text-muted-foreground"
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-foreground leading-relaxed font-body">
            <span className="font-semibold">domki_nad_jeziorem</span>{" "}
            Nowy sezon, nowe wspomnienia — rezerwuj bezpośrednio!
          </p>
        </div>
      </div>
      {/* Stat pill */}
      <div className="bg-card rounded-2xl px-4 py-3 border border-border flex items-center justify-between shadow-sm">
        <span className="text-[11px] text-muted-foreground font-body">
          Zasięg w tym miesiącu
        </span>
        <span className="text-sm font-bold text-primary font-sans">↑ 2.4×</span>
      </div>
    </div>
  );
}

function AutomationVisual() {
  const steps = [
    {
      label: "Nowa rezerwacja",
      sub: "Klient wypełnił formularz",
      active: true,
    },
    {
      label: "Wyślij potwierdzenie",
      sub: "Email automatyczny w 30s",
      active: false,
    },
    {
      label: "Przypomnij 24h wcześniej",
      sub: "Reminder przed przyjazdem",
      active: false,
    },
  ];
  return (
    <div
      className="w-full rounded-3xl p-5 shadow-2xl border border-border/20"
      style={{ backgroundColor: "var(--bg-dark)" }}
    >
      <p className="text-[10px] font-medium text-background/40 uppercase tracking-widest mb-5 font-body">
        Automatyzacja rezerwacji
      </p>
      <div className="space-y-1">
        {steps.map((step, i) => (
          <div key={i}>
            <div
              className={[
                "rounded-xl border px-4 py-3",
                step.active
                  ? "border-primary/50 bg-primary/15"
                  : "border-background/10 bg-background/5",
              ].join(" ")}
            >
              <p
                className={`text-xs font-semibold font-sans ${
                  step.active ? "text-primary" : "text-background/70"
                }`}
              >
                {step.label}
              </p>
              <p className="text-[10px] text-background/40 mt-0.5 font-body">
                {step.sub}
              </p>
            </div>
            {i < steps.length - 1 && (
              <div className="flex justify-center">
                <div className="w-px h-3 bg-background/15" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-background/10 flex items-center justify-between">
        <span className="text-[10px] text-background/40 font-body">
          Oszczędność czasu / tydzień
        </span>
        <span className="text-sm font-bold text-primary font-sans">4h+</span>
      </div>
    </div>
  );
}

/* ─── Service data ─── */

interface ServiceData {
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: string[];
  visual: React.ReactNode;
}

const services: ServiceData[] = [
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Strona internetowa + rezerwacje",
    description:
      "Tworzymy strony internetowe dla właścicieli domków letniskowych, które zastępują rezerwacje telefoniczne i drogi OTB. Twoja strona pracuje 24/7 — zbiera rezerwacje i płatności, nawet gdy śpisz.",
    bullets: [
      "Projekt i wdrożenie strony od zera",
      "System rezerwacji z wyborem terminu i płatnością online",
      "Własna domena — zero prowizji dla pośredników",
      "Integracja z bramką płatności",
      "Responsywny design na każde urządzenie",
    ],
    visual: <WebsiteVisual />,
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Social media",
    description:
      "Przejmujemy pełne zarządzanie Twoimi profilami — od tworzenia treści po płatne kampanie. Budujesz rozpoznawalność marki, a Ty skupiasz się na prowadzeniu biznesu.",
    bullets: [
      "Miesięczny kalendarz treści dopasowany do sezonu",
      "Copywriting + projekt graficzny każdego posta",
      "Prowadzenie i optymalizacja kampanii Meta Ads",
      "Bieżące odpowiedzi na komentarze i wiadomości",
      "Miesięczny raport zasięgów i wyników",
    ],
    visual: <SocialVisual />,
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Automatyzacje",
    description:
      "Wdrażamy automatyzacje, które eliminują ręczną pracę przy rutynowych zadaniach. Potwierdzenia rezerwacji, follow-upy, powiadomienia — wszystko dzieje się samo.",
    bullets: [
      "Automatyczne potwierdzenia rezerwacji i płatności",
      "Sekwencje emailowe po złożeniu zapytania",
      "Przypomnienia dla gości przed przyjazdem",
      "Powiadomienia wewnętrzne dla właściciela",
      "Integracja z istniejącymi narzędziami (kalendarz, e-mail)",
    ],
    visual: <AutomationVisual />,
  },
];

/* ─── Main component ─── */

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-8%" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(
              Number((entry.target as HTMLElement).dataset.index)
            );
          }
        });
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: 0 }
    );
    serviceRefs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  const ease = "easeOut" as const;

  return (
    <section
      id="services"
      aria-label="Nasze usługi"
      className="bg-background"
      ref={sectionRef}
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-16">
        <motion.p
          className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-3 font-body"
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
        >
          USŁUGI
        </motion.p>
        <motion.h2
          className="font-sans font-extrabold tracking-tight text-foreground text-4xl md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
        >
          Trzy obszary.
          <br />
          Jeden zespół.
        </motion.h2>
      </div>

      {/* Sticky-scroll layout */}
      <div className="max-w-7xl mx-auto px-6 pb-24 md:pb-32">
        <div className="flex flex-col md:flex-row">

          {/* Left — sticky visual (desktop only) */}
          <div className="hidden md:block md:w-1/2 flex-shrink-0">
            <div className="sticky top-0 h-screen flex items-center">
              <motion.div
                className="w-full pr-12"
                initial={{ opacity: 0, x: reduced ? 0 : -60 }}
                animate={sectionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease, delay: 0.25 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    {services[activeIndex].visual}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* Right — scrollable service blocks */}
          <div className="w-full md:w-1/2">
            {services.map((service, i) => (
              <div
                key={i}
                ref={(el) => {
                  serviceRefs.current[i] = el;
                }}
                data-index={String(i)}
                className="md:min-h-screen flex flex-col md:justify-center py-20 md:py-0"
              >
                {/* Mobile: visual above text */}
                <div className="md:hidden mb-10">{service.visual}</div>

                <motion.div
                  className="md:pl-14"
                  initial={{ opacity: 0, x: reduced ? 0 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease, delay: 0.05 }}
                >
                  {/* Ghost number */}
                  <span className="block font-sans font-extrabold text-8xl leading-none text-muted-foreground/15 select-none mb-4">
                    0{i + 1}
                  </span>

                  {/* Icon + title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-card border border-border flex items-center justify-center text-primary flex-shrink-0">
                      {service.icon}
                    </div>
                    <h3 className="font-sans font-bold text-xl md:text-2xl text-foreground">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-base text-muted-foreground font-body leading-relaxed mb-6 max-w-md">
                    {service.description}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-3 mb-8">
                    {service.bullets.map((bullet, bi) => (
                      <li key={bi} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground font-body">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex bg-primary text-primary-foreground rounded-full px-6 py-3 text-sm font-medium hover:bg-accent transition-all duration-200 font-body"
                  >
                    Umów bezpłatną konsultację →
                  </a>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
