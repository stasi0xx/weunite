import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import PolitykaCookiesContent from "@/components/sections/legal/PolitykaCookiesContent"
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
    namespace: "politykaCookies.meta",
  })

  return {
    title: t("title"),
    description: t("description"),
    robots: { index: true, follow: true },
    alternates: buildAlternates("/polityka-cookies", locale),
  }
}

export default function PolitykaCookiesPage() {
  return <PolitykaCookiesContent />
}
