import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

const staged = process.env.NEXT_PUBLIC_NOINDEX === 'true';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: staged
      ? [{ userAgent: '*', disallow: '/' }]
      : [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: staged ? undefined : `${siteUrl}/sitemap.xml`,
  };
}
