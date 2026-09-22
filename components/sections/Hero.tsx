import { Button } from "@/components/ui/Button";

// §16 Website System: full-bleed photo + wine scrim bottom, serif headline 64px (40px
// mobile), one CTA, 70vh — never 100vh. No real photography exists yet, so the "photo"
// layer is a wine gradient stand-in in the brand's own colours rather than stock imagery
// — swap the gradient div below for an actual <Image> the moment a hero photograph exists.
export function Hero() {
  return (
    <section className="relative flex h-[70vh] min-h-[520px] items-end overflow-hidden bg-wine-deep">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #9a3a56 0%, #7e1f3d 45%, #5c1428 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-wine-deep via-wine-deep/40 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-16 lg:px-12 lg:pb-24">
        <div className="max-w-2xl">
          <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-light">
            Beauty &amp; Fashion Education
          </p>
          <h1 className="mt-4 text-[40px] font-display font-semibold leading-[1.05] tracking-[0.01em] text-cream lg:text-display">
            Craft Your Confidence
          </h1>
          <p className="mt-5 max-w-md text-body text-cream/85">
            A premium academy training women in beauty, fashion and tailoring to a
            professional standard — small cohorts, working tutors, a real portfolio.
          </p>
          <Button href="/courses" variant="primary" className="mt-8">
            Explore Courses
          </Button>
        </div>
      </div>
    </section>
  );
}
