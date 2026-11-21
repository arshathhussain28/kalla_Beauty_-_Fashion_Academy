"use client";

import { useEffect } from "react";

/**
 * Smooth scrolling (Lenis). The wheel no longer jumps the page by a fixed step — it eases, which
 * is what makes a scroll-driven site feel expensive rather than mechanical.
 *
 * Deliberate choices:
 *  - **Loaded only when it will be used.** The library is imported dynamically *after* the
 *    checks below, so a phone or a reduced-motion visitor never downloads it at all.
 *  - **Wheel and keyboard only.** `syncTouch` stays off: fighting a phone's native momentum
 *    scrolling feels worse than leaving it alone, and it breaks the pinned sections' timing.
 *  - **Native scroll position is preserved**, so `useScroll`, the pinned journey, sticky headers
 *    and anchor links keep working exactly as before — Lenis only animates how fast we get there.
 *  - **Nothing is trapped**: `overflow-y: auto` panels (the mobile menu, the lightbox) are left to
 *    the browser, and Lenis is stopped while a dialog has the body locked.
 */
export function SmoothScroll() {
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (coarse.matches || reduced.matches) return;

    let lenis: { raf: (t: number) => void; destroy: () => void; stop: () => void; start: () => void } | null = null;
    let frame = 0;
    let observer: MutationObserver | null = null;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({
        // ~0.9 s to settle: long enough to read as glide, short enough that the page still
        // answers the wheel immediately.
        duration: 0.9,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);

      // While a dialog locks the body (mobile menu, lightbox), hand scrolling back to the
      // browser so the panel's own overflow works normally.
      observer = new MutationObserver(() => {
        if (document.body.style.overflow === "hidden") lenis?.stop();
        else lenis?.start();
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      lenis?.destroy();
    };
  }, []);

  return null;
}
