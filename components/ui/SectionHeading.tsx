import { cn } from "@/lib/utils";

// Enforces the brand's hierarchy discipline (§09/§23): eyebrow → headline → body,
// always in that order, never more than these three sizes in one block.
interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "ink" | "cream";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "ink",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <p
        className={cn(
          "text-eyebrow font-sans font-medium uppercase tracking-[0.24em]",
          tone === "cream" ? "text-rose-light" : "text-rose-deep"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "text-h2 font-display font-medium tracking-[0.01em]",
          tone === "cream" ? "text-cream" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-xl text-body font-sans",
            align === "center" && "mx-auto",
            tone === "cream" ? "text-cream/80" : "text-ink-muted"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
