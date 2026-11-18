import Image from 'next/image';
import { business } from '@/content/business';
import { CallButton, BookButton } from './CtaButtons';

/** Homepage hero — the CTA pair is above the fold on mobile (PRD §9). */
export function Hero() {
  return (
    <section className="hero relative overflow-hidden text-white">
      <div className="hero-grid" aria-hidden="true" />
      <div className="container relative grid items-center gap-10 py-14 md:grid-cols-[1.04fr_.96fr] md:py-20 lg:py-24">
        <div className="relative z-10">
          <div className="hero-kicker"><span className="hero-kicker-dot" /> Mahoning Valley · Since {business.founded}</div>
          <h1 className="hero-title mt-5">
            Comfort that <em>holds up.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/80 sm:text-xl">
            Heating, cooling, and indoor air quality expertise for the homes and families of the Mahoning Valley.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CallButton light className="w-full sm:w-auto" />
            <BookButton light className="w-full sm:w-auto" />
          </div>
          <p className="mt-4 text-sm text-white/65">{business.hours.emergency} · {business.hours.office}</p>
          <div className="hero-metrics mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/15 pt-5">
            <div><strong>15</strong><span>towns served</span></div>
            <div><strong>4.8</strong><span>Google rating</span></div>
            <div><strong>24/7</strong><span>emergency help</span></div>
          </div>
        </div>
        <div className="hero-visual relative mx-auto w-full max-w-[32rem] md:justify-self-end">
          <div className="hero-visual-card">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[.16em] text-brand-dark/65">
              <span>Local expertise</span><span>{business.founded}—now</span>
            </div>
            <div className="hero-visual-line" />
            <p className="relative z-10 max-w-[16rem] font-serif text-2xl leading-tight text-brand-dark sm:text-3xl">A better kind of home comfort starts with showing up.</p>
            <Image
              src={business.mascot}
              alt="Wm. Price Heating & Cooling mascot"
              width={230}
              height={391}
              sizes="(min-width: 768px) 230px, 180px"
              className="hero-mascot"
            />
            <div className="hero-visual-stamp">WMP<span>HVAC</span></div>
          </div>
          <div className="hero-visual-caption"><span className="hero-caption-mark" /> Dependable service, close to home.</div>
        </div>
      </div>
    </section>
  );
}
