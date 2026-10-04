import { buildMetadata } from "@/lib/seo";
import { WHY_ENQUIRY } from "@/data/why-kala";
import { PageEnquiry } from "@/components/editorial/PageEnquiry";
import { AudienceSection } from "@/components/why/AudienceSection";
import { CareerSection } from "@/components/why/CareerSection";
import { ClosingStatement } from "@/components/why/ClosingStatement";
import { ConfidenceJourney } from "@/components/why/ConfidenceJourney";
import { CraftSection } from "@/components/why/CraftSection";
import { IdeaPillars } from "@/components/why/IdeaPillars";
import { KalaDifference } from "@/components/why/KalaDifference";
import { LearnByMaking } from "@/components/why/LearnByMaking";
import { MentorshipSection } from "@/components/why/MentorshipSection";
import { WhyHero } from "@/components/why/WhyHero";

export const metadata = buildMetadata({
  title: "Why KALA",
  description:
    "Discover the KALA learning philosophy built around craft, confidence and practical skill development in beauty and fashion.",
  path: "/why-kala",
});

// The belief page. The order is the argument: what we believe → how learning becomes
// confidence (the one wine band) → where it can lead → the people and the making →
// what is different → who it is for → a quiet statement → the enquiry. Backgrounds
// alternate cream / white around that single wine moment, and no two sections share a
// composition.
export default function WhyKalaPage() {
  return (
    <main className="flex-1">
      <WhyHero />
      <IdeaPillars />
      <CraftSection />
      <ConfidenceJourney />
      <CareerSection />
      <LearnByMaking />
      <MentorshipSection />
      <KalaDifference />
      <AudienceSection />
      <ClosingStatement />
      <PageEnquiry
        eyebrow={WHY_ENQUIRY.eyebrow}
        title={WHY_ENQUIRY.title}
        description={WHY_ENQUIRY.description}
        source="why-kala"
      />
    </main>
  );
}
