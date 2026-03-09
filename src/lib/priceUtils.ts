/**
 * Extract weight in grams from a variant title like "300g", "400 g", etc.
 */
export function extractWeightGrams(variantTitle: string): number | null {
  const match = variantTitle.match(/(\d+)\s*g/i);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Calculate price per kg given a price amount and weight in grams.
 */
export function calcPricePerKg(priceAmount: string, weightGrams: number): number {
  const price = parseFloat(priceAmount);
  return (price / weightGrams) * 1000;
}

/**
 * Format a price with the given currency code using Intl.NumberFormat.
 */
export function formatPrice(amount: number, currencyCode: string = 'EUR'): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currencyCode}`;
  }
}

/**
 * Format a number as Euro price: "75,00 €" (kept for backward compat)
 */
export function formatEuro(amount: number): string {
  return `${amount.toFixed(2).replace('.', ',')} €`;
}

/**
 * Get the per-kg price from a variant.
 */
export function getPerKgPrice(priceAmount: string, variantTitle: string): { perKg: number; hasWeight: boolean } {
  const grams = extractWeightGrams(variantTitle);
  if (grams && grams > 0) {
    return { perKg: calcPricePerKg(priceAmount, grams), hasWeight: true };
  }
  return { perKg: parseFloat(priceAmount), hasWeight: false };
}

/**
 * Format price per kg with currency from Shopify response.
 */
export function formatPricePerKg(priceAmount: string, variantTitle: string, currencyCode: string = 'EUR'): string {
  const { perKg } = getPerKgPrice(priceAmount, variantTitle);
  return `${formatPrice(perKg, currencyCode)}/kg`;
}
