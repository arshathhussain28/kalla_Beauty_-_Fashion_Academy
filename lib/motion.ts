// One easing curve for the whole site — slow out, no overshoot, so nothing bounces.
// (Matches the --ease used by the CSS keyframes in globals.css.)
export const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const;

// Shared viewport trigger: fire once, slightly before the element is fully in view.
export const VIEWPORT_ONCE = { once: true, margin: "0px 0px -10% 0px" } as const;
