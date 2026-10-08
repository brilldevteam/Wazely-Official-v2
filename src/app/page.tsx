import { Arches } from "@/components/home/arches";
import { BusinessBento } from "@/components/home/business-bento";
import { ContactCta } from "@/components/home/contact-cta";
import { ContactSection } from "@/components/home/contact-section";
import { FactsSection } from "@/components/home/facts-section";
import { FaqAccordion } from "@/components/home/faq-accordion";
import { HomeHero } from "@/components/home/hero";
import { HighlightsMarquee } from "@/components/home/highlights-marquee";
import { HowItWorks } from "@/components/home/how-it-works";
import { ModuleWall } from "@/components/home/module-wall";
import { ScrollProgress } from "@/components/home/motion-kit";
import { ProductSwitcher } from "@/components/home/product-switcher";
import { SolutionsTabs } from "@/components/home/solutions-tabs";
import { StartPaths } from "@/components/home/start-paths";
import { WhySection } from "@/components/home/why-section";

export default function Home() {
  return (
    <div className="bg-wz-bg">
      <ScrollProgress />
      <HomeHero />
      <WhySection />
      <ProductSwitcher />
      <SolutionsTabs />
      <BusinessBento />
      <HowItWorks />
      <ModuleWall />
      <Arches />
      <StartPaths />
      <FactsSection />
      <HighlightsMarquee />
      <FaqAccordion />
      <ContactCta />
      <ContactSection />
    </div>
  );
}
