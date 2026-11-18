/** Server-rendered structured data. Escapes < to keep inline JSON safe. */
export function JsonLd({ schema }: { schema: unknown }) {
  const json = JSON.stringify(schema).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
