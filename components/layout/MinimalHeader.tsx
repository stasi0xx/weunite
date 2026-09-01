"use client"

import { Link } from "@/i18n/navigation"

export default function MinimalHeader() {
  return (
    <header className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center">
        <Link
          href="/"
          className="font-sans font-extrabold text-xl text-foreground cursor-pointer select-none"
        >
          WeUnite
        </Link>
      </div>
    </header>
  )
}
