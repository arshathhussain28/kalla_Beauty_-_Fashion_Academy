/**
 * Copy for "The KALA Journey" — the Craft → Confidence → Career story on the homepage.
 * Headlines and taglines are the client's brand-doc lines; the supporting copy and
 * metadata are descriptive of the method (guided practice, demonstration, repetition)
 * and make no claims about outcomes, placement or numbers.
 */
import type { ImageSlotKey } from "@/data/images";

export interface JourneyStage {
  key: "craft" | "confidence" | "career";
  number: string;
  title: string;
  tagline: string;
  copy: string;
  meta: string[];
  slot: ImageSlotKey;
}

export const JOURNEY_INTRO = {
  eyebrow: "The KALA Idea",
  title: "Your talent deserves a craft.",
  text: "At KALA, learning isn't limited to watching. You learn by doing, creating and refining your craft.",
  slot: "journey-intro" as ImageSlotKey,
};

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    key: "craft",
    number: "01",
    title: "Craft",
    tagline: "Learn the technique.",
    copy: "Learn through guided practical training, demonstration and repetition.",
    meta: ["Demonstration", "Guided practice", "Repetition"],
    slot: "journey-craft",
  },
  {
    key: "confidence",
    number: "02",
    title: "Confidence",
    tagline: "Build through practice.",
    copy: "Confidence comes from doing the work, receiving guidance and improving your technique.",
    meta: ["Doing the work", "Guidance", "Improvement"],
    slot: "journey-confidence",
  },
  {
    key: "career",
    number: "03",
    title: "Career",
    tagline: "Turn your skill into opportunity.",
    copy: "Develop practical skills that can move from classroom learning into professional work.",
    meta: ["Practical skill", "Professional work"],
    slot: "journey-career",
  },
];
