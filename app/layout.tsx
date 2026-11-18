import type { Metadata } from 'next';
import './globals.css';
import { StickyHeader } from '@/components/StickyHeader';
import { MobileCallBar } from '@/components/MobileCallBar';
import { Footer } from '@/components/Footer';
import { PreviewBanner } from '@/components/PreviewBanner';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { AnalyticsConsent } from '@/components/AnalyticsConsent';
import { JsonLd } from '@/components/JsonLd';
import { WebVitals } from '@/components/WebVitals';
import { hvacBusinessSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('/');

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Preload the single self-hosted font so font-display: swap does not shift layout on 4G. */}
        <link rel="preload" href="/fonts/roboto-latin-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">Skip to content</a>
        <AnnouncementBar />
        <StickyHeader />
        <main id="main" tabIndex={-1} className="flex-1 pb-24 lg:pb-0">{children}</main>
        <Footer />
        <PreviewBanner />
        <MobileCallBar />
        <AnalyticsConsent />
        <WebVitals />
        <JsonLd schema={hvacBusinessSchema()} />
      </body>
    </html>
  );
}
