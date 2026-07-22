import {
  sendShopifyAnalytics,
  AnalyticsEventName,
  AnalyticsPageType,
  getClientBrowserParameters,
  type ShopifyPageViewPayload,
  type ShopifyAddToCartPayload,
} from "@shopify/hydrogen-react";
import { storefrontApiRequest } from "@/lib/shopify";
import { useMarketStore } from "@/stores/marketStore";

// Shopify storeDomain used for analytics attribution
const SHOP_DOMAIN = "ssduqq-wp.myshopify.com";

// Cached shopId (gid://shopify/Shop/xxx). Fetched once from Storefront API.
let cachedShopId: string | null = null;
let shopIdPromise: Promise<string | null> | null = null;

async function getShopId(): Promise<string | null> {
  if (cachedShopId) return cachedShopId;
  if (shopIdPromise) return shopIdPromise;
  shopIdPromise = (async () => {
    try {
      const data = await storefrontApiRequest(`query { shop { id } }`);
      const id = data?.data?.shop?.id ?? null;
      cachedShopId = id;
      return id;
    } catch {
      return null;
    }
  })();
  return shopIdPromise;
}

// Persistent visitor + session ids required by Shopify Live View
const Y_KEY = "_shopify_y";
const S_KEY = "_shopify_s";
const S_CREATED_KEY = "_shopify_s_created_at";
const S_TTL_MS = 30 * 60 * 1000;

function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${Date.now().toString(16)}-${crypto.randomUUID()}`.toUpperCase();
  }
  const rnd = () => Math.random().toString(16).slice(2).padEnd(13, "0");
  return `${Date.now().toString(16)}-${(rnd() + rnd()).slice(0, 32)}`.toUpperCase();
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/[.$?*|{}()[\]\\/+^]/g, "\\$&") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const exp = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${exp}; path=/; SameSite=Lax`;
}

function getVisitorId(): string {
  let y = readCookie(Y_KEY);
  if (!y) {
    y = uid();
    writeCookie(Y_KEY, y, 365);
  }
  return y;
}

function getSessionId(): string {
  const now = Date.now();
  const stored = readCookie(S_KEY);
  const createdAt = Number(window.localStorage.getItem(S_CREATED_KEY) || "0");
  if (stored && createdAt && now - createdAt < S_TTL_MS) {
    writeCookie(S_KEY, stored, 1);
    window.localStorage.setItem(S_CREATED_KEY, String(now));
    return stored;
  }
  const id = uid();
  writeCookie(S_KEY, id, 1);
  window.localStorage.setItem(S_CREATED_KEY, String(now));
  return id;
}

interface BasePayload {
  shopId: string;
  currency: string;
  hasUserConsent: boolean;
  shopifySalesChannel: "headless";
  storefrontId?: string;
  ccpaEnforced?: boolean;
  gdprEnforced?: boolean;
  storefrontId2?: string;
  acceptedLanguage: string;
  analyticsAllowed: boolean;
  marketingAllowed: boolean;
  saleOfDataAllowed: boolean;
}

async function basePayload(): Promise<BasePayload | null> {
  const shopId = await getShopId();
  if (!shopId) return null;
  const country = useMarketStore.getState().selectedCountry;
  return {
    shopId,
    currency: country.currency,
    hasUserConsent: true,
    shopifySalesChannel: "headless",
    acceptedLanguage: (typeof navigator !== "undefined" && navigator.language) || "en",
    analyticsAllowed: true,
    marketingAllowed: true,
    saleOfDataAllowed: true,
  };
}

export async function trackPageView(
  pageType: string = AnalyticsPageType.page,
  extras: Record<string, unknown> = {}
) {
  const base = await basePayload();
  if (!base) return;
  const browser = getClientBrowserParameters();
  const payload: ShopifyPageViewPayload = {
    ...base,
    ...browser,
    uniqueToken: getVisitorId(),
    visitToken: getSessionId(),
    canonicalUrl: window.location.href,
    pageType: pageType as ShopifyPageViewPayload["pageType"],
    ...extras,
  } as ShopifyPageViewPayload;
  try {
    sendShopifyAnalytics(
      { eventName: AnalyticsEventName.PAGE_VIEW, payload },
      SHOP_DOMAIN
    );
  } catch (e) {
    // never break the app because of analytics
    console.debug("shopify analytics page_view failed", e);
  }
}

interface ProductForAnalytics {
  node: {
    id: string;
    title: string;
    handle: string;
    productType: string;
    vendor?: string;
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    variants: { edges: Array<{ node: { id: string; title: string; price: { amount: string; currencyCode: string } } }> };
  };
}

export async function trackProductView(product: ProductForAnalytics) {
  const base = await basePayload();
  if (!base) return;
  const browser = getClientBrowserParameters();
  const firstVariant = product.node.variants.edges[0]?.node;
  const payload: ShopifyPageViewPayload = {
    ...base,
    ...browser,
    uniqueToken: getVisitorId(),
    visitToken: getSessionId(),
    canonicalUrl: window.location.href,
    pageType: AnalyticsPageType.product,
    resourceId: product.node.id,
    products: [
      {
        productGid: product.node.id,
        name: product.node.title,
        variantGid: firstVariant?.id,
        variantName: firstVariant?.title,
        brand: product.node.vendor ?? "Yarneria",
        category: product.node.productType ?? "",
        price: firstVariant?.price?.amount ?? product.node.priceRange.minVariantPrice.amount,
        quantity: 1,
      },
    ],
  } as ShopifyPageViewPayload;
  try {
    sendShopifyAnalytics(
      { eventName: AnalyticsEventName.PAGE_VIEW, payload },
      SHOP_DOMAIN
    );
  } catch (e) {
    console.debug("shopify analytics product_view failed", e);
  }
}

export async function trackCollectionView(handle: string, resourceId?: string) {
  return trackPageView(AnalyticsPageType.collection, {
    collectionHandle: handle,
    ...(resourceId ? { resourceId } : {}),
  });
}

export async function trackSearch(query: string) {
  if (!query.trim()) return;
  return trackPageView(AnalyticsPageType.search, { searchString: query });
}
