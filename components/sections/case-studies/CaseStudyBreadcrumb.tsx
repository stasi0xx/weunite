import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function CaseStudyBreadcrumb() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-8">
      <Link
        href="/realizacje"
        className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        <ArrowLeft
          className="h-4 w-4 transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
        Wszystkie realizacje
      </Link>
    </div>
  )
}
