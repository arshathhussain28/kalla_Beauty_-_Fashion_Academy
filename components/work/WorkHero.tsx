import { WORK_HERO } from "@/data/work";
import { PageHeading } from "@/components/ui/PageHeading";

// Typography as architecture: the title carries the page. No image up here on purpose —
// the gallery below is where the page earns it, and the craft filter that follows is the
// way in. The title arrives word by word (PageHeading), the same entrance every page uses.
export function WorkHero() {
  return (
    <section className="bg-cream px-6 pb-14 pt-14 lg:px-12 lg:pb-20 lg:pt-24">
      <div className="mx-auto max-w-[1200px]">
        <PageHeading
          eyebrow={WORK_HERO.eyebrow}
          title={WORK_HERO.title}
          titleClassName="text-[56px] sm:text-[72px] lg:text-[96px] leading-[0.98]"
        >
          <p className="mt-8 max-w-md text-h3 text-ink-muted">{WORK_HERO.text}</p>
        </PageHeading>
      </div>
    </section>
  );
}
