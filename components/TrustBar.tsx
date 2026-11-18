import { business } from '@/content/business';
import { ShieldIcon } from './Icons';

/** F10: credentials from the single source of truth. Badge artwork needs brand approval, so we use text. */
export function TrustBar() {
  return (
    <section aria-label="Why homeowners trust us" className="proof-strip">
      <div className="container grid gap-4 py-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="proof-item"><span className="proof-number">{business.founded}</span><span>serving the valley<br />for generations</span></div>
        <div className="proof-item"><span className="proof-number">{business.google.rating}<small>★</small></span><span>Google rating<br />from {business.google.reviewCount} reviews</span></div>
        <div className="proof-item"><ShieldIcon className="shrink-0 text-[#ffdf5e]" width={22} height={22} /><span>Carrier Factory<br />Authorized Dealer</span></div>
        <div className="proof-item"><span className="proof-number">24/7</span><span>emergency service<br />when you need it</span></div>
      </div>
    </section>
  );
}
