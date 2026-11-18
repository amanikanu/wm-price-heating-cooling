import Link from 'next/link';
import { business } from '@/content/business';
import { CallButton } from './CtaButtons';

/** F2: "No heat / No cool?" block with after-hours instruction first. */
export function EmergencyStrip() {
  return (
    <section aria-labelledby="emergency-heading" className="border-b border-[#f2d5a8] bg-[#fff6e9]">
      <div className="container flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 id="emergency-heading" className="text-xl font-bold text-brand-dark sm:text-2xl">No heat or no cooling?</h2>
          <p className="mt-1 max-w-2xl text-[0.97rem] leading-6 text-ink">
            Call us — {business.hours.emergency}. {business.hours.afterHours}
          </p>
          <Link href="/emergency-service/" className="mt-2 inline-block min-h-[44px] py-2 text-sm font-semibold text-brand underline underline-offset-4">
            What counts as an HVAC emergency?
          </Link>
        </div>
        <CallButton className="w-full shrink-0 md:w-auto" />
      </div>
    </section>
  );
}
