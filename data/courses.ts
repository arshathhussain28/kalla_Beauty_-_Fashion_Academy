/**
 * PLACEHOLDER DATA
 * Names, durations, curricula and outcomes below are illustrative structure only —
 * not verified facts about KALA. Replace with real program details before launch.
 */

export type CourseCategory = "beauty" | "fashion";
export type CourseDiscipline = "makeup" | "hair" | "tailoring" | "fashion-design";
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced" | "All Levels";

export interface CourseFaq {
  question: string;
  answer: string;
}

export interface CurriculumModule {
  title: string;
  summary: string;
  topics: string[];
}

export interface Course {
  slug: string;
  name: string;
  category: CourseCategory;
  discipline: CourseDiscipline;
  tagline: string;
  duration: string;
  level: CourseLevel;
  description: string;
  highlights: string[];
  curriculum: CurriculumModule[];
  practicalTraining: string[];
  toolsAndTechniques: string[];
  studentProjects: string[];
  whoItsFor: string[];
  careerPaths: string[];
  trainerSlug: string;
  faqs: CourseFaq[];
  heroImage: string;
  gallery: string[];
  active: boolean;
}

export const courses: Course[] = [
  {
    slug: "professional-makeup",
    name: "Professional Makeup",
    category: "beauty",
    discipline: "makeup",
    tagline: "Bridal, editorial and HD makeup artistry from first brush to finished look.",
    duration: "Placeholder — e.g. 3 months",
    level: "All Levels",
    description:
      "A placeholder overview of the Professional Makeup programme — replace with the real curriculum narrative, positioning and outcomes before publishing.",
    highlights: [
      "Placeholder highlight — e.g. bridal & HD makeup",
      "Placeholder highlight — e.g. portfolio shoot included",
      "Placeholder highlight — e.g. kit guidance provided",
    ],
    curriculum: [
      {
        title: "Placeholder module — Foundations",
        summary: "Placeholder summary of skin prep, colour theory and base work.",
        topics: ["Placeholder topic", "Placeholder topic", "Placeholder topic"],
      },
      {
        title: "Placeholder module — Bridal & Editorial",
        summary: "Placeholder summary of bridal looks and editorial styling.",
        topics: ["Placeholder topic", "Placeholder topic", "Placeholder topic"],
      },
    ],
    practicalTraining: [
      "Placeholder — live model practice",
      "Placeholder — studio lighting sessions",
    ],
    toolsAndTechniques: ["Placeholder tool/technique", "Placeholder tool/technique"],
    studentProjects: ["Placeholder project — final portfolio shoot"],
    whoItsFor: [
      "Placeholder audience — aspiring makeup artists",
      "Placeholder audience — career changers",
    ],
    careerPaths: ["Placeholder path — freelance artist", "Placeholder path — studio artist"],
    trainerSlug: "placeholder-trainer-1",
    faqs: [
      {
        question: "Placeholder question — is this course practical?",
        answer: "Placeholder answer to be replaced with real course policy.",
      },
    ],
    heroImage: "/images/courses/placeholder-makeup.jpg",
    gallery: [],
    active: true,
  },
  {
    slug: "hair-styling",
    name: "Hair Styling & Design",
    category: "beauty",
    discipline: "hair",
    tagline: "Cutting, colour and styling technique for real client work.",
    duration: "Placeholder — e.g. 2.5 months",
    level: "All Levels",
    description:
      "A placeholder overview of the Hair Styling & Design programme — replace with real curriculum narrative before publishing.",
    highlights: ["Placeholder highlight", "Placeholder highlight"],
    curriculum: [
      {
        title: "Placeholder module — Cutting Fundamentals",
        summary: "Placeholder summary.",
        topics: ["Placeholder topic", "Placeholder topic"],
      },
    ],
    practicalTraining: ["Placeholder — live client practice"],
    toolsAndTechniques: ["Placeholder tool/technique"],
    studentProjects: ["Placeholder project"],
    whoItsFor: ["Placeholder audience"],
    careerPaths: ["Placeholder path — salon stylist"],
    trainerSlug: "placeholder-trainer-2",
    faqs: [],
    heroImage: "/images/courses/placeholder-hair.jpg",
    gallery: [],
    active: true,
  },
  {
    slug: "professional-tailoring",
    name: "Professional Tailoring",
    category: "fashion",
    discipline: "tailoring",
    tagline: "Pattern making, garment construction and fit from the ground up.",
    duration: "Placeholder — e.g. 4 months",
    level: "Beginner",
    description:
      "A placeholder overview of the Professional Tailoring programme — replace with real curriculum narrative before publishing.",
    highlights: ["Placeholder highlight", "Placeholder highlight"],
    curriculum: [
      {
        title: "Placeholder module — Pattern Making",
        summary: "Placeholder summary.",
        topics: ["Placeholder topic", "Placeholder topic"],
      },
    ],
    practicalTraining: ["Placeholder — garment construction practice"],
    toolsAndTechniques: ["Placeholder tool/technique"],
    studentProjects: ["Placeholder project — finished garment"],
    whoItsFor: ["Placeholder audience"],
    careerPaths: ["Placeholder path — boutique tailor"],
    trainerSlug: "placeholder-trainer-3",
    faqs: [],
    heroImage: "/images/courses/placeholder-tailoring.jpg",
    gallery: [],
    active: true,
  },
  {
    slug: "fashion-design",
    name: "Fashion Design",
    category: "fashion",
    discipline: "fashion-design",
    tagline: "From concept sketch to finished collection.",
    duration: "Placeholder — e.g. 6 months",
    level: "Intermediate",
    description:
      "A placeholder overview of the Fashion Design programme — replace with real curriculum narrative before publishing.",
    highlights: ["Placeholder highlight", "Placeholder highlight"],
    curriculum: [
      {
        title: "Placeholder module — Design Fundamentals",
        summary: "Placeholder summary.",
        topics: ["Placeholder topic", "Placeholder topic"],
      },
    ],
    practicalTraining: ["Placeholder — collection development"],
    toolsAndTechniques: ["Placeholder tool/technique"],
    studentProjects: ["Placeholder project — capsule collection"],
    whoItsFor: ["Placeholder audience"],
    careerPaths: ["Placeholder path — designer", "Placeholder path — entrepreneur"],
    trainerSlug: "placeholder-trainer-3",
    faqs: [],
    heroImage: "/images/courses/placeholder-fashion-design.jpg",
    gallery: [],
    active: true,
  },
];

export function getAllCourses(): Course[] {
  return courses.filter((course) => course.active);
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug && course.active);
}

export function getCoursesByCategory(category: CourseCategory): Course[] {
  return getAllCourses().filter((course) => course.category === category);
}
