"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

/* ─── Service data ─── */

interface ServiceData {
  label: string;
  title: string;
  description: string;
  device: "monitor" | "phone";
  image: string;
  imageAlt: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

const services: ServiceData[] = [
  {
    label: "Inteligentne strony internetowe",
    title: "01 Inteligentne strony internetowe",
    description:
      "Tworzymy witryny, które pracują dla Ciebie. Wdrażamy inteligentne automatyzacje, chatboty AI, zaawansowane systemy rezerwacyjne oraz bezpieczne logowanie do panelu klienta. Zapewniamy dziesiątki udogodnień technologicznych, w pełni dopasowując je do Twojego indywidualnego projektu i potrzeb biznesowych.",
    device: "monitor",
    image: "/casestudy/nowyrelaks-after.jpg",
    imageAlt: "Realizacja strony internetowej Nowy Relaks",
    primaryLabel: "Odbierz wizualizację",
    primaryHref: "#contact",
    secondaryLabel: "Zobacz projekty",
    secondaryHref: "/strony-internetowe",
  },
  {
    label: "Social media i wideo",
    title: "02 Social media i wideo",
    description:
      "Zbudujemy społeczność wokół Twojej marki. Kompleksowo prowadzimy profile na Instagramie, YouTube, Facebooku i TikToku, dbając o angażujący content. Dodatkowo zapewniamy profesjonalną obsługę wideo i sesje zdjęciowe na terenie całej Polski, dostarczając materiały, które wyróżnią Cię na tle konkurencji.",
    device: "phone",
    image: "/casestudy/gdyniapadelclub.jpg",
    imageAlt: "Realizacja social media dla Gdynia Padel Club",
    primaryLabel: "Odbierz plan",
    primaryHref: "#contact",
    secondaryLabel: "Zobacz więcej",
    secondaryHref: "/social-media",
  },
];

/* ─── Shared bits ─── */

function scrollToContact(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

function ServiceCTAs({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}) {
  const isPrimaryContact = primaryHref.startsWith("#");
  const isSecondaryContact = secondaryHref.startsWith("#");

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {isPrimaryContact ? (
        <a
          href={primaryHref}
          onClick={scrollToContact}
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-full px-6 py-3 text-sm font-medium hover:bg-accent transition-all duration-200 font-body"
        >
          {primaryLabel}
          <ArrowRight className="h-4 w-4" />
        </a>
      ) : (
        <Link
          href={primaryHref}
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-full px-6 py-3 text-sm font-medium hover:bg-accent transition-all duration-200 font-body"
        >
          {primaryLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}

      {isSecondaryContact ? (
        <a
          href={secondaryHref}
          onClick={scrollToContact}
          className="inline-flex items-center justify-center border border-border text-foreground rounded-full px-6 py-3 text-sm font-medium hover:bg-card transition-all duration-200 font-body"
        >
          {secondaryLabel}
        </a>
      ) : (
        <Link
          href={secondaryHref}
          className="inline-flex items-center justify-center border border-border text-foreground rounded-full px-6 py-3 text-sm font-medium hover:bg-card transition-all duration-200 font-body"
        >
          {secondaryLabel}
        </Link>
      )}
    </div>
  );
}

function ServiceText({ service }: { service: ServiceData }) {
  return (
    <div className="max-w-md">
      <span className="block font-sans font-extrabold text-2xl md:text-3xl tracking-tight text-foreground mb-4">
        {service.title}
      </span>
      <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed mb-8">
        {service.description}
      </p>
      <ServiceCTAs
        primaryLabel={service.primaryLabel}
        primaryHref={service.primaryHref}
        secondaryLabel={service.secondaryLabel}
        secondaryHref={service.secondaryHref}
      />
    </div>
  );
}

function MonitorMockup({ image, alt }: { image: string; alt: string }) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="rounded-2xl bg-foreground p-2.5 md:p-3 shadow-2xl">
        <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-background">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-cover"
            style={{ objectPosition: "top" }}
          />
        </div>
      </div>
      <div className="flex flex-col items-center" aria-hidden="true">
        <div
          className="w-10 h-6 md:h-8 bg-foreground"
          style={{ clipPath: "polygon(38% 0%, 62% 0%, 78% 100%, 22% 100%)" }}
        />
        <div className="w-32 md:w-40 h-2.5 rounded-full bg-foreground" />
      </div>
    </div>
  );
}

function PhoneMockup({ image, alt }: { image: string; alt: string }) {
  return (
    <div className="mx-auto w-full max-w-[240px] md:max-w-[260px]">
      <div className="relative rounded-[2.5rem] bg-foreground p-3 shadow-2xl">
        <div className="relative w-full aspect-[9/19.5] rounded-[1.75rem] overflow-hidden bg-background">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 768px) 20vw, 60vw"
            className="object-cover"
            style={{ objectPosition: "top" }}
          />
        </div>
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-5 rounded-full bg-foreground"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function ServicePhoto({ service }: { service: ServiceData }) {
  return (
    <div className="p-6 md:p-10">
      {service.device === "monitor" ? (
        <MonitorMockup image={service.image} alt={service.imageAlt} />
      ) : (
        <PhoneMockup image={service.image} alt={service.imageAlt} />
      )}
    </div>
  );
}

/* ─── Main component ─── */

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-8%" });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reduced || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        panelRefs.current.forEach((panel, i) => {
          if (!panel) return;
          gsap.set(panel, { yPercent: i === 0 ? 0 : 100 });
        });

        const trigger = ScrollTrigger.create({
          trigger: pinRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const scaled = self.progress * services.length;
            let active = 0;

            services.forEach((_, i) => {
              if (i === 0) return;
              const panel = panelRefs.current[i];
              if (!panel) return;
              const t = gsap.utils.clamp(0, 1, scaled - i);
              gsap.set(panel, { yPercent: (1 - t) * 100 });
              if (t > 0) active = i;
            });

            setActiveIndex(active);
          },
        });

        return () => trigger.kill();
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

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
          Dwa obszary.
          <br />
          Jeden zespół.
        </motion.h2>
      </div>

      {reduced ? (
        /* ─── Reduced motion: simple cascade, no scroll-linked animation ─── */
        <div className="max-w-7xl mx-auto px-6 pb-24 md:pb-32 space-y-20">
          {services.map((service, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16"
            >
              <div className="md:w-1/2 order-2 md:order-1">
                <ServiceText service={service} />
              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                <ServicePhoto service={service} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* ─── Desktop: sticky-stacking accordion ─── */}
          <div
            ref={pinRef}
            className="hidden md:block relative"
            style={{ height: `${services.length * 100}vh` }}
          >
            <div className="sticky top-[72px] h-[calc(100vh-72px)] overflow-hidden flex flex-col">
              {/* Stacked headers */}
              <div className="max-w-7xl mx-auto px-6 pt-8 w-full flex-shrink-0 flex flex-col gap-1">
                {services.map((service, i) => (
                  <span
                    key={i}
                    className={cn(
                      "font-sans font-extrabold text-2xl lg:text-3xl tracking-tight transition-colors duration-300",
                      i === activeIndex ? "text-foreground" : "text-muted-foreground/30"
                    )}
                  >
                    {service.title}
                  </span>
                ))}
              </div>

              {/* Sliding panels */}
              <div className="relative flex-1 max-w-7xl mx-auto px-6 w-full">
                {services.map((service, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      panelRefs.current[i] = el;
                    }}
                    className="absolute inset-0 bg-background flex items-center"
                    style={{ zIndex: i + 1 }}
                  >
                    <div className="w-full grid grid-cols-2 gap-12 items-center">
                      <ServiceText service={service} />
                      <ServicePhoto service={service} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block h-24 md:h-32" aria-hidden="true" />

          {/* ─── Mobile: standard cascade ─── */}
          <div className="md:hidden max-w-7xl mx-auto px-6 pb-24 space-y-16">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease }}
              >
                <ServicePhoto service={service} />
                <ServiceText service={service} />
              </motion.div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
