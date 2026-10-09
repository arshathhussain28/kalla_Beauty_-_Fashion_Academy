import type { Metadata } from "next";
import { SITE_LOCATION, SITE_PHONE_TEL } from "@/data/site";

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

/**
 * schema.org description of the academy. Only facts the client confirmed on both posters:
 * the name, tagline, phone number and town. No street address, hours, ratings, reviews or
 * accreditations — add them here only once they are verified.
 */
export function organizationJsonLd(): Record<string, unknown> {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_NAME,
    slogan: SITE_TAGLINE,
    url: siteUrl,
    logo: `${siteUrl}/brand/kala-logo-primary.jpg`,
    telephone: SITE_PHONE_TEL,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_LOCATION,
      addressCountry: "IN",
    },
  };
}

/**
 * Search indexing is off unless NEXT_PUBLIC_ALLOW_INDEXING=true. Review and staging
 * deployments (placeholder photography, unconfirmed fees) must not end up in search
 * results; set the variable on the production launch deployment only.
 */
export function isIndexingAllowed(): boolean {
  return process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
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
  // The approved KALA logo on the brand cream, 1200×630, ~50 KB (public/og-image.jpg). Kept
  // small on purpose: WhatsApp drops link-preview images that are too heavy. Replace it with a
  // real photograph once one is approved for sharing.
  ogImage = "/og-image.jpg",
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${SITE_NAME} — ${SITE_TAGLINE}` }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots:
      noIndex || !isIndexingAllowed()
        ? { index: false, follow: false }
        : { index: true, follow: true },
  };
}
