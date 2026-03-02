/**
 * Extract weight in grams from a variant title like "300g", "400 g", etc.
 * Returns null if no weight found.
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
 * Format a number as Euro price: "75,00 €"
 */
export function formatEuro(amount: number): string {
  return `${amount.toFixed(2).replace('.', ',')} €`;
}

/**
 * Get the per-kg price from a variant. Falls back to raw price if no weight found.
 */
export function getPerKgPrice(priceAmount: string, variantTitle: string): { perKg: number; hasWeight: boolean } {
  const grams = extractWeightGrams(variantTitle);
  if (grams && grams > 0) {
    return { perKg: calcPricePerKg(priceAmount, grams), hasWeight: true };
  }
  return { perKg: parseFloat(priceAmount), hasWeight: false };
}
