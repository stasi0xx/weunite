import type { Metadata } from "next"
import CreoGedaniaSection from "@/components/sections/case-studies/creo-gedania/CreoGedaniaSection"
import { CaseStudyBreadcrumb } from "@/components/sections/case-studies/CaseStudyBreadcrumb"
import ScrollToTop from "@/components/ui/ScrollToTop"

export const metadata: Metadata = {
  title: "Creo Gedania",
  description:
    "Jak dwie rolki z lokalną twórczynią wygenerowały 50 000+ wyświetleń i 10 nowych uczniów dla prywatnej szkoły Creo Gedania w Gdańsku.",
  alternates: {
    canonical: "https://www.weunite.pl/realizacje/creo-gedania",
  },
}

export default function CreoGedaniaPage() {
  return (
    <>
      <ScrollToTop />
      <CaseStudyBreadcrumb />
      <CreoGedaniaSection />
    </>
  )
}
