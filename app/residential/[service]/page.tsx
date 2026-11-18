import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { services, serviceBySlug } from '@/content/services';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { FAQAccordion } from '@/components/FAQAccordion';
import { CallButton, BookButton } from '@/components/CtaButtons';
import { ArrowIcon, CheckIcon } from '@/components/Icons';

type Params = { params: Promise<{ service: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return services.map((s) => ({ service: s.slug })); }
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { service } = await params;
  return pageMetadata(`/residential/${service}/`);
}

export default async function ServicePage({ params }: Params) {
  const { service: slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();
  const crumbs = [{ name: 'Services', path: '/residential/' }, { name: service.name, path: `/residential/${service.slug}/` }];
  return (
    <>
      <Breadcrumbs items={crumbs} />
      <JsonLd schema={serviceSchema(service)} />
      <JsonLd schema={faqSchema(service.faqs)} />
      <div className="container section">
        <p className="eyebrow">{service.category}</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-brand-dark sm:text-4xl">{service.name}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{service.intro}</p>
        <div className="mt-7 flex flex-wrap gap-3"><CallButton /><BookButton /></div>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h2 className="text-xl font-bold text-brand-dark">What you get</h2>
            <ul className="mt-4 space-y-2">
              {service.benefits.map((b) => <li key={b} className="flex gap-2 text-ink"><CheckIcon className="mt-0.5 shrink-0 text-brand" width={18} height={18} />{b}</li>)}
            </ul>
          </div>
          <div className="card p-6">
            <h2 className="text-xl font-bold text-brand-dark">How it works</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-ink">
              {service.process.map((p) => <li key={p}>{p}</li>)}
            </ol>
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-line bg-brand-soft p-6">
          <h2 className="text-xl font-bold text-brand-dark">Financing, estimates and plans</h2>
          <p className="mt-2 leading-7 text-muted">Ask about current financing options or a replacement estimate. Maintenance plan members can note that in the optional details of the form.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/request-service/?type=Estimate" className="btn btn-brand">Get a replacement estimate</Link>
            <Link href="/financing/" className="btn btn-outline">Financing information</Link>
            <Link href="/assurance-and-security-plans/" className="btn btn-outline">Maintenance plans</Link>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-brand-dark">Common questions</h2>
          <div className="mt-4 max-w-3xl"><FAQAccordion items={service.faqs} /></div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-brand-dark">Related services</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {service.related.map((related) => {
              const target = serviceBySlug(related);
              return target ? (
                <Link key={related} href={`/residential/${related}/`} className="card flex min-h-[44px] items-center justify-between p-4 font-semibold text-brand-dark hover:border-brand">
                  {target.name}<ArrowIcon width={17} height={17} className="text-brand" />
                </Link>
              ) : null;
            })}
          </div>
        </section>

        <section className="mt-12 rounded-xl bg-brand-dark p-6 text-white">
          <h2 className="text-2xl font-bold">Book {service.name.toLowerCase()} service</h2>
          <p className="mt-2 text-white/85">Short form, no state dropdown, no separate estimate page.</p>
          <div className="mt-5 flex flex-wrap gap-3"><CallButton light /><BookButton light /></div>
        </section>
      </div>
    </>
  );
}
