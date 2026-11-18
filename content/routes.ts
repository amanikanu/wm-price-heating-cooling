import { services } from './services';
import { cities } from './cities';
import { postMeta } from './posts';

/** Every public, server-rendered route. Used by sitemap, link checker and redirect checks. */
export const staticRoutes: string[] = [
  '/', '/residential/', '/replace-your-system/', '/assurance-and-security-plans/',
  '/assurance-and-security-plans/assurance-agreement/',
  '/assurance-and-security-plans/security-care-plan/',
  '/products/', '/products/carrier/', '/products/accessories/',
  '/specials/', '/company/', '/referral/', '/faq/', '/service-area/',
  '/emergency-service/', '/financing/', '/reviews/', '/review/',
  '/request-service/', '/news/', '/careers/', '/contact/',
  '/privacy-policy/', '/accessibility-statement/', '/site-map/',
];

export function allPublicRoutes(): string[] {
  return [
    ...staticRoutes,
    ...services.map((s) => `/residential/${s.slug}/`),
    ...cities.map((c) => `/city/${c.slug}/`),
    ...postMeta.map((p) => `/${p.slug}/`),
  ];
}

export const internalApiRoutes = ['/api/booking/'];
export const generatedFiles = ['/sitemap.xml', '/robots.txt'];
