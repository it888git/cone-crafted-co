import { useQuery } from '@tanstack/react-query';
import {
  storefrontApiRequest,
  PRODUCTS_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  type ShopifyProduct,
} from '@/lib/shopify';
import { useMarketStore } from '@/stores/marketStore';
import { filterByRegion } from '@/lib/marketFilter';

export function useShopifyProducts(first = 50, searchQuery?: string) {
  const country = useMarketStore((s) => s.selectedCountry.code);
  const region = useMarketStore((s) => s.selectedCountry.deliveryRegion);

  return useQuery({
    queryKey: ['shopify-products', first, searchQuery, country, region],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCTS_QUERY, {
        first,
        query: searchQuery || null,
        country,
      });
      const edges = (data?.data?.products?.edges || []) as ShopifyProduct[];
      return filterByRegion(edges, region);
    },
    refetchInterval: 15000,
    refetchIntervalInBackground: true,
  });
}

export function useShopifyProduct(handle: string) {
  const country = useMarketStore((s) => s.selectedCountry.code);

  return useQuery({
    queryKey: ['shopify-product', handle, country],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle, country });
      if (!data?.data?.product) return null;
      return { node: data.data.product } as ShopifyProduct;
    },
    enabled: !!handle,
    refetchInterval: 15000,
    refetchIntervalInBackground: true,
  });
}
