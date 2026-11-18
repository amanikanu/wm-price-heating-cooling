import test from 'node:test';
import assert from 'node:assert/strict';
import { isAnnouncementActive } from '../lib/promos';
import { activeSpecial, specials } from '../content/specials';

const promo = { enabled: true, message: 'Carrier rebate', startDate: '2026-11-01', endDate: '2026-12-31' };

test('announcement is hidden after its end date (16.4 #4)', () => {
  assert.equal(isAnnouncementActive(promo, new Date('2026-11-17T12:00:00Z')), true);
  assert.equal(isAnnouncementActive(promo, new Date('2027-01-01T12:00:00Z')), false);
  assert.equal(isAnnouncementActive(promo, new Date('2026-10-01T12:00:00Z')), false);
});

test('announcement is hidden when disabled or empty', () => {
  assert.equal(isAnnouncementActive({ ...promo, enabled: false }, new Date('2026-11-17')), false);
  assert.equal(isAnnouncementActive({ ...promo, message: '' }, new Date('2026-11-17')), false);
});

test('unapproved or undated specials are never public (16.4 #6)', () => {
  const now = new Date('2026-11-17T12:00:00Z');
  assert.ok(specials.every((s) => !activeSpecial(s, now)));
  assert.equal(activeSpecial({ ...specials[0], approved: true, startDate: '2026-11-01', endDate: '2026-12-31' }, now), true);
  assert.equal(activeSpecial({ ...specials[0], approved: true }, now), false);
  assert.ok(specials.every((s) => s.amount.trim().length > 0));
});
