"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

// Every animated element in the site is an `m.*` component, which carries no animation code
// of its own; this provider supplies the one shared feature set. `domAnimation` covers all the
// site uses — animate / variants / exit, whileInView, hover, tap — and leaves out drag and
// layout animation, which the full `motion.*` component would otherwise ship to every visitor
// (about 30 KB of JavaScript on every page). `strict` makes any stray `motion.*` fail loudly
// in development instead of quietly pulling the full bundle back in.
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
