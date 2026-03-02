import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ShopifyProduct } from '@/lib/shopify';

interface WishlistStore {
  items: ShopifyProduct[];
  addItem: (product: ShopifyProduct) => void;
  removeItem: (handle: string) => void;
  isInWishlist: (handle: string) => boolean;
  toggleItem: (product: ShopifyProduct) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const { items } = get();
        if (!items.find((i) => i.node.handle === product.node.handle)) {
          set({ items: [...items, product] });
        }
      },
      removeItem: (handle) => {
        set({ items: get().items.filter((i) => i.node.handle !== handle) });
      },
      isInWishlist: (handle) => {
        return get().items.some((i) => i.node.handle === handle);
      },
      toggleItem: (product) => {
        const { isInWishlist, addItem, removeItem } = get();
        if (isInWishlist(product.node.handle)) {
          removeItem(product.node.handle);
        } else {
          addItem(product);
        }
      },
    }),
    {
      name: 'yarneria-wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
