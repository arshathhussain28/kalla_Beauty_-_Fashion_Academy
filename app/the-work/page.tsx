import { buildMetadata } from "@/lib/seo";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { WorkGallery } from "@/components/work/WorkGallery";
import { WorkHero } from "@/components/work/WorkHero";

export const metadata = buildMetadata({
  title: "The Work",
  description:
    "Made at KALA — student work across makeup, beauty, mehendi, saree draping and fashion.",
  path: "/the-work",
});

// An editorial gallery, not a grid: five craft chapters, each composed differently, with
// one full-bleed pause in the middle, a craft filter and a lightbox. Every frame is a named
// slot in data/images.ts, so real photographs drop in without touching this file. Closes
// on the site's one wine band.
export default function TheWorkPage() {
  return (
    <main className="flex-1">
      <WorkHero />
      <WorkGallery />
      <FinalCTA />
    </main>
  );
}
