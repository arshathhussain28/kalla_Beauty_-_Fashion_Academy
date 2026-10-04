"use client";

import { motion, useScroll } from "framer-motion";

// A hairline across the very top of the viewport that fills as the page is read. Wine on
// cream at 2px — present if you look for it, invisible if you don't. `scaleX` is bound
// straight to scroll progress (a full 0 → 1 range), so it stays on the compositor.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      data-reveal
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-wine/70"
    />
  );
}
