import { WHY_HERO } from "@/data/why-kala";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { PageHeading } from "@/components/ui/PageHeading";

// An editorial cover: the headline as architecture on the left, one arched photograph on
// the right (the arch is the brand's single soft shape). Pure-CSS entrance so it plays on
// first paint, same as the homepage hero.
export function WhyHero() {
  return (
    <section className="bg-cream px-6 pb-20 pt-12 lg:px-12 lg:pb-28 lg:pt-20">
      <div className="mx-auto grid max-w-[1200px] items-end gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7 lg:pb-6">
          <PageHeading eyebrow={WHY_HERO.eyebrow} title={WHY_HERO.title.join(" ")}>
            <p className="mt-8 max-w-md text-body text-ink-muted">{WHY_HERO.text}</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href="#approach" variant="primary">
                Explore the KALA Approach
              </Button>
              <ArrowLink href="/courses">Explore Courses</ArrowLink>
            </div>
          </PageHeading>
        </div>

        <div className="relative lg:col-span-5">
          <ImageSlot
            slot="why-hero"
            priority
            sizes="(min-width: 1024px) 460px, 100vw"
            className="aspect-[4/5] w-full rounded-t-[200px] lg:rounded-t-[240px]"
            imageClassName="kala-settle"
          />
          <span
            aria-hidden="true"
            className="absolute -left-4 bottom-10 hidden h-px w-24 bg-rose lg:block"
          />
        </div>
      </div>
    </section>
  );
}
