import HeroSection from "@/components/sections/HeroSection";
import ClientLogosSection from "@/components/sections/ClientLogosSection";
import ProblemSection from "@/components/sections/ProblemSection";
import ServicesSection from "@/components/sections/ServicesSection";
import EndorsementSection from "@/components/sections/EndorsementSection";
import ContactFormSection from "@/components/sections/ContactFormSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ClientLogosSection />
      <ProblemSection />
      <ServicesSection />
      <EndorsementSection />
      <ContactFormSection />
    </main>
  );
}
