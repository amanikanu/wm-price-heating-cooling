import { announcement } from '@/content/promos';

type Promo = {
  enabled: boolean;
  message: string;
  startDate?: string;
  endDate?: string;
};

/** Pure, testable expiry logic — the banner must disappear after its end date (PRD 16.4 #4). */
export function isAnnouncementActive(promo: Promo = announcement, now: Date = new Date()): boolean {
  if (!promo.enabled || !promo.message.trim()) return false;
  if (promo.startDate) {
    const start = Date.parse(promo.startDate);
    if (!Number.isNaN(start) && now.getTime() < start) return false;
  }
  if (promo.endDate) {
    const end = Date.parse(promo.endDate);
    if (!Number.isNaN(end) && now.getTime() > end + 86_400_000 - 1) return false;
  }
  return true;
}
