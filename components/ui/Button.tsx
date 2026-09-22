import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Primary/secondary per KALA Brand System §16 Website System: 2px radius, Jost CAPS
// +0.12em, never a pill. There is no third variant — the brand doc caps every layout
// at one CTA, so a "tertiary" button would be a sign the layout needs editing, not a
// new variant. A small explicit prop set (rather than spreading arbitrary HTML
// attributes) keeps the two render branches simple and fully typed.
const base =
  "inline-flex items-center justify-center rounded-sm px-7 py-3.5 text-button font-sans font-medium uppercase tracking-[0.12em] transition-colors";

const variants = {
  primary: "bg-wine text-cream hover:bg-wine-deep",
  secondary: "border border-wine text-wine bg-transparent hover:bg-wine/8",
} as const;

type Variant = keyof typeof variants;

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler;
}

interface LinkProps extends CommonProps {
  href: string;
  target?: string;
  rel?: string;
}

interface ButtonElProps extends CommonProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function Button(props: LinkProps | ButtonElProps) {
  const { variant = "primary", className, children, onClick } = props;
  const classes = cn(base, variants[variant], className);

  if (props.href) {
    const isInternal = props.href.startsWith("/") || props.href.startsWith("#");
    if (isInternal) {
      return (
        <Link href={props.href} className={classes} onClick={onClick}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={props.href}
        target={props.target}
        rel={props.rel}
        className={classes}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  // Every path above returns when `href` is set, so this is always ButtonElProps —
  // TS can't see that across the two nested early-returns, hence the cast.
  const buttonProps = props as ButtonElProps;
  return (
    <button
      type={buttonProps.type}
      disabled={buttonProps.disabled}
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
