import HeroSection from "@/components/sections/HeroSection"
import ClientLogosSection from "@/components/sections/ClientLogosSection"
import ProblemSection from "@/components/sections/ProblemSection"
import ServicesSection from "@/components/sections/ServicesSection"
import CustomerSuccessSection from "@/components/sections/CustomerSuccessSection"
import ContactFormSection from "@/components/sections/ContactFormSection"
import ScrollToTop from "@/components/ui/ScrollToTop"

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
