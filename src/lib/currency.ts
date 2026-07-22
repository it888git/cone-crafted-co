import { useQuery } from '@tanstack/react-query';
import { useMarketStore } from '@/stores/marketStore';

type Rates = Record<string, number>; // rates relative to USD

async function fetchRates(): Promise<Rates> {
  const res = await fetch('https://open.er-api.com/v6/latest/USD');
  if (!res.ok) throw new Error('rates fetch failed');
  const data = await res.json();
  return (data?.rates || {}) as Rates;
}

export function useExchangeRates() {
  return useQuery({
    queryKey: ['fx-rates-usd'],
    queryFn: fetchRates,
    staleTime: 1000 * 60 * 60 * 6, // 6h
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook that returns a converter for international markets.
 * When the selected country's currency differs from the Shopify price currency,
 * it converts using latest USD-based rates. Otherwise returns the original amount.
 */
export function useConverter() {
  const { data: rates } = useExchangeRates();
  const target = useMarketStore((s) => s.selectedCountry.currency);
  const region = useMarketStore((s) => s.selectedCountry.deliveryRegion);

  const convert = (amount: number, fromCurrency: string): { amount: number; currencyCode: string } => {
    // Only convert for international market
    if (region !== 'international') return { amount, currencyCode: fromCurrency };
    if (!rates || !target || target === fromCurrency) return { amount, currencyCode: fromCurrency };
    const fromRate = fromCurrency === 'USD' ? 1 : rates[fromCurrency];
    const toRate = target === 'USD' ? 1 : rates[target];
    if (!fromRate || !toRate) return { amount, currencyCode: fromCurrency };
    // amount(from) -> USD -> target
    const usd = amount / fromRate;
    const converted = usd * toRate;
    return { amount: converted, currencyCode: target };
  };

  return { convert, ready: !!rates };
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  EUR: '€', USD: '$', GBP: '£', JPY: '¥', AUD: 'A$', CAD: 'C$', CHF: 'CHF',
  KRW: '₩', ILS: '₪', TRY: '₺', AED: 'د.إ', SGD: 'S$', NZD: 'NZ$',
};

export function currencySymbol(code: string): string {
  return CURRENCY_SYMBOLS[code] || code;
}

/**
 * Round to sensible display. Zero-decimal currencies (JPY, KRW) use whole numbers.
 */
export function roundForDisplay(amount: number, currencyCode: string, decimals = 2): number {
  const zeroDecimal = ['JPY', 'KRW'];
  if (zeroDecimal.includes(currencyCode)) return Math.round(amount);
  const p = Math.pow(10, decimals);
  return Math.round(amount * p) / p;
}
