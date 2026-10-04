import type { Metadata } from "next";

export const SITE_NAME = "KALA Beauty & Fashion Academy";
export const SITE_TAGLINE = "Craft Your Confidence";
// Built only from claims the client's own course document and posters make: the real
// catalogue (data/courses.ts), hands-on training, small batches, a practical
// assessment and a completion certificate. No cohort sizes, tutor credentials or outcomes.
export const DEFAULT_DESCRIPTION =
  "KALA Beauty & Fashion Academy offers advanced, practical courses in makeup, beauty, mehendi, saree draping and tailoring & fashion design — hands-on training in small batches, with a practical assessment and a course completion certificate.";

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

interface PageMetadataInput {
  title: string;
  description?: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  /** Bypass the root layout's `%s | KALA…` template — use for the homepage only. */
  absoluteTitle?: boolean;
}

export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  ogImage = "/opengraph-image",
  noIndex = false,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const url = `${getSiteUrl()}${path}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
