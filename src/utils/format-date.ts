export function formatDateTime(d: string): string {
  if (!d || !d.trim()) return '--';
  const date = new Date(d);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(date.getTime())) {
    return '--';
  }

  const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');

  const hours24 = localDate.getHours();
  const minutes = String(localDate.getMinutes()).padStart(2, '0');

  const period = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = String(hours24 % 12 || 12).padStart(2, '0');

  return `${year}-${month}-${day} ${hours12}:${minutes} ${period}`;
}
