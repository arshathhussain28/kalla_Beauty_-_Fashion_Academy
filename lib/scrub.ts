import { useTransform, type MotionValue } from "framer-motion";

type Stop<T> = readonly [progress: number, value: T];

/**
 * Maps scroll progress to a value through a list of [progress, value] stops.
 *
 * Always use this (not a bare `useTransform` with a short range) for scroll-linked
 * opacity / clip-path / filter / transform. Framer accelerates those with native scroll
 * timelines and passes the input range straight through as animation offsets; if the
 * range stops short of 1, the browser animates from the last stop *back to the element's
 * base style* — so a layer meant to stay hidden after its window slowly fades back in
 * (verified: a grid meant to be gone after 0.83 read 0.41 opacity at 0.9). Padding the
 * first and last stop out to 0 and 1 makes the mapping hold its end values.
 */
export function useScrub<T extends number | string>(
  progress: MotionValue<number>,
  stops: readonly Stop<T>[]
) {
  const first = stops[0];
  const last = stops[stops.length - 1];
  const padded: Stop<T>[] = [
    ...(first[0] > 0 ? [[0, first[1]] as Stop<T>] : []),
    ...stops,
    ...(last[0] < 1 ? [[1, last[1]] as Stop<T>] : []),
  ];

  return useTransform(
    progress,
    padded.map((stop) => stop[0]),
    padded.map((stop) => stop[1])
  );
}
