import { buildMetadata } from "@/lib/seo";
import { PageStub } from "@/components/ui/PageStub";

export const metadata = buildMetadata({
  title: "Why KALA",
  description: "Learn by making — watch, practice, create, refine, present.",
  path: "/why-kala",
});

export default function WhyKalaPage() {
  return (
    <PageStub
      eyebrow="Learn by Making"
      title="Why KALA"
      description="The learning-journey visual (Watch → Practice → Create → Refine → Present) is scoped for the next build stage, after creative direction sign-off."
    />
  );
}
