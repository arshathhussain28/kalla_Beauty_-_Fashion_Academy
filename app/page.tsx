import { buildMetadata, SITE_NAME } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${SITE_NAME} — Craft. Confidence. Career.`,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-32 text-center">
      <p className="text-sm uppercase tracking-[0.14em] text-rose-gold">
        Craft · Confidence · Career
      </p>
      <h1 className="font-display text-display-xl text-charcoal">KALA</h1>
      <p className="max-w-md text-base text-charcoal/70">
        Design system foundation is live. The full homepage composition arrives in the next
        build stage, after creative direction sign-off.
      </p>
    </main>
  );
}
