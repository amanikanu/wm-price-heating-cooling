import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { postModules, postSlugs } from '@/content/posts';
import { rootPageSlugs } from '@/content/pages';
import { PageTemplate } from '@/components/PageTemplate';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import { CallButton, BookButton } from '@/components/CtaButtons';

type Params = { params: Promise<{ slug: string }> };

/** Root-level static pages AND every migrated blog slug, all statically generated. */
export const dynamicParams = false;
export function generateStaticParams() {
  return [...rootPageSlugs, ...postSlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return pageMetadata(`/${slug}/`);
}

export default async function RootSlugPage({ params }: Params) {
  const { slug } = await params;

  if (postSlugs.includes(slug)) {
    const module = await postModules[slug]();
    const Content = module.default;
    const post = module.meta;
    const crumbs = [{ name: 'News', path: '/news/' }, { name: post.title, path: `/${slug}/` }];
    return (
      <>
        <Breadcrumbs items={crumbs} />
        <JsonLd schema={breadcrumbSchema([{ name: 'Home', path: '/' }, ...crumbs])} />
        <article className="container section max-w-3xl">
          <p className="eyebrow">News &amp; tips</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-brand-dark sm:text-4xl">{post.title}</h1>
          <time dateTime={post.date} className="mt-3 block text-sm font-medium text-brand">
            {new Date(`${post.date}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
          </time>
          <div className="prose-page mt-6"><Content /></div>
          <div className="mt-10 rounded-xl bg-brand-dark p-6 text-white">
            <h2 className="text-xl font-bold">Need HVAC help?</h2>
            <p className="mt-2 text-white/85">Call any time for an emergency, or send a short request.</p>
            <div className="mt-4 flex flex-wrap gap-3"><CallButton light /><BookButton light /></div>
          </div>
          <Link href="/news/" className="mt-6 inline-flex min-h-[44px] items-center font-bold text-brand hover:underline">← All news</Link>
        </article>
      </>
    );
  }

  if (!rootPageSlugs.includes(slug)) notFound();
  return <PageTemplate path={`/${slug}/`} />;
}
