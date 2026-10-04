/**
 * PLACEHOLDER DATA — replace with real trainer bios, photography and credentials.
 * Photography is wired through the registry in data/images.ts (`photoSlot`).
 */
import type { ImageSlotKey } from "@/data/images";

export interface Trainer {
  slug: string;
  name: string;
  role: string;
  disciplines: string[];
  bio: string;
  credentials: string[];
  photoSlot: ImageSlotKey;
}

export const trainers: Trainer[] = [
  {
    slug: "placeholder-trainer-1",
    name: "Placeholder Trainer Name",
    role: "Lead Makeup & Mehendi Trainer",
    disciplines: ["makeup", "mehendi"],
    bio: "Placeholder biography — replace with the real trainer's background, experience and teaching philosophy.",
    credentials: ["Placeholder credential", "Placeholder credential"],
    photoSlot: "trainer-1",
  },
  {
    slug: "placeholder-trainer-2",
    name: "Placeholder Trainer Name",
    role: "Lead Beauty & Saree Draping Trainer",
    disciplines: ["beauty", "saree"],
    bio: "Placeholder biography — replace with the real trainer's background, experience and teaching philosophy.",
    credentials: ["Placeholder credential"],
    photoSlot: "trainer-2",
  },
  {
    slug: "placeholder-trainer-3",
    name: "Placeholder Trainer Name",
    role: "Lead Fashion Trainer",
    disciplines: ["fashion"],
    bio: "Placeholder biography — replace with the real trainer's background, experience and teaching philosophy.",
    credentials: ["Placeholder credential"],
    photoSlot: "trainer-3",
  },
];

export function getTrainerBySlug(slug: string): Trainer | undefined {
  return trainers.find((trainer) => trainer.slug === slug);
}
