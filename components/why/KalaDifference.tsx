import { WHY_DIFFERENCE } from "@/data/why-kala";
import { Reveal } from "@/components/ui/Reveal";

// Six evidence-based points — every one is in the client's course document — set as a
// large-numeral index rather than icon cards. The heading column stays put while the list
// scrolls past it on desktop.
export function KalaDifference() {
  return (
    <section className="bg-white px-6 py-20 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4 lg:self-start">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
                {WHY_DIFFERENCE.eyebrow}
              </p>
              <h2 className="mt-4 text-h1 font-display font-semibold leading-[1.1] tracking-[0.01em] text-ink">
                {WHY_DIFFERENCE.title}
              </h2>
              <p className="mt-5 max-w-xs text-body text-ink-muted">{WHY_DIFFERENCE.text}</p>
            </Reveal>
          </div>
        </div>

        <ol className="border-t border-border lg:col-span-7 lg:col-start-6">
          {WHY_DIFFERENCE.points.map((point, index) => (
            <li key={point.title} className="border-b border-border">
              <Reveal delay={0.05 * (index % 3)}>
                <div className="group grid grid-cols-[64px_1fr] items-baseline gap-x-6 py-8 lg:grid-cols-[96px_1fr] lg:py-10">
                  <span className="font-display text-[40px] font-medium leading-none text-rose transition-colors duration-500 group-hover:text-wine lg:text-display">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-sans text-h3 font-medium uppercase tracking-[0.06em] text-ink transition-colors duration-500 group-hover:text-wine">
                      {point.title}
                    </h3>
                    <p className="mt-2 max-w-md text-body text-ink-muted">{point.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
