import type { Metadata } from 'next';
import { PageTemplate } from '@/components/PageTemplate';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/assurance-and-security-plans/security-care-plan/');

export default function Page() {
  return <PageTemplate path="/assurance-and-security-plans/security-care-plan/" />;
}
