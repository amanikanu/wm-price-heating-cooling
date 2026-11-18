/** F22: one editable global announcement, with an end date. Off until client approves copy. */
export const announcement = {
  enabled: false,
  message: '',
  link: '/financing/',
  linkLabel: 'See financing options',
  startDate: '' as string,
  endDate: '' as string,
} as const;
