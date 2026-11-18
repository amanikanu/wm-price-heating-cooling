import type { FaqItem } from './types';
import { business } from './business';

/** Answers contain only facts documented in PRD 16.3. No response-time promises. */
export const faqs: FaqItem[] = [
  {
    question: 'What should I do if I have no heat or no cooling?',
    answer:
      `Call ${business.phoneDisplay}. We provide ${business.hours.emergency}. ${business.hours.afterHours}`,
  },
  {
    question: 'When is your office open?',
    answer: `Our office is open ${business.hours.office}. ${business.hours.emergency} is available by phone.`,
  },
  {
    question: 'How do I request service or a replacement estimate?',
    answer:
      'Use the single Book Service form. Choose Repair, Maintenance, Installation or replacement, or Estimate as the request type. There is no separate estimate form.',
  },
  {
    question: 'What happens after I submit the form?',
    answer:
      `We will contact you about your request. Our office is open ${business.hours.office}; ${business.hours.afterHours}`,
  },
  {
    question: 'Which towns do you serve?',
    answer:
      `We serve ${business.towns.length} Mahoning Valley towns: ${business.towns.join(', ')}.`,
  },
  {
    question: 'Are you a Carrier dealer?',
    answer: `Yes. ${business.name} is a Carrier Factory Authorized Dealer and a multi-year Carrier President’s Award winner, 2017–present.`,
  },
  {
    question: 'How long have you been in business?',
    answer: `Since ${business.founded}. Our license number is ${business.license} and our office is at ${business.address.full}.`,
  },
  {
    question: 'Do you offer financing?',
    answer: 'Financing information is on our Financing page. Current offer terms and lender language are supplied and approved by the client and lender before publication.',
  },
];
