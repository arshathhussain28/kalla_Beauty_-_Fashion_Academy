// Renders one schema.org JSON-LD block. The data is always built from our own constants
// (never from visitor input); `<` is escaped so no value can ever close the script tag.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
