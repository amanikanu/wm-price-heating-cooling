import type { FaqItem } from './types';
import { business } from './business';

export type PageKind =
  | 'generic' | 'booking' | 'news' | 'specials' | 'faq' | 'reviews' | 'review'
  | 'serviceArea' | 'contact' | 'siteMap' | 'emergency' | 'financing' | 'replace'
  | 'company' | 'plans' | 'planDetail' | 'products' | 'servicesHub' | 'careers'
  | 'referral' | 'privacy' | 'accessibility';

export type Section = { heading: string; body: string; bullets?: string[] };
export type StaticPage = {
  path: string;
  kind: PageKind;
  eyebrow: string;
  h1: string;
  intro: string;
  sections?: Section[];
  bullets?: string[];
  note?: string;
};

/**
 * Copy contains only facts from PRD 16.3 and the current site. Anything still
 * owed by the client (offer terms, team photos, local proof) is in HANDOFF.md,
 * never shown as an unresolved marker on the public site.
 */
export const PAGE_REGISTRY: Record<string, StaticPage> = {
  '/residential/': {
    path: '/residential/', kind: 'servicesHub', eyebrow: 'What we do',
    h1: 'Heating, Cooling & Indoor Air Quality Services',
    intro: `One page per service, no duplicates. Wm. Price Heating & Cooling has served Mahoning Valley homeowners since ${business.founded}.`,
    sections: [
      { heading: 'Heating', body: 'Furnaces, boilers, oil furnaces and heat pumps.', bullets: ['Furnaces', 'Boilers', 'Oil furnaces', 'Heat pumps'] },
      { heading: 'Cooling', body: 'Air conditioning, ductless systems, zone control and cross-linked heat pumps.', bullets: ['Air conditioning', 'Ductless systems', 'Zone control systems', 'Heat pumps'] },
      { heading: 'Indoor Air Quality', body: 'Indoor air quality and air duct services.', bullets: ['Indoor air quality', 'Air ducts'] },
    ],
  },
  '/replace-your-system/': {
    path: '/replace-your-system/', kind: 'replace', eyebrow: 'Replacement',
    h1: 'Replace Your System',
    intro: 'When repair is no longer the right call, start with one short replacement estimate request. Financing and current rebates are discussed with our office.',
    sections: [
      { heading: 'How the estimate flow works', body: 'There is one form. Choose “Estimate” as the request type — the old Request Estimate page now redirects here with that choice preselected.', bullets: ['One Book Service form', 'Ask about financing at the same time', 'Carrier equipment information is available on our products page'] },
    ],
  },
  '/assurance-and-security-plans/': {
    path: '/assurance-and-security-plans/', kind: 'plans', eyebrow: 'Maintenance plans',
    h1: 'Assurance vs. Security Maintenance Plans',
    intro: 'Two defined maintenance plans, compared side by side. One sign-up CTA; no need to choose between two different forms.',
    sections: [
      { heading: 'Which plan is right for me?', body: 'Compare the benefit rows above. Read the plan detail pages for the Assurance Agreement and the Security Care Plan, then sign up with a single request.' },
    ],
  },
  '/assurance-and-security-plans/assurance-agreement/': {
    path: '/assurance-and-security-plans/assurance-agreement/', kind: 'planDetail', eyebrow: 'Maintenance plans',
    h1: 'Assurance Agreement',
    intro: 'The Assurance plan is the higher-inclusion option in our comparison table. Full agreement terms are available from our office.',
    sections: [{ heading: 'Ready to sign up?', body: 'Use the single Book Service form and choose Maintenance as the request type. Our office will follow up about plan enrolment.' }],
  },
  '/assurance-and-security-plans/security-care-plan/': {
    path: '/assurance-and-security-plans/security-care-plan/', kind: 'planDetail', eyebrow: 'Maintenance plans',
    h1: 'Security Care Plan',
    intro: 'The Security plan covers the core inspection and service benefits in our comparison table. Full agreement terms are available from our office.',
    sections: [{ heading: 'Ready to sign up?', body: 'Use the single Book Service form and choose Maintenance as the request type. Our office will follow up about plan enrolment.' }],
  },
  '/products/': {
    path: '/products/', kind: 'products', eyebrow: 'Equipment',
    h1: 'HVAC Products',
    intro: 'Wm. Price Heating & Cooling is a Carrier Factory Authorized Dealer. Explore the Carrier lineup and accessories, or ask our team what fits your home.',
    sections: [{ heading: 'Carrier lineup & accessories', body: 'Equipment pages are being migrated. In the meantime, ask about a specific model when you request a replacement estimate.' }],
  },
  '/products/carrier/': {
    path: '/products/carrier/', kind: 'products', eyebrow: 'Equipment',
    h1: 'Carrier Equipment',
    intro: 'As a Carrier Factory Authorized Dealer, we can help you compare heating and cooling equipment options. Brand artwork and model claims require Carrier program approval before publication.',
    sections: [{ heading: 'Ask about a model', body: 'Mention the equipment you are considering in the optional message field of the Book Service form.' }],
  },
  '/products/accessories/': {
    path: '/products/accessories/', kind: 'products', eyebrow: 'Equipment',
    h1: 'HVAC Accessories',
    intro: 'Thermostats, filtration and other indoor air quality accessories. Ask our team which options work with your system.',
  },
  '/specials/': {
    path: '/specials/', kind: 'specials', eyebrow: 'Offers',
    h1: 'Specials & Financing',
    intro: 'Special offers are published as readable text with their amount, fine print and valid dates. Amounts are never baked into an image.',
    sections: [{ heading: 'Current offers', body: 'Offers are published here as soon as the client approves the copy and dates. Until then, call our office or ask about current promotions when you request an estimate.' }],
  },
  '/company/': {
    path: '/company/', kind: 'company', eyebrow: 'About us',
    h1: `About ${business.name}`,
    intro: `Serving the Mahoning Valley since ${business.founded}. ${business.credentials.join(' · ')}.`,
    sections: [
      { heading: 'A local team', body: `Our office is at ${business.address.full}. Team photos and job photos will be added once the client supplies them; we do not use stock photos of technicians.` },
      { heading: 'Featured on WKBN', body: 'Watch the click-to-play feature below. No video loads until you choose to play it.' },
    ],
  },
  '/referral/': {
    path: '/referral/', kind: 'referral', eyebrow: 'Referral program',
    h1: 'Referral Program',
    intro: 'Information about our referral program. Contact the office for the current program details — we do not publish terms that have not been confirmed.',
  },
  '/faq/': {
    path: '/faq/', kind: 'faq', eyebrow: 'Questions',
    h1: 'Frequently Asked Questions',
    intro: 'Straight answers about emergencies, hours, booking, financing and our service area.',
  },
  '/service-area/': {
    path: '/service-area/', kind: 'serviceArea', eyebrow: 'Service area',
    h1: 'Serving 15 Mahoning Valley Towns',
    intro: `Based in ${business.address.city}, Ohio — not Youngstown. Youngstown is one of the ${business.towns.length} towns we serve.`,
    sections: [{ heading: 'Every town has its own page', body: 'Each town page has its own introduction and local FAQ. Neighbourhood references and local review excerpts are added only when the client supplies verifiable facts.' }],
  },
  '/emergency-service/': {
    path: '/emergency-service/', kind: 'emergency', eyebrow: '24/7 emergency service',
    h1: 'No Heat or No Cooling? Call Now.',
    intro: `We provide ${business.hours.emergency}. ${business.hours.afterHours}`,
    sections: [
      { heading: 'What to do first', body: 'Call the number above. If you reach the answering service, press 1; they notify the on-call technician. If you prefer, submit the short form as a secondary option.' },
    ],
  },
  '/financing/': {
    path: '/financing/', kind: 'financing', eyebrow: 'Financing',
    h1: 'HVAC Financing',
    intro: 'Financing options can help when a system needs replacing. Current offer terms, lender language and end dates are supplied and approved by the client and lender before publication — we do not write them ourselves.',
    sections: [{ heading: 'Apply or ask', body: 'Choose “Estimate” on the Book Service form and mention financing in the optional message. Our office will follow up with the current, approved details.' }],
  },
  '/reviews/': {
    path: '/reviews/', kind: 'reviews', eyebrow: 'Customer feedback',
    h1: 'Customer Reviews',
    intro: `Google rating ${business.google.rating} from ${business.google.reviewCount} reviews, last updated ${business.google.lastUpdated}.`,
  },
  '/review/': {
    path: '/review/', kind: 'review', eyebrow: 'Leave a review',
    h1: 'Leave a Review',
    intro: 'Share your experience on Google. We only link to review platforms the client has confirmed.',
  },
  '/request-service/': {
    path: '/request-service/', kind: 'booking', eyebrow: 'Book service',
    h1: 'Book Service',
    intro: 'The short form takes under a minute on a phone. Repair, maintenance, installation or replacement, and estimates all start here.',
  },
  '/news/': {
    path: '/news/', kind: 'news', eyebrow: 'News & tips',
    h1: 'HVAC News & Tips',
    intro: 'Articles migrated from the previous site with unfilled city and company placeholders repaired.',
  },
  '/careers/': {
    path: '/careers/', kind: 'careers', eyebrow: 'Careers',
    h1: 'Careers at Wm. Price',
    intro: 'Interested in joining the team? Contact our Girard office about current openings. Job descriptions are added once the client supplies them.',
  },
  '/contact/': {
    path: '/contact/', kind: 'contact', eyebrow: 'Contact',
    h1: 'Contact Us',
    intro: `Call ${business.phoneDisplay} or send a short Book Service request. We are at ${business.address.full}.`,
  },
  '/privacy-policy/': {
    path: '/privacy-policy/', kind: 'privacy', eyebrow: 'Legal',
    h1: 'Privacy Policy',
    intro: 'This page explains what happens to information you send through the Book Service form, plus analytics and call tracking choices.',
    sections: [
      { heading: 'Information you send', body: 'Name, phone, email, ZIP, request details and optional fields are used to contact you about your request and are emailed to our office. We do not put personal information in URLs.' },
      { heading: 'Analytics and call tracking', body: 'Analytics and Tag Manager load only after you accept. Call tracking, if enabled, swaps the dialled number after consent while keeping our real number in the page markup. Declining leaves all optional tracking off.' },
      { heading: 'Your choices', body: `You can clear site data to change your analytics choice, or call ${business.phoneDisplay} with questions.` },
    ],
  },
  '/accessibility-statement/': {
    path: '/accessibility-statement/', kind: 'accessibility', eyebrow: 'Legal',
    h1: 'Accessibility Statement',
    intro: 'We aim to meet WCAG 2.2 AA with real semantic markup. This site does not use an accessibility overlay widget.',
    sections: [
      { heading: 'What we build in', body: 'Keyboard-navigable controls, visible focus states, labelled form fields with inline error text, 44 px minimum touch targets, sufficient colour contrast, meaningful image alternatives and reduced-motion support.' },
      { heading: 'Need help?', body: `If anything on this site is hard to use, call ${business.phoneDisplay} and we will help you complete your request by phone.` },
    ],
  },
  '/site-map/': {
    path: '/site-map/', kind: 'siteMap', eyebrow: 'Site map',
    h1: 'Site Map',
    intro: 'Every page on this website in one place.',
  },
};

const explicitFolderRoots = new Set(['residential', 'products', 'assurance-and-security-plans']);

export const rootPageSlugs = Object.keys(PAGE_REGISTRY)
  .filter((path) => path.split('/').filter(Boolean).length === 1)
  .map((path) => path.split('/').filter(Boolean)[0])
  .filter((slug) => !explicitFolderRoots.has(slug));

export const pageByPath = (path: string): StaticPage | undefined => PAGE_REGISTRY[path];
