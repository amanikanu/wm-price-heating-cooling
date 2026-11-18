import type { Special } from './types';

/**
 * PRD 16.4 #6 / F13: offers are real text with an amount, fine print and dates.
 * Nothing is baked into an image. `approved: false` entries are NOT rendered:
 * the amounts below were read from the CURRENT site's image alt text on
 * 2026-11-17 and still need client + lender approval (PRD 16.11 / 16.10).
 * Set approved: true and add real start/end dates only after sign-off.
 */
export const specials: Special[] = [
  {
    id: 'media-filter',
    title: 'Any Media Filter',
    amount: '$5 OFF',
    finePrint: 'Migrated from the current specials image alt text. Terms and dates require client approval.',
    startDate: '',
    endDate: '',
    approved: false,
    source: 'priceheating.com/specials/ image alt text, 2026-11-17',
  },
  {
    id: 'bonus-bucks',
    title: 'Bonus Bucks on Repair',
    amount: '$25',
    finePrint: 'Migrated from the current specials image alt text. Threshold and dates require client approval.',
    startDate: '',
    endDate: '',
    approved: false,
    source: 'priceheating.com/specials/ image alt text, 2026-11-17',
  },
  {
    id: 'safety-tune-up',
    title: 'Safety Tune-Up Special',
    amount: '$10 OFF',
    finePrint: 'Migrated from the current specials image alt text. Terms and dates require client approval.',
    startDate: '',
    endDate: '',
    approved: false,
    source: 'priceheating.com/specials/ image alt text, 2026-11-17',
  },
];

/** Only approved, dated, currently-running offers are ever public. */
export function activeSpecial(special: Special, now: Date = new Date()): boolean {
  if (!special.approved || !special.amount.trim() || !special.startDate || !special.endDate) return false;
  const start = Date.parse(special.startDate);
  const end = Date.parse(special.endDate);
  if (Number.isNaN(start) || Number.isNaN(end)) return false;
  const time = now.getTime();
  return time >= start && time <= end + 86_400_000 - 1;
}

export const publicSpecials = (now: Date = new Date()): Special[] => specials.filter((s) => activeSpecial(s, now));
