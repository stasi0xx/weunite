import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import WebsitesHero from "@/components/sections/websites/WebsitesHero"
import WebsitesProcessSection from "@/components/sections/websites/WebsitesProcessSection"
import WebsitesCaseStudies from "@/components/sections/websites/WebsitesCaseStudies"
import ScrollToTop from "@/components/ui/ScrollToTop"
import { buildAlternates } from "@/lib/seo"
import type { AppLocale } from "@/i18n/routing"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: AppLocale }
  const t = await getTranslations({ locale, namespace: "websites.meta" })

  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates("/strony-internetowe", locale),
  }
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
