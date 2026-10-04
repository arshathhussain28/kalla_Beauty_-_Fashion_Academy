"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { SITE_LOCATION, SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import { EASE_CINEMATIC } from "@/lib/motion";
import { generalEnquiryWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

// §16 Website System: cream, 72px tall, logo left, Jost CAPS 13px +0.18em links, wine
// CTA right, sticky with a 1px bottom border that only appears on scroll. On scroll the
// cream turns slightly translucent with a soft blur, so imagery passes beneath it
// without the bar ever feeling heavy. The height never changes — pinned sections below
// are positioned against the 72px.
const NAV_LINKS = [
  { href: "/courses", label: "Courses" },
  { href: "/why-kala", label: "Why KALA" },
  { href: "/the-work", label: "The Work" },
  { href: "/about", label: "About" },
];

const MENU_LINKS = [...NAV_LINKS, { href: "/contact", label: "Contact" }];

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_CINEMATIC } },
};

// The contact block arrives last, after the five links have settled.
const footerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_CINEMATIC, delay: 0.7 } },
};

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center gap-3" aria-label="KALA home">
      {/* alt="" — decorative alongside the "KALA" text right next to it; the
          Link's aria-label already gives the accessible name for this unit. */}
      <Image
        src="/brand/kala-icon.jpg?v=3"
        alt=""
        width={944}
        height={944}
        className="h-16 w-auto rounded-sm"
        priority
      />
      <span className="flex flex-col justify-center">
        <span className="font-display text-2xl font-semibold leading-none tracking-[0.01em] text-wine">
          KALA
        </span>
        <span className="mt-1.5 hidden text-descriptor font-sans uppercase tracking-[0.3em] text-rose-deep sm:block">
          Beauty &amp; Fashion Academy
        </span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the full-screen menu is open: freeze the page behind it, close on Escape, move
  // focus into the menu, and hand it back to the menu button afterwards.
  useEffect(() => {
    if (!menuOpen) return;
    const button = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
    <header
      className={cn(
        "sticky top-0 z-50 h-[72px] border-b transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-border bg-cream/85 backdrop-blur-md"
          : "border-transparent bg-cream"
      )}
    >
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6 lg:px-12">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              data-active={isActive(link.href)}
              className="group relative py-2 text-[13px] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:text-wine data-[active=true]:text-wine"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-wine transition-transform duration-500 ease-out group-hover:scale-x-100 group-data-[active=true]:scale-x-100"
              />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Magnetic>
            <Button
              href="/contact"
              variant="primary"
              className="transition-[background-color,transform] duration-300 hover:scale-[1.03]"
            >
              Enquire Now
            </Button>
          </Magnetic>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMenuOpen(true)}
          className="-mr-2 flex h-11 items-center gap-3 px-2 text-[13px] font-medium uppercase tracking-[0.18em] text-ink lg:hidden"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          Menu
          <span aria-hidden="true" className="flex w-6 flex-col gap-[5px]">
            <span className="h-px w-full bg-ink" />
            <span className="h-px w-4 self-end bg-ink" />
          </span>
        </button>
      </div>
    </header>

    {/* Outside the <header> on purpose: the header has a backdrop-filter once scrolled, and
        that makes it the containing block for any fixed child — the menu would be clipped to
        72px instead of covering the viewport. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_CINEMATIC }}
            className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-cream px-6 pb-[max(2rem,env(safe-area-inset-bottom))] lg:hidden"
          >
            <div className="flex h-[72px] shrink-0 items-center justify-between">
              <Logo onClick={closeMenu} />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMenu}
                className="-mr-2 flex h-11 items-center gap-3 px-2 text-[13px] font-medium uppercase tracking-[0.18em] text-ink"
                aria-label="Close menu"
              >
                Close
                <span aria-hidden="true" className="relative block h-5 w-5">
                  <span className="absolute left-0 top-1/2 h-px w-5 rotate-45 bg-ink" />
                  <span className="absolute left-0 top-1/2 h-px w-5 -rotate-45 bg-ink" />
                </span>
              </button>
            </div>

            <motion.nav
              aria-label="Mobile"
              variants={listVariants}
              initial="hidden"
              animate="show"
              className="mt-8 flex flex-col"
            >
              {MENU_LINKS.map((link) => (
                <motion.div key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "flex min-h-[64px] items-center justify-between border-b border-border font-display text-[36px] font-medium leading-none tracking-[0.01em] transition-colors",
                      isActive(link.href) ? "text-wine" : "text-ink"
                    )}
                  >
                    {link.label}
                    <span aria-hidden="true" className="text-[20px] text-rose">
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              variants={footerVariants}
              initial="hidden"
              animate="show"
              className="mt-auto space-y-6 pt-10"
            >
              <Button
                href={generalEnquiryWhatsAppLink({ source: "mobile-menu" })}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="w-full"
                onClick={() => trackEvent("whatsapp_click", { source: "mobile_menu" })}
              >
                Talk to KALA
              </Button>
              <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-small text-ink-muted">
                <a href={`tel:${SITE_PHONE_TEL}`} className="py-2 text-ink">
                  {SITE_PHONE_DISPLAY}
                </a>
                <span>{SITE_LOCATION}</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
