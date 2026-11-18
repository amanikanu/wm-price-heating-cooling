import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { business } from '../content/business';
import { primaryNav } from '../content/nav';
import { services } from '../content/services';
import { cities } from '../content/cities';
import { testimonials } from '../content/testimonials';
import { seoRegistry } from '../content/seo';
import { allPublicRoutes } from '../content/routes';
import { redirects } from '../content/redirects';

const root = process.cwd();

test('single source of truth for business facts (16.3)', () => {
  assert.equal(business.phoneDashed, '330-545-3722');
  assert.equal(business.tel, '+13305453722');
  assert.equal(business.address.full, '330 Trumbull Avenue, Girard, OH 44420');
  assert.equal(business.license, '33376');
  assert.equal(business.founded, 1937);
  assert.equal(business.google.rating, 4.8);
  assert.equal(business.google.reviewCount, 253);
});

test('config flags default false (16.3)', () => {
  assert.equal(business.config.saturdayServiceEnabled, false);
  assert.equal(business.config.commercialEnabled, false);
  assert.equal(business.config.showTestimonials, false);
  assert.equal(testimonials.every((t) => !t.approved), true);
});

test('max 7 top-level nav items, one canonical URL per service (16.4 #10/#11)', () => {
  assert.equal(primaryNav.length, 7);
  assert.equal(new Set(services.map((s) => `/residential/${s.slug}/`)).size, services.length);
  assert.equal(services.filter((s) => s.slug === 'heat-pumps').length, 1);
});

test('15 city pages with unique copy and empty unverifiable fields (F15 / 16.10)', () => {
  assert.equal(cities.length, 15);
  assert.equal(new Set(cities.map((c) => c.intro)).size, 15);
  assert.ok(cities.every((c) => c.landmarks.length === 0 && c.reviews.length === 0));
});

test('unique titles, complete metadata and canonical coverage (16.8)', () => {
  const registry = seoRegistry();
  const routes = allPublicRoutes();
  assert.equal(Object.keys(registry).length, routes.length);
  assert.equal(new Set(Object.values(registry).map((e) => e.title)).size, routes.length);
  assert.ok(Object.values(registry).every((e) => e.description.length > 0 && e.description.length < 160));
});

test('every legacy URL resolves or has a single-hop 301 (F18)', () => {
  const legacy: string[] = JSON.parse(readFileSync(resolve(root, 'content/legacy-urls.json'), 'utf8'));
  const built = new Set(allPublicRoutes());
  const map = new Map(redirects.map((r) => [r.source, r.destination.split('?')[0]]));
  assert.ok(legacy.every((path) => built.has(path) || map.has(path)));
  assert.ok(redirects.every((r) => built.has(r.destination.split('?')[0])));
  assert.ok(redirects.every((r) => !map.has(r.destination.split('?')[0])));
});

test('no unfilled template variables or company-state slugs in migrated posts (16.4 #5)', () => {
  const dir = resolve(root, 'content/posts');
  const files = readdirSync(dir).filter((f) => f.endsWith('.mdx'));
  assert.equal(files.length, 54);
  for (const file of files) {
    const text = readFileSync(resolve(dir, file), 'utf8');
    assert.doesNotMatch(text, /company-state|\bin\s*,|\byour\s*,\s*home|\bhere in\s+can\b|\bat\s+often\b/);
  }
  assert.ok(!allPublicRoutes().some((r) => r.includes('company-state')));
});

test('no duplicate H2 sections on the homepage (16.4 #8)', () => {
  const sources = ['app/page.tsx', 'components/EmergencyStrip.tsx', 'components/Footer.tsx']
    .map((f) => readFileSync(resolve(root, f), 'utf8')).join('\n');
  const headings = [...sources.matchAll(/<h[23][^>]*>([^<{]+)<\/h[23]>/g)].map((m) => m[1].trim());
  assert.equal(new Set(headings).size, headings.length);
});
