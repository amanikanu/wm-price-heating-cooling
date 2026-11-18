import { business } from '@/content/business';
import { ShieldIcon } from './Icons';

/** F10: credentials from the single source of truth. Clean corporate trust bar. */
export function TrustBar() {
  return (
    <section aria-label="Why homeowners trust us" className="border-y border-slate-200/90 bg-white py-6 shadow-sm">
      <div className="container grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <span className="text-xl font-extrabold">85+</span>
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">Years of Heritage</div>
            <div className="text-xs text-slate-500">Serving Mahoning Valley since {business.founded}</div>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <span className="text-xl font-extrabold">{business.google.rating}★</span>
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">5-Star Reputation</div>
            <div className="text-xs text-slate-500">{business.google.reviewCount}+ Verified Google Reviews</div>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
            <ShieldIcon className="h-6 w-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">Carrier Factory Authorized</div>
            <div className="text-xs text-slate-500">President’s Award Multi-Year Winner</div>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <span className="text-lg font-bold">24/7</span>
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">Emergency Dispatch</div>
            <div className="text-xs text-slate-500">Live local answering day &amp; night</div>
          </div>
        </div>
      </div>
    </section>
  );
}
