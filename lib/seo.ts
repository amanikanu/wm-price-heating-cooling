import type { Metadata } from 'next';
import { business } from '@/content/business';
import { getSeoEntry } from '@/content/seo';
import { absoluteUrl, siteUrl } from './site';

/** Canonical + OG + Twitter cards on every page (PRD 16.8). */
export function pageMetadata(path: string): Metadata {
  const entry = getSeoEntry(path);
  if (!entry) throw new Error(`Missing SEO entry for ${path}`);
  const url = absoluteUrl(path);
  return {
    title: entry.title,
    description: entry.description,
    // Staging deploys set NEXT_PUBLIC_NOINDEX=true (PRD migration plan step 4).
    ...(process.env.NEXT_PUBLIC_NOINDEX === 'true' ? { robots: { index: false, follow: false } } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: business.name,
      title: entry.title,
      description: entry.description,
      url,
      images: [{ url: absoluteUrl(business.shareImage), alt: `${business.name} logo` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.title,
      description: entry.description,
      images: [absoluteUrl(business.shareImage)],
    },
    metadataBase: new URL(siteUrl),
  };
}
