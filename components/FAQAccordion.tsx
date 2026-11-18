import type { FaqItem } from '@/content/types';
import { ChevronIcon } from './Icons';

/** Native <details> = keyboard accessible, no JS, no overlay. */
export function FAQAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line rounded-xl border border-line">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 font-semibold text-brand-dark [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronIcon className="shrink-0 text-brand transition group-open:rotate-180" />
          </summary>
          <p className="px-4 pb-4 leading-7 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
