import test from 'node:test';
import assert from 'node:assert/strict';
import { hvacBusinessSchema, serviceSchema, faqSchema, breadcrumbSchema } from '../lib/schema';
import { business } from '../content/business';
import { services } from '../content/services';
import { faqs } from '../content/faqs';

test('HVACBusiness schema covers all 15 towns and the real NAP', () => {
  const schema = hvacBusinessSchema() as Record<string, any>;
  assert.equal(schema['@type'], 'HVACBusiness');
  assert.equal(schema.telephone, business.phoneDashed);
  assert.equal(schema.address.addressLocality, 'Girard');
  assert.equal(schema.areaServed.length, 15);
  assert.equal(schema.foundingDate, '1937');
});

test('aggregateRating is omitted until compliant on-page reviews exist (16.8)', () => {
  const schema = hvacBusinessSchema() as Record<string, any>;
  assert.equal(business.config.showAggregateRating, false);
  assert.equal(schema.aggregateRating, undefined);
});

test('no unverified social platforms are in sameAs (16.4 #7)', () => {
  const schema = hvacBusinessSchema() as Record<string, any>;
  assert.equal(schema.sameAs.length, 3);
  assert.ok(schema.sameAs.every((url: string) => !/yelp|homeadvisor|allwhvacr/i.test(url)));
});

test('Service / FAQ / Breadcrumb schema are well formed', () => {
  assert.equal(serviceSchema(services[0]).name, 'Furnaces');
  assert.equal(faqSchema(faqs).mainEntity.length, faqs.length);
  assert.equal(breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq/' }]).itemListElement[1].position, 2);
});
