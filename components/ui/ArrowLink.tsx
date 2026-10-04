import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  tone?: "wine" | "cream";
  external?: boolean;
  className?: string;
}

// Editorial text link: the underline draws in from the left and the arrow drifts
// right on hover. Used wherever a button would be too heavy (card CTAs, secondary CTAs).
export function ArrowLink({
  href,
  children,
  tone = "wine",
  external = false,
  className,
}: ArrowLinkProps) {
  const classes = cn(
    "group/arrow inline-flex items-center gap-2 text-button font-sans font-medium uppercase tracking-[0.12em] transition-colors",
    tone === "wine" ? "text-wine hover:text-wine-deep" : "text-cream hover:text-white",
    className
  );

  const content = (
    <>
      <span className="relative pb-1 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 group-hover/arrow:after:scale-x-100">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="transition-transform duration-500 group-hover/arrow:translate-x-1"
      >
        →
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
