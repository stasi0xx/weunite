import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import CaseStudyDetail from "@/components/sections/case-studies/CaseStudyDetail"
import { getCaseStudyProject } from "@/components/sections/case-studies/data"
import ScrollToTop from "@/components/ui/ScrollToTop"
import { buildAlternates } from "@/lib/seo"
import type { AppLocale } from "@/i18n/routing"

const project = getCaseStudyProject("nowy-relaks")!

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: AppLocale }
  const t = await getTranslations({
    locale,
    namespace: "caseStudies.projects.nowyRelaks.meta",
  })

  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates("/realizacje/nowy-relaks", locale),
  }
}

export default function NowyRelaksPage() {
  return (
    <>
      <ScrollToTop />
      <CaseStudyDetail project={project} />
    </>
  )
}
