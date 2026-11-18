import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/products/carrier/');

export default function Page() {
  return <PageTemplate path="/products/carrier/" />;
}
