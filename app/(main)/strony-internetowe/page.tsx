import type { Metadata } from "next"
import WebsitesHero from "@/components/sections/websites/WebsitesHero"
import WebsitesProcessSection from "@/components/sections/websites/WebsitesProcessSection"
import WebsitesCaseStudies from "@/components/sections/websites/WebsitesCaseStudies"
import ScrollToTop from "@/components/ui/ScrollToTop"

export const metadata: Metadata = {
  title: "Strony internetowe",
  description:
    "Poznaj nasz proces realizacji inteligentnych stron internetowych — od audytu i architektury konwersji, przez design i wdrożenie, po automatyzację i skalowanie.",
  alternates: { canonical: "https://www.weunite.pl/strony-internetowe" },
}

export default function StronyInternetowePage() {
  return (
    <>
      <ScrollToTop />
      <WebsitesHero />
      <WebsitesProcessSection />
      <WebsitesCaseStudies />
    </>
  )
}
