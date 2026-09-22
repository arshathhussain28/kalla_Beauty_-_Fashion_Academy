import { cn } from "@/lib/utils";

// The brand's signature divider (§07 Visual Language): a 1px rose-gold rule broken by
// one small diamond — "the stitch, abstracted." Use once per layout, never twice.
export function ThreadRule({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)} aria-hidden="true">
      <span className="h-px flex-1 bg-rose" />
      <span className="h-1.5 w-1.5 rotate-45 bg-rose" />
      <span className="h-px flex-1 bg-rose" />
    </div>
  );
}
