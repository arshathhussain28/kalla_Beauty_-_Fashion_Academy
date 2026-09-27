import { buildMetadata } from "@/lib/seo";
import { PageStub } from "@/components/ui/PageStub";

export const metadata = buildMetadata({
  title: "The Work",
  description:
    "Made at KALA — student work across makeup, beauty, mehendi, saree draping and fashion.",
  path: "/the-work",
});

export default function TheWorkPage() {
  return (
    <PageStub
      eyebrow="Made at KALA"
      title="The Work"
      description="The editorial student-work grid is scoped for the next build stage, once real photography is available."
    />
  );
}
