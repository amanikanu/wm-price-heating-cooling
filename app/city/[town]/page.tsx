import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cities, cityBySlug } from '@/content/cities';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { FAQAccordion } from '@/components/FAQAccordion';
import { CityGrid } from '@/components/CityGrid';
import { CallButton, BookButton } from '@/components/CtaButtons';

type Params = { params: Promise<{ town: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return cities.map((c) => ({ town: c.slug })); }
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { town } = await params;
  return pageMetadata(`/city/${town}/`);
}

export default async function CityPage({ params }: Params) {
  const { town } = await params;
  const city = cityBySlug(town);
  if (!city) notFound();
  const crumbs = [{ name: 'Service area', path: '/service-area/' }, { name: `${city.name}, OH`, path: `/city/${city.slug}/` }];
  return (
    <>
      <Breadcrumbs items={crumbs} />
      <JsonLd schema={breadcrumbSchema([{ name: 'Home', path: '/' }, ...crumbs])} />
      <JsonLd schema={faqSchema([city.localFaq])} />
      <div className="container section">
        <p className="eyebrow">Service area · {city.name}, Ohio</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-brand-dark sm:text-4xl">Heating &amp; Cooling in {city.name}, OH</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{city.intro}</p>

        {city.landmarks.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-brand-dark">Around {city.name}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {city.landmarks.map((landmark) => <li key={landmark} className="card p-4 text-ink">{landmark}</li>)}
            </ul>
          </section>
        )}

        {city.reviews.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-brand-dark">From {city.name} customers</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {city.reviews.map((review) => <blockquote key={review} className="card p-5 text-ink">“{review}”</blockquote>)}
            </div>
          </section>
        )}

        <section className="mt-10 max-w-3xl">
          <h2 className="text-2xl font-bold text-brand-dark">Local questions</h2>
          <div className="mt-4"><FAQAccordion items={[city.localFaq]} /></div>
        </section>

        <section className="mt-12 rounded-xl bg-brand-dark p-6 text-white">
          <h2 className="text-2xl font-bold">Need service in {city.name}?</h2>
          <p className="mt-2 text-white/85">One call or one short form. We will contact you about your request.</p>
          <div className="mt-5 flex flex-wrap gap-3"><CallButton light /><BookButton light /></div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-brand-dark">Other towns we serve</h2>
          <div className="mt-4"><CityGrid compact /></div>
          <Link href="/service-area/" className="mt-5 inline-flex min-h-[44px] items-center font-bold text-brand hover:underline">Full service area →</Link>
        </section>
      </div>
    </>
  );
}
