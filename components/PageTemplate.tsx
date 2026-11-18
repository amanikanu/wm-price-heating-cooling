import Link from 'next/link';
import { notFound } from 'next/navigation';
import { business } from '@/content/business';
import { pageByPath, type StaticPage } from '@/content/pages';
import { faqs } from '@/content/faqs';
import { services, servicesByCategory } from '@/content/services';
import { cities } from '@/content/cities';
import { postMeta } from '@/content/posts';
import { publicSpecials } from '@/content/specials';
import { financing } from '@/content/financing';
import { testimonials } from '@/content/testimonials';
import { allPublicRoutes } from '@/content/routes';
import { faqSchema } from '@/lib/schema';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';
import { JsonLd } from './JsonLd';
import { CallButton, BookButton } from './CtaButtons';
import { BookingForm } from './BookingForm';
import { FAQAccordion } from './FAQAccordion';
import { PlanComparisonTable } from './PlanComparisonTable';
import { CityGrid } from './CityGrid';
import { ServiceAreaDiagram } from './ServiceAreaDiagram';
import { VideoFacade } from './VideoFacade';
import { ReviewSummary } from './ReviewSummary';
import { TestimonialCard } from './TestimonialCard';
import { OfferCard, ReplacementCard } from './OfferCard';
import { ArticleCard } from './ArticleCard';
import { ServiceCard } from './ServiceCard';
import { ArrowIcon, ShieldIcon } from './Icons';

const shortLabels: Record<string, string> = {
  'residential': 'Services', 'company': 'About', 'specials': 'Specials & Financing',
  'assurance-and-security-plans': 'Maintenance plans', 'products': 'Products',
  'replace-your-system': 'Replace Your System', 'faq': 'FAQ', 'service-area': 'Service area',
  'emergency-service': 'Emergency service', 'financing': 'Financing', 'reviews': 'Reviews',
  'review': 'Leave a review', 'request-service': 'Book Service', 'news': 'News',
  'careers': 'Careers', 'contact': 'Contact', 'privacy-policy': 'Privacy Policy',
  'accessibility-statement': 'Accessibility Statement', 'site-map': 'Site Map',
  'referral': 'Referral Program', 'city': 'Service area',
};

