import { buildMetadata } from "@/lib/seo";
import { PRIVACY_POLICY } from "@/data/legal";
import { LegalDocument } from "@/components/legal/LegalDocument";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "What personal information KALA collects through this website, and why.",
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return <LegalDocument doc={PRIVACY_POLICY} />;
}
