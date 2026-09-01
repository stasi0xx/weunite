import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import SocialHero from "@/components/sections/social/SocialHero"
import SocialPillarsSection from "@/components/sections/social/SocialPillarsSection"
import SocialReelsSection from "@/components/sections/social/SocialReelsSection"
import SocialCtaSection from "@/components/sections/social/SocialCtaSection"
import SocialSuccessCarousel from "@/components/sections/social/SocialSuccessCarousel"
import ScrollToTop from "@/components/ui/ScrollToTop"
import { buildAlternates } from "@/lib/seo"
import type { AppLocale } from "@/i18n/routing"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: AppLocale }
  const t = await getTranslations({ locale, namespace: "social.meta" })

  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates("/social-media", locale),
  }
}

export default function SocialMediaPage() {
  return (
    <>
      <ScrollToTop />
      <SocialHero />
      <SocialPillarsSection />
      <SocialCtaSection />

    </>
  )
}
