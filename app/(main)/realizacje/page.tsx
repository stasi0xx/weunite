import type { Metadata } from "next"
import CaseStudiesIntro from "@/components/sections/case-studies/CaseStudiesIntro"
import CaseStudiesList from "@/components/sections/case-studies/CaseStudiesList"
import CaseStudiesCta from "@/components/sections/case-studies/CaseStudiesCta"
import ScrollToTop from "@/components/ui/ScrollToTop"

export const metadata: Metadata = {
  title: "Realizacje",
  description:
    "Zobacz nasze realizacje: strony internetowe i kampanie social media dla dewelopera, klubu sportowego i fundacji — z opisem wyzwań i efektów.",
  alternates: { canonical: "https://www.weunite.pl/realizacje" },
}

export default function RealizacjePage() {
  return (
    <>
      <ScrollToTop />
      <CaseStudiesIntro />
      <CaseStudiesList />
      <CaseStudiesCta />
    </>
  )
}
