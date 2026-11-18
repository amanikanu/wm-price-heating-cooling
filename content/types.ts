export type PostMeta = {
  title: string;
  date: string;
  description: string;
  slug: string;
};

export type FaqItem = { question: string; answer: string };

export type ServiceCategory = 'Heating' | 'Cooling' | 'Indoor Air Quality';

export type Service = {
  slug: string;
  name: string;
  category: ServiceCategory;
  /** Other categories that cross-link to this one canonical URL. */
  alsoListedUnder?: ServiceCategory[];
  intro: string;
  benefits: string[];
  process: string[];
  faqs: FaqItem[];
  related: string[];
};

export type City = {
  slug: string;
  name: string;
  /** Unique, non-boilerplate intro written without unverifiable local claims. */
  intro: string;
  /** Client-supplied, verifiable neighbourhood / landmark references. Empty until supplied. */
  landmarks: string[];
  localFaq: FaqItem;
  /** Client-approved review excerpts from this town. Empty until supplied. */
  reviews: string[];
};

export type Special = {
  id: string;
  title: string;
  amount: string;
  finePrint: string;
  startDate: string;
  endDate: string;
  approved: boolean;
  source: string;
};

export type Testimonial = { author: string; quote: string; approved: boolean };
