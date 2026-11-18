import Link from 'next/link';
import { breadcrumbSchema } from '@/lib/schema';
import { JsonLd } from './JsonLd';

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: 'Home', path: '/' }, ...items];
  return (
    <>
      <JsonLd schema={breadcrumbSchema(all)} />
      <nav aria-label="Breadcrumb" className="border-b border-line bg-surface">
        <ol className="container flex flex-wrap items-center gap-1 py-3 text-sm text-muted">
          {all.map((crumb, i) => (
            <li key={crumb.path} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === all.length - 1 ? (
                <span aria-current="page" className="font-medium text-ink">{crumb.name}</span>
              ) : (
                <Link href={crumb.path} className="text-brand underline underline-offset-2">{crumb.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
