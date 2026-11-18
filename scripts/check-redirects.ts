/** PRD 16.8 / F18: every legacy URL resolves, with exactly one 301 to a 200 (no chains). */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { redirects } from '../content/redirects';
import { allPublicRoutes } from '../content/routes';

const failures: string[] = [];
const check = (ok: boolean, message: string) => { if (!ok) failures.push(message); };
const legacy: string[] = JSON.parse(readFileSync(resolve(process.cwd(), 'content/legacy-urls.json'), 'utf8'));
const built = new Set(allPublicRoutes());
const sources = new Set(redirects.map((r) => r.source));
const bySource = new Map(redirects.map((r) => [r.source, r]));
const normalise = (path: string) => {
  const clean = path.split('?')[0].split('#')[0];
  return clean.endsWith('/') ? clean : `${clean}/`;
};

check(sources.size === redirects.length, 'Duplicate redirect source');
for (const redirect of redirects) {
  check(redirect.permanent === true, `Redirect is not permanent: ${redirect.source}`);
  check(!built.has(redirect.source), `Redirect source is a live 200 route: ${redirect.source}`);
  check(normalise(redirect.destination) !== redirect.source, `Redirect to itself: ${redirect.source}`);
  check(built.has(normalise(redirect.destination)), `Redirect target is not a live route: ${redirect.source} → ${redirect.destination}`);
  check(!sources.has(normalise(redirect.destination)), `Redirect chain: ${redirect.source} → ${redirect.destination}`);
}
for (const path of legacy) {
  check(built.has(path) || bySource.has(path), `Legacy URL has no route or redirect: ${path}`);
}
check(bySource.get('/request-estimate/')?.destination === '/request-service/?type=Estimate', 'Request Estimate must 301 to the single Book Service form with type preselected');
check(bySource.get('/is-your-heating-system-ready-for-company-state-long-winter/')?.destination === '/is-your-heating-system-ready-for-ohio-winter/', 'company-state slug must 301 to a clean slug');
check(bySource.get('/how-long-will-a-furnace-heat-pump-or-boiler-last-in-company-state-long/')?.destination === '/how-long-will-a-furnace-heat-pump-or-boiler-last/', 'company-state slug must 301 to a clean slug');
check(bySource.get('/city/other/')?.destination === '/service-area/', '/city/other/ must redirect to the service-area hub');
check(!allPublicRoutes().some((r) => r.includes('company-state')), 'No published route may contain company-state');

if (failures.length) {
  console.error(`\nREDIRECT CHECK FAILED (${failures.length}):`);
  failures.slice(0, 30).forEach((f) => console.error('  ✗ ' + f));
  process.exit(1);
}
console.log(`✓ redirect check passed (${legacy.length} legacy URLs, ${redirects.length} single-hop 301s, ${built.size} live routes)`);
