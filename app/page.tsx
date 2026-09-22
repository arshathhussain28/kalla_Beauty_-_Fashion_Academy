import { buildMetadata, SITE_NAME } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { FeaturedCourses } from "@/components/sections/FeaturedCourses";
import { WhyKala } from "@/components/sections/WhyKala";
import { StudentWorkTeaser } from "@/components/sections/StudentWorkTeaser";
import { Faculty } from "@/components/sections/Faculty";
import { Testimonials } from "@/components/sections/Testimonials";
import { Statistics } from "@/components/sections/Statistics";
import { EnquirySection } from "@/components/sections/EnquirySection";

export const metadata = buildMetadata({
  title: `${SITE_NAME} — Craft Your Confidence`,
  path: "/",
  absoluteTitle: true,
});

// Page hierarchy per the KALA Brand System §16: Hero → Courses → Why KALA →
// Student work → Faculty → Testimonials → Statistics (the one wine band) → Enquiry →
// Footer. This is the brand doc's own disciplined 9-beat structure, not the longer
// 14-section version from the generic planning prompt — "one dominant element per
// layout" argues for fewer, stronger sections over a maximalist scroll.
export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <FeaturedCourses />
      <WhyKala />
      <StudentWorkTeaser />
      <Faculty />
      <Testimonials />
      <Statistics />
      <EnquirySection />
    </main>
  );
}
