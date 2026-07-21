# Shopify analytics for headless Lovable storefront

## Goal
Make Shopify Admin → Analytics (Live View, Online store sessions, product views, etc.) count visitors and pageviews from `yarneria.lovable.app`, even though the storefront runs on Lovable/Netlify — not on Shopify.

## Why it's currently empty
Shopify's Live View / Online Store analytics only count events sent to Shopify's tracking endpoint (`monorail-edge.shopifysvc.com`). The Lovable frontend never calls it, so Shopify sees 0 sessions. The Shopify "Custom Pixel" UI can't help either — Custom Pixels only run on Shopify-hosted pages (checkout, `myshopify.com` themes), not on external domains.

The supported path for a headless storefront is exactly what Shopify Hydrogen does: send analytics beacons to Shopify's monorail endpoint from the storefront itself, using the Storefront API token you already have.

## Approach — Shopify Storefront Analytics via `sendShopifyAnalytics`

Use Shopify's official `@shopify/hydrogen-react` package (works in plain React, no Hydrogen framework needed). It exposes `sendShopifyAnalytics()` which posts `page_view` / `product_view` / `collection_view` / `search_view` events to Shopify's monorail endpoint in the exact format Shopify Analytics expects.

## Implementation

1. **Install dep**
   - `bun add @shopify/hydrogen-react`

2. **Create `src/lib/shopifyAnalytics.ts`**
   - Wrap `sendShopifyAnalytics` and `AnalyticsEventName` from `@shopify/hydrogen-react`.
   - Read `shopId`, `storefrontToken`, `currency` from the existing shopify env constants (`src/lib/shopify.ts`).
   - Generate + persist a `_shopify_y` (visitor) cookie and a `_shopify_s` (session, 30 min) cookie — Shopify Live View keys sessions off these.
   - Export helpers: `trackPageView(url, canonicalUrl)`, `trackProductView(product)`, `trackCollectionView(handle)`, `trackSearch(query)`.

3. **Wire pageview tracking globally**
   - New hook `src/hooks/useShopifyAnalytics.ts` — listens to `useLocation()` in React Router and fires `trackPageView` on every route change.
   - Mount it once inside `AppContent` in `src/App.tsx` next to `useCartSync()`.

4. **Wire per-page events**
   - `src/pages/ProductDetail.tsx` — call `trackProductView(product)` once the product loads.
   - `src/pages/Products.tsx` — call `trackCollectionView('all')` on mount and `trackSearch(query)` when the search input has a value.

5. **Respect market / currency**
   - Pull current currency from `useMarketStore` so events carry the right ISO currency (EUR / USD / GBP) — this makes Shopify's per-country breakdown work.

6. **Verify**
   - After publishing: open the live site in an incognito tab, click through a few products.
   - In Shopify Admin → Analytics → **Live View** the visitor should show up within ~30 seconds. Online Store Sessions, Top products by views, and Sessions by traffic source reports will start filling in over the next few hours (Shopify reports have a delay).

## What this does *not* do
- Doesn't send `add_to_cart` / `begin_checkout` server-side conversion events. Shopify already tracks conversion + purchases from the checkout URL you redirect to, so orders and conversion rate keep working as-is. If you later want cart/checkout funnel analytics too, we can add `ADD_TO_CART` and `BEGIN_CHECKOUT` events in the same helper.
- Doesn't touch Lovable's built-in analytics or add Google Analytics. Purely Shopify.

## Files touched
- `package.json` (new dep)
- `src/lib/shopifyAnalytics.ts` (new)
- `src/hooks/useShopifyAnalytics.ts` (new)
- `src/App.tsx` (mount hook)
- `src/pages/ProductDetail.tsx` (product_view)
- `src/pages/Products.tsx` (collection_view / search)
