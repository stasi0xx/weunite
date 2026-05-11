"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { CtaButton } from "@/components/ui/CtaButton";
import { HoverLink } from "@/components/ui/hover-link";
import { usePostHog } from "posthog-js/react";
import React, { useState, type ReactNode } from "react";

function WebsiteMockup() {
  const calDots: [number, number][] = [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0],
    [0, 1], [1, 1], [2, 1], [3, 1], [4, 1],
  ];
  return (
    <svg
      viewBox="0 0 260 144"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      aria-hidden="true"
    >
      {/* Window frame */}
      <rect width="260" height="144" rx="10" fill="rgba(255,255,255,0.1)" />
      {/* Browser chrome */}
      <rect width="260" height="26" rx="10" fill="rgba(0,0,0,0.2)" />
      <rect y="16" width="260" height="10" fill="rgba(0,0,0,0.2)" />
      {/* Traffic lights */}
      <circle cx="13" cy="13" r="4" fill="rgba(255,255,255,0.5)" />
      <circle cx="25" cy="13" r="4" fill="rgba(255,255,255,0.5)" />
      <circle cx="37" cy="13" r="4" fill="rgba(255,255,255,0.5)" />
      {/* URL bar */}
      <rect x="54" y="7" width="150" height="12" rx="6" fill="rgba(255,255,255,0.22)" />
      {/* Nav bar */}
      <rect x="8" y="32" width="244" height="18" rx="4" fill="rgba(255,255,255,0.07)" />
      <rect x="14" y="37.5" width="44" height="7" rx="3.5" fill="rgba(255,255,255,0.5)" />
      <rect x="178" y="37.5" width="28" height="7" rx="3.5" fill="rgba(255,255,255,0.22)" />
      <rect x="214" y="36" width="32" height="10" rx="5" fill="rgba(255,255,255,0.3)" />
      {/* Hero headline */}
      <rect x="52" y="58" width="156" height="9" rx="4.5" fill="rgba(255,255,255,0.6)" />
      <rect x="70" y="71" width="120" height="7" rx="3.5" fill="rgba(255,255,255,0.32)" />
      {/* CTA button */}
      <rect x="90" y="83" width="80" height="14" rx="7" fill="rgba(255,255,255,0.35)" />
      {/* Booking section — 3 columns */}
      <rect x="8" y="104" width="74" height="34" rx="6" fill="rgba(255,255,255,0.13)" />
      <rect x="90" y="104" width="74" height="34" rx="6" fill="rgba(255,255,255,0.13)" />
      <rect x="172" y="104" width="80" height="34" rx="6" fill="rgba(255,255,255,0.13)" />
      {/* Calendar dots */}
      {calDots.map(([col, row]) => (
        <circle
          key={`${col}-${row}`}
          cx={17 + col * 11}
          cy={114 + row * 10}
          r="2.8"
          fill={col === 2 && row === 1 ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.28)"}
        />
      ))}
      {/* Time slots */}
      <rect x="96" y="111" width="62" height="6" rx="3" fill="rgba(255,255,255,0.38)" />
      <rect x="96" y="121" width="62" height="6" rx="3" fill="rgba(255,255,255,0.22)" />
      <rect x="96" y="131" width="62" height="6" rx="3" fill="rgba(255,255,255,0.22)" />
      {/* Confirm / pay */}
      <rect x="178" y="111" width="68" height="6" rx="3" fill="rgba(255,255,255,0.32)" />
      <rect x="178" y="121" width="50" height="6" rx="3" fill="rgba(255,255,255,0.22)" />
      <rect x="178" y="130" width="68" height="10" rx="5" fill="rgba(255,255,255,0.38)" />
    </svg>
  );
}

