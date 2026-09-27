"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { CurriculumModule } from "@/data/courses";

// Progressive disclosure for curriculum — a flat 15-20 item bullet list reads as a
// wall of text, so topics are grouped into numbered modules that expand on click.
export function CourseModules({ modules }: { modules: CurriculumModule[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-y border-border">
      {modules.map((module, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={module.title} className="border-b border-border last:border-b-0">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="flex items-baseline gap-4">
                <span className="text-small text-rose-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-h3 font-sans font-medium uppercase tracking-[0.06em] text-ink">
                  {module.title}
                </span>
              </span>
              {isOpen ? (
                <Minus className="h-4 w-4 shrink-0 text-wine" strokeWidth={1.5} />
              ) : (
                <Plus className="h-4 w-4 shrink-0 text-wine" strokeWidth={1.5} />
              )}
            </button>
            {isOpen && (
              <ul className="space-y-2 pb-5 pl-11">
                {module.topics.map((topic) => (
                  <li key={topic} className="text-body text-ink-muted">
                    — {topic}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
