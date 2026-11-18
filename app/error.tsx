'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { CallButton } from '@/components/CtaButtons';

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error('page.error', { digest: error.digest }); }, [error]);
  return (
    <div className="container section max-w-2xl">
      <h1 className="text-3xl font-bold text-brand-dark">Something went wrong</h1>
      <p className="mt-3 leading-7 text-muted">You can try again, or call us and we will help you book service by phone.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="btn btn-brand">Try again</button>
        <CallButton />
        <Link href="/" className="btn btn-outline">Back to home</Link>
      </div>
    </div>
  );
}