function SocialMediaMockup() {
  const BW = 22, BG = 10;
  const bars = [
    { h: 16, op: 0.20 }, { h: 20, op: 0.24 }, { h: 18, op: 0.22 },
    { h: 32, op: 0.35 }, { h: 42, op: 0.44 }, { h: 52, op: 0.53 }, { h: 62, op: 0.63 },
  ];
  const totalW = bars.length * BW + (bars.length - 1) * BG;
  const startX = (244 - totalW) / 2 + 8;
  const bottomY = 132;

  return (
    <svg viewBox="0 0 260 140" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      {/* Tile backgrounds */}
      {[8, 58, 108, 158, 208].map((x) => (
        <rect key={x} x={x} y={4} width={44} height={50} rx={10} fill="rgba(20,20,20,0.07)" />
      ))}

      {/* Instagram – center (30,29): rounded square outline + circle + dot */}
      <rect x={18} y={15} width={24} height={24} rx={6} fill="none" stroke="rgba(255,90,31,0.82)" strokeWidth={2} />
      <circle cx={30} cy={27} r={6.5} fill="none" stroke="rgba(255,90,31,0.82)" strokeWidth={2} />
      <circle cx={37} cy={19} r={2.2} fill="rgba(255,90,31,0.82)" />

      {/* Facebook – center (80,29): bold "f" */}
      <text x={80} y={37} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={28} fontWeight="bold" fill="rgba(255,90,31,0.82)">f</text>

      {/* Twitter/X – center (130,29): two bold crossed lines */}
      <line x1={119} y1={17} x2={141} y2={41} stroke="rgba(255,90,31,0.82)" strokeWidth={4.5} strokeLinecap="round" />
      <line x1={141} y1={17} x2={119} y2={41} stroke="rgba(255,90,31,0.82)" strokeWidth={4.5} strokeLinecap="round" />

      {/* YouTube – center (180,29): filled rounded rect + white play triangle */}
      <rect x={167} y={17} width={26} height={20} rx={5} fill="rgba(255,90,31,0.82)" />
      <polygon points="173,21 173,33 189,27" fill="white" opacity={0.92} />

      {/* LinkedIn – center (230,29): bold "in" */}
      <text x={230} y={36} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight="bold" fill="rgba(255,90,31,0.82)">in</text>

      {/* Growth bar chart */}
      <rect x={8} y={60} width={244} height={76} rx={8} fill="rgba(255,90,31,0.055)" />
      <text x={16} y={74} fontFamily="Arial, sans-serif" fontSize={7} fill="rgba(255,90,31,0.45)">Zasięgi</text>
      {bars.map((b, i) => (
        <rect
          key={i}
          x={startX + i * (BW + BG)}
          y={bottomY - b.h}
          width={BW}
          height={b.h}
          rx={4}
          fill={`rgba(255,90,31,${b.op})`}
        />
      ))}
      <line x1={startX - 2} y1={bottomY} x2={startX + totalW + 2} y2={bottomY} stroke="rgba(255,90,31,0.18)" strokeWidth={1.5} />
    </svg>
  );
}

function gearPath(cx: number, cy: number, outerR: number, innerR: number, holeR: number, teeth: number): string {
  const step = (Math.PI * 2) / teeth;
  const th = step * 0.30;
  const f = (n: number) => n.toFixed(2);
  const px = (a: number, r: number) => f(cx + r * Math.cos(a));
  const py = (a: number, r: number) => f(cy + r * Math.sin(a));
  const pts: string[] = [];

  for (let i = 0; i < teeth; i++) {
    const θ = -Math.PI / 2 + i * step;
    const aA = θ - th, aB = θ - th * 0.45, aC = θ + th * 0.45, aD = θ + th;
    const aN = θ + step - th;
    pts.push(`${i === 0 ? "M" : "L"} ${px(aA, innerR)} ${py(aA, innerR)}`);
    pts.push(`L ${px(aB, outerR)} ${py(aB, outerR)}`);
    pts.push(`L ${px(aC, outerR)} ${py(aC, outerR)}`);
    pts.push(`L ${px(aD, innerR)} ${py(aD, innerR)}`);
    pts.push(`A ${innerR} ${innerR} 0 0 1 ${px(aN, innerR)} ${py(aN, innerR)}`);
  }
  pts.push("Z");
  pts.push(`M ${f(cx + holeR)} ${f(cy)} A ${holeR} ${holeR} 0 1 0 ${f(cx - holeR)} ${f(cy)} A ${holeR} ${holeR} 0 1 0 ${f(cx + holeR)} ${f(cy)} Z`);
  return pts.join(" ");
}

function AutomatyzacjeMockup() {
  const large = gearPath(82, 80, 46, 38, 12, 10);
  const medium = gearPath(172, 46, 30, 24, 8, 8);
  const small = gearPath(205, 110, 19, 15, 5, 7);
  return (
    <svg viewBox="0 0 260 140" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
      {/* Faint connector lines between gear centres */}
      <line x1={82} y1={80} x2={172} y2={46} stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} strokeDasharray="4 4" />
      <line x1={172} y1={46} x2={205} y2={110} stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} strokeDasharray="4 4" />
      {/* Gears */}
      <path d={large} fillRule="evenodd" fill="rgba(255,255,255,0.55)" />
      <path d={medium} fillRule="evenodd" fill="rgba(255,255,255,0.44)" />
      <path d={small} fillRule="evenodd" fill="rgba(255,255,255,0.36)" />
    </svg>
  );
}

type Card = {
  title: string;
  teaser: string;
  bg: string;
  titleCls: string;
  descCls: string;
  desktopRotate: number;
  desktopY: number;
  illustration?: ReactNode;
};

