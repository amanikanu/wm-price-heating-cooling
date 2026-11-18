import Link from 'next/link';
import { business } from '@/content/business';

export function ReviewSummary({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-xl ${compact ? 'bg-white p-5' : 'bg-brand-soft p-6'} border border-line`}>
      <p className="text-4xl font-bold text-brand-dark">{business.google.rating}<span className="ml-1 text-lg text-brand" aria-hidden="true">★★★★★</span></p>
      <p className="mt-1 text-sm text-muted">
        Google rating from {business.google.reviewCount} reviews · last updated {business.google.lastUpdated}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link href="/reviews/" className="btn btn-outline text-sm">Read reviews</Link>
        <a href={business.google.reviewUrl} rel="noopener noreferrer" target="_blank" className="btn btn-brand text-sm">Leave a review</a>
      </div>
    </div>
  );
}
