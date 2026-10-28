import { buildMetadata } from "@/lib/seo";
import { TERMS_OF_SERVICE } from "@/data/legal";
import { LegalDocument } from "@/components/legal/LegalDocument";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms for using the KALA Beauty & Fashion Academy website.",
  path: "/terms",
  noIndex: true,
});

export default function TermsPage() {
  return <LegalDocument doc={TERMS_OF_SERVICE} />;
}
