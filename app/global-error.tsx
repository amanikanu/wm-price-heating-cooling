'use client';

import { business } from '@/content/business';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', color: '#172233' }}>
        <h1>Something went wrong</h1>
        <p>Please call {business.phoneDisplay} and we will help you book service by phone.</p>
        <button type="button" onClick={reset} style={{ minHeight: 48, padding: '0.7rem 1.25rem' }}>Try again</button>
      </body>
    </html>
  );
}
