import type { Service } from './types';
import { business } from './business';

/**
 * One canonical URL per service (PRD 16.4 #11). Heat pumps belong to Heating and
 * are cross-linked from Cooling, but there is only ever one /residential/heat-pumps/ page.
 * Intro copy is deliberately factual: full service-page copy is still owed by the
 * client (PRD 16.11) and is listed in HANDOFF.md. No claims are invented here.
 */
const bookingFaq = {
  question: 'How do I book service?',
  answer:
    `Use the Book Service form to send the details, or call ${business.phoneDisplay}. Our office is open ${business.hours.office}; ${business.hours.afterHours}`,
};
const emergencyFaq = {
  question: 'What if I have no heat or no cooling right now?',
  answer:
    `Call ${business.phoneDisplay}. We provide ${business.hours.emergency}. ${business.hours.afterHours}`,
};
const areaFaq = {
  question: 'Which towns do you serve?',
  answer:
    `We serve ${business.towns.length} Mahoning Valley towns: ${business.towns.join(', ')}.`,
};
const financeFaq = {
  question: 'Can I ask about financing when I request an estimate?',
  answer:
    'Yes. Choose “Estimate” as the request type on the Book Service form, or visit our financing page. Current offer terms are supplied by the client and lender before publication.',
};

export const services: Service[] = [
  {
    slug: 'furnaces', name: 'Furnaces', category: 'Heating',
    intro: 'We specialize in reliable heating systems that keep you warm and comfortable in every part of your home. Whether you are considering a replacement or need help with a current system, start with a call or a service request.',
    benefits: ['Heating service requests in one place', '24/7 emergency help by phone for no-heat calls', 'Replacement estimates and financing information', 'Service across all 15 Mahoning Valley towns'],
    process: ['Tell us what is happening with your furnace', 'Choose a preferred day and time window', 'We will contact you about your request'],
    faqs: [bookingFaq, emergencyFaq, financeFaq], related: ['boilers', 'heat-pumps', 'indoor-air-quality'],
  },
  {
    slug: 'boilers', name: 'Boilers', category: 'Heating',
    intro: 'Boiler questions, repairs and replacement conversations start here. Wm. Price Heating & Cooling has served Mahoning Valley homeowners since 1937.',
    benefits: ['One canonical place for boiler requests', '24/7 emergency help by phone', 'Replacement estimates', 'Maintenance plan information'],
    process: ['Send the details or call', 'Choose a preferred time window', 'We will contact you about your request'],
    faqs: [bookingFaq, emergencyFaq, areaFaq], related: ['furnaces', 'oil-furnaces', 'heat-pumps'],
  },
  {
    slug: 'oil-furnaces', name: 'Oil Furnaces', category: 'Heating',
    intro: 'Have an oil furnace and need help? Send a short service request or call our office. We have been serving the Mahoning Valley since 1937.',
    benefits: ['Short, mobile-friendly booking form', '24/7 emergency help by phone', 'Replacement estimate option', 'Maintenance plan information'],
    process: ['Tell us the issue', 'Choose a preferred day and time window', 'We will contact you about your request'],
    faqs: [bookingFaq, emergencyFaq, financeFaq], related: ['furnaces', 'boilers', 'air-ducts'],
  },
  {
    slug: 'heat-pumps', name: 'Heat Pumps', category: 'Heating', alsoListedUnder: ['Cooling'],
    intro: 'Heat pumps provide both heating and cooling, so this is the single canonical page for the service — linked from both Heating and Cooling.',
    benefits: ['One page, linked from Heating and Cooling', '24/7 emergency help by phone', 'Replacement estimates and financing information', 'Service across the 15-town area'],
    process: ['Tell us what your system is doing', 'Choose a preferred time window', 'We will contact you about your request'],
    faqs: [bookingFaq, emergencyFaq, financeFaq], related: ['air-conditioning', 'ductless-systems', 'furnaces'],
  },
  {
    slug: 'air-conditioning', name: 'Air Conditioning', category: 'Cooling',
    intro: 'No need to sweat. We offer high-efficiency air conditioning systems and help with cooling problems across the Mahoning Valley.',
    benefits: ['Cooling service requests in one place', '24/7 emergency help by phone', 'Replacement estimates and financing information', 'Maintenance plan information'],
    process: ['Describe the cooling issue', 'Choose a preferred day and time window', 'We will contact you about your request'],
    faqs: [bookingFaq, emergencyFaq, financeFaq], related: ['ductless-systems', 'heat-pumps', 'indoor-air-quality'],
  },
  {
    slug: 'ductless-systems', name: 'Ductless Systems', category: 'Cooling',
    intro: 'Questions about a ductless system? Send a short request with the equipment type selected, or call the office directly.',
    benefits: ['Ductless requests in one place', '24/7 emergency help by phone', 'Replacement estimate option', 'Service across the 15-town area'],
    process: ['Select “Ductless System” in the form', 'Choose a preferred time window', 'We will contact you about your request'],
    faqs: [bookingFaq, areaFaq, financeFaq], related: ['air-conditioning', 'heat-pumps', 'zone-control-systems'],
  },
  {
    slug: 'zone-control-systems', name: 'Zone Control Systems', category: 'Cooling',
    intro: 'Zone control questions belong on this one page. Tell us what you need and we will follow up about your request.',
    benefits: ['One canonical page for zone control', 'Short booking form', 'Replacement estimate option', 'Maintenance plan information'],
    process: ['Send the details', 'Choose a preferred time window', 'We will contact you about your request'],
    faqs: [bookingFaq, areaFaq, financeFaq], related: ['ductless-systems', 'air-conditioning', 'air-ducts'],
  },
  {
    slug: 'indoor-air-quality', name: 'Indoor Air Quality', category: 'Indoor Air Quality',
    intro: 'Your indoor air quality (IAQ) is central to your health and comfort. Let us help you find solutions that improve the air quality at your home.',
    benefits: ['IAQ requests in one place', 'Filtration and air duct cross-links', 'Replacement estimate option', 'Service across the 15-town area'],
    process: ['Tell us what you are noticing', 'Choose a preferred time window', 'We will contact you about your request'],
    faqs: [bookingFaq, areaFaq, financeFaq], related: ['air-ducts', 'air-conditioning', 'furnaces'],
  },
  {
    slug: 'air-ducts', name: 'Air Ducts', category: 'Indoor Air Quality',
    intro: 'Air duct questions are handled here as part of our indoor air quality services. Start with a short service request or a call.',
    benefits: ['Air duct requests in one place', 'Cross-linked from indoor air quality', 'Maintenance plan information', 'Service across the 15-town area'],
    process: ['Send the details', 'Choose a preferred time window', 'We will contact you about your request'],
    faqs: [bookingFaq, areaFaq, financeFaq], related: ['indoor-air-quality', 'furnaces', 'air-conditioning'],
  },
];

export const serviceBySlug = (slug: string): Service | undefined => services.find((s) => s.slug === slug);
export const servicesByCategory = (category: Service['category']): Service[] => [
  ...services.filter((s) => s.category === category),
  ...services.filter((s) => s.alsoListedUnder?.includes(category)),
];
