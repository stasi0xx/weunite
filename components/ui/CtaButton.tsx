"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function CtaButton({
  onClick,
  fullWidth,
  label = "Umów rozmowę",
  size = "md",
}: {
  onClick: () => void;
  fullWidth?: boolean;
  label?: string;
  size?: "md" | "lg";
}) {
  const [hovered, setHovered] = useState(false);

  const sizeClasses =
    size === "lg" ? "text-base px-8 py-3.5" : "text-sm px-6 py-2.5";

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`relative overflow-hidden rounded-full bg-primary text-white font-medium cursor-pointer ${sizeClasses}${fullWidth ? " w-full" : ""}`}
    >
      <span
        className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.18) 0%, transparent 68%)",
          opacity: hovered ? 1 : 0,
        }}
      />
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}
