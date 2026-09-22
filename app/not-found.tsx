import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-32 text-center">
      <p className="text-sm uppercase tracking-[0.14em] text-rose-gold">404</p>
      <h1 className="max-w-xl font-display text-display-md text-charcoal">
        Looks like this page took a different path.
      </h1>
      <Link
        href="/"
        className="mt-4 inline-flex items-center border border-charcoal px-8 py-3 text-sm uppercase tracking-[0.14em] text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
      >
        Back to KALA
      </Link>
    </div>
  );
}
