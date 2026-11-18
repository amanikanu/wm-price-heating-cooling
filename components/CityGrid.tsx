import Link from 'next/link';
import { cities } from '@/content/cities';

export function CityGrid({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={`grid gap-2 ${compact ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'}`}>
      {cities.map((city) => (
        <li key={city.slug}>
          <Link href={`/city/${city.slug}/`} className="flex min-h-[44px] items-center rounded-lg border border-line bg-white px-3 text-[0.94rem] font-medium text-brand-dark hover:border-brand hover:bg-brand-soft">
            {city.name}, OH
          </Link>
        </li>
      ))}
    </ul>
  );
}
