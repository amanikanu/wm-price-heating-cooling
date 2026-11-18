'use client';

import { useEffect } from 'react';
import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';
import { fireConversionEvent } from '@/lib/analytics';

/**
 * Field RUM instrumentation for the PRD's Core Web Vitals targets.
 * Lighthouse cannot measure INP; this collects INP/LCP/CLS/FCP/TTFB in real
 * browsers and pushes them into the consent-gated dataLayer (no network call
 * of its own, no PII, no third-party script).
 */
export function WebVitals() {
  useEffect(() => {
    const report = (metric: Metric) => {
      fireConversionEvent('web_vitals', {
        metric_name: metric.name,
        metric_value: Math.round(metric.value * (metric.name === 'CLS' ? 1000 : 1)),
        metric_rating: metric.rating,
        metric_id: metric.id,
      });
    };
    onCLS(report);
    onFCP(report);
    onINP(report);
    onLCP(report);
    onTTFB(report);
  }, []);
  return null;
}
