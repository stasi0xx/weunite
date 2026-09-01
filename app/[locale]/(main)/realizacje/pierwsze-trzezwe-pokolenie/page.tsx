import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import CustomerSuccessSection from "@/components/sections/CustomerSuccessSection"
import { CaseStudyBreadcrumb } from "@/components/sections/case-studies/CaseStudyBreadcrumb"
import ScrollToTop from "@/components/ui/ScrollToTop"
import { buildAlternates } from "@/lib/seo"
import type { AppLocale } from "@/i18n/routing"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: AppLocale }
  const t = await getTranslations({
    locale,
    namespace: "caseStudies.projects.pierwszeTrzezwePokolenie.meta",
  })

  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(
      "/realizacje/pierwsze-trzezwe-pokolenie",
      locale
    ),
  }
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
