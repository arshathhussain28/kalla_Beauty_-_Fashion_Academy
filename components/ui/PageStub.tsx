interface PageStubProps {
  eyebrow: string;
  title: string;
  description: string;
}

/** Temporary placeholder for routes whose visual design hasn't been art-directed yet. */
export function PageStub({ eyebrow, title, description }: PageStubProps) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-32 text-center">
      <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">
        {eyebrow}
      </p>
      <h1 className="max-w-2xl text-h1 font-display font-semibold tracking-[0.01em] text-ink">
        {title}
      </h1>
      <p className="max-w-xl text-body text-ink-muted">{description}</p>
    </main>
  );
}
