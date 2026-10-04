import { buildMetadata, SITE_NAME } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { KalaJourney } from "@/components/sections/KalaJourney";
import { CraftDiscovery } from "@/components/sections/CraftDiscovery";
import { LearningMethod } from "@/components/sections/LearningMethod";
import { EditorialStory } from "@/components/sections/EditorialStory";
import { MadeAtKala } from "@/components/sections/MadeAtKala";
import { Faculty } from "@/components/sections/Faculty";
import { CareerDirections } from "@/components/sections/CareerDirections";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { EnquirySection } from "@/components/sections/EnquirySection";

export const metadata = buildMetadata({
  title: `${SITE_NAME} — Craft Your Confidence`,
  path: "/",
  absoluteTitle: true,
});

// A visual narrative rather than a brochure: arrive (hero) → believe (statement) →
// choose a craft → understand how it's taught → see the people and the work → see where
// it leads → act. Backgrounds alternate cream / white with exactly one wine band (the
// closing CTA), and no two consecutive sections share a layout.
export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <KalaJourney />
      <CraftDiscovery />
      <LearningMethod />
      <EditorialStory />
      <MadeAtKala />
      <Faculty />
      <CareerDirections />
      <FinalCTA />
      <EnquirySection />
    </main>
  );
}
