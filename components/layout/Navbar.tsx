"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { HoverLink } from "@/components/ui/hover-link";
import { CtaButton } from "@/components/ui/CtaButton";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("common.nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: t("links.services"), href: "#services" },
    { label: t("links.mission"), href: "#mission" },
    { label: t("links.customerSuccess"), href: "#customer-success" },
    { label: t("links.realizacje"), href: "/realizacje" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b border-border transition-all duration-300 ${scrolled
            ? "py-2 bg-background/90 backdrop-blur-md shadow-sm"
            : "py-4 bg-background/80 backdrop-blur-md"
          }`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="cursor-pointer select-none">
            <motion.span
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-block font-sans font-extrabold text-xl text-foreground"
            >
              {t("logo")}
            </motion.span>
          </Link>

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

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <CtaButton onClick={scrollToContact} label={t("cta")} />
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t("closeMenu") : t("toggleMenu")}
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
                <Link href="/" className="font-sans font-extrabold text-xl text-foreground">
                  {t("logo")}
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label={t("closeMenu")}
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
                transition={{ delay: 0.24, duration: 0.25 }}
                className="flex justify-center mb-4"
              >
                <LanguageSwitcher />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.25 }}
                className="mt-2"
              >
                <CtaButton onClick={scrollToContact} label={t("cta")} fullWidth />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
