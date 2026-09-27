"use client";

import { useState, type FormEvent } from "react";
import { leadFormSchema } from "@/lib/validation";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const INTERESTS = [
  { value: "makeup", label: "Makeup" },
  { value: "beauty", label: "Beauty" },
  { value: "mehendi", label: "Mehendi" },
  { value: "saree", label: "Saree Draping" },
  { value: "fashion", label: "Fashion" },
] as const;

const GOALS = [
  { value: "career", label: "Career" },
  { value: "business", label: "Business" },
  { value: "personal-skill", label: "Personal Skill" },
  { value: "upskilling", label: "Upskilling" },
] as const;

const CONTACT_TIMES = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
  { value: "anytime", label: "Anytime" },
] as const;

type Status = "idle" | "submitting" | "success" | "error";

// §16 Website System, Forms spec: cream inputs, 1px border, 2px radius, 48px tall,
// labels above, focus ring 2px wine (the ring itself comes from the global
// :focus-visible rule in globals.css).
const inputClasses =
  "h-12 w-full rounded-sm border border-border bg-cream px-4 text-body text-ink placeholder:text-ink-muted focus:border-wine";
const labelClasses = "text-small font-medium uppercase tracking-[0.18em] text-ink-muted";

interface LeadFormProps {
  courseSlug?: string;
  className?: string;
}

export function LeadForm({ courseSlug, className }: LeadFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  function handleFocusOnce() {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent("form_start", { courseSlug });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    // Captured synchronously: React nullifies event.currentTarget once the handler
    // yields at the first `await`, so it can't be read again after the fetch below.
    const form = event.currentTarget;
    const formData = new FormData(form);
    const rawValues = {
      interest: formData.get("interest"),
      goal: formData.get("goal"),
      name: formData.get("name"),
      phone: formData.get("phone"),
      preferredContactTime: formData.get("preferredContactTime") || undefined,
      courseSlug,
      company: formData.get("company") || undefined,
    };

    const parsed = leadFormSchema.safeParse(rawValues);
    if (!parsed.success) {
      setStatus("error");
      setErrorMessage(parsed.error.issues[0]?.message ?? "Please check the form and try again.");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      trackEvent("form_submit", { courseSlug });
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className={cn("border border-rose bg-white p-8 text-center", className)}>
        <p className="font-display text-2xl text-ink">Thank you.</p>
        <p className="mt-2 text-small text-ink-muted">
          A course advisor will reach out shortly with your course details.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onFocus={handleFocusOnce} className={cn("space-y-5", className)} noValidate>
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
      >
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset>
        <legend className={labelClasses}>What are you interested in?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {INTERESTS.map((option) => (
            <label
              key={option.value}
              className="cursor-pointer rounded-sm border border-border px-4 py-2 text-small text-ink has-[:checked]:border-wine has-[:checked]:bg-wine has-[:checked]:text-cream"
            >
              <input
                type="radio"
                name="interest"
                value={option.value}
                required
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelClasses}>What are you looking to achieve?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {GOALS.map((option) => (
            <label
              key={option.value}
              className="cursor-pointer rounded-sm border border-border px-4 py-2 text-small text-ink has-[:checked]:border-wine has-[:checked]:bg-wine has-[:checked]:text-cream"
            >
              <input type="radio" name="goal" value={option.value} required className="sr-only" />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="name" className={labelClasses}>
          Name
        </label>
        <input id="name" name="name" type="text" required className={cn(inputClasses, "mt-2")} />
      </div>

      <div>
        <label htmlFor="phone" className={labelClasses}>
          Phone / WhatsApp
        </label>
        <input id="phone" name="phone" type="tel" required className={cn(inputClasses, "mt-2")} />
      </div>

      <div>
        <label htmlFor="preferredContactTime" className={labelClasses}>
          Preferred contact time
        </label>
        <select
          id="preferredContactTime"
          name="preferredContactTime"
          defaultValue=""
          className={cn(inputClasses, "mt-2")}
        >
          <option value="" disabled>
            Select a time
          </option>
          {CONTACT_TIMES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {status === "error" && errorMessage && (
        <p role="alert" className="text-small text-red-700">
          {errorMessage}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={status === "submitting"}
        className="w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Get Course Details"}
      </Button>
    </form>
  );
}
