import { business } from '@/content/business';
import { PhoneIcon, CalendarIcon } from './Icons';
import Link from 'next/link';

/** F1: sticky bottom call bar on mobile. */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_24px_-12px_rgba(0,48,94,.5)] lg:hidden">
      <div className="grid grid-cols-2 gap-2 p-2">
        <a href={`tel:${business.tel}`} data-call-number className="btn btn-cta text-[0.95rem]">
          <PhoneIcon width={18} height={18} /> Call now
        </a>
        <Link href="/request-service/" className="btn btn-brand text-[0.95rem]">
          <CalendarIcon width={18} height={18} /> Book Service
        </Link>
      </div>
    </div>
  );
}
