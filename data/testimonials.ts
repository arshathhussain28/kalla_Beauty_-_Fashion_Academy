/**
 * PLACEHOLDER DATA — replace with real student stories, quotes and photography.
 */

export interface Testimonial {
  slug: string;
  studentName: string;
  courseSlug: string;
  before: string;
  experience: string;
  after: string;
  quote: string;
  photo: string;
  videoUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    slug: "placeholder-testimonial-1",
    studentName: "Placeholder Student Name",
    courseSlug: "professional-makeup",
    before: "Placeholder — what the student wanted before joining KALA.",
    experience: "Placeholder — what the student learned and practiced at KALA.",
    after: "Placeholder — what changed for the student after completing the course.",
    quote: "Placeholder pull-quote for the testimonial card.",
    photo: "/images/testimonials/placeholder-1.jpg",
  },
  {
    slug: "placeholder-testimonial-2",
    studentName: "Placeholder Student Name",
    courseSlug: "professional-tailoring",
    before: "Placeholder — what the student wanted before joining KALA.",
    experience: "Placeholder — what the student learned and practiced at KALA.",
    after: "Placeholder — what changed for the student after completing the course.",
    quote: "Placeholder pull-quote for the testimonial card.",
    photo: "/images/testimonials/placeholder-2.jpg",
  },
];

export function getTestimonialsForCourse(courseSlug: string): Testimonial[] {
  return testimonials.filter((testimonial) => testimonial.courseSlug === courseSlug);
}
