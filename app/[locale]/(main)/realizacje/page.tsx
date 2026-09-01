import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import CaseStudiesIntro from "@/components/sections/case-studies/CaseStudiesIntro"
import CaseStudiesList from "@/components/sections/case-studies/CaseStudiesList"
import CaseStudiesCta from "@/components/sections/case-studies/CaseStudiesCta"
import ScrollToTop from "@/components/ui/ScrollToTop"
import { buildAlternates } from "@/lib/seo"
import type { AppLocale } from "@/i18n/routing"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: AppLocale }
  const t = await getTranslations({ locale, namespace: "caseStudies.meta" })

  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates("/realizacje", locale),
  }
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
