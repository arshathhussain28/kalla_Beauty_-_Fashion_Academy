import { z } from "zod";

// Zod 4 probes `new Function("")` to decide whether it may JIT-compile schemas. The site's
// Content-Security-Policy forbids eval, so every page load logged a blocked-eval violation in
// the browser. This schema is four small fields — JIT buys nothing — so switch it off and the
// probe never runs.
z.config({ jitless: true });

/**
 * Shared client + server schema for the "Find Your Course" lead form (master spec section 17).
 * The server route re-validates with this same schema — never trust client-side validation alone.
 */
export const leadFormSchema = z.object({
  interest: z.enum(["makeup", "beauty", "mehendi", "saree", "fashion"], {
    message: "Select what you're interested in.",
  }),
  goal: z.enum(["career", "business", "personal-skill", "upskilling"], {
    message: "Select what you're looking to achieve.",
  }),
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(120, "Name is too long."),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s-]{7,19}$/, "Enter a valid phone/WhatsApp number."),
  preferredContactTime: z.enum(["morning", "afternoon", "evening", "anytime"]).optional(),
  source: z.string().max(200).optional(),
  campaign: z.string().max(200).optional(),
  courseSlug: z.string().max(200).optional(),
  // Honeypot — real users never fill this in; bots that autofill every field do.
  company: z.string().max(0, "Spam check failed.").optional(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
