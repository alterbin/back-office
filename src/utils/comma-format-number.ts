export function commaFormatNumber(input: number | string): string {
  if (input !== '0' && input !== 0 && !input) return '';
  const fixedNumber = Number(input);

  return fixedNumber.toLocaleString('en-US');
}
