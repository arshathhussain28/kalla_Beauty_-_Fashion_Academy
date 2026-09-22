import { buildMetadata } from "@/lib/seo";
import { PageStub } from "@/components/ui/PageStub";

export const metadata = buildMetadata({
  title: "About",
  description: "The story, philosophy and people behind KALA Beauty & Fashion Academy.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageStub
      eyebrow="About"
      title="Craft, Confidence, Career"
      description="The brand story and studio/people photography sections are scoped for the next build stage."
    />
  );
}
