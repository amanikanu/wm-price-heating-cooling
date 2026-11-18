const previewMailto = `mailto:sales@must.company?subject=${encodeURIComponent('Inquiry about getting this website')}&body=${encodeURIComponent(`Hi Must team,

I saw this website preview and I would like to get this site for my business.

Please let me know how to proceed!

Thanks`)}`;

export function PreviewBanner() {
  return (
    <aside aria-label="Website preview information" className="border-t border-white/10 bg-[#0b1117] px-4 py-3 text-white">
      <div className="mx-auto flex w-full max-w-[78rem] flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[.2em] text-white">A website made for your business</p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-300 sm:text-[13px]">
            <span aria-hidden="true" className="text-cyan-300">🕒</span>
            This preview will be deleted in 30 days
          </p>
        </div>
        <a
          href={previewMailto}
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0b1117] shadow-sm transition hover:bg-cyan-50 hover:shadow-md"
        >
          Get this site <span aria-hidden="true" className="text-base leading-none">↗</span>
        </a>
      </div>
    </aside>
  );
}
