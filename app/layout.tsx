import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  getSiteUrl,
  isIndexingAllowed,
  organizationJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { MotionProvider } from "@/components/MotionProvider";
import { Navbar } from "@/components/navigation/Navbar";
import { ScrollProgress } from "@/components/navigation/ScrollProgress";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/conversion/FloatingWhatsApp";
import "./globals.css";

// Vendored locally (see app/fonts/) rather than fetched via next/font/google at build
// time — this sandbox's Turbopack build can't reach fonts.gstatic.com even though plain
// Node fetch/curl can, so self-hosting the files directly sidesteps that build-time fetch.
const playfairDisplay = localFont({
  src: "./fonts/playfair-display-variable.woff2",
  variable: "--font-playfair",
  weight: "400 900",
  style: "normal",
  display: "swap",
});

// Body/UI face per the KALA Brand System (§05 Typography): Jost, a geometric humanist
// sans. The brand's script face is intentionally NOT loaded here — per the brand doc
// it exists only for the tagline as it appears inside the logo artwork itself and "may
// never set a headline, a name, a price, a caption or a button." Live tagline text on
// the site is set in Playfair Display (Title Case), matching the brand's own headline list.
const jost = localFont({
  src: "./fonts/jost-variable.woff2",
  variable: "--font-jost",
  weight: "300 700",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE_NAME} — Craft Your Confidence`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: "/icon",
  },
  robots: isIndexingAllowed() ? undefined : { index: false, follow: false },
};

// viewport-fit=cover lets the mobile action bar read the iPhone home-indicator inset via
// env(safe-area-inset-bottom); without it the inset is always 0.
export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${jost.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-cream pb-[calc(3.5rem+env(safe-area-inset-bottom))] font-sans text-ink antialiased lg:pb-0">
        <JsonLd data={organizationJsonLd()} />
        <MotionProvider>
          <ScrollProgress />
          <Navbar />
          {children}
          <Footer />
          <FloatingWhatsApp />
        </MotionProvider>
      </body>
    </html>
  );
}
