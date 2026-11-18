import { business } from './business';
import { services } from './services';
import { cities } from './cities';
import { postMeta } from './posts';

export type SeoEntry = { title: string; description: string };

/** PRD 16.8: unique title + <160-char description per route, per page type. */
const staticEntries: Record<string, SeoEntry> = {
  '/': {
    title: 'HVAC Services in Mahoning Valley, OH | Wm. Price Heating & Cooling',
    description: 'Heating, cooling and indoor air quality service across 15 Mahoning Valley towns since 1937. Call 24/7 or book service online.',
  },
  '/residential/': {
    title: 'Heating, Cooling & Indoor Air Quality | Wm. Price, Girard OH',
    description: 'Heating, cooling, indoor air quality and maintenance services from Wm. Price Heating & Cooling in Girard, OH. Since 1937.',
  },
  '/replace-your-system/': {
    title: 'Replace Your System | Wm. Price Heating & Cooling, Girard OH',
    description: 'Request a replacement estimate for heating or cooling equipment. Ask about Carrier equipment, current rebates and financing options.',
  },
  '/assurance-and-security-plans/': {
    title: 'Maintenance Plans & Pricing | Wm. Price Heating & Cooling',
    description: 'Compare the Assurance and Security maintenance plans side by side, then sign up with one simple request.',
  },
  '/assurance-and-security-plans/assurance-agreement/': {
    title: 'Assurance Agreement | Wm. Price Heating & Cooling',
    description: 'Details of the Assurance Agreement maintenance plan and how to sign up.',
  },
  '/assurance-and-security-plans/security-care-plan/': {
    title: 'Security Care Plan | Wm. Price Heating & Cooling',
    description: 'Details of the Security Care Plan maintenance plan and how to sign up.',
  },
  '/products/': {
    title: 'HVAC Products | Wm. Price Heating & Cooling, Girard OH',
    description: 'Browse the Carrier equipment lineup and accessories available through Wm. Price Heating & Cooling.',
  },
  '/products/carrier/': {
    title: 'Carrier Equipment | Wm. Price Heating & Cooling, Girard OH',
    description: 'Carrier heating and cooling equipment from a Carrier Factory Authorized Dealer in Girard, OH.',
  },
  '/products/accessories/': {
    title: 'HVAC Accessories | Wm. Price Heating & Cooling, Girard OH',
    description: 'Thermostats, filtration and other HVAC accessories. Ask our team what fits your system.',
  },
  '/specials/': {
    title: 'Specials & Promotions | Wm. Price Heating & Cooling',
    description: 'Current HVAC specials and promotions, shown as readable text with terms and dates. Call for details.',
  },
  '/company/': {
    title: 'About Wm. Price Heating & Cooling | Since 1937, Girard OH',
    description: 'Family-run HVAC service in the Mahoning Valley since 1937. Carrier Factory Authorized Dealer and President’s Award winner.',
  },
  '/referral/': {
    title: 'Referral Program | Wm. Price Heating & Cooling',
    description: 'Information about the Wm. Price Heating & Cooling referral program. Contact our office for current details.',
  },
  '/faq/': {
    title: 'HVAC FAQ | Wm. Price Heating & Cooling, Girard OH',
    description: 'Answers about emergency service, office hours, booking, financing and the 15-town Mahoning Valley service area.',
  },
  '/service-area/': {
    title: 'Service Area: 15 Mahoning Valley Towns | Wm. Price',
    description: 'We serve Austintown, Boardman, Canfield, Girard, Niles, Poland, Warren, Youngstown and 7 more Mahoning Valley towns.',
  },
  '/emergency-service/': {
    title: '24/7 Emergency HVAC Service | Wm. Price, Girard OH',
    description: 'No heat or no cooling? Call 24/7. After hours, press 1 for our live answering service, which notifies the on-call technician.',
  },
  '/financing/': {
    title: 'HVAC Financing | Wm. Price Heating & Cooling, Girard OH',
    description: 'Financing information for new heating and cooling systems. Terms are supplied by the lender and approved by Wm. Price.',
  },
  '/reviews/': {
    title: 'Customer Reviews | Wm. Price Heating & Cooling, Girard OH',
    description: 'See our Google rating and customer reviews, and leave a review of your own.',
  },
  '/review/': {
    title: 'Leave a Review | Wm. Price Heating & Cooling, Girard OH',
    description: 'Leave a Google review for Wm. Price Heating & Cooling.',
  },
  '/request-service/': {
    title: 'Book Service | Wm. Price Heating & Cooling, Girard OH',
    description: 'Short booking form for repairs, maintenance, installation and replacement estimates across 15 Mahoning Valley towns.',
  },
  '/news/': {
    title: 'HVAC News & Tips | Wm. Price Heating & Cooling',
    description: 'Heating, cooling and indoor air quality articles from Wm. Price Heating & Cooling in the Mahoning Valley.',
  },
  '/careers/': {
    title: 'Careers | Wm. Price Heating & Cooling, Girard OH',
    description: 'Careers at Wm. Price Heating & Cooling. Contact our Girard office about current openings.',
  },
  '/contact/': {
    title: 'Contact Us | Wm. Price Heating & Cooling, Girard OH',
    description: `Call ${business.phoneDisplay} or book service online. ${business.address.full}. Office ${business.hours.office}.`,
  },
  '/privacy-policy/': {
    title: 'Privacy Policy | Wm. Price Heating & Cooling',
    description: 'How Wm. Price Heating & Cooling handles information submitted through this website, analytics and call tracking.',
  },
  '/accessibility-statement/': {
    title: 'Accessibility Statement | Wm. Price Heating & Cooling',
    description: 'Our commitment to WCAG 2.2 AA accessibility through semantic HTML, keyboard support and no overlay widget.',
  },
  '/site-map/': {
    title: 'Site Map | Wm. Price Heating & Cooling',
    description: 'All pages on the Wm. Price Heating & Cooling website, including services, plans, news and 15 city pages.',
  },
};

export function seoRegistry(): Record<string, SeoEntry> {
  const entries: Record<string, SeoEntry> = { ...staticEntries };
  for (const service of services) {
    entries[`/residential/${service.slug}/`] = {
      title: `${service.name} | ${business.name}, Girard OH`,
      description: `${service.name} service in Girard, OH and 14 more Mahoning Valley towns. Call 24/7 or book service online with a short form.`,
    };
  }
  for (const city of cities) {
    entries[`/city/${city.slug}/`] = {
      title: `Heating & Cooling in ${city.name}, OH | ${business.name}`,
      description: `Heating, cooling and indoor air quality service in ${city.name}, Ohio. Since 1937. Call 24/7 or book service online.`,
    };
  }
  const duplicateTitles = new Set(postMeta.map((p) => p.title).filter((title, i, all) => all.indexOf(title) !== i));
  for (const post of postMeta) {
    const month = new Date(`${post.date}T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
    const title = duplicateTitles.has(post.title)
      ? `${post.title} — ${month} | ${business.name}`
      : `${post.title} | ${business.name}`;
    entries[`/${post.slug}/`] = { title, description: post.description };
  }
  return entries;
}

export const getSeoEntry = (path: string): SeoEntry | undefined => seoRegistry()[path];
