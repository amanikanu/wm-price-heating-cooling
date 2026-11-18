/**
 * Feature rows migrated from the CURRENT site's /assurance-and-security-plans/
 * comparison table on 2026-11-17 (PRD 16.11 asks the client to confirm the copy).
 * The Saturday row is only rendered when business.config.saturdayServiceEnabled
 * is true (PRD 16.4 #2, F8).
 */
export type PlanRow = {
  feature: string;
  security: boolean;
  assurance: boolean;
  requiresSaturdayFlag?: boolean;
};

export const planRows: PlanRow[] = [
  { feature: '20 Point Performance Inspection', security: true, assurance: true },
  { feature: 'Priority Service', security: true, assurance: true },
  { feature: '10% Discount on Repairs', security: false, assurance: true },
  { feature: 'No Service Fee', security: false, assurance: true },
  { feature: 'Saturday Appointments', security: true, assurance: true, requiresSaturdayFlag: true },
  { feature: '24-HR Emergency Service', security: true, assurance: true },
  { feature: 'Loyalty Bucks', security: false, assurance: true },
  { feature: 'Discount for Equipment Bundle', security: true, assurance: true },
  { feature: 'Annual or Monthly payment plans', security: true, assurance: true },
  { feature: '12-month Warranty on Repairs', security: true, assurance: true },
];

export const plans = [
  { name: 'Security Plan', slug: 'security-care-plan', href: '/assurance-and-security-plans/security-care-plan/' },
  { name: 'Assurance Plan', slug: 'assurance-agreement', href: '/assurance-and-security-plans/assurance-agreement/' },
] as const;
