/**
 * Site-level FAQ. Every answer here is something the client has actually confirmed —
 * the five programmes, theory + practical training, the final practical assessment and
 * completion certificate (see KALA_TRAINING_STANDARDS in courses.ts), and the contact
 * details in data/site.ts. Duration and fees are deliberately answered with "an advisor
 * confirms them" because they are still `pending_confirmation` in courses.ts; once they
 * are confirmed, give them a real answer here.
 *
 * Not answered yet, because nothing confirmed exists: prior-experience requirements,
 * batch timings, placement support. Add them only with the client's wording.
 * Course-specific FAQs live on each Course record in courses.ts.
 */
import { SITE_LOCATION, SITE_PHONE_DISPLAY } from "@/data/site";

export interface SiteFaq {
  question: string;
  answer: string;
}

export const siteFaqs: SiteFaq[] = [
  {
    question: "What courses does KALA offer?",
    answer:
      "Five advanced programmes: Advanced Makeup Artist, Advanced Beautician, Advanced Mehendi Artist, Advanced Saree Pleating & Draping, and Advanced Tailoring & Fashion Designing.",
  },
  {
    question: "Is the training practical?",
    answer:
      "Yes. Every course combines theory with hands-on practice on real tools and products, and finishes with a final practical assessment.",
  },
  {
    question: "Is a certificate provided?",
    answer: "Yes — a course completion certificate, after the final practical assessment.",
  },
  {
    question: "How long are the courses, and what do they cost?",
    answer:
      "A course advisor confirms the current duration and fees when you enquire, so you always get up-to-date details rather than a number that may have changed.",
  },
  {
    question: "How do I enquire?",
    answer: `Message KALA on WhatsApp, call ${SITE_PHONE_DISPLAY}, or leave your details in the enquiry form — a course advisor will get in touch.`,
  },
  {
    question: "Where is KALA located?",
    answer: `KALA is in ${SITE_LOCATION}. You can open the location in Google Maps from the footer, or ask a course advisor for directions.`,
  },
];
