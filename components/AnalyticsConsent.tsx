'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { business } from '@/content/business';
import { CONSENT_KEY, fireConversionEvent, flushConversionQueue, setAnalyticsConsent } from '@/lib/analytics';

/**
 * F23: GA4 / GTM load only after consent. No render-blocking third-party scripts.
 * Optional call-tracking number swap keeps the real NAP in server markup for SEO.
 */
export function AnalyticsConsent() {
  const [choice, setChoice] = useState<'granted' | 'denied' | null>(null);
  const gtmId = (process.env.NEXT_PUBLIC_GTM_ID || '').replace(/[^A-Za-z0-9_-]/g, '');
  const trackingNumber = process.env.NEXT_PUBLIC_CALL_TRACKING_NUMBER;

  useEffect(() => {
    let stored: string | null = null;
    try { stored = window.localStorage.getItem(CONSENT_KEY); } catch { /* storage blocked */ }
    const resolved = stored === 'granted' ? 'granted' : stored === 'denied' ? 'denied' : null;
    setChoice(resolved);
    if (resolved === 'granted') flushConversionQueue();
  }, []);

  useEffect(() => {
    if (choice !== 'granted' || !trackingNumber) return;
    const display = business.phoneDisplay;
    const digits = trackingNumber.replace(/\D/g, '').slice(-10);
    const formatted = digits.length === 10
      ? `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
      : display;
    document.querySelectorAll<HTMLAnchorElement>('a[data-call-number]').forEach((anchor) => {
      anchor.href = `tel:${trackingNumber}`;
      if (anchor.textContent?.includes(display)) {
        anchor.innerHTML = anchor.innerHTML.replaceAll(display, formatted);
      }
      const label = anchor.getAttribute('aria-label');
      if (label?.includes(display)) anchor.setAttribute('aria-label', label.replaceAll(display, formatted));
    });
  }, [choice, trackingNumber]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest('a[data-call-number]');
      if (link) fireConversionEvent('call_click', { source: 'phone_link' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const decide = (value: 'granted' | 'denied') => {
    setAnalyticsConsent(value);
    setChoice(value);
  };

  return (
    <>
      {choice === 'granted' && gtmId && (
        <Script id="gtm-consented" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});(function(d,s,id){var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+id;f.parentNode.insertBefore(j,f);})(document,'script','${gtmId}');`}
        </Script>
      )}
      {choice === null && (
        <div role="region" aria-label="Analytics choices" className="fixed inset-x-3 bottom-[86px] z-[60] rounded-xl border border-line bg-white p-4 shadow-2xl lg:bottom-4 lg:left-auto lg:right-4 lg:max-w-md">
          <p className="text-sm leading-6 text-ink">
            We use optional analytics to understand how this site is used. Your phone number stays in the page for calling;
            we never put it in a URL. You can change your choice by clearing site data.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => decide('granted')} className="btn btn-brand text-sm">Accept analytics</button>
            <button type="button" onClick={() => decide('denied')} className="btn btn-outline text-sm">Decline</button>
          </div>
          <p className="sr-only">{business.name} privacy choices</p>
        </div>
      )}
    </>
  );
}
