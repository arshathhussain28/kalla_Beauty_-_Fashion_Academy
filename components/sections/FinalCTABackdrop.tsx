"use client";

import { m } from "framer-motion";
import { EASE_CINEMATIC, VIEWPORT_ONCE } from "@/lib/motion";

// The closing band's scenery — "the doorway". Everything here is decoration: hidden from
// assistive technology, transform/opacity only (nothing can shift the layout), and stilled by
// the prefers-reduced-motion rules in globals.css (see the .kala-cta-* classes and the
// [data-reveal-path] hook there).

// Four concentric arches — the brand's one soft shape, echoing the arched photographs — drawn on
// a 1200×600 canvas that is bottom-centre anchored and sliced, so a desktop sees all four and a
// phone sees the two inner ones, large. `top` is the crown of the arch; the curve starts one
// radius below it.
const ARCHES = [
  { r: 80, top: 220, opacity: 0.85 },
  { r: 150, top: 160, opacity: 0.65 },
  { r: 270, top: 80, opacity: 0.45 },
  { r: 400, top: 20, opacity: 0.3 },
] as const;

function archPath(r: number, top: number) {
  const start = top + r;
  return `M${600 - r} 600V${start}A${r} ${r} 0 0 1 ${600 + r} ${start}V600`;
}

// Gold dust: fixed values (not random) so the server and the browser render the same thing.
// `x` is the horizontal start (%), `s` the size (px), `d` the seconds a mote takes to rise, and
// `delay` is negative so the dust is already mid-air when the section scrolls into view.
const MOTES = [
  { x: 6, s: 2, d: 15, delay: -3, drift: 18 },
  { x: 14, s: 3, d: 18, delay: -11, drift: -14 },
  { x: 22, s: 2, d: 13, delay: -6, drift: 22 },
  { x: 31, s: 4, d: 19, delay: -15, drift: -20 },
  { x: 39, s: 2, d: 14, delay: -1, drift: 12 },
  { x: 47, s: 3, d: 17, delay: -9, drift: -10 },
  { x: 55, s: 2, d: 12, delay: -4, drift: 16 },
  { x: 63, s: 3, d: 20, delay: -13, drift: -22 },
  { x: 71, s: 2, d: 15, delay: -7, drift: 14 },
  { x: 79, s: 4, d: 18, delay: -2, drift: -16 },
  { x: 86, s: 2, d: 13, delay: -10, drift: 20 },
  { x: 92, s: 3, d: 16, delay: -5, drift: -12 },
] as const;

const WORDS = "CRAFT · CONFIDENCE · CAREER · ".repeat(4);

export function FinalCTABackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Two slow pools of light — rose-gold top left, lifted wine bottom right — drifting
          against each other. Radial gradients, not blur filters, so they cost almost nothing. */}
      <div className="kala-cta-glow-a absolute -left-[12%] -top-[30%] h-[520px] w-[520px] rounded-full sm:h-[780px] sm:w-[780px]" />
      <div className="kala-cta-glow-b absolute -bottom-[38%] -right-[14%] h-[560px] w-[560px] rounded-full sm:h-[820px] sm:w-[820px]" />

      {/* The doorway's light, rising from the floor between the arches. */}
      <div className="kala-cta-breathe absolute inset-x-0 bottom-0 h-[88%] bg-[radial-gradient(ellipse_38%_78%_at_50%_100%,rgba(232,196,188,0.36),transparent_74%)]" />

      {/* The three words of the brand, outlined and almost not there, sliding slowly past. */}
      <div className="absolute inset-x-0 top-[5%] overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_18%,#000_82%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_18%,#000_82%,transparent)]">
        <div className="kala-cta-marquee flex w-max whitespace-nowrap font-display text-[clamp(96px,15vw,220px)] font-semibold leading-none tracking-[0.02em] text-transparent [-webkit-text-stroke:1px_rgba(232,196,188,0.24)]">
          <span>{WORDS}</span>
          <span>{WORDS}</span>
        </div>
      </div>

      {/* The arches draw themselves once, then breathe. */}
      <svg
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMax slice"
        className="kala-cta-arches absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="kala-cta-door" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#e8c4bc" stopOpacity="0.30" />
            <stop offset="0.7" stopColor="#d2938c" stopOpacity="0.06" />
            <stop offset="1" stopColor="#d2938c" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* The two inner arches are filled with light, fading in just after they are drawn. */}
        {ARCHES.slice(0, 2).map((arch, index) => (
          <m.path
            key={`fill-${arch.r}`}
            data-reveal
            d={archPath(arch.r, arch.top)}
            fill="url(#kala-cta-door)"
            stroke="none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 2, delay: 1.1 + index * 0.3, ease: EASE_CINEMATIC }}
          />
        ))}
        {ARCHES.map((arch, index) => (
          <m.path
            key={arch.r}
            data-reveal-path
            d={archPath(arch.r, arch.top)}
            fill="none"
            stroke="#d2938c"
            strokeOpacity={arch.opacity}
            strokeWidth={1.25}
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 2.6, delay: 0.2 + index * 0.28, ease: EASE_CINEMATIC }}
          />
        ))}
      </svg>

      {/* The band's top edge is solid wine, the same colour as the dome sitting on it, so the
          light and the arches fade into it instead of leaving a visible seam. */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-wine to-transparent" />

      {/* Gold dust, rising. Half of it is dropped on small screens. */}
      {MOTES.map((mote, index) => (
        <span
          key={mote.x}
          className={`kala-cta-mote${index % 2 ? " max-sm:hidden" : ""}`}
          style={
            {
              "--x": `${mote.x}%`,
              "--s": `${mote.s}px`,
              "--d": `${mote.d}s`,
              "--delay": `${mote.delay}s`,
              "--drift": `${mote.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
