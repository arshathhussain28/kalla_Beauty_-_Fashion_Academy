"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

// An accessible accordion: each question is a real <button> with aria-expanded and
// aria-controls, the answer is a labelled region, and the open/close is a CSS grid-row
// transition (0fr → 1fr) so the height animates without measuring anything in JS. The
// panel stays in the DOM when closed (`inert` keeps it out of the tab order and the
// accessibility tree), so the answers remain indexable. One item open at a time.
export function Faq({ items, className }: { items: FaqItem[]; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={cn("border-t border-border", className)}>
      {items.map((item, index) => {
        const open = openIndex === index;
        const buttonId = `${baseId}-q-${index}`;
        const panelId = `${baseId}-a-${index}`;

        return (
          <div key={item.question} className="border-b border-border">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex min-h-[64px] w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span
                  className={cn(
                    "font-display text-h3 font-medium tracking-[0.01em] transition-colors duration-500",
                    open ? "text-wine" : "text-ink"
                  )}
                >
                  {item.question}
                </span>
                {open ? (
                  <Minus className="h-4 w-4 shrink-0 text-wine" strokeWidth={1.5} aria-hidden="true" />
                ) : (
                  <Plus className="h-4 w-4 shrink-0 text-wine" strokeWidth={1.5} aria-hidden="true" />
                )}
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!open}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 text-body text-ink-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
