import Link from 'next/link';
import { ArrowIcon } from './Icons';

export type ServiceCardProps = { title: string; description: string; href: string; icon: 'heat' | 'cool' | 'air' | 'plan' };

const glyph: Record<ServiceCardProps['icon'], string> = {
  heat: '♨', cool: '❄', air: '✦', plan: '✓',
};

export function ServiceCard({ title, description, href, icon }: ServiceCardProps) {
  return (
    <article className="service-card group flex flex-col p-5 transition hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <span aria-hidden="true" className="service-card-icon">{glyph[icon]}</span>
        <span className="service-card-arrow" aria-hidden="true">↗</span>
      </div>
      <h3 className="text-lg font-bold text-brand-dark">{title}</h3>
      <p className="mt-2 flex-1 text-[0.95rem] leading-6 text-muted">{description}</p>
      <Link href={href} className="mt-5 inline-flex min-h-[44px] items-center gap-1 text-sm font-bold text-brand hover:underline">
        Explore {title} <span className="sr-only">services</span> <ArrowIcon width={16} height={16} />
      </Link>
    </article>
  );
}
