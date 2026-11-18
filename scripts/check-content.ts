/**
 * PRD 16.9 / 16.4: build-fails on placeholder text, duplicate sections,
 * duplicated service URLs, invented NAP values and unverified social links.
 * Run automatically via `npm run build`.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { business } from '../content/business';
import { primaryNav } from '../content/nav';
import { services } from '../content/services';
import { cities } from '../content/cities';
import { specials } from '../content/specials';
import { planRows } from '../content/plans';
import { availableDays, REQUIRED_INPUT_COUNT } from '../lib/booking';

const root = process.cwd();
const failures: string[] = [];
const check = (condition: boolean, message: string) => { if (!condition) failures.push(message); };

function walk(dir: string, extensions: string[]): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.next' || name === 'Unselected files') continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...walk(path, extensions));
    else if (extensions.some((ext) => name.endsWith(ext))) out.push(path);
  }
  return out;
}

// 1. Blog placeholder scan (16.4 #5). Meta lines are excluded from the pattern test
//    only in the sense that they contain no placeholders — we scan whole files.
const placeholder = [/\bin\s*,/, /\bin\s+\./, /company-state/, /\byour\s*,\s*home/, /\bhere in\s+can\b/, /\bat\s+often\b/, /\bWinters? here in\s+can\b/];
for (const file of walk(resolve(root, 'content/posts'), ['.mdx'])) {
  const text = readFileSync(file, 'utf8');
  for (const pattern of placeholder) {
    check(!pattern.test(text), `Unfilled template variable ${pattern} in ${file}`);
  }
  check(!/\bTODO\b/.test(text), `TODO marker in published post ${file}`);
}

// 2. Specials: real text, amount, dates; unapproved offers are hidden (16.4 #6).
for (const special of specials) {
  if (special.approved) {
    check(Boolean(special.amount.trim()), `${special.id}: approved special missing amount`);
    check(Boolean(special.startDate && special.endDate), `${special.id}: approved special missing dates`);
    check(!/\b(0|OFF)\b/.test(special.title) || special.amount.length > 0, `${special.id}: placeholder amount`);
  }
}
check(specials.every((s) => s.amount.trim().length > 0 || !s.approved), 'Every special needs a non-empty amount or must be hidden');

// 3. Social links (16.4 #7): verified domains only, label matches destination.
const expected: Record<string, string> = {
  Facebook: 'facebook.com', X: 'x.com', Nextdoor: 'nextdoor.com',
  'Leave a Google review': 'search.google.com',
};
for (const social of business.socials) {
  check(social.href.includes(expected[social.label]), `Social label/domain mismatch: ${social.label} → ${social.href}`);
  check(!/yelp|homeadvisor|allwhvacr/i.test(social.href), `Unverified social destination: ${social.href}`);
}

// 4. One source of truth for NAP / phone / license (16.3).
const publicSourceFiles = [
  ...walk(resolve(root, 'app'), ['.tsx', '.ts']),
  ...walk(resolve(root, 'components'), ['.tsx', '.ts']),
  ...walk(resolve(root, 'content'), ['.ts']).filter((f) => !f.endsWith('business.ts')),
];
const forbidden = [/330\.545\.3722/, /330-545-3722/, /\+13305453722/, /33376/, /330 Trumbull Avenue/];
for (const file of publicSourceFiles) {
  const text = readFileSync(file, 'utf8');
  for (const pattern of forbidden) check(!pattern.test(text), `Hard-coded business fact ${pattern} in ${file} — use content/business.ts`);
}

// 5. Nav, services, cities, plans, config flags (16.4 #2, #10, #11; F15).
check(primaryNav.length <= 7, `Primary nav has ${primaryNav.length} items; max 7`);
check(new Set(services.map((s) => s.slug)).size === services.length, 'Duplicate service slug');
check(services.every((s) => s.related.every((r) => services.some((t) => t.slug === r))), 'Broken related-service link');
check(cities.length === 15, `Expected 15 cities, found ${cities.length}`);
check(new Set(cities.map((c) => c.intro)).size === cities.length, 'City intros must be unique (no duplicated boilerplate)');
check(new Set(cities.map((c) => c.slug)).size === cities.length, 'Duplicate city slug');
check(!business.config.saturdayServiceEnabled, 'saturdayServiceEnabled must default to false');
check(!business.config.commercialEnabled, 'commercialEnabled must default to false');
check(!availableDays().includes('Saturday'), 'Saturday must not appear while saturdayServiceEnabled is false');
check(planRows.some((r) => r.requiresSaturdayFlag), 'Saturday plan row must be config-gated');
check(REQUIRED_INPUT_COUNT <= 7, `Booking form has ${REQUIRED_INPUT_COUNT} required inputs; max 7`);

// 6. No TODO markers on the public site (16.12 #5).
for (const file of publicSourceFiles) {
  check(!/\bTODO\b/.test(readFileSync(file, 'utf8')), `TODO marker in public source ${file}`);
}

// 7. One H2 per section on the homepage (16.4 #8).
const homepageSources = ['app/page.tsx', 'components/EmergencyStrip.tsx', 'components/Footer.tsx']
  .map((f) => readFileSync(resolve(root, f), 'utf8')).join('\n');
const h2s = [...homepageSources.matchAll(/<h[23][^>]*>([^<{]+)<\/h[23]>/g)].map((m) => m[1].trim()).filter(Boolean);
check(new Set(h2s).size === h2s.length, `Duplicate section heading on homepage: ${h2s.filter((h, i) => h2s.indexOf(h) !== i).join(', ')}`);

if (failures.length) {
  console.error(`\nCONTENT CHECK FAILED (${failures.length}):`);
  failures.forEach((f) => console.error('  ✗ ' + f));
  process.exit(1);
}
console.log(`✓ content check passed (${services.length} services, ${cities.length} cities, ${primaryNav.length} nav items, ${walk(resolve(root, 'content/posts'), ['.mdx']).length} posts)`);
