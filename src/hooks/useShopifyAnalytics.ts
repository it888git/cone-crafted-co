import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AnalyticsPageType } from "@shopify/hydrogen-react";
import { trackPageView } from "@/lib/shopifyAnalytics";

/**
 * Fires a Shopify analytics page_view on every route change so that
 * Shopify Admin → Analytics → Live View + Online Store reports count
 * visitors coming through the headless Lovable frontend.
 *
 * Per-page events with richer payloads (product_view, collection_view,
 * search) are dispatched from their respective page components and will
 * override this generic page_view for that navigation.
 */
export function useShopifyAnalytics() {
  const location = useLocation();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    const key = location.pathname + location.search;
    if (lastPathRef.current === key) return;
    lastPathRef.current = key;

    // Skip pages that fire their own richer event to avoid double counting.
    // Product / collection / search pages track themselves via trackProductView /
    // trackCollectionView / trackSearch. Fire a generic page_view for the rest.
    const path = location.pathname;
    const isSelfTracked =
      path.startsWith("/product/") ||
      path === "/products" ||
      path === "/sale";
    if (isSelfTracked) return;

    trackPageView(AnalyticsPageType.page);
  }, [location.pathname, location.search]);
}
