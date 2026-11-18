import Link from 'next/link';
import type { Special } from '@/content/types';
import { ArrowIcon } from './Icons';

/** PRD 16.4 #6: all offer text is real HTML text, never baked into an image. */
export function OfferCard({ special }: { special: Special }) {
  return (
    <article className="card flex flex-col gap-2 p-5">
      <p className="text-3xl font-bold text-cta">{special.amount}</p>
      <h3 className="text-lg font-semibold text-brand-dark">{special.title}</h3>
      <p className="text-sm text-muted">{special.finePrint}</p>
      <p className="text-xs text-muted">Valid {special.startDate} – {special.endDate}</p>
      <Link href="/request-service/" className="mt-2 inline-flex min-h-[44px] items-center gap-1 font-bold text-brand hover:underline">
        Request service <ArrowIcon width={17} height={17} />
      </Link>
    </article>
  );
}

/** Neutral replacement + financing card used when NO offer has been approved. */
export function ReplacementCard() {
  return (
    <article className="replacement-card">
      <div>
        <p className="text-xs font-bold uppercase tracking-[.14em] text-brand">A clear next step</p>
        <h3 className="mt-2 text-2xl font-bold text-brand-dark">Start with a replacement estimate</h3>
        <p className="mt-3 max-w-xl leading-7 text-muted">
          Ask about current Carrier rebates and financing options when you request an estimate. We will walk you through the options before you decide.
        </p>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/request-service/?type=Estimate" className="btn btn-cta">Get a Replacement Estimate</Link>
        <Link href="/financing/" className="btn btn-outline">Financing information</Link>
      </div>
    </article>
  );
}
