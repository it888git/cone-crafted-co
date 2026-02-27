import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest, PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY, type ShopifyProduct } from '@/lib/shopify';

export function useShopifyProducts(first = 50, searchQuery?: string) {
  return useQuery({
    queryKey: ['shopify-products', first, searchQuery],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCTS_QUERY, { first, query: searchQuery || null });
      return (data?.data?.products?.edges || []) as ShopifyProduct[];
    },
  });
}

export function useShopifyProduct(handle: string) {
  return useQuery({
    queryKey: ['shopify-product', handle],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      if (!data?.data?.product) return null;
      return { node: data.data.product } as ShopifyProduct;
    },
    enabled: !!handle,
  });
}
