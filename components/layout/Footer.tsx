import { HoverLink } from "@/components/ui/hover-link";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const sectionLinks = [
  { label: "O nas", href: "#o-nas" },
  { label: "Co robimy", href: "#co-robimy" },
  { label: "Dla kogo", href: "#dla-kogo" },
  { label: "Jak działamy", href: "#jak-dzialamy" },
  { label: "Polecają", href: "#polecaja" },
  { label: "Kontakt", href: "#kontakt" },
];

const legalLinks = [
  { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
  { label: "Regulamin", href: "/regulamin" },
];

const socialLinks = [
  { Icon: LinkedinIcon, href: "https://linkedin.com/company/weunite", label: "LinkedIn" },
  { Icon: FacebookIcon, href: "https://facebook.com/weunite", label: "Facebook" },
  { Icon: InstagramIcon, href: "https://instagram.com/weunite", label: "Instagram" },
];

const allMobileLinks = [...sectionLinks, ...legalLinks];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-card border-t border-border pt-16 pb-8">
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 font-sans font-extrabold leading-none select-none pointer-events-none whitespace-nowrap text-foreground"
        style={{ fontSize: "clamp(6rem, 18vw, 16rem)", opacity: 0.04 }}
      >
        WeUnite
      </span>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ── Desktop ── */}
        <div className="hidden md:flex items-start justify-between gap-12 mb-12">
          <a href="#" className="font-sans font-extrabold text-2xl text-foreground shrink-0">
            WeUnite
          </a>

          <ul className="space-y-1">
            {sectionLinks.map((link) => (
              <li key={link.href}>
                <HoverLink href={link.href} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm">
                  {link.label}
                </HoverLink>
              </li>
            ))}
          </ul>

          <ul className="space-y-1">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <HoverLink href={link.href} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm">
                  {link.label}
                </HoverLink>
              </li>
            ))}
          </ul>

          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Adres: ul. Gdyńska G/9,
              <br />
              80-340 Gdańsk
            </p>
            <p>
              Email:{" "}
              <HoverLink href="mailto:info@weunite.pl" className="inline-flex items-center px-2 py-0.5 rounded-full">
                info@weunite.pl
              </HoverLink>
            </p>
            <p>
              Telefon:{" "}
              <HoverLink href="tel:+48537732320" className="inline-flex items-center px-2 py-0.5 rounded-full">
                +48 537 732 320
              </HoverLink>
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            {socialLinks.map(({ Icon, href, label }) => (
              <HoverLink
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex items-center justify-center p-2 rounded-full"
              >
                <Icon className="h-5 w-5" />
              </HoverLink>
            ))}
          </div>
        </div>

        {/* ── Mobile ── */}
        <div className="md:hidden mb-8">
          <div className="flex items-center justify-between mb-8">
            <a href="#" className="font-sans font-extrabold text-2xl text-foreground">
              WeUnite
            </a>
            <div className="flex items-center gap-1">
              {socialLinks.map(({ Icon, href, label }) => (
                <HoverLink
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center justify-center p-2 rounded-full"
                >
                  <Icon className="h-5 w-5" />
                </HoverLink>
              ))}
            </div>
          </div>

          <ul className="flex flex-col">
            {allMobileLinks.map((link, i) => (
              <li key={link.href}>
                <HoverLink
                  href={link.href}
                  className="flex items-center justify-center py-3.5 text-sm"
                  bgClassName=""
                >
                  {link.label}
                </HoverLink>
                {i < allMobileLinks.length - 1 && (
                  <div className="h-px bg-border" />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom row — copyright */}
        <div className="border-t border-border pt-6">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            Copyright © 2026 WeUnite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
