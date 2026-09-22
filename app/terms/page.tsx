import { buildMetadata } from "@/lib/seo";
import { PageStub } from "@/components/ui/PageStub";

export const metadata = buildMetadata({
  title: "Terms of Service",
  path: "/terms",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <PageStub
      eyebrow="Legal"
      title="Terms of Service"
      description="Full terms pending legal review — this page is a placeholder route so the footer link resolves correctly."
    />
  );
}
