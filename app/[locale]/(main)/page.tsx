import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import HeroSection from "@/components/sections/HeroSection"
import ClientLogosSection from "@/components/sections/ClientLogosSection"
import ProblemSection from "@/components/sections/ProblemSection"
import ServicesSection from "@/components/sections/ServicesSection"
import CustomerSuccessSection from "@/components/sections/CustomerSuccessSection"
import ContactFormSection from "@/components/sections/ContactFormSection"
import ScrollToTop from "@/components/ui/ScrollToTop"
import { buildAlternates } from "@/lib/seo"
import type { AppLocale } from "@/i18n/routing"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: AppLocale }
  const t = await getTranslations({ locale, namespace: "common.seo" })

  return {
    // No `title` override: inherits the root layout's locale-aware
    // `title.default`, so the homepage doesn't double up "WeUnite | WeUnite".
    description: t("defaultDescription"),
    alternates: buildAlternates("/", locale),
  }
}

export default function Home() {
  return (
    <>
      <ScrollToTop />
      <HeroSection />
      <ClientLogosSection />
      <ProblemSection />
      <ServicesSection />
      <CustomerSuccessSection />
      <ContactFormSection />
    </>
  )
}
