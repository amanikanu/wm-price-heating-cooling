import type { City } from './types';
import { business } from './business';

/**
 * PRD 16.5: the builder generates the template and fields only.
 * `landmarks` and `reviews` stay EMPTY until the client supplies verifiable local
 * facts; the template hides those blocks rather than inventing them (16.10).
 * Each intro is written once per town — no shared boilerplate string.
 */
const intro = (town: string, sentence: string) => sentence;

const townIntros: Record<string, string> = {
  Austintown: 'If you live in Austintown and your furnace or air conditioner needs attention, Wm. Price Heating & Cooling is one call away. Austintown is part of our 15-town Mahoning Valley service area.',
  Boardman: 'Boardman homeowners can reach our Girard office for heating, cooling and indoor air quality requests. We have served the Mahoning Valley since 1937.',
  Brookfield: 'Need heating or cooling help in Brookfield? Send a short Book Service request or call us — Brookfield is one of the 15 towns we serve.',
  Canfield: 'From no-heat calls to replacement questions, Canfield residents can start with our short request form or a phone call.',
  Columbiana: 'Columbiana is on our service-area list. Tell us what your system is doing and we will contact you about your request.',
  Cortland: 'Wm. Price Heating & Cooling takes service requests from Cortland homeowners by phone and online, with 24/7 emergency service by phone.',
  Girard: `We are based right here in Girard at ${business.address.street}. Stop by our service-area page or call the office for heating and cooling help.`,
  Hubbard: 'Hubbard is one of the Mahoning Valley communities we serve. Call or book online and choose a preferred day and time window.',
  Liberty: 'In Liberty and need a tune-up, repair or replacement conversation? Our Book Service form takes under a minute on a phone.',
  'Mineral Ridge': 'Mineral Ridge homeowners can use the same short form as every town we serve — no state dropdown, no long questionnaire.',
  Niles: `For Niles residents, the fastest route is a tap-to-call or a short Book Service request. Our office is open ${business.hours.office}.`,
  Poland: 'Poland is included in our 15-town service area. Ask about heating, cooling, indoor air quality or a replacement estimate.',
  Salem: 'Salem homeowners can reach our live answering service after hours by calling and pressing 1; the on-call technician is notified.',
  Warren: 'Warren is part of our Mahoning Valley coverage. Start a repair, maintenance, installation or estimate request online.',
  Youngstown: 'Youngstown is one of our service-area towns — our office and mailing address are in Girard. Call or book service online.',
};

export const cities: City[] = business.towns.map((name) => ({
  slug: `${name.toLowerCase().replace(/\s+/g, '-')}-oh`,
  name,
  intro: intro(name, townIntros[name] ?? ''),
  landmarks: [],
  localFaq: {
    question: `Do you provide HVAC service in ${name}, Ohio?`,
    answer: `Yes. ${name} is one of the 15 Mahoning Valley towns in our service area. Call ${business.phoneDisplay} or use the Book Service form. Our office is open ${business.hours.office}; ${business.hours.emergency} is available by phone.`,
  },
  reviews: [],
}));

export const cityBySlug = (slug: string): City | undefined => cities.find((c) => c.slug === slug);
