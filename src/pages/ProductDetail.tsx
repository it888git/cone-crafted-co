import { useParams, Link } from "react-router-dom";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { ShoppingBag, Heart, ChevronRight, Truck, Shield, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ProductDetail = () => {
  const { id: handle } = useParams();
  const { data: product, isLoading } = useShopifyProduct(handle || "");
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);

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
  const image = node.images.edges[0]?.node;
  const available = selectedVariant?.availableForSale ?? false;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
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
          </div>

          {/* Details */}
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">{node.title}</h1>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl font-semibold text-foreground">
                {selectedVariant?.price.currencyCode} {parseFloat(selectedVariant?.price.amount || "0").toFixed(2)}
              </span>
            </div>

            <p className="font-sans text-sm text-muted-foreground leading-relaxed">{node.description}</p>

            {/* Variant selector */}
            {variants.length > 1 && (
              <div>
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

            {/* Options display */}
            {node.options.length > 0 && node.options[0].name !== "Title" && (
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-border">
                {node.options.map((opt) => (
                  <div key={opt.name}>
                    <p className="text-[10px] font-sans tracking-[0.15em] uppercase text-muted-foreground">{opt.name}</p>
                    <p className="text-sm font-sans text-foreground mt-0.5">{opt.values.join(', ')}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-primary text-primary-foreground hover:opacity-90 py-6 text-sm font-sans tracking-wide"
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
              <Button variant="outline" className="py-6 px-4 border-border" aria-label="Add to wishlist">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Trust */}
            <div className="space-y-2.5 pt-2">
              {[
                { icon: Truck, text: "Free shipping on orders over $150" },
                { icon: Shield, text: "Quality guarantee on all fibers" },
                { icon: RotateCcw, text: "30-day easy returns" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs font-sans text-muted-foreground">
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
