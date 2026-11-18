import Link from 'next/link';
import Image from 'next/image';
import { ArrowIcon } from './Icons';

export type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
  icon?: 'heat' | 'cool' | 'air' | 'plan' | 'emergency' | 'install';
  image?: string;
  imageAlt?: string;
  badge?: string;
};

const glyph: Record<NonNullable<ServiceCardProps['icon']>, string> = {
  heat: '♨',
  cool: '❄',
  air: '✦',
  plan: '✓',
  emergency: '⚡',
  install: '⚙',
};

export function ServiceCard({
  title,
  description,
  href,
  icon = 'heat',
  image,
  imageAlt,
  badge,
}: ServiceCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl">
      {/* Photographic Header (if image supplied) */}
      {image && (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
          {badge && (
            <span className="absolute left-3.5 top-3.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-900 shadow-md backdrop-blur-sm">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-6">
        {!image && (
          <div className="mb-4 flex items-start justify-between">
            <span
              aria-hidden="true"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl font-bold text-blue-800"
            >
              {glyph[icon]}
            </span>
            <span className="text-slate-400 transition-colors group-hover:text-blue-600">↗</span>
          </div>
        )}

        <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-700">
          {title}
        </h3>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600">
          {description}
        </p>

        <div className="mt-6 border-t border-slate-100 pt-4">
          <Link
            href={href}
            className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-blue-700 transition-colors hover:text-blue-900"
          >
            <span>Explore Service</span>
            <span className="sr-only">for {title}</span>
            <ArrowIcon width={16} height={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
