import { useParams, Link } from "react-router-dom";
import { useShopifyProduct, useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { ShoppingBag, Heart, ChevronRight, Loader2, Package, Truck, RotateCcw, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { getPerKgPrice, formatEuro, extractWeightGrams } from "@/lib/priceUtils";
import ProductCard from "@/components/ProductCard";

const isNewProduct = (createdAt: string): boolean => {
  const created = new Date(createdAt);
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  return created >= twoWeeksAgo;
};

const parseProductTags = (tags: string[]): { label: string; value: string }[] => {
  const attrs: { label: string; value: string }[] = [];
  for (const tag of tags) {
    if (tag.includes(':')) {
      const [label, ...rest] = tag.split(':');
      attrs.push({ label: label.trim(), value: rest.join(':').trim() });
    } else {
      attrs.push({ label: tag.trim(), value: '' });
    }
  }
  return attrs;
};

const ProductDetail = () => {
  const { id: handle } = useParams();
  const { data: product, isLoading } = useShopifyProduct(handle || "");
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

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
  const mainImage = images[selectedImageIdx]?.node || images[0]?.node;
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

  // Similar yarns: match by first word of title (material keyword)
  const titleWords = node.title.toLowerCase().split(/\s+/);
  const similarProducts = (allProducts || []).filter(
    (p) => p.node.handle !== node.handle && titleWords.some((w) => w.length > 3 && p.node.title.toLowerCase().includes(w))
  ).slice(0, 4);

  const canAddToCart = variantChosen && available && !cartLoading;

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

      <section className="container pb-16 px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Image gallery */}
          <div className="space-y-3">
            <div className="relative">
              {mainImage ? (
                <img
                  src={mainImage.url}
                  alt={mainImage.altText || node.title}
                  className="w-full rounded-2xl object-cover aspect-square"
                />
              ) : (
                <div className="w-full rounded-2xl bg-muted aspect-square flex items-center justify-center text-muted-foreground">
                  No image
                </div>
              )}
              {node.createdAt && isNewProduct(node.createdAt) && (
                <Badge className="absolute top-4 left-4 text-xs font-sans tracking-wider uppercase px-3 py-1 bg-accent text-accent-foreground border-0">
                  NEW
                </Badge>
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
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 justify-center">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === selectedImageIdx ? "border-foreground" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.node.url}
                      alt={img.node.altText || `${node.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
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

            {/* Product tags */}
            {node.tags && node.tags.length > 0 && (
              <div className="space-y-1.5">
                {parseProductTags(node.tags).map((attr, idx) => (
                  <p key={idx} className="text-sm font-sans text-muted-foreground">
                    {attr.value ? (
                      <><span className="font-medium text-foreground">{attr.label}:</span> {attr.value}</>
                    ) : (
                      <span className="font-medium text-foreground">{attr.label}</span>
                    )}
                  </p>
                ))}
              </div>
            )}

            {/* Cone weight & quantity dropdowns */}
            <div className="pt-1">
              <p className="text-sm font-sans text-muted-foreground mb-3">Choose cone weight and quantity</p>
              <div className="flex flex-wrap gap-3">
                <Select
                  value={selectedVariantIdx !== null ? String(selectedVariantIdx) : ""}
                  onValueChange={(val) => { setSelectedVariantIdx(Number(val)); setQuantity(1); }}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Cone weight" />
                  </SelectTrigger>
                  <SelectContent>
                    {variants.map((v, idx) => {
                      const weight = extractWeightGrams(v.node.title);
                      const label = weight ? `${weight}g` : v.node.title;
                      const price = parseFloat(v.node.price.amount).toFixed(0);
                      return (
                        <SelectItem key={v.node.id} value={String(idx)}>
                          {label} – {price}€
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>

                {variantChosen && available && (
                  <Select
                    value={String(quantity)}
                    onValueChange={(val) => setQuantity(Number(val))}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Qty" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            {/* Stock indicator */}
            {variantChosen && (
              <div>
                {!available ? (
                  <p className="text-sm font-sans text-destructive">Sold out</p>
                ) : (
                  <p className="text-sm font-sans text-muted-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                    {selectedVariant && (selectedVariant as any).quantityAvailable != null
                      ? ((selectedVariant as any).quantityAvailable >= 6 ? "5+" : String((selectedVariant as any).quantityAvailable))
                      : "Available"
                    } in stock
                  </p>
                )}
              </div>
            )}

            {/* Add to cart */}
            <div className="flex items-center gap-3">
              <Button
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-sm font-sans tracking-wide shadow-md border-0"
                disabled={!canAddToCart}
                onClick={handleAddToCart}
              >
                {cartLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>

            {/* Info section below ATC */}
            <div className="border-t border-border pt-5 space-y-2.5">
              <p className="text-sm font-sans font-semibold text-foreground">Order as much yarn as you need for your project</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2.5 text-sm font-sans text-muted-foreground">
                  <Truck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Quick order dispatch within 48h with tracking
                </li>
                <li className="flex items-start gap-2.5 text-sm font-sans text-muted-foreground">
                  <RotateCcw className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  30 Days easy returns
                </li>
                <li className="flex items-start gap-2.5 text-sm font-sans text-muted-foreground">
                  <Scale className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Combine desired weight with available cones
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Yarns */}
      {similarProducts.length > 0 && (
        <section className="container pb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">Similar Yarns</h2>
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
