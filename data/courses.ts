/**
 * Course catalogue — curriculum content is transcribed from the client's own
 * "course details overview.txt" and is treated as authoritative for module/topic
 * content. Commercial fields (fee, duration) are NOT authoritative: the same
 * document's own pricing notes conflict with a supplied promotional poster —
 * the notes price Makeup and Beautician as separate courses (₹15,000/20 days and
 * ₹25,000/1 month), while the poster sells a combined "Professional Beautician &
 * Makeup Artist" package at ₹35,000/45 days. Rather than guess which is current,
 * every commercial field stays `pending_confirmation` with `value: null` — see
 * ConfirmableValue below — until the client confirms one authoritative figure per
 * course. Never render a commercial field without checking its `status` first.
 */

export type ConfirmableStatus = "confirmed" | "pending_confirmation";

export interface ConfirmableValue<T> {
  value: T | null;
  status: ConfirmableStatus;
}

function pending<T>(): ConfirmableValue<T> {
  return { value: null, status: "pending_confirmation" };
}

export type CourseCategory = "makeup" | "beauty" | "mehendi" | "saree" | "fashion";
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced" | "All Levels";

// Short, display-friendly names for the five crafts (course names are the long form).
export const CATEGORY_LABELS: Record<CourseCategory, string> = {
  makeup: "Makeup",
  beauty: "Beauty",
  mehendi: "Mehendi",
  saree: "Saree Styling",
  fashion: "Fashion",
};

export interface CourseFaq {
  question: string;
  answer: string;
}

export interface CurriculumModule {
  title: string;
  topics: string[];
}

export interface Course {
  slug: string;
  name: string;
  category: CourseCategory;
  tagline: string;
  level: CourseLevel;
  duration: ConfirmableValue<string>;
  fee: ConfirmableValue<number>;
  description: string;
  modules: CurriculumModule[];
  careerDirections: string[];
  trainerSlug: string;
  faqs: CourseFaq[];
  heroImage: string;
  gallery: string[];
  active: boolean;
}

// Shared value proposition — "Why Choose KALA" from the course document (§ Why
// Choose KALA). This is KALA's general training philosophy, not a per-course claim,
// so it's stored once and reused rather than duplicated across every course record.
export const KALA_TRAINING_STANDARDS = [
  "Advanced-Level Training",
  "Theory + Practical Learning",
  "Hands-on Practice",
  "Professional Product & Tool Knowledge",
  "Client Handling Skills",
  "Business & Freelancing Guidance",
  "Final Practical Assessment",
  "Course Completion Certificate",
];

