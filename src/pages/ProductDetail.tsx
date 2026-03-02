import { useParams, Link } from "react-router-dom";
import { useShopifyProduct, useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { ShoppingBag, Heart, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getPerKgPrice, formatEuro, extractWeightGrams } from "@/lib/priceUtils";
import ProductCard from "@/components/ProductCard";
import coneIcon from "@/assets/cone-icon.png";

const ProductDetail = () => {
  const { id: handle } = useParams();
  const { data: product, isLoading } = useShopifyProduct(handle || "");
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch all products for "similar yarns"
  const { data: allProducts } = useShopifyProducts(50);

  if (isLoading) {
    return (
      <div className="container py-20 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-serif text-2xl text-foreground">Product not found</h1>
        <Link to="/products" className="text-sm font-sans text-primary mt-4 inline-block">
          Back to shop
        </Link>
      </div>
    );
  }

  const { node } = product;
  const variants = node.variants.edges;
  const hasMultipleVariants = variants.length > 1;
  const selectedVariant = selectedVariantIdx !== null ? variants[selectedVariantIdx]?.node : (hasMultipleVariants ? null : variants[0]?.node);
  const images = node.images.edges;
  const image = images[0]?.node;
  const available = selectedVariant?.availableForSale ?? false;
  const variantChosen = selectedVariant !== null;
  const wishlisted = isInWishlist(node.handle);

  // Extract meterage from description
  const meterageMatch = node.description.match(/[\+\-\/]*\s*(\d+)\s*m\s*\/\s*100\s*g/i);
  const meterage = meterageMatch ? `+/- ${meterageMatch[1]}m / 100g` : null;

  // Per-kg price from first variant (always shown)
  const firstVariant = variants[0]?.node;
  const { perKg: perKgPrice } = getPerKgPrice(firstVariant?.price.amount || "0", firstVariant?.title || "");
  const perKgFormatted = `${formatEuro(perKgPrice)} / kg`;

  // Stock display for selected variant
  const stockCount = selectedVariant?.quantityAvailable ?? null;
  const stockLabel = stockCount !== null
    ? (stockCount >= 6 ? "5+" : String(stockCount))
    : null;

  // Similar yarns: match by first word of title (material keyword)
  const titleWords = node.title.toLowerCase().split(/\s+/);
  const similarProducts = (allProducts || []).filter(
    (p) => p.node.handle !== node.handle && titleWords.some((w) => w.length > 3 && p.node.title.toLowerCase().includes(w))
  ).slice(0, 4);

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
  };

  return (
    <main>
      {/* Breadcrumb */}
      <div className="container py-4">
        <nav className="flex items-center gap-1.5 text-xs font-sans text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/products" className="hover:text-foreground transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{node.title}</span>
        </nav>
      </div>

      <section className="container pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="relative">
            {image ? (
              <img
                src={image.url}
                alt={image.altText || node.title}
                className="w-full rounded-2xl object-cover aspect-square"
              />
            ) : (
              <div className="w-full rounded-2xl bg-muted aspect-square flex items-center justify-center text-muted-foreground">
                No image
              </div>
            )}
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors shadow-sm"
              aria-label="Toggle wishlist"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${wishlisted ? "fill-accent text-accent" : "text-muted-foreground"}`}
              />
            </button>
          </div>

          {/* Details */}
          <div className="space-y-5 animate-fade-in">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">{node.title}</h1>
              {meterage && (
                <p className="text-sm font-sans text-muted-foreground mt-1">{meterage}</p>
              )}
            </div>

            <div>
              <span className="font-serif text-2xl font-semibold text-foreground">
                {perKgFormatted}
              </span>
            </div>

            {/* Cone weight selector */}
            {hasMultipleVariants && (
              <div className="pt-1">
                <div className="flex flex-wrap gap-4">
                  {variants.map((v, idx) => {
                    const weight = extractWeightGrams(v.node.title);
                    const label = weight ? `${weight}g` : v.node.title;
                    const isSelected = idx === selectedVariantIdx;
                    return (
                      <button
                        key={v.node.id}
                        onClick={() => { setSelectedVariantIdx(idx); setQuantity(1); }}
                        className={`relative flex flex-col items-center gap-1 transition-all ${
                          isSelected ? "opacity-100" : "opacity-50 hover:opacity-80"
                        }`}
                        aria-label={`Select ${label}`}
                      >
                        <div className="relative w-14 h-16">
                          <img
                            src={coneIcon}
                            alt=""
                            className={`w-full h-full object-contain transition-all ${
                              isSelected ? "grayscale-0" : "grayscale"
                            }`}
                            style={{ filter: isSelected ? 'none' : 'grayscale(100%) opacity(0.6)' }}
                          />
                        </div>
                        <span className={`text-xs font-sans font-medium ${
                          isSelected ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stock + quantity + ATC (only when variant chosen) */}
            {variantChosen && (
              <div className="space-y-4 pt-1">
                {/* Stock indicator */}
                {stockLabel !== null && available && (
                  <p className="text-sm font-sans text-muted-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                    {stockLabel} in stock
                  </p>
                )}
                {!available && variantChosen && (
                  <p className="text-sm font-sans text-destructive">Sold out</p>
                )}

                {/* Quantity + Add to cart */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-border rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-sm font-sans text-muted-foreground hover:text-foreground"
                    >−</button>
                    <span className="px-3 py-2 text-sm font-sans text-foreground min-w-[32px] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-sm font-sans text-muted-foreground hover:text-foreground"
                    >+</button>
                  </div>
                  <Button
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-sm font-sans tracking-wide shadow-md border-0"
                    disabled={!available || cartLoading}
                    onClick={handleAddToCart}
                  >
                    {cartLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        {available ? "Add to Cart" : "Sold Out"}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Options table */}
            {node.options.length > 0 && node.options[0].name !== "Title" && (
              <div className="border-t border-border pt-4 mt-4 space-y-3">
                {node.options.map((opt) => (
                  <div key={opt.name} className="flex justify-between text-sm font-sans">
                    <span className="font-semibold text-foreground">{opt.name}</span>
                    <span className="text-muted-foreground">{opt.values.join(', ')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Similar Yarns */}
      {similarProducts.length > 0 && (
        <section className="container pb-16">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Similar Yarns</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {similarProducts.map((p) => (
              <ProductCard key={p.node.handle} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetail;
