import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/residential/');

export default function Page() {
  return <PageTemplate path="/residential/" />;
}
