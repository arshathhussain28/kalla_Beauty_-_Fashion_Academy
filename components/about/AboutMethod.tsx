import { ABOUT_METHOD } from "@/data/about";
import { Reveal } from "@/components/ui/Reveal";

// The page's one wine band: how KALA teaches, in three plain steps. Everything stated here
// is in the client's course document — theory + practical, hands-on practice, detailing,
// final practical assessment, completion certificate.
export function AboutMethod() {
  return (
    <section className="bg-wine px-6 py-24 text-cream lg:px-12 lg:py-36">
      <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-light">
              {ABOUT_METHOD.eyebrow}
            </p>
            <h2 className="mt-4 text-[40px] font-display font-semibold leading-[1.05] tracking-[0.01em] lg:text-display">
              {ABOUT_METHOD.title}
            </h2>
          </Reveal>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {ABOUT_METHOD.steps.map((step, index) => (
            <li key={step.number} className="relative py-8 lg:py-10">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-cream/20"
              />
              <Reveal delay={0.08 * index}>
                <div className="grid grid-cols-[32px_1fr] gap-x-4 sm:grid-cols-[56px_1fr] sm:gap-x-6 lg:grid-cols-[72px_1fr]">
                  <span className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-light">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-display text-[32px] font-semibold tracking-[0.01em] sm:text-h1">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-md text-body text-cream/80">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
          <li aria-hidden="true" className="h-px bg-cream/20" />
        </ol>
      </div>
    </section>
  );
}
