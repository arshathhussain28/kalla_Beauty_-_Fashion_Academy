interface PageStubProps {
  eyebrow: string;
  title: string;
  description: string;
}

/** Temporary placeholder for routes whose visual design hasn't been art-directed yet. */
export function PageStub({ eyebrow, title, description }: PageStubProps) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-32 text-center">
      <p className="text-sm uppercase tracking-[0.14em] text-rose-gold">{eyebrow}</p>
      <h1 className="max-w-2xl font-display text-display-lg text-charcoal">{title}</h1>
      <p className="max-w-xl text-base text-charcoal/70">{description}</p>
    </main>
  );
}
