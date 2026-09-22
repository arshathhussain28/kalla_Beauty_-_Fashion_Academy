"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// §16 Website System: cream, 72px tall, logo left, Jost CAPS 13px +0.18em links, wine
// CTA right, sticky with a 1px bottom border that only appears on scroll.
const NAV_LINKS = [
  { href: "/courses", label: "Courses" },
  { href: "/why-kala", label: "Why KALA" },
  { href: "/the-work", label: "The Work" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-[72px] border-b border-transparent bg-cream transition-colors",
        scrolled && "border-border"
      )}
    >
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6 lg:px-12">
        <Link href="/" className="flex items-center gap-3" aria-label="KALA home">
          <Image
            src="/brand/kala-logo-primary.jpg"
            alt="KALA"
            width={44}
            height={44}
            className="h-11 w-11 rounded-sm object-cover"
            priority
          />
          <span className="font-display text-xl font-semibold tracking-[0.01em] text-wine">
            KALA
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:text-wine"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" variant="primary">
            Enquire Now
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center text-ink lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="relative block h-4 w-6">
            <span
              className={cn(
                "absolute left-0 top-0 h-px w-6 bg-ink transition-transform",
                menuOpen && "translate-y-[7px] rotate-45"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[7px] h-px w-6 bg-ink transition-opacity",
                menuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[14px] h-px w-6 bg-ink transition-transform",
                menuOpen && "-translate-y-[7px] -rotate-45"
              )}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <div className="absolute inset-x-0 top-[72px] flex flex-col gap-6 border-b border-border bg-cream px-6 py-8 lg:hidden">
          <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
            Menu
          </p>
          <nav className="flex flex-col gap-5" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="font-display text-h2 text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" onClick={closeMenu} className="font-display text-h2 text-ink">
              Contact
            </Link>
          </nav>
          <Button href="/contact" variant="primary" className="mt-2 w-full" onClick={closeMenu}>
            Talk to a Course Advisor
          </Button>
        </div>
      )}
    </header>
  );
}
