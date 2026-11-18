import Link from 'next/link';
import { business, phoneLink } from '@/content/business';
import { PhoneIcon, CalendarIcon } from './Icons';

type Props = { size?: 'sm' | 'md'; className?: string; light?: boolean };

/** The ONE primary CTA colour is reserved for Call and Book (PRD §9). */
export function CallButton({ size = 'md', className = '', light = false }: Props) {
  return (
    <a
      href={phoneLink}
      data-call-number
      className={`btn ${light ? 'btn-light' : 'btn-cta'} ${size === 'sm' ? 'text-sm px-3' : ''} ${className}`}
      aria-label={`Call Wm. Price Heating & Cooling at ${business.phoneDisplay}, 24 hours a day`}
    >
      <PhoneIcon width={18} height={18} />
      <span>Call {business.phoneDisplay}</span>
    </a>
  );
}

export function BookButton({ size = 'md', className = '', light = false, type }: Props & { type?: string }) {
  const href = type ? `/request-service/?type=${encodeURIComponent(type)}` : '/request-service/';
  return (
    <Link href={href} className={`btn ${light ? 'btn-light' : 'btn-outline'} ${size === 'sm' ? 'text-sm px-3' : ''} ${className}`}>
      <CalendarIcon width={18} height={18} />
      <span>Book Service</span>
    </Link>
  );
}
