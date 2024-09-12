export default function formatPrice(value: number): string {
  const format: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'RUB',
    currencyDisplay: 'symbol',
  };

  return Intl.NumberFormat('ru-RU', format).format(value).replace(',00', '');
}
