import test from 'node:test';
import assert from 'node:assert/strict';
import { availableDays, bookingSchema, equipmentTypes, REQUIRED_INPUT_COUNT, requestTypes, timeWindows } from '../lib/booking';

const valid = {
  fullName: 'Ada Lovelace', phone: '330-555-0123', email: 'ada@example.com', zip: '44420',
  requestType: 'Repair', timeWindow: 'Morning', website: '',
};

test('accepts the short form with only the required fields', () => {
  const result = bookingSchema.safeParse(valid);
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.equipmentType, 'Other');
    assert.equal(result.data.preferredDay, 'Any');
    assert.equal(result.data.emergency, false);
  }
});

test('has 6 required inputs (plus one emergency question = 7 or fewer)', () => {
  assert.ok(REQUIRED_INPUT_COUNT <= 7);
  assert.equal(REQUIRED_INPUT_COUNT, 6);
});

test('rejects a bad ZIP, phone and email', () => {
  for (const patch of [{ zip: '4442' }, { zip: '444201' }, { phone: 'abc' }, { email: 'nope' }]) {
    assert.equal(bookingSchema.safeParse({ ...valid, ...patch }).success, false);
  }
});

test('honeypot must be empty', () => {
  assert.equal(bookingSchema.safeParse({ ...valid, website: 'https://spam.example' }).success, false);
});

test('Saturday is absent until the client confirms Saturday service (16.4 #2 / F8)', () => {
  assert.ok(!availableDays().includes('Saturday'));
  assert.ok(availableDays(true).includes('Saturday'));
});

test('server-side day options and request types are finite and documented', () => {
  assert.equal(requestTypes.length, 4);
  assert.equal(equipmentTypes.length, 10);
  assert.equal(timeWindows.length, 4);
  assert.ok(requestTypes.includes('Estimate'));
});
