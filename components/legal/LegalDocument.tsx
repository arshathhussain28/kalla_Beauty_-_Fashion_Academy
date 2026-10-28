import { LEGAL_STATUS, LEGAL_UPDATED, type LegalDoc } from "@/data/legal";
import { ArrowLink } from "@/components/ui/ArrowLink";

// A calm reading page for the two legal texts: title, a one-paragraph introduction, then
// numbered plain-language sections in a narrow column. While LEGAL_STATUS is "draft" a
// notice at the top says so, so nobody mistakes the text for an approved policy.
export function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <main className="flex-1 bg-cream px-6 pb-24 pt-14 lg:px-12 lg:pb-32 lg:pt-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-2xl">
          <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
            {doc.eyebrow}
          </p>
          <h1 className="mt-4 text-[44px] font-display font-semibold leading-[1.05] tracking-[0.01em] text-ink lg:text-h1">
            {doc.title}
          </h1>
          <p className="mt-3 text-small text-ink-muted">Last updated {LEGAL_UPDATED}</p>

          {LEGAL_STATUS === "draft" && (
            <aside
              aria-label="Draft notice"
              className="mt-8 border-l-2 border-wine! bg-white px-5 py-4"
            >
              <p className="text-small font-medium text-ink">Draft for review</p>
              <p className="mt-1 text-small text-ink-muted">
                This text has not yet been reviewed or approved by KALA or a legal adviser and may
                change before the website launches publicly. Questions in the meantime are
                welcome — see the contact details at the end.
              </p>
            </aside>
          )}

          <p className="mt-8 text-body text-ink-muted">{doc.intro}</p>

          <div className="mt-12 space-y-10">
            {doc.sections.map((section, index) => (
              <section key={section.heading}>
                <h2 className="flex items-baseline gap-3 font-display text-h2 font-semibold tracking-[0.01em] text-ink">
                  <span className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-body text-ink-muted">
                    {paragraph}
                  </p>
                ))}
                {section.items && (
                  <ul className="mt-3 space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="text-body text-ink-muted">
                        — {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-14 border-t border-border pt-8">
            <ArrowLink href="/contact">Contact KALA</ArrowLink>
          </div>
        </div>
      </div>
    </main>
  );
}
