import type { MetadataRoute } from 'next';
import { allPublicRoutes } from '@/content/routes';
import { absoluteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return allPublicRoutes().map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date('2026-11-17'),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/city/') ? 0.7 : 0.6,
  }));
}
