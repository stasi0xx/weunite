import type { Metadata } from "next"
import CustomerSuccessSection from "@/components/sections/CustomerSuccessSection"
import { CaseStudyBreadcrumb } from "@/components/sections/case-studies/CaseStudyBreadcrumb"
import ScrollToTop from "@/components/ui/ScrollToTop"

export const metadata: Metadata = {
  title: "Pierwsze Trzeźwe Pokolenie",
  description:
    "Kampania społeczna zbudowana od zera: ponad 27,2 mln kontaktów z marką w 6 miesięcy. Strategia, ambasadorowie i treści wideo dla Fundacji Columbus.",
  alternates: {
    canonical: "https://www.weunite.pl/realizacje/pierwsze-trzezwe-pokolenie",
  },
}

export default function PierwszeTrzezwePokoleniePage() {
  return (
    <>
      <ScrollToTop />
      <CaseStudyBreadcrumb />
      <CustomerSuccessSection />
    </>
  )
}
