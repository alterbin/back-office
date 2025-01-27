export function formatCurrency(amount: string | number, currency: string = 'NGN'): string {
  if (!amount) return '--';
  const value = Number(amount);

  // Note: This part formats the amount with commas and two decimal places
  const formattedAmount = value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const currencySymbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    NGN: '₦',
  };

  const symbol = currencySymbols[currency] || currency;

  return `${symbol}${formattedAmount}`;
}
