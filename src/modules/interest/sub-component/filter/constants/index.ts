const SORT_DIRECTION = [
  { label: 'Ascending', value: 'ASC' },
  { label: 'Descending', value: 'DESC' },
];

const SOURCES = [
  { value: 'paystack', label: 'Paystack' },
];

const CURRENCY_TYPES = [
  // { value: 'USD', label: 'US Dollar' },
  // { value: 'EUR', label: 'Euro' },
  // { value: 'GBP', label: 'Pound' },
  // { value: 'JPY', label: 'Yen' },
  { value: 'NGN', label: 'Naira' },
];

const STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'completed', label: 'Completed' },
  { value: 'reversed', label: 'Reversed' },
];

const TYPES = [
  { value: 'deposit', label: 'Deposit' },
  { value: 'withdrawal', label: 'Withdrawal' },
];

export {
  SORT_DIRECTION, SOURCES, CURRENCY_TYPES, STATUSES, TYPES,
};
