/**
 * PLACEHOLDER DATA — replace with real trainer bios, photography and credentials.
 */

export interface Trainer {
  slug: string;
  name: string;
  role: string;
  disciplines: string[];
  bio: string;
  credentials: string[];
  photo: string;
}

export const trainers: Trainer[] = [
  {
    slug: "placeholder-trainer-1",
    name: "Placeholder Trainer Name",
    role: "Lead Makeup & Mehendi Trainer",
    disciplines: ["makeup", "mehendi"],
    bio: "Placeholder biography — replace with the real trainer's background, experience and teaching philosophy.",
    credentials: ["Placeholder credential", "Placeholder credential"],
    photo: "/images/trainers/placeholder-1.jpg",
  },
  {
    slug: "placeholder-trainer-2",
    name: "Placeholder Trainer Name",
    role: "Lead Beauty & Saree Draping Trainer",
    disciplines: ["beauty", "saree"],
    bio: "Placeholder biography — replace with the real trainer's background, experience and teaching philosophy.",
    credentials: ["Placeholder credential"],
    photo: "/images/trainers/placeholder-2.jpg",
  },
  {
    slug: "placeholder-trainer-3",
    name: "Placeholder Trainer Name",
    role: "Lead Fashion Trainer",
    disciplines: ["fashion"],
    bio: "Placeholder biography — replace with the real trainer's background, experience and teaching philosophy.",
    credentials: ["Placeholder credential"],
    photo: "/images/trainers/placeholder-3.jpg",
  },
];

export function getTrainerBySlug(slug: string): Trainer | undefined {
  return trainers.find((trainer) => trainer.slug === slug);
}
