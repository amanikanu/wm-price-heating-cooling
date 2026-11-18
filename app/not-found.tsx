import Link from 'next/link';
import { CallButton, BookButton } from '@/components/CtaButtons';

export default function NotFound() {
  return (
    <div className="container section max-w-2xl text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-2 text-3xl font-bold text-brand-dark">We could not find that page</h1>
      <p className="mt-3 leading-7 text-muted">The page may have moved. Try the site map, or just call or book service.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3"><CallButton /><BookButton /><Link href="/site-map/" className="btn btn-outline">Site map</Link></div>
    </div>
  );
}
