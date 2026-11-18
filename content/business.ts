/**
 * SINGLE SOURCE OF TRUTH — PRD 16.3.
 * Every header, footer, schema, contact page and CTA reads from this file.
 * Editable values are deliberately plain data so the office can update them.
 * Do not hard-code NAP / phone / rating values anywhere else.
 */
export const business = {
  name: 'Wm. Price Heating & Cooling',
  legalName: 'Wm. Price Heating & Cooling',
  phoneDisplay: '330.545.3722',
  phoneDashed: '330-545-3722',
  tel: '+13305453722',
  address: {
    street: '330 Trumbull Avenue',
    city: 'Girard',
    state: 'OH',
    zip: '44420',
    full: '330 Trumbull Avenue, Girard, OH 44420',
  },
  license: '33376',
  founded: 1937,
  google: {
    rating: 4.8,
    reviewCount: 253,
    lastUpdated: '2026-11-17',
    reviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJVeVRBinkM4gRGdzlOvaJnio',
  },
  hours: {
    office: 'Monday–Friday, 8 a.m.–5 p.m.',
    emergency: '24/7 emergency service',
    afterHours:
      'After hours, press 1 to reach our live answering service, which notifies the on-call technician.',
  },
  credentials: [
    'Serving the Mahoning Valley since 1937',
    'Carrier Factory Authorized Dealer',
    "Carrier President's Award, multi-year winner 2017–present",
    'BBB accredited',
  ],
  towns: [
    'Austintown', 'Boardman', 'Brookfield', 'Canfield', 'Columbiana',
    'Cortland', 'Girard', 'Hubbard', 'Liberty', 'Mineral Ridge',
    'Niles', 'Poland', 'Salem', 'Warren', 'Youngstown',
  ] as const,
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/PriceHeating' },
    { label: 'X', href: 'https://x.com/wmpricehtgOH' },
    { label: 'Nextdoor', href: 'https://nextdoor.com/page/wm-price-heating-cooling-girard-oh/' },
    { label: 'Leave a Google review', href: 'https://search.google.com/local/writereview?placeid=ChIJVeVRBinkM4gRGdzlOvaJnio' },
  ],
  /** Verified against the current homepage on 2026-11-17. */
  video: {
    title: 'Chris Shares Why Proper HVAC Design Matters — WKBN feature',
    articleUrl: 'https://www.wkbn.com/marketplace/myvalleypros/proper-design-is-important-for-heating-and-cooling/',
    youtubeId: 'zYASIEINXtM',
  },
  shareImage: '/brand/wm-price-fvcn.png',
  logo: '/brand/Logo.svg',
  mascot: '/brand/mascot.webp',
  config: {
    /** PRD 16.3: config flags default false. Confirm with the client before enabling. */
    saturdayServiceEnabled: false,
    commercialEnabled: false,
    showTestimonials: false,
    showAggregateRating: false,
  },
} as const;

export const phoneLink = `tel:${business.tel}`;
