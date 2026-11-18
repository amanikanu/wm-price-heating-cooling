const previewMailto = `mailto:sales@must.company?subject=${encodeURIComponent('Inquiry about getting this website')}&body=${encodeURIComponent(`Hi Must team,

I saw this website preview and I would like to get this site for my business.

Please let me know how to proceed!

Thanks`)}`;

export function PreviewBanner() {
  return (
    <aside aria-label="Website preview information" className="fixed inset-x-0 bottom-[74px] z-40 border-t border-white/10 bg-[#0b1117] px-5 py-5 text-white shadow-[0_-8px_24px_-18px_rgba(0,0,0,.65)] sm:px-6 lg:bottom-0 lg:py-4">
      <div className="mx-auto flex w-full max-w-[78rem] flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-white">A website made for your business</p>
          <p className="mt-2 flex items-center gap-2 text-sm text-slate-300">
            <span aria-hidden="true" className="text-base text-cyan-300">🕒</span>
            This preview will be deleted in 30 days
          </p>
        </div>
        <a
          href={previewMailto}
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-base font-bold text-[#0b1117] shadow-sm transition hover:bg-cyan-50 hover:shadow-md"
        >
          Get this site <span aria-hidden="true" className="text-base leading-none">↗</span>
        </a>
      </div>
    </aside>
  );
}
