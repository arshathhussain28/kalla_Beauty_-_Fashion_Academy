import { buildMetadata } from "@/lib/seo";
import { WORK_READY } from "@/data/work";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { WorkGallery } from "@/components/work/WorkGallery";
import { WorkHero } from "@/components/work/WorkHero";
import { generalEnquiryWhatsAppLink } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: "The Work",
  description:
    "Made at KALA — student work across makeup, beauty, mehendi, saree draping and fashion.",
  path: "/the-work",
  // Until the first chapter of photographs exists this page is a placeholder for a future
  // gallery, so it is kept out of search even after indexing is switched on for the site.
  noIndex: !WORK_READY,
});

// An editorial gallery, not a grid: craft chapters, each composed differently, with one
// full-bleed pause in the middle, a craft filter and a lightbox. Every frame is a named
// slot in data/images.ts, and a chapter appears once all three of its photographs are
// registered there (see data/work.ts) — nothing here changes when photographs arrive.
// Until then the page says so plainly instead of showing empty boxes, and the navigation,
// footer and sitemap leave it out. Closes on the site's one wine band.
export default function TheWorkPage() {
  return (
    <main className="flex-1">
      <WorkHero />
      {WORK_READY ? (
        <WorkGallery />
      ) : (
        <section className="bg-white px-6 py-20 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1200px]">
            <Reveal>
              <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
                Coming soon
              </p>
              <h2 className="mt-4 max-w-2xl text-[40px] font-display font-semibold leading-[1.05] tracking-[0.01em] text-ink lg:text-h1">
                Our students&apos; portfolio is being prepared.
              </h2>
              <p className="mt-5 max-w-md text-body text-ink-muted">
                We are collecting finished work from every craft — makeup, beauty, mehendi, saree
                styling and fashion. Until it is ready, see what each course covers, or ask us
                about the work directly.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <ArrowLink href="/courses">Explore the Courses</ArrowLink>
                <ArrowLink href={generalEnquiryWhatsAppLink({ source: "the-work" })} external>
                  Talk to KALA
                </ArrowLink>
              </div>
            </Reveal>
          </div>
        </section>
      )}
      <FinalCTA />
    </main>
  );
}
