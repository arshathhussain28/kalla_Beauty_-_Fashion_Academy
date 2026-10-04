import { WHY_CLOSING } from "@/data/why-kala";
import { Reveal } from "@/components/ui/Reveal";

// The quiet page: three lines, a lot of air, nothing else. After a dense run of image and
// index sections, this is the held breath before the enquiry.
export function ClosingStatement() {
  return (
    <section className="bg-white px-6 py-28 text-center lg:px-12 lg:py-48">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-[40px] font-semibold leading-[1.15] tracking-[0.01em] text-ink sm:text-[48px] lg:text-display">
          {WHY_CLOSING.lines.map((line, index) => (
            <Reveal key={line} delay={0.25 * index} y={16}>
              <span className="block">{line}</span>
            </Reveal>
          ))}
        </h2>

        <Reveal delay={0.9}>
          <p className="mt-14 text-eyebrow font-medium uppercase tracking-[0.3em] text-rose-deep">
            {WHY_CLOSING.name}
          </p>
          <p className="mt-3 font-display text-h2 font-medium tracking-[0.01em] text-wine">
            {WHY_CLOSING.tagline}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
