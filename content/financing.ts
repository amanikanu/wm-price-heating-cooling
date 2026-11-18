/**
 * F5 / F14: lender pre-qualification link and approved offer copy.
 * Empty by default — supply the lender URL only after client + lender approval.
 * The replacement and financing pages show the CTA only when this is populated.
 */
export const financing = {
  prequalificationUrl: '' as string,
  providerLabel: '' as string,
  note: 'Current offer terms and lender language are supplied and approved by the client and lender before publication.',
} as const;
