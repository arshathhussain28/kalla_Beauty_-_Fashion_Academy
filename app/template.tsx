// Re-mounted on every navigation (that is what a template is for), so the page-enter
// animation in globals.css plays each time a route changes. CSS only — nothing waits on
// JavaScript, and under reduced motion the rule collapses to an instant swap.
// `flex flex-1 flex-col` keeps each page's <main> stretching to fill the viewport, so the
// footer still sits at the bottom of short pages.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="kala-page flex flex-1 flex-col">{children}</div>;
}
