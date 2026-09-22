/**
 * Site-level FAQ (homepage). Course-specific FAQs live on each Course record in courses.ts.
 * PLACEHOLDER copy — replace with real admissions/policy answers before launch.
 */

export interface SiteFaq {
  question: string;
  answer: string;
}

export const siteFaqs: SiteFaq[] = [
  {
    question: "Placeholder — Do I need prior experience to join?",
    answer: "Placeholder answer — replace with KALA's real admissions policy.",
  },
  {
    question: "Placeholder — How practical is the training?",
    answer: "Placeholder answer — replace with real detail on studio hours and hands-on practice.",
  },
  {
    question: "Placeholder — What happens after I enquire?",
    answer:
      "Placeholder answer — replace with the real counselling → campus visit → admission flow.",
  },
  {
    question: "Placeholder — Do you help with placement after the course?",
    answer: "Placeholder answer — replace with real career support details.",
  },
];
