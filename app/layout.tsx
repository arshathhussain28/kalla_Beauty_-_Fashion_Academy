import type { Metadata } from "next";
import localFont from "next/font/local";
import { DEFAULT_DESCRIPTION, SITE_NAME, getSiteUrl } from "@/lib/seo";
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

const manrope = localFont({
  src: "./fonts/manrope-variable.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE_NAME} — Craft. Confidence. Career.`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: "/icon",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${manrope.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-charcoal antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
