"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Sits right under "01 — Wyzwanie": the actual reel built to answer it,
 * framed as if it were playing on a phone screen.
 */
export default function ChallengeReel() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="mx-auto max-w-7xl px-6 pb-24 md:pb-32"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative mx-auto w-fit rounded-[2rem] bg-[#0a0a0a] p-2 shadow-2xl shadow-black/60 ring-1 ring-white/10 sm:p-2.5">
        <div className="relative aspect-[9/16] w-[280px] overflow-hidden rounded-[1.5rem] bg-black sm:w-[340px] md:w-[380px]">
          <video
            className="h-full w-full object-cover"
            src="/casestudy/reel-ptp.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>

        <svg
          viewBox="0 0 90 160"
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ overflow: "visible" }}
          aria-hidden="true"
        >
          {/* Dynamic-island notch */}
          <rect x="30" y="5" width="30" height="7" rx="3.5" fill="#0a0a0a" />
          <circle cx="55" cy="8.5" r="1.4" fill="#1c1c1c" />

          {/* Side buttons */}
          <rect x="-1.2" y="32" width="1.2" height="9" rx="0.6" fill="#0a0a0a" />
          <rect x="-1.2" y="45" width="1.2" height="14" rx="0.6" fill="#0a0a0a" />
          <rect x="90" y="38" width="1.2" height="16" rx="0.6" fill="#0a0a0a" />

          {/* Home indicator */}
          <rect
            x="33"
            y="153.5"
            width="24"
            height="1.4"
            rx="0.7"
            fill="#ffffff"
            fillOpacity="0.7"
          />
        </svg>
      </div>
    </motion.div>
  );
}
