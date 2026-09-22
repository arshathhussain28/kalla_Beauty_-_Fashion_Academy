// Page hierarchy §16, item 7 — the one permitted wine band per page (§16/§18: "Exactly
// one wine band — the statistics or the closing CTA, not both"). Figures are the brand
// voice guide's own example numbers (§13 "120 practice hours," "14 students," "6
// weeks"), not verified admissions data — replace once real cohort figures are set.
const STATS = [
  { value: "120+", label: "Practice Hours" },
  { value: "14", label: "Students Per Cohort" },
  { value: "6", label: "Week Minimum Programme" },
  { value: "2", label: "Disciplines, One Standard" },
] as const;

export function Statistics() {
  return (
    <section className="bg-wine px-6 py-16 lg:px-12 lg:py-20">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-8 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-[56px] leading-none text-cream">{stat.value}</p>
            <p className="mt-3 text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-light">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
