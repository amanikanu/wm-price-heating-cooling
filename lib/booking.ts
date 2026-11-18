import { z } from 'zod';
import { business } from '@/content/business';

export const requestTypes = ['Repair', 'Maintenance', 'Installation or replacement', 'Estimate'] as const;
export const equipmentTypes = [
  'Air Conditioning', 'Air Duct', 'Boiler', 'Ductless System', 'Gas Furnace',
  'Heat Pump', 'Indoor Air Quality', 'Oil Furnace', 'Zone Control', 'Other',
] as const;
export const timeWindows = ['Any', 'Morning', 'Midday', 'Afternoon'] as const;
const weekdays = ['Any', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

/** F8 / 16.4 #2: Saturday exists only when the client confirms it. */
export function availableDays(saturdayEnabled: boolean = business.config.saturdayServiceEnabled): string[] {
  return saturdayEnabled ? [...weekdays, 'Saturday'] : [...weekdays];
}

/** Acceptance test 16.4 #1: 6 required inputs + 1 emergency question = 7 or fewer. */
export const REQUIRED_INPUT_COUNT = 6;

const oneOf = (values: readonly string[], label: string) =>
  z.string().refine((value) => values.includes(value), { message: `Choose a valid ${label}` });

export const bookingSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your name').max(120),
  phone: z.string().trim().regex(/^[0-9()+\-.\s]{7,20}$/, 'Enter a phone number we can reach'),
  email: z.string().trim().email('Enter a valid email address'),
  zip: z.string().trim().regex(/^\d{5}$/, 'Enter a 5-digit ZIP code'),
  requestType: oneOf(requestTypes, 'request type'),
  timeWindow: oneOf(timeWindows, 'time window'),
  equipmentType: oneOf(equipmentTypes, 'equipment type').optional().default('Other'),
  preferredDay: z.string().max(20).optional().default('Any'),
  message: z.string().trim().max(1000, 'Please keep the message under 1000 characters').optional().default(''),
  streetAddress: z.string().trim().max(200).optional().default(''),
  customerStatus: oneOf(['New', 'Existing'], 'customer status').optional(),
  planMember: oneOf(['Yes', 'No'], 'plan membership').optional(),
  emergency: z.boolean().optional().default(false),
  /** Honeypot: must be empty. Old admin fields now live in env vars, not the form. */
  website: z.string().max(0, 'Invalid submission').optional().default(''),
});

export type BookingPayload = z.infer<typeof bookingSchema>;
export type BookingFieldErrors = Partial<Record<keyof BookingPayload, string>>;
