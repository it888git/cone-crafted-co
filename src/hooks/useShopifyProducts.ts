import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest, PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY, type ShopifyProduct } from '@/lib/shopify';
import { useMarketStore } from '@/stores/marketStore';

export function useShopifyProducts(first = 50, searchQuery?: string) {
  const countryCode = useMarketStore((s) => s.selectedCountry.code);
  return useQuery({
    queryKey: ['shopify-products', first, searchQuery, countryCode],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCTS_QUERY, { first, query: searchQuery || null, country: countryCode });
      return (data?.data?.products?.edges || []) as ShopifyProduct[];
    },
    refetchInterval: 15000,
    refetchIntervalInBackground: true,
  });
}

export function useShopifyProduct(handle: string) {
  const countryCode = useMarketStore((s) => s.selectedCountry.code);
  return useQuery({
    queryKey: ['shopify-product', handle, countryCode],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle, country: countryCode });
      if (!data?.data?.product) return null;
      return { node: data.data.product } as ShopifyProduct;
    },
    enabled: !!handle,
    refetchInterval: 15000,
    refetchIntervalInBackground: true,
  });
}
