import { WHY_AUDIENCE } from "@/data/why-kala";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

// On desktop the five groups step across the page and back — each one set at a different
// indent so the list reads as a path rather than a stack of identical rows. On mobile they
// stack flush. No outcomes are claimed for any of them.
const INDENT = ["lg:ml-0", "lg:ml-[14%]", "lg:ml-[28%]", "lg:ml-[14%]", "lg:ml-0"] as const;

export function AudienceSection() {
  return (
    <section className="bg-cream px-6 py-20 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
            {WHY_AUDIENCE.eyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl text-[40px] font-display font-semibold leading-[1.05] tracking-[0.01em] text-ink lg:text-display">
            {WHY_AUDIENCE.title}
          </h2>
        </Reveal>

        <ul className="mt-14 lg:mt-20">
          {WHY_AUDIENCE.groups.map((group, index) => (
            <li key={group.name} className={cn("border-t border-border", INDENT[index])}>
              <Reveal delay={0.04 * index}>
                <div className="grid gap-3 py-7 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-baseline lg:gap-10 lg:py-9">
                  <h3 className="font-display text-h1 font-semibold tracking-[0.01em] text-ink">
                    {group.name}
                  </h3>
                  <p className="max-w-sm text-body text-ink-muted">{group.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
          <li aria-hidden="true" className="h-px bg-border" />
        </ul>
      </div>
    </section>
  );
}
