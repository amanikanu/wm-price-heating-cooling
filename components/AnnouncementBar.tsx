import Link from 'next/link';
import { announcement } from '@/content/promos';
import { isAnnouncementActive } from '@/lib/promos';

/** F22: one editable global announcement with an end date; hidden after expiry. */
export function AnnouncementBar({ now = new Date() }: { now?: Date }) {
  if (!isAnnouncementActive(announcement, now)) return null;
  return (
    <div className="bg-brand-dark text-white">
      <div className="container flex flex-wrap items-center justify-center gap-x-4 gap-y-1 py-2 text-center text-sm">
        <span>{announcement.message}</span>
        <Link href={announcement.link} className="font-bold underline underline-offset-2">{announcement.linkLabel}</Link>
      </div>
    </div>
  );
}
