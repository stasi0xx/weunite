import type { Metadata } from "next"
import SocialHero from "@/components/sections/social/SocialHero"
import SocialPillarsSection from "@/components/sections/social/SocialPillarsSection"
import SocialReelsSection from "@/components/sections/social/SocialReelsSection"
import SocialCtaSection from "@/components/sections/social/SocialCtaSection"
import SocialSuccessCarousel from "@/components/sections/social/SocialSuccessCarousel"
import ScrollToTop from "@/components/ui/ScrollToTop"

export const metadata: Metadata = {
  title: "Social media marketing",
  description:
    "Od 8 lat jednoczymy społeczności z markami w świecie social mediów — Instagram, TikTok i kampanie reklamowe, które sprzedają.",
  alternates: { canonical: "https://www.weunite.pl/social-media" },
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
