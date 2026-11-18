import Link from 'next/link';
import { planRows } from '@/content/plans';
import { business } from '@/content/business';
import { CheckIcon } from './Icons';

/** F12: one responsive table, one sign-up CTA. Saturday row is config-gated (F8 / 16.4 #2). */
export function PlanComparisonTable() {
  const rows = planRows.filter((row) => !row.requiresSaturdayFlag || business.config.saturdayServiceEnabled);
  return (
    <div>
      <div role="region" aria-label="Maintenance plan comparison — scroll horizontally to see all columns" tabIndex={0} className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[34rem] border-collapse text-left text-[0.95rem]">
          <caption className="sr-only">Assurance and Security maintenance plan comparison</caption>
          <thead className="bg-brand-dark text-white">
            <tr>
              <th scope="col" className="p-3">Program benefits</th>
              <th scope="col" className="p-3 text-center">Security</th>
              <th scope="col" className="p-3 text-center">Assurance</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.feature} className={i % 2 ? 'bg-white' : 'bg-surface'}>
                <th scope="row" className="p-3 font-medium">{row.feature}</th>
                {[row.security, row.assurance].map((included, j) => (
                  <td key={j} className="p-3 text-center">
                    {included ? (
                      <span className="inline-flex items-center justify-center text-brand"><CheckIcon /><span className="sr-only">Included</span></span>
                    ) : (
                      <span className="text-muted">—<span className="sr-only">Not included</span></span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <Link href="/request-service/?type=Maintenance" className="btn btn-cta">Sign up for a maintenance plan</Link>
        <p className="text-sm text-muted">Plan details copied from the current site; client confirmation is listed in HANDOFF.md.</p>
      </div>
    </div>
  );
}
