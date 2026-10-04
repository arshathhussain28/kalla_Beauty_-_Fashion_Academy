/**
 * Copy for the Why KALA page. Every claim here is either KALA's own brand language
 * (Craft → Confidence → Career) or sits inside what the client's course document
 * promises — theory + practical learning, hands-on practice, professional product & tool
 * knowledge, client handling, business & freelancing guidance, a final practical
 * assessment and a completion certificate (see KALA_TRAINING_STANDARDS in courses.ts).
 * Nothing about outcomes, numbers, credentials or facilities.
 */
import type { ImageSlotKey } from "@/data/images";

export const WHY_HERO = {
  eyebrow: "Why KALA",
  title: ["Craft,", "Confidence,", "Career."],
  text: "KALA is built around a simple belief: real confidence comes from learning a craft, practising it and creating with purpose.",
};

export const WHY_IDEA = {
  eyebrow: "The KALA Idea",
  title: "Your talent deserves a craft.",
  text: "At KALA, learning isn't limited to watching. You learn by doing, creating and refining your craft.",
  pillars: [
    { name: "Craft", line: "Learn the technique." },
    { name: "Confidence", line: "Build through practice." },
    { name: "Career", line: "Turn your skill into opportunity." },
  ],
} as const;

export const WHY_CRAFT = {
  eyebrow: "Craft",
  title: "Learn the craft. Not just the theory.",
  text: "Theory and practice side by side, on real tools and products — because a technique only becomes yours once your hands have done it.",
  slot: "why-craft" as ImageSlotKey,
  statements: [
    { label: "Practice", text: "Learn through doing." },
    { label: "Precision", text: "Understand the technique." },
    { label: "Creation", text: "Turn knowledge into work." },
    { label: "Refinement", text: "Improve through repetition." },
  ],
};

export interface JourneyMoment {
  number: string;
  title: string;
  line: string;
  detail: string;
  slot: ImageSlotKey;
}

export const WHY_JOURNEY = {
  eyebrow: "Confidence",
  title: "Confidence is built, not given.",
  text: "Practice transforms knowledge into ability. Ability creates confidence.",
  moments: [
    {
      number: "01",
      title: "Watch",
      line: "Observe the technique.",
      detail:
        "Start with demonstration and theory — the technique, the tools and the product knowledge behind every skill.",
      slot: "why-watch",
    },
    {
      number: "02",
      title: "Practice",
      line: "Work through the process.",
      detail: "Hands-on practice with guidance, repeated until the technique feels steady.",
      slot: "why-practice",
    },
    {
      number: "03",
      title: "Create",
      line: "Apply what you've learned.",
      detail: "Put the skill to work on a complete piece — a bridal look, a design, a drape, a garment.",
      slot: "why-create",
    },
    {
      number: "04",
      title: "Refine",
      line: "Improve the result.",
      detail: "Detailing, fitting and finishing: the difference between good work and professional work.",
      slot: "why-refine",
    },
    {
      number: "05",
      title: "Present",
      line: "Build confidence in your work.",
      detail:
        "A final practical assessment and a course completion certificate — and the confidence to work with clients.",
      slot: "why-present",
    },
  ] satisfies JourneyMoment[],
};

export const WHY_CAREER = {
  eyebrow: "Career",
  title: "Turn your skill into opportunity.",
  note: "Possible professional directions — not a placement guarantee.",
  slot: "why-career" as ImageSlotKey,
  steps: [
    { word: "Skill", line: "Build skills that can support your next step." },
    { word: "Confidence", line: "Develop practical confidence for real-world work." },
    { word: "Creation", line: "Finish complete pieces you can show." },
    { word: "Opportunity", line: "Explore where your craft can take you." },
  ],
};

export interface MakingFrame {
  slot: ImageSlotKey;
  label: string;
  caption: string;
}

export const WHY_MAKING = {
  eyebrow: "Learn by Making",
  title: "Made by hands. Built through practice.",
  frames: [
    { slot: "why-making-1", label: "Hair & makeup", caption: "Technique, in the hands" },
    { slot: "why-making-2", label: "Fashion", caption: "Stitch by stitch" },
    { slot: "why-making-3", label: "In the studio", caption: "Guidance beside you" },
    { slot: "why-making-4", label: "The tools", caption: "Know what you work with" },
  ] satisfies MakingFrame[],
};

export const WHY_PEOPLE = {
  eyebrow: "People & Mentorship",
  title: "Learn from people. Grow with people.",
  text: "A craft is passed on by people — someone who shows you the technique, watches you try it, and helps you get it right.",
  words: ["Guidance", "Practice", "Feedback", "Together"],
};

export const WHY_DIFFERENCE = {
  eyebrow: "The KALA Difference",
  title: "What makes KALA different?",
  text: "Six things every course is built around.",
  points: [
    {
      title: "Theory + practical learning",
      text: "Understand the technique, then do it — theory and practice side by side.",
    },
    {
      title: "Hands-on practice",
      text: "Practise on real tools and products until the work feels steady.",
    },
    {
      title: "Professional product & tool knowledge",
      text: "Know what you are using and why — the products, tools and kit of the profession.",
    },
    {
      title: "Client handling skills",
      text: "Consultation, hygiene and working with clients — not just technique.",
    },
    {
      title: "Business & freelancing guidance",
      text: "Guidance on building a freelance or business practice around your skill.",
    },
    {
      title: "Assessment & certificate",
      text: "A final practical assessment and a course completion certificate.",
    },
  ],
};

export const WHY_AUDIENCE = {
  eyebrow: "Who KALA is for",
  title: "There is more than one reason to learn.",
  groups: [
    {
      name: "The Beginner",
      text: "Starting with the foundations — measurement, basic strokes, skin analysis.",
    },
    {
      name: "The Creative",
      text: "Turning natural talent into practical skill.",
    },
    {
      name: "The Aspiring Professional",
      text: "Building the practical capability to work with clients.",
    },
    {
      name: "The Upskiller",
      text: "Adding a new skill to the path you are already on.",
    },
    {
      name: "The Entrepreneur",
      text: "Exploring beauty or fashion as a business, with guidance on freelancing.",
    },
  ],
};

export const WHY_CLOSING = {
  lines: ["Learn the craft.", "Build the confidence.", "Create your future."],
  name: "KALA Beauty & Fashion Academy",
  tagline: "Craft Your Confidence.",
};

export const WHY_ENQUIRY = {
  eyebrow: "Begin",
  title: "Ready to begin your craft?",
  description:
    "Explore our courses or speak with KALA about the right path for you.",
};
