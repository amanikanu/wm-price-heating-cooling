import Link from 'next/link';
import { business } from '@/content/business';
import { primaryNav } from '@/content/nav';
import { CallButton, BookButton } from './CtaButtons';

/** F1: sticky header with tap-to-call and Book Service on every page. Mobile menu is native <details>. */
export function StickyHeader() {
  return (
    <header className="site-header sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-sm">
      <div className="container flex min-h-[76px] items-center gap-2 py-2">
        <Link href="/" className="shrink-0" aria-label={`${business.name} home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={business.logo} alt={business.name} width={110} height={50} className="h-[54px] w-auto" />
        </Link>
        <nav aria-label="Primary" className="ml-8 hidden items-center gap-5 lg:flex">
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-[0.88rem] font-bold text-brand-dark/75 transition hover:text-brand">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <CallButton size="sm" className="hidden sm:inline-flex" />
          <a href={`tel:${business.tel}`} data-call-number className="btn btn-cta !min-h-[48px] !px-3 sm:hidden" aria-label={`Call ${business.phoneDisplay}`}>
            <span className="text-base font-bold">Call</span>
          </a>
          <BookButton size="sm" />
          <details className="relative lg:hidden">
            <summary className="btn btn-outline !min-h-[48px] cursor-pointer list-none px-3 text-sm [&::-webkit-details-marker]:hidden" aria-label="Open navigation menu">
              Menu
            </summary>
            <nav aria-label="Mobile primary" className="absolute right-0 top-[56px] w-[min(20rem,90vw)] rounded-xl border border-line bg-white p-2 shadow-xl">
              {primaryNav.map((item) => (
                <Link key={item.href} href={item.href} className="block rounded-lg px-4 py-3 font-medium text-brand-dark hover:bg-brand-soft">
                  {item.label}
                </Link>
              ))}
              <a href={`tel:${business.tel}`} data-call-number className="mt-1 block rounded-lg bg-cta px-4 py-3 font-bold text-white">
                Call {business.phoneDisplay}
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
