import VisualizationHero from "@/components/sections/visualization/VisualizationHero"
import ContactFormSection from "@/components/sections/ContactFormSection"
import CaseStudySection from "@/components/sections/visualization/CaseStudySection"
import ClientLogosSection from "@/components/sections/ClientLogosSection"
import ScrollToTop from "@/components/ui/ScrollToTop"

export default function WizualizacjaPage() {
  return (
    <>
      <ScrollToTop />
      <VisualizationHero />
      <ClientLogosSection />
      <CaseStudySection />
      <ContactFormSection showBackground={false} />
    </>
  )
}
