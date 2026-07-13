## Problem

- `src/pages/Index.tsx` hero and category images are `import`-ed from `src/assets/*` → Vite bundles them into `/assets/*.jpg|png|webp` on the deployed site. These work without any subscription.
- `src/components/EtsyReviews.tsx` and `src/components/CustomerCreations.tsx` use `https://i.ibb.co/<code>/<filename>` URLs that were constructed from your `https://ibb.co/<code>` share links. Those short codes are the ibb.co **page** IDs, not the direct-image IDs, so the URLs 404 in production.

Two clean fixes are possible. Pick one:

### Option A — Resolve the real direct URLs from ibb.co (keep external hosting, zero repo weight)
For every `https://ibb.co/<code>` share link you gave me, fetch the page, read the `<meta property="og:image">` (or the `#image-viewer-container img[src]`), and swap in that real `https://i.ibb.co/.../<hash>/<name>.<ext>` URL in:
- `src/components/EtsyReviews.tsx` (12 review images)
- `src/components/CustomerCreations.tsx` (8 About-Us / creations images)

Pros: no files added to the repo, no build size increase.
Cons: still depends on a third party (ibb.co) staying up and not changing URLs.

### Option B — Bundle the images into the app (fully self-hosted, no external deps)
Download each image once, place them under `src/assets/reviews/` and `src/assets/creations/`, `import` them in the two components. They ship inside the deployed static bundle just like the hero image.

Pros: images load as long as the site is deployed, no third-party dependency, works offline of ibb.co.
Cons: ~1–3 MB added to the repo (depending on original sizes).

### Files that will change either way
- `src/components/EtsyReviews.tsx` — replace the 12 `r1…r10 / rKim / rDulce` URL constants.
- `src/components/CustomerCreations.tsx` — replace the 8 entries in the `images` array.

No other files touched. No layout, no logic changes.

### Verification
After the swap I'll load `/`, `/about-us` (and wherever `EtsyReviews` renders) with Playwright against `localhost:8080`, listen for any `4xx/5xx` responses on `.jpg/.png/.webp/.avif`, and screenshot both sections to confirm the images visibly render before you republish.

**Which option do you want — A (fix ibb.co URLs, keep external) or B (bundle into the app, self-hosted)?**
