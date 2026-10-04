/**
 * Copy for the About page. The story is told at the level of belief and method — what
 * KALA says it stands for (Craft → Confidence → Career) and what the client's course
 * document promises. There is deliberately no founding date, founder name, founder
 * biography, cohort size, trainer credential or student outcome here: none of those have
 * been supplied. When they are, they belong in `PEOPLE` and `ABOUT_STORY` below.
 */
import type { ImageSlotKey } from "@/data/images";

export const ABOUT_HERO = {
  eyebrow: "About KALA",
  words: ["Craft.", "Confidence.", "Career."],
  text: "KALA Beauty & Fashion Academy turns interest and talent into practical skill, confidence and professional opportunity.",
  slot: "about-academy" as ImageSlotKey,
};

export const ABOUT_STORY = {
  eyebrow: "Why KALA exists",
  title: "KALA was created around a simple belief.",
  lead: "Real confidence comes from learning a craft, practising it and creating with purpose.",
  paragraphs: [
    "So the work here is practical. You learn a technique, practise it until it is steady, and make something complete — then refine it until it is something you are proud to present.",
    "Beauty and fashion are crafts, and crafts are learned with the hands. That is the whole idea.",
  ],
  promise:
    "Transform interest and talent into practical skill, confidence and professional opportunity.",
  slot: "people-founder" as ImageSlotKey,
  caption: "The founder",
};

export interface Belief {
  number: string;
  name: string;
  line: string;
  text: string;
  slot: ImageSlotKey;
}

export const ABOUT_BELIEFS = {
  eyebrow: "What we believe",
  title: "A skill is learned, then trusted, then used.",
  items: [
    {
      number: "01",
      name: "Craft",
      line: "Learn the technique.",
      text: "Everything starts with the craft itself — the technique, the tools and the product knowledge behind it.",
      slot: "journey-craft",
    },
    {
      number: "02",
      name: "Confidence",
      line: "Build through practice.",
      text: "Confidence comes from doing the work, receiving guidance and improving your technique.",
      slot: "journey-confidence",
    },
    {
      number: "03",
      name: "Career",
      line: "Turn your skill into opportunity.",
      text: "Practical skills that can move from classroom learning into professional work.",
      slot: "journey-career",
    },
  ] satisfies Belief[],
};

export const ABOUT_METHOD = {
  eyebrow: "How we teach",
  title: "Theory and practice, side by side.",
  steps: [
    {
      number: "01",
      title: "Understand it",
      text: "Every skill starts with the technique, the tools and the product knowledge behind it.",
    },
    {
      number: "02",
      title: "Do it",
      text: "Hands-on practice with guidance, repeated until the technique is steady.",
    },
    {
      number: "03",
      title: "Prove it",
      text: "Detailing and finishing, then a final practical assessment and a course completion certificate.",
    },
  ],
};

export const ABOUT_EXPERIENCE = {
  eyebrow: "What students experience",
  title: "Learning that ends in finished work.",
  text: "Across every course, the same promise: you leave having made things, not just watched them being made.",
  standardsLabel: "Across every KALA course",
};

export const ABOUT_DIRECTIONS = {
  eyebrow: "Where the journey can lead",
  title: "Possible directions for your craft.",
  note: "Possible professional directions — not a placement guarantee.",
};

export interface Person {
  slot: ImageSlotKey;
  /** Shown until a real name is supplied. */
  caption: string;
  name: string | null;
  role: string | null;
}

export const PEOPLE: Person[] = [
  { slot: "people-trainer", caption: "A KALA trainer", name: null, role: null },
  { slot: "people-student", caption: "A KALA student", name: null, role: null },
  { slot: "people-class", caption: "The class at work", name: null, role: null },
];

export const ABOUT_PEOPLE = {
  eyebrow: "The people",
  title: "The people behind the craft.",
};

export const ABOUT_ENQUIRY = {
  eyebrow: "Begin",
  title: "Talk to KALA about your next step.",
  description:
    "Tell us what you're interested in and a course advisor will follow up with the course details.",
};
