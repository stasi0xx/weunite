import type { ReactNode } from "react"

interface Section {
  title: string
  children: ReactNode
}

interface Props {
  title: string
  lastUpdated: string
  children: ReactNode
}

export function LegalSection({ title, children }: Section) {
  return (
    <section className="mb-10">
      <h2 className="font-sans font-bold text-xl text-foreground mb-4">{title}</h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-muted-foreground">{children}</div>
    </section>
  )
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

export default function LegalPageLayout({ title, lastUpdated, children }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-12">
          <p className="text-sm text-muted-foreground mb-3 font-body">
            Ostatnia aktualizacja: {lastUpdated}
          </p>
          <h1 className="font-sans font-extrabold text-4xl md:text-5xl text-foreground tracking-tight">
            {title}
          </h1>
        </div>

        <div className="border-t border-border pt-10">{children}</div>

        <div className="border-t border-border mt-12 pt-8 text-sm text-muted-foreground">
          <p>
            Pytania? Napisz do nas:{" "}
            <a href="mailto:info@weunite.pl" className="text-foreground underline underline-offset-4">
              info@weunite.pl
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
