import { business } from '@/content/business';
import type { Service } from '@/content/types';
import type { FaqItem } from '@/content/types';
import { absoluteUrl } from './site';

export function hvacBusinessSchema() {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    name: business.name,
    url: absoluteUrl('/'),
    image: absoluteUrl(business.shareImage),
    telephone: business.phoneDashed,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: 'US',
    },
    areaServed: business.towns.map((town) => ({
      '@type': 'City', name: town, containedInPlace: { '@type': 'State', name: 'Ohio' },
    })),
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00', closes: '17:00',
    }],
    foundingDate: String(business.founded),
    identifier: { '@type': 'PropertyValue', name: 'Ohio license', value: business.license },
    sameAs: business.socials.filter((s) => s.label !== 'Leave a Google review').map((s) => s.href),
  };
  // PRD 16.8: aggregateRating only with client-supported, on-page visible reviews.
  if (business.config.showAggregateRating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: business.google.rating,
      reviewCount: business.google.reviewCount,
    };
  }
  return schema;
}

export function serviceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    serviceType: service.name,
    provider: { '@type': 'HVACBusiness', name: business.name, telephone: business.phoneDashed },
    areaServed: business.towns.map((town) => ({ '@type': 'City', name: town })),
    url: absoluteUrl(`/residential/${service.slug}/`),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question', name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem', position: index + 1, name: item.name, item: absoluteUrl(item.path),
    })),
  };
}
