import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import MinimalHeader from "@/components/layout/MinimalHeader"
import MinimalFooter from "@/components/layout/MinimalFooter"
import { buildAlternates } from "@/lib/seo"
import type { AppLocale } from "@/i18n/routing"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: AppLocale }
  const t = await getTranslations({ locale, namespace: "visualization.meta" })

  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates("/wizualizacja", locale),
  }
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
