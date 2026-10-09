"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/data/site";
import { leadFormSchema } from "@/lib/validation";
import { trackEvent } from "@/lib/analytics";
import { generalEnquiryWhatsAppLink } from "@/lib/whatsapp";
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
  // True when the server could not take the lead (no destination configured, or it was
  // unreachable). The visitor is then offered WhatsApp / phone instead of a blind retry.
  const [showFallback, setShowFallback] = useState(false);
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
    setShowFallback(false);

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
      // Which page the enquiry came from, so the advisor knows where the interest started.
      source: window.location.pathname,
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
        setShowFallback(response.status >= 500 || payload?.fallback === true);
        throw new Error(payload?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      trackEvent("form_submit", { courseSlug });
      form.reset();
    } catch (error) {
      setStatus("error");
      if (error instanceof TypeError) {
        // fetch() rejects with a TypeError when the request never reached the server.
        setShowFallback(true);
        setErrorMessage("We couldn't reach the server. Check your connection, or contact us directly.");
        return;
      }
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
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          maxLength={120}
          className={cn(inputClasses, "mt-2")}
        />
      </div>

      <div>
        <label htmlFor="phone" className={labelClasses}>
          Phone / WhatsApp
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          maxLength={20}
          className={cn(inputClasses, "mt-2")}
        />
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
        <div role="alert" className="space-y-3 border border-red-700/30 bg-white p-4">
          <p className="text-small text-red-700">{errorMessage}</p>
          {showFallback && (
            <p className="flex flex-wrap items-center gap-x-6 gap-y-2 text-small font-medium uppercase tracking-[0.12em]">
              <a
                href={generalEnquiryWhatsAppLink({ source: "enquiry-form-fallback" })}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1 text-wine underline underline-offset-4"
              >
                WhatsApp us
              </a>
              <a href={`tel:${SITE_PHONE_TEL}`} className="py-1 text-wine underline underline-offset-4">
                Call {SITE_PHONE_DISPLAY}
              </a>
            </p>
          )}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={status === "submitting"}
        className="w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Get Course Details"}
      </Button>

      <p className="text-small text-ink-muted">
        By sending this form you agree that KALA may contact you on this number about your
        enquiry. See our{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-wine">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
