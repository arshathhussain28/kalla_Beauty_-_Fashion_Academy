import { buildMetadata } from "@/lib/seo";
import { ABOUT_ENQUIRY } from "@/data/about";
import { AboutBeliefs } from "@/components/about/AboutBeliefs";
import { AboutDirections } from "@/components/about/AboutDirections";
import { AboutExperience } from "@/components/about/AboutExperience";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutMethod } from "@/components/about/AboutMethod";
import { AboutPeople } from "@/components/about/AboutPeople";
import { AboutStory } from "@/components/about/AboutStory";
import { PageEnquiry } from "@/components/editorial/PageEnquiry";

export const metadata = buildMetadata({
  title: "About",
  description: "The story, philosophy and people behind KALA Beauty & Fashion Academy.",
  path: "/about",
});

// The brand story, told in order: why KALA exists → what it believes (Craft → Confidence →
// Career) → how it teaches (the one wine band) → what students experience → where it can
// lead → the people → the enquiry. Cream and white alternate around the wine moment.
export default function AboutPage() {
  return (
    <main className="flex-1">
      <AboutHero />
      <AboutStory />
      <AboutBeliefs />
      <AboutMethod />
      <AboutExperience />
      <AboutDirections />
      <AboutPeople />
      <PageEnquiry
        eyebrow={ABOUT_ENQUIRY.eyebrow}
        title={ABOUT_ENQUIRY.title}
        description={ABOUT_ENQUIRY.description}
        source="about"
      />
    </main>
  );
}
