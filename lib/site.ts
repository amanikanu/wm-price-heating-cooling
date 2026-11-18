export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.priceheating.com').replace(/\/$/, '');
export const absoluteUrl = (path: string) => `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
