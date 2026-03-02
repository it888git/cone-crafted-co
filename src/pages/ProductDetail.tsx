import { useParams, Link } from "react-router-dom";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { ShoppingBag, Heart, ChevronRight, Truck, Shield, RotateCcw, Loader2, Clock, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ProductDetail = () => {
  const { id: handle } = useParams();
  const { data: product, isLoading } = useShopifyProduct(handle || "");
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

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
  const selectedVariant = variants[selectedVariantIdx]?.node;
  const images = node.images.edges;
  const image = images[0]?.node;
  const available = selectedVariant?.availableForSale ?? false;
  const wishlisted = isInWishlist(node.handle);

  // Extract meterage from description
  const meterageMatch = node.description.match(/[\+\-\/]*\s*(\d+)\s*m\s*\/\s*100\s*g/i);
  const meterage = meterageMatch ? `+/- ${meterageMatch[1]}m / 100g` : null;

  const priceNum = parseFloat(selectedVariant?.price.amount || "0");
  const priceFormatted = `${priceNum.toFixed(2).replace('.', ',')} €`;

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
            {/* Wishlist heart on image */}
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
                {priceFormatted} / kg
              </span>
            </div>

            {/* Stock */}
            {available && (
              <p className="text-sm font-sans text-green-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                In stock
              </p>
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

            {/* Add to wishlist text button */}
            <button
              onClick={() => toggleWishlist(product)}
              className="flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
            >
              <Heart className={`w-4 h-4 ${wishlisted ? "fill-accent text-accent" : ""}`} />
              {wishlisted ? "Added to wishlist" : "Add to wishlist"}
            </button>

            <p className="font-sans text-sm font-semibold text-foreground">
              Purchase as much as you need for your project!
            </p>

            {/* Trust points */}
            <div className="space-y-2.5">
              {[
                { icon: RotateCcw, text: "30 Days easy returns" },
                { icon: Truck, text: "Quick order dispatch within 48 hours" },
                { icon: Package, text: "Each unit corresponds to 100 grams" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs font-sans text-muted-foreground">
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Variant selector */}
            {variants.length > 1 && (
              <div className="pt-2">
                <p className="text-xs font-sans tracking-[0.15em] uppercase text-muted-foreground mb-2">Variant</p>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v, idx) => (
                    <button
                      key={v.node.id}
                      onClick={() => setSelectedVariantIdx(idx)}
                      className={`px-3 py-1.5 rounded-full text-xs font-sans transition-colors ${
                        idx === selectedVariantIdx
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      {v.node.title}
                    </button>
                  ))}
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

            <p className="font-sans text-sm text-muted-foreground leading-relaxed pt-2">{node.description}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
