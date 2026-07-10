import { HoverLink } from "@/components/ui/hover-link"

const legalLinks = [
  { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
  { label: "Polityka cookies", href: "/polityka-cookies" },
  { label: "Regulamin", href: "/regulamin" },
]

export default function MinimalFooter() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          Copyright © 2026 WeUnite. All rights reserved.
        </p>
        <ul className="flex items-center gap-1">
          {legalLinks.map((link) => (
            <li key={link.href}>
              <HoverLink href={link.href} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs">
                {link.label}
              </HoverLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
