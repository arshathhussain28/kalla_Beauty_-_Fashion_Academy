import Image from "next/image";
import Link from "next/link";
import { generalEnquiryWhatsAppLink } from "@/lib/whatsapp";

// §16 Website System: Deep Wine ground, cream type, rose-gold hairline above, three
// columns, monogram bottom-left.
const EXPLORE_LINKS = [
  { href: "/courses", label: "Courses" },
  { href: "/why-kala", label: "Why KALA" },
  { href: "/the-work", label: "The Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-rose bg-wine-deep text-cream">
      <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-12">
        <div className="grid gap-12 sm:grid-cols-3">
          <div className="flex flex-col items-start gap-4">
            {/* items-start matters here: a flex-col container defaults to
                align-items: stretch, which was forcing this image to the column's
                full width and squashing/stretching it despite w-auto. */}
            {/* Stacked, not side-by-side — this column is too narrow at sm/md for the
                tracked descriptor to sit next to the icon without wrapping mid-word. */}
            {/* alt="" — decorative right above the "KALA" text. */}
            <Image
              src="/brand/kala-icon.jpg?v=3"
              alt=""
              width={944}
              height={944}
              className="h-12 w-auto rounded-sm"
            />
            <span className="flex flex-col">
              <span className="font-display text-2xl font-semibold leading-none tracking-[0.01em] text-cream">
                KALA
              </span>
              <span className="mt-1.5 text-descriptor font-sans uppercase tracking-[0.2em] text-rose-light">
                Beauty &amp; Fashion Academy
              </span>
            </span>
            <p className="max-w-[26ch] text-small text-cream/75">
              We teach the craft. You keep the confidence.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-light">
              Explore
            </p>
            <nav className="flex flex-col gap-3">
              {EXPLORE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-small text-cream/85 transition-colors hover:text-rose-light"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-light">
              Get in Touch
            </p>
            <div className="flex flex-col gap-3 text-small text-cream/85">
              <a
                href={generalEnquiryWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-rose-light"
              >
                WhatsApp Us
              </a>
              <a href="tel:+910000000000" className="transition-colors hover:text-rose-light">
                Call the Academy
              </a>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-rose-light"
              >
                Find Us on Google Maps
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-rose-light"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-cream/15 pt-8 text-descriptor uppercase tracking-[0.3em] text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} KALA Beauty and Fashion Academy</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-rose-light">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-rose-light">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
