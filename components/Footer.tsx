import Link from 'next/link';
import { business } from '@/content/business';
import { services } from '@/content/services';
import { CallButton } from './CtaButtons';

/** F10/F19: NAP + license, and ONLY verified social links with matching labels (16.4 #7). */
export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-brand-dark text-white">
      <div className="container grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-lg font-bold">{business.name}</h3>
          <address className="mt-3 not-italic leading-7 text-white/85">
            {business.address.street}<br />{business.address.city}, {business.address.state} {business.address.zip}
          </address>
          <p className="mt-3 text-sm text-white/85">License #{business.license} · Since {business.founded}</p>
          <CallButton light size="sm" className="mt-4" />
        </div>
        <div>
          <h3 className="text-lg font-bold">Services</h3>
          <ul className="mt-3 space-y-1 text-sm">
            {services.slice(0, 6).map((service) => (
              <li key={service.slug}><Link className="inline-flex min-h-[36px] items-center text-white/85 hover:text-white hover:underline" href={`/residential/${service.slug}/`}>{service.name}</Link></li>
            ))}
            <li><Link className="inline-flex min-h-[36px] items-center text-white/85 hover:underline" href="/residential/">All services</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold">Company</h3>
          <ul className="mt-3 space-y-1 text-sm">
            {[
              ['About us', '/company/'], ['Reviews', '/reviews/'], ['Leave a review', '/review/'],
              ['Maintenance plans', '/assurance-and-security-plans/'], ['Specials', '/specials/'],
              ['Financing', '/financing/'], ['FAQ', '/faq/'], ['Careers', '/careers/'],
              ['Service area', '/service-area/'], ['Contact', '/contact/'],
            ].map(([label, href]) => (
              <li key={href}><Link className="inline-flex min-h-[36px] items-center text-white/85 hover:underline" href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold">Hours &amp; social</h3>
          <p className="mt-3 text-sm leading-6 text-white/85">Office: {business.hours.office}<br />{business.hours.emergency}</p>
          <p className="mt-2 text-sm leading-6 text-white/85">{business.hours.afterHours}</p>
          <ul className="mt-4 space-y-1 text-sm">
            {business.socials.map((social) => (
              <li key={social.href}>
                <a href={social.href} rel="noopener noreferrer" target="_blank" className="inline-flex min-h-[36px] items-center text-white/85 hover:underline">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/20">
        <div className="container flex flex-wrap items-center gap-x-5 gap-y-2 py-5 text-sm text-white/75">
          <span>© {new Date().getFullYear()} {business.name}</span>
          <Link href="/privacy-policy/" className="hover:underline">Privacy Policy</Link>
          <Link href="/accessibility-statement/" className="hover:underline">Accessibility Statement</Link>
          <Link href="/site-map/" className="hover:underline">Site Map</Link>
        </div>
      </div>
    </footer>
  );
}
