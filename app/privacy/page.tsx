import { buildMetadata } from "@/lib/seo";
import { PageStub } from "@/components/ui/PageStub";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <PageStub
      eyebrow="Legal"
      title="Privacy Policy"
      description="Full policy text pending legal review — this page is a placeholder route so the footer link resolves correctly."
    />
  );
}
