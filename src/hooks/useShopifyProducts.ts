import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest, BASE_PRODUCTS_QUERY, BASE_PRODUCT_BY_HANDLE_QUERY, type ShopifyProduct } from '@/lib/shopify';

export function useShopifyProducts(first = 50, searchQuery?: string) {
  return useQuery({
    queryKey: ['shopify-products', first, searchQuery],
    queryFn: async () => {
      const data = await storefrontApiRequest(BASE_PRODUCTS_QUERY, { first, query: searchQuery || null });
      return (data?.data?.products?.edges || []) as ShopifyProduct[];
    },
    refetchInterval: 15000,
    refetchIntervalInBackground: true,
  });
}

export function useShopifyProduct(handle: string) {
  return useQuery({
    queryKey: ['shopify-product', handle],
    queryFn: async () => {
      const data = await storefrontApiRequest(BASE_PRODUCT_BY_HANDLE_QUERY, { handle });
      if (!data?.data?.product) return null;
      return { node: data.data.product } as ShopifyProduct;
    },
    enabled: !!handle,
    refetchInterval: 15000,
    refetchIntervalInBackground: true,
  });
}
