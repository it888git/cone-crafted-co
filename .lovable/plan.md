## Scope

### 1. Country → market filtering
- Currency/prices jau keičiasi per Shopify `@inContext(country)` – patikrinsiu.
- **Slėpti produktus kurie nepristatomi**: konvencija per Shopify tag'us. Produktas su tag'u `no-ship:<region>` (pvz. `no-ship:international`, `no-ship:uk`, `no-ship:europe`, `no-ship:baltic`) nebus rodomas user'iams iš to regiono. Tai veiks visur: homepage carousel, Products archive, Sale, ProductDetail similar yarns.
- Patikrinimas atliekamas frontend'e per `useMarketStore().selectedCountry.deliveryRegion`.

### 2. Top announcement bar
- Pakeisti vertical fade → horizontal slide (translateX) left→right.
- Font dydis padidintas iki `text-sm md:text-base` (kaip homepage trust strip).
- 5 žvaigždžių + "4.8/5 based on 700+ Etsy reviews" išlieka su Etsy nuoroda.

### 3. Tag-based filters (Products archive)
Atnaujinti mapping (`src/pages/Products.tsx`):

**Categories:**
```
Wool          → tag "Wool"
Wool blend    → tag "Wool blend"
Alpaca blend  → tag "Alpaca"
Cashmere      → tag "Cashmere"
Mohair        → tag "Mohair"
Viscose       → tag "Viscose"
Linen         → tag "Linen"
Silk blend    → tag "Silk"
Acrylic       → tag "Synthetic"
```

**Weights:**
```
#0 Lace, #1 Fingering, #2 Sport, #3 DK/Light Worsted,
#4 Aran/Worsted, #5 Chunky/Bulky
```

**Features:** Tweed, Sequin, Boucle, Kidsilk

### 4. Product page image zoom
- Hover → rodyti zoom circle (magnifier lens) su 1.8× zoom (ne per stipriai).
- Implementuoju savo komponentą – cursor follow + clip-path circle overlay.

### 5. Auth modal (UI only)
- `Profile` icon header'yje atidaro `AuthModal` (Sheet/Dialog).
- Tabs: Sign In / Register.
- Email + password input'ai, Submit mygtukas → tik `toast.info("Authentication coming soon")`.
- Jokio Lovable Cloud setup, jokio realaus auth – grynas mockup, kaip prašei.

### Files
- `src/components/Header.tsx` – banner swipe, Profile icon → AuthModal
- `src/components/AuthModal.tsx` – naujas
- `src/pages/Products.tsx` – tag mapping
- `src/pages/Index.tsx` – category buttons → naujos kategorijos
- `src/lib/marketFilter.ts` – naujas helper `isProductAvailableInRegion`
- `src/hooks/useShopifyProducts.ts` arba filtravimas vietoj filter component'uose – pritaikyti `isProductAvailableInRegion`
- `src/pages/ProductDetail.tsx` – image hover zoom + similar yarns filtering

### Notes (skip)
- "Price per kg near products and variants only on product page as it is now" – pranešei "kaip yra dabar", todėl nieko nekeisiu šiame žingsnyje.
- Realios autentifikacijos (DB, session) nedarau – tik UI mockup.
