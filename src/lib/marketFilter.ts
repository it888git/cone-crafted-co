import type { ShopifyProduct } from "@/lib/shopify";
import type { MarketCountry } from "@/stores/marketStore";

export type DeliveryRegion = MarketCountry["deliveryRegion"];

/**
 * Products can opt-out of regions using Shopify tags:
 *   `no-ship:baltic`, `no-ship:uk`, `no-ship:europe`, `no-ship:international`
 * A product with such a tag is hidden from users whose selected country
 * matches that delivery region.
 */
export const isProductAvailableInRegion = (
  product: ShopifyProduct,
  region: DeliveryRegion,
): boolean => {
  const tags = (product.node.tags || []).map((t) => t.toLowerCase().trim());
  return !tags.includes(`no-ship:${region}`);
};

export const filterByRegion = <T extends ShopifyProduct>(
  products: T[],
  region: DeliveryRegion,
): T[] => products.filter((p) => isProductAvailableInRegion(p, region));