export const courses: Course[] = [
  {
    slug: "advanced-makeup-artist",
    name: "Advanced Makeup Artist",
    category: "makeup",
    tagline: "Transform your passion for makeup into a professional skill.",
    level: "Advanced",
    duration: pending(),
    fee: pending(),
    description:
      "A complete, hands-on path through professional makeup artistry — from skin preparation and colour theory through HD, airbrush and bridal work, finishing with real client-facing practice.",
    modules: [
      {
        title: "Skin & Preparation",
        topics: ["Skin Preparation & Skin Analysis", "Colour Correction"],
      },
      {
        title: "Base & Complexion",
        topics: ["Base & Foundation Techniques", "Contouring & Highlighting"],
      },
      {
        title: "Eyes",
        topics: ["Advanced Eye Makeup", "Eyelash Application"],
      },
      {
        title: "HD & Airbrush",
        topics: ["HD Makeup", "Airbrush Makeup"],
      },
      {
        title: "Bridal & Occasion",
        topics: ["Bridal Makeup", "Engagement & Reception Makeup", "Party & Photoshoot Makeup"],
      },
      {
        title: "Hair & Draping",
        topics: ["Bridal Hairstyling & Hairdos", "Saree Draping"],
      },
      {
        title: "Professional Practice",
        topics: [
          "Product & Professional Kit Knowledge",
          "Client Consultation & Hygiene",
          "Hands-on Practical Training",
        ],
      },
    ],
    careerDirections: [
      "Bridal Makeup Artist",
      "Freelance Makeup Artist",
      "Photoshoot & Editorial Makeup",
      "Beauty Services Professional",
    ],
    trainerSlug: "placeholder-trainer-1",
    faqs: [],
    heroImage: "/images/courses/placeholder-makeup.jpg",
    gallery: [],
    active: true,
  },
  {
    slug: "advanced-beautician",
    name: "Advanced Beautician",
    category: "beauty",
    tagline: "Professional beauty and salon skills, start to finish.",
    level: "Advanced",
    duration: pending(),
    fee: pending(),
    description:
      "A professional beautician programme covering skin, hair and salon fundamentals — built for real client work, not just technique demonstrations.",
    modules: [
      {
        title: "Skin & Facial Care",
        topics: ["Skin Analysis", "Advanced Facial Techniques", "Cleanup & De-tan"],
      },
      {
        title: "Hair Removal & Grooming",
        topics: ["Threading & Eyebrow Shaping", "Waxing Techniques"],
      },
      {
        title: "Hands, Feet & Hair",
        topics: ["Manicure & Pedicure", "Hair Spa & Hair Care", "Hair Colour Techniques"],
      },
      {
        title: "Professional Practice",
        topics: [
          "Beauty Product Knowledge",
          "Salon Hygiene",
          "Client Consultation & Handling",
          "Practical Training",
        ],
      },
    ],
    careerDirections: [
      "Salon Beauty Professional",
      "Freelance Beautician",
      "Bridal Beauty Specialist",
      "Beauty Business Owner",
    ],
    trainerSlug: "placeholder-trainer-2",
    faqs: [],
    heroImage: "/images/courses/placeholder-beautician.jpg",
    gallery: [],
    active: true,
  },
  {
    slug: "advanced-mehendi-artist",
    name: "Advanced Mehendi Artist",
    category: "mehendi",
    tagline: "From basic strokes to professional bridal designs.",
    level: "Advanced",
    duration: pending(),
    fee: pending(),
    description:
      "Turn intricate design into a professional craft — from foundational strokes through bridal-scale mehendi work, at a professional pace.",
    modules: [
      {
        title: "Foundations",
        topics: ["Arabic Mehendi", "Indian & Traditional Mehendi"],
      },
      {
        title: "Design Styles",
        topics: [
          "Floral & Mandala Designs",
          "Jewellery Mehendi",
          "Portrait & Figure Designs",
          "Customized Mehendi",
        ],
      },
      {
        title: "Bridal Specialisation",
        topics: ["Bridal Mehendi", "Full-Hand Bridal Designs"],
      },
      {
        title: "Professional Practice",
        topics: [
          "Cone Handling Techniques",
          "Detailing & Finishing",
          "Speed & Professional Design Flow",
          "Bridal Mehendi Practical Training",
        ],
      },
    ],
    careerDirections: [
      "Bridal Mehendi Artist",
      "Freelance Mehendi Artist",
      "Custom Design Specialist",
    ],
    trainerSlug: "placeholder-trainer-1",
    faqs: [],
    heroImage: "/images/courses/placeholder-mehendi.jpg",
    gallery: [],
    active: true,
  },
  {
    slug: "advanced-saree-pleating-draping",
    name: "Advanced Saree Pleating & Draping",
    category: "saree",
    tagline: "Master the art of professional saree styling.",
    level: "Advanced",
    duration: pending(),
    fee: pending(),
    description:
      "A dedicated programme in professional saree pleating and draping — self-draping, client draping, and the finishing details that separate a professional from a quick wrap.",
    modules: [
      {
        title: "Foundations",
        topics: [
          "Saree Product Knowledge",
          "Perfect Saree Pre-Pleating",
          "Professional Pleating Techniques",
        ],
      },
      {
        title: "Draping Practice",
        topics: ["Self & Client Draping", "Body-Type Based Draping"],
      },
      {
        title: "Occasion Draping",
        topics: ["Bridal Saree Draping", "Reception & Party Draping", "Designer Draping Styles"],
      },
      {
        title: "Finishing & Practice",
        topics: ["Pinning & Finishing", "Ironing & Saree Handling", "Professional Draping Practice"],
      },
    ],
    careerDirections: [
      "Bridal Draping Specialist",
      "Event Draping Professional",
      "Professional Styling Services",
    ],
    trainerSlug: "placeholder-trainer-2",
    faqs: [],
    heroImage: "/images/courses/placeholder-saree.jpg",
    gallery: [],
    active: true,
  },
  {
    slug: "advanced-tailoring-fashion-design",
    name: "Advanced Tailoring & Fashion Designing",
    category: "fashion",
    tagline: "Turn your creativity into a profession.",
    level: "Advanced",
    duration: pending(),
    fee: pending(),
    description:
      "From measurement and pattern making through a full range of blouse and garment construction, finishing in professional stitching and fit correction.",
    modules: [
      {
        title: "Foundations",
        topics: ["Measurement & Perfect Fitting", "Pattern Making", "Advanced Cutting Techniques"],
      },
      {
        title: "Blouse Construction",
        topics: [
          "Normal Blouse",
          "Cross-Cut Blouse",
          "Lining Blouse",
          "Princess-Cut Blouse",
          "Boat Neck Blouse",
          "Designer Blouse",
        ],
      },
      {
        title: "Design Details",
        topics: ["Advanced Neck Designs", "Sleeve Designs"],
      },
      {
        title: "Garments",
        topics: ["Churidar", "Maxi", "Skirt & Blouse"],
      },
      {
        title: "Professional Finishing",
        topics: ["Fitting Correction", "Professional Stitching & Finishing"],
      },
    ],
    careerDirections: [
      "Custom Tailoring Professional",
      "Boutique Designer",
      "Freelance Fashion Designer",
    ],
    trainerSlug: "placeholder-trainer-3",
    faqs: [],
    heroImage: "/images/courses/placeholder-fashion.jpg",
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
