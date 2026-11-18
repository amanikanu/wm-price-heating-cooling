/** PRD 16.8: build fails on duplicate titles, missing or overlong descriptions. */
import { allPublicRoutes } from '../content/routes';
import { seoRegistry } from '../content/seo';
import { services } from '../content/services';
import { cities } from '../content/cities';
import { pageMetadata } from '../lib/seo';

const failures: string[] = [];
const check = (ok: boolean, message: string) => { if (!ok) failures.push(message); };
const registry = seoRegistry();
const routes = allPublicRoutes();

for (const route of routes) {
  const entry = registry[route];
  check(Boolean(entry), `Missing SEO entry for ${route}`);
  if (!entry) continue;
  check(Boolean(entry.title.trim()), `Missing title: ${route}`);
  check(Boolean(entry.description.trim()), `Missing description: ${route}`);
  check(entry.description.length < 160, `Description over 160 chars (${entry.description.length}): ${route}`);
  check(Boolean(pageMetadata(route).alternates?.canonical), `Missing canonical: ${route}`);
}
for (const route of Object.keys(registry)) check(routes.includes(route), `SEO entry for non-existent route: ${route}`);

const titles = Object.values(registry).map((e) => e.title);
check(new Set(titles).size === titles.length, 'Duplicate page titles across the site');
for (const service of services) {
  check(registry[`/residential/${service.slug}/`].title.endsWith('| Wm. Price Heating & Cooling, Girard OH'), `Service title pattern: ${service.slug}`);
}
for (const city of cities) {
  const title = registry[`/city/${city.slug}/`].title;
  check(title.includes(`in ${city.name}, OH |`), `City title pattern: ${city.slug}`);
}

if (failures.length) {
  console.error(`\nSEO CHECK FAILED (${failures.length}):`);
  failures.forEach((f) => console.error('  ✗ ' + f));
  process.exit(1);
}
console.log(`✓ SEO check passed (${routes.length} unique titles, all descriptions < 160 chars, canonicals present)`);
