import type { Metadata } from "next"
import MinimalHeader from "@/components/layout/MinimalHeader"
import MinimalFooter from "@/components/layout/MinimalFooter"

export const metadata: Metadata = {
  title: "Bezpłatna wizualizacja strony",
  description:
    "Odbierz bezpłatną wizualizację nowej strony z systemem rezerwacji dla swojego biznesu. Zero zobowiązań, zero kosztów.",
}

export default function WizualizacjaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="hero-blob" />
        <div className="hero-blob hero-blob-sm" />
      </div>
      <MinimalHeader />
      <main className="relative">{children}</main>
      <MinimalFooter />
    </>
  )
}