function crumbsFor(page: StaticPage): Crumb[] {
  const segments = page.path.split('/').filter(Boolean);
  const crumbs: Crumb[] = [];
  let acc = '';
  segments.forEach((segment, i) => {
    acc += `/${segment}`;
    const isLast = i === segments.length - 1;
    const label = shortLabels[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    crumbs.push({ name: isLast ? label : label, path: `${acc}/` });
  });
  return crumbs;
}

function SectionList({ page }: { page: StaticPage }) {
  if (!page.sections?.length) return null;
  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-2">
      {page.sections.map((section) => (
        <section key={section.heading} className="card p-6">
          <h2 className="text-xl font-bold text-brand-dark">{section.heading}</h2>
          <p className="mt-3 leading-7 text-muted">{section.body}</p>
          {section.bullets && (
            <ul className="mt-4 space-y-2">
              {section.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-[0.96rem] text-ink">
                  <ShieldIcon width={17} height={17} className="mt-1 shrink-0 text-brand" />{bullet}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

function Extras({ page }: { page: StaticPage }) {
  switch (page.kind) {
    case 'booking':
      return <div className="mt-8 max-w-2xl"><BookingForm /></div>;
    case 'news':
      return (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {postMeta.map((post) => <ArticleCard key={post.slug} post={post} />)}
        </div>
      );
    case 'specials': {
      const offers = publicSpecials();
      return (
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {offers.length ? offers.map((offer) => <OfferCard key={offer.id} special={offer} />) : (
            <div className="card p-6">
              <h2 className="text-xl font-bold text-brand-dark">Offers are being updated</h2>
              <p className="mt-2 leading-7 text-muted">Approved specials appear here as readable text with their amount, fine print and valid dates. Call our office for what is currently available.</p>
            </div>
          )}
          <ReplacementCard />
          <div className="card p-6">
            <h2 className="text-xl font-bold text-brand-dark">Financing information</h2>
            <p className="mt-2 leading-7 text-muted">Current terms come from the lender and are approved by Wm. Price before publication.</p>
            <Link href="/financing/" className="btn btn-outline mt-4">Visit financing page</Link>
          </div>
        </div>
      );
    }
    case 'faq':
      return <div className="mt-8 max-w-3xl"><FAQAccordion items={faqs} /></div>;
    case 'reviews':
      return (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <ReviewSummary />
          <div className="grid gap-4">
            {testimonials.filter((t) => t.approved).map((t) => <TestimonialCard key={t.author} testimonial={t} />)}
            <p className="text-sm text-muted">Selected testimonials will appear here once the client approves their reuse.</p>
          </div>
        </div>
      );
    case 'review':
      return (
        <div className="mt-8 max-w-xl rounded-xl border border-line bg-brand-soft p-6">
          <a href={business.google.reviewUrl} rel="noopener noreferrer" target="_blank" className="btn btn-brand w-full">Leave a Google review</a>
          <p className="mt-3 text-sm text-muted">Only verified review platforms are linked from this site.</p>
        </div>
      );
    case 'serviceArea':
      return (
        <div className="mt-8">
          <CityGrid />
          <ServiceAreaDiagram />
        </div>
      );
    case 'contact':
      return (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h2 className="text-xl font-bold text-brand-dark">Call or write</h2>
            <address className="mt-3 not-italic leading-7 text-ink">
              {business.name}<br />{business.address.street}<br />{business.address.city}, {business.address.state} {business.address.zip}
            </address>
            <p className="mt-3 leading-7 text-muted">Office: {business.hours.office}<br />{business.hours.emergency}</p>
            <p className="mt-2 leading-7 text-muted">{business.hours.afterHours}</p>
            <p className="mt-3 text-sm text-muted">License #{business.license}</p>
            <div className="mt-5 flex flex-wrap gap-3"><CallButton /><BookButton /></div>
          </div>
          <div className="card p-6">
            <h2 className="text-xl font-bold text-brand-dark">Prefer a short form?</h2>
            <p className="mt-3 leading-7 text-muted">The Book Service form replaces both the old request form and the old contact form. It takes under a minute on a phone.</p>
            <Link href="/request-service/" className="btn btn-outline mt-5">Open Book Service</Link>
          </div>
        </div>
      );
    case 'siteMap': {
      const routes = allPublicRoutes();
      return (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-brand-dark">All pages</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {routes.map((route) => (
              <li key={route}><Link href={route} className="inline-flex min-h-[44px] items-center text-brand underline underline-offset-2">{route}</Link></li>
            ))}
          </ul>
        </div>
      );
    }
    case 'emergency':
      return (
        <div className="mt-8 rounded-xl border-2 border-cta bg-[#fff6e9] p-6">
          <h2 className="text-2xl font-bold text-brand-dark">Call {business.phoneDisplay} now</h2>
          <p className="mt-3 leading-7 text-ink">{business.hours.afterHours} Office: {business.hours.office}.</p>
          <div className="mt-5 flex flex-wrap gap-3"><CallButton /><BookButton /></div>
        </div>
      );
    case 'financing':
    case 'replace':
      return (
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <ReplacementCard />
          <div className="card p-6">
            <h2 className="text-xl font-bold text-brand-dark">One estimate flow</h2>
            <p className="mt-2 leading-7 text-muted">Choose “Estimate” or “Installation or replacement” on the Book Service form. There is no separate estimate form, and financing questions can be added in the optional message.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/request-service/?type=Estimate" className="btn btn-brand">Request an estimate</Link>
              {financing.prequalificationUrl && (
                <a href={financing.prequalificationUrl} rel="noopener noreferrer" target="_blank" className="btn btn-cta">
                  Pre-qualify{financing.providerLabel ? ` with ${financing.providerLabel}` : ''}
                </a>
              )}
            </div>
            <p className="mt-3 text-sm text-muted">{financing.note}</p>
          </div>
        </div>
      );
    case 'company':
      return (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <VideoFacade />
          <div className="card p-6">
            <h2 className="text-xl font-bold text-brand-dark">Credentials</h2>
            <ul className="mt-3 space-y-2">
              {business.credentials.map((item) => <li key={item} className="flex gap-2 text-ink"><ShieldIcon className="shrink-0 text-brand" width={18} height={18} />{item}</li>)}
            </ul>
            <p className="mt-4 leading-7 text-muted">Real team and job photography will be added when the client supplies it. No stock photos of technicians are used.</p>
            <Link href="/careers/" className="mt-4 inline-flex min-h-[44px] items-center gap-1 font-bold text-brand hover:underline">Careers <ArrowIcon width={17} height={17} /></Link>
          </div>
        </div>
      );
    case 'plans':
      return (
        <div className="mt-8">
          <PlanComparisonTable />
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link href="/assurance-and-security-plans/assurance-agreement/" className="text-brand underline underline-offset-2">Assurance Agreement details</Link>
            <Link href="/assurance-and-security-plans/security-care-plan/" className="text-brand underline underline-offset-2">Security Care Plan details</Link>
          </div>
        </div>
      );
    case 'planDetail':
      return <div className="mt-8"><BookButton type="Maintenance" /><p className="mt-3 text-sm text-muted">Compare both plans on the maintenance plans page.</p></div>;
    case 'products':
      return (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/products/carrier/" className="card min-h-[44px] p-5 font-bold text-brand hover:border-brand">Carrier equipment →</Link>
          <Link href="/products/accessories/" className="card min-h-[44px] p-5 font-bold text-brand hover:border-brand">Accessories →</Link>
          <Link href="/replace-your-system/" className="card min-h-[44px] p-5 font-bold text-brand hover:border-brand">Replace your system →</Link>
        </div>
      );
    case 'servicesHub':
      return (
        <div className="mt-8 space-y-10">
          {(['Heating', 'Cooling', 'Indoor Air Quality'] as const).map((category) => (
            <section key={category} id={category.toLowerCase().replace(/\s+/g, '-')}>
              <h2 className="text-2xl font-bold text-brand-dark">{category}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {servicesByCategory(category).map((service) => (
                  <Link key={service.slug} href={`/residential/${service.slug}/`} className="card min-h-[44px] p-5 font-bold text-brand-dark hover:border-brand">
                    {service.name}<span className="mt-1 block text-sm font-normal text-muted">{service.category === category ? 'Primary category' : 'Also listed under ' + service.category}</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export function PageTemplate({ path }: { path: string }) {
  const page = pageByPath(path);
  if (!page) notFound();
  return (
    <>
      <Breadcrumbs items={crumbsFor(page)} />
      {page.kind === 'faq' && <JsonLd schema={faqSchema(faqs)} />}
      <div className="container section">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-brand-dark sm:text-4xl">{page.h1}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{page.intro}</p>
        {page.kind !== 'servicesHub' && <SectionList page={page} />}
        <Extras page={page} />
        {page.kind !== 'booking' && (
          <section className="mt-12 rounded-xl bg-brand-dark p-6 text-white sm:p-8">
            <h2 className="text-2xl font-bold">Ready when you are</h2>
            <p className="mt-2 text-white/85">Call any time for an emergency, or send a short request and we will contact you.</p>
            <div className="mt-5 flex flex-wrap gap-3"><CallButton light /><BookButton light /></div>
          </section>
        )}
      </div>
    </>
  );
}
