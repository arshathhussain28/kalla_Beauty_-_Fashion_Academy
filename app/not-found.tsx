import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-32 text-center">
      <p className="text-eyebrow font-medium uppercase tracking-[0.24em] text-rose-deep">404</p>
      <h1 className="max-w-xl text-h1 font-display font-semibold tracking-[0.01em] text-ink">
        Looks like this page took a different path.
      </h1>
      <Button href="/" variant="primary" className="mt-4">
        Back to KALA
      </Button>
    </div>
  );
}
