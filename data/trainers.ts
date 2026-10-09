/**
 * PLACEHOLDER DATA — replace with real trainer bios, photography and credentials.
 * Photography is wired through the registry in data/images.ts (`photoSlot`).
 *
 * `confirmed` is the gate between this file and the public site. Nothing renders a trainer
 * (the home page's "people" section, the Trainer line on a course page) until it is `true`,
 * so none of the placeholder names, roles or bios below can reach a visitor. When the client
 * supplies a real trainer, replace that entry's name, role, bio, credentials and photo, check
 * each against the client, and only then set `confirmed: true`.
 */
import type { ImageSlotKey } from "@/data/images";

export interface Trainer {
  slug: string;
  /** False until the client has confirmed this person, their title and their bio. */
  confirmed: boolean;
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
    confirmed: false,
    name: "Placeholder Trainer Name",
    role: "Lead Makeup & Mehendi Trainer",
    disciplines: ["makeup", "mehendi"],
    bio: "Placeholder biography — replace with the real trainer's background, experience and teaching philosophy.",
    credentials: ["Placeholder credential", "Placeholder credential"],
    photoSlot: "trainer-1",
  },
  {
    slug: "placeholder-trainer-2",
    confirmed: false,
    name: "Placeholder Trainer Name",
    role: "Lead Beauty & Saree Draping Trainer",
    disciplines: ["beauty", "saree"],
    bio: "Placeholder biography — replace with the real trainer's background, experience and teaching philosophy.",
    credentials: ["Placeholder credential"],
    photoSlot: "trainer-2",
  },
  {
    slug: "placeholder-trainer-3",
    confirmed: false,
    name: "Placeholder Trainer Name",
    role: "Lead Fashion Trainer",
    disciplines: ["fashion"],
    bio: "Placeholder biography — replace with the real trainer's background, experience and teaching philosophy.",
    credentials: ["Placeholder credential"],
    photoSlot: "trainer-3",
  },
];

/** Trainers cleared for the public site. Empty until the client confirms real people. */
export function getConfirmedTrainers(): Trainer[] {
  return trainers.filter((trainer) => trainer.confirmed);
}

/** A confirmed trainer by slug, or undefined — an unconfirmed one is never returned. */
export function getTrainerBySlug(slug: string): Trainer | undefined {
  return getConfirmedTrainers().find((trainer) => trainer.slug === slug);
}