const cards: Card[] = [
  {
    title: "Strona internetowa + rezerwacje",
    teaser: "Profesjonalna strona z systemem płatności online",
    bg: "var(--accent-primary)",
    titleCls: "text-primary-foreground",
    descCls: "text-primary-foreground/70",
    desktopRotate: -2,
    desktopY: 40,
    illustration: <WebsiteMockup />,
  },
  {
    title: "Social media",
    teaser: "Regularne treści, kampanie i wzrost zasięgów",
    bg: "var(--bg-surface)",
    titleCls: "text-foreground",
    descCls: "text-muted-foreground",
    desktopRotate: 0,
    desktopY: 0,
    illustration: <SocialMediaMockup />,
  },
  {
    title: "Automatyzacje",
    teaser: "Procesy bez ręcznej pracy — 24/7",
    bg: "var(--bg-dark)",
    titleCls: "text-background",
    descCls: "text-background/70",
    desktopRotate: 2,
    desktopY: 40,
    illustration: <AutomatyzacjeMockup />,
  },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function CardItem({
  card,
  index,
  prefersReducedMotion,
  isDesktop,
}: {
  card: Card;
  index: number;
  prefersReducedMotion: boolean | null;
  isDesktop: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const overlay = (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ background: "white", mixBlendMode: "difference" } as React.CSSProperties}
      animate={{
        clipPath: hovered && !prefersReducedMotion
          ? "circle(150% at 50% 0%)"
          : "circle(0% at 50% 0%)",
      }}
      transition={{ duration: 0.65, ease: "easeOut" as const }}
    />
  );

  const content = (
    <>
      {overlay}
      <div className={`flex items-start gap-1 font-sans font-bold text-xl leading-tight ${card.titleCls}`}>
        <span>{card.title}</span>
        <ChevronRight className="h-5 w-5 shrink-0 mt-0.5" />
      </div>
      <p className={`text-sm ${card.descCls}`}>{card.teaser}</p>
      {card.illustration && (
        <div className="mt-auto overflow-hidden">{card.illustration}</div>
      )}
    </>
  );

  if (isDesktop) {
    return (
      <motion.a
        href="#services"
        onClick={(e) => { e.preventDefault(); scrollTo("services"); }}
        className="flex-1 rounded-3xl p-6 cursor-pointer h-[300px] flex flex-col gap-2 relative overflow-hidden"
        style={{ backgroundColor: card.bg, rotate: card.desktopRotate, zIndex: index === 1 ? 2 : 1 }}
        initial={{ opacity: 0, y: prefersReducedMotion ? card.desktopY : card.desktopY + 60 }}
        whileInView={{ opacity: 1, y: card.desktopY }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: index * 0.12 }}
        whileHover={{ y: card.desktopY - 16, zIndex: 3, transition: { duration: 0.25, ease: "easeOut" as const } }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.a
      href="#services"
      onClick={(e) => { e.preventDefault(); scrollTo("services"); }}
      className="rounded-3xl p-6 cursor-pointer w-full relative min-h-[240px] flex flex-col gap-2 overflow-hidden"
      style={{ backgroundColor: card.bg, zIndex: index + 1, marginTop: index > 0 ? "-60px" : "0" }}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" as const, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" as const } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {content}
    </motion.a>
  );
}

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const posthog = usePostHog();

  function makeVariants(y: number, delay: number): Variants {
    return {
      hidden: { opacity: 0, y: prefersReducedMotion ? 0 : y },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const, delay },
      },
    };
  }

  return (
    <section
      className="min-h-screen relative overflow-hidden flex flex-col"
      aria-label="Sekcja główna"
    >
      {/* Blobs */}
      <div className="hero-blob" aria-hidden="true" />
      <div className="hero-blob hero-blob-sm" aria-hidden="true" />

      {/* Centered content stack */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center relative z-10 pt-32 pb-10">
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center gap-6">
          {/* Main headline */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-[8rem] font-extrabold tracking-tight text-foreground font-sans"
            initial="hidden"
            animate="visible"
            variants={makeVariants(30, 0.15)}
          >
            <span className="sr-only">Agencja marketingowa dla domków letniskowych — </span>
            Twój Spotlight
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            className="text-base md:text-lg text-muted-foreground max-w-xl font-body"
            initial="hidden"
            animate="visible"
            variants={makeVariants(20, 0.3)}
          >
            Kompleksowa{" "}
            <span className="text-foreground font-semibold">
              OBSŁUGA MARKETINGOWA
            </span>{" "}
            Twojej strony internetowej oraz mediów społecznościowych. W branży
            od ponad 8 lat.
          </motion.p>

          {/* CTA pair */}
          <motion.div
            className="flex gap-3 flex-wrap justify-center"
            initial="hidden"
            animate="visible"
            variants={makeVariants(10, 0.45)}
          >
            <CtaButton onClick={() => { posthog?.capture("cta_clicked", { location: "hero" }); scrollTo("contact"); }} label="Bezpłatna konsultacja" />
            <HoverLink
              href="#services"
              onClick={(e) => { e.preventDefault(); scrollTo("services"); }}
              textClassName="text-foreground text-sm font-medium px-4"
            >
              Zobacz ofertę
            </HoverLink>
          </motion.div>
        </div>
      </div>

      {/* Desktop: fan layout */}
      <div className="hidden md:flex flex-row justify-center items-start gap-3 max-w-6xl mx-auto px-8 pt-0 relative z-10 mb-35">
        {cards.map((card, index) => (
          <CardItem key={card.title} card={card} index={index} prefersReducedMotion={prefersReducedMotion} isDesktop={true} />
        ))}
      </div>

      {/* Mobile: stacked deck */}
      <div className="flex md:hidden flex-col px-6 pt-0">
        {cards.map((card, index) => (
          <CardItem key={card.title} card={card} index={index} prefersReducedMotion={prefersReducedMotion} isDesktop={false} />
        ))}
      </div>

      {/* Section divider */}
      <div className="border-b border-border mt-6" />
    </section>
  );
}
