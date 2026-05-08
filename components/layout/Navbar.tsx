"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { HoverLink } from "@/components/ui/hover-link";
import { CtaButton } from "@/components/ui/CtaButton";

const navLinks = [
  { label: "Co robimy", href: "#co-robimy" },
  { label: "Dla kogo", href: "#dla-kogo" },
  { label: "Jak działamy", href: "#jak-dzialamy" },
  { label: "Polecają", href: "#polecaja" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b border-border transition-all duration-300 ${
          scrolled
            ? "py-2 bg-background/90 backdrop-blur-md shadow-sm"
            : "py-4 bg-background/80 backdrop-blur-md"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="font-sans font-extrabold text-xl text-foreground cursor-pointer select-none"
          >
            WeUnite
          </motion.a>

          <ul className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <HoverLink
                  href={link.href}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium"
                >
                  {link.label}
                </HoverLink>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <CtaButton onClick={scrollToContact} />
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-foreground backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              key="menu"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 right-0 z-50 h-3/4 bg-background flex flex-col px-6 pt-5 pb-8 rounded-b-3xl overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-sans font-extrabold text-xl text-foreground">
                  WeUnite
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-1 text-muted-foreground"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <ul className="flex flex-col flex-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.25, ease: "easeOut" }}
                    className="border-b border-border"
                  >
                    <HoverLink
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center py-4 text-lg font-medium"
                      bgClassName="rounded-lg"
                      textClassName="text-foreground"
                    >
                      {link.label}
                    </HoverLink>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.25 }}
                className="mt-6"
              >
                <CtaButton onClick={scrollToContact} fullWidth />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
