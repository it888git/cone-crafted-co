import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Star, Heart, ChevronRight, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();

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

  const related = products.filter((p) => p.fiber === product.fiber && p.id !== product.id).slice(0, 4);

  return (
    <main>
      {/* Breadcrumb */}
      <div className="container py-4">
        <nav className="flex items-center gap-1.5 text-xs font-sans text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/products" className="hover:text-foreground transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/products?fiber=${product.fiber}`} className="hover:text-foreground transition-colors">{product.fiber}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* Product */}
      <section className="container pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-2xl object-cover aspect-square"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-[10px] font-sans tracking-wider uppercase px-3 py-1 rounded-full">
                New
              </span>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6 animate-fade-in">
            <div>
              <p className="text-xs font-sans tracking-[0.2em] uppercase text-accent font-semibold mb-2">
                {product.fiber} · {product.weight} · {product.origin}
              </p>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">{product.name}</h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-border"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-sans text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl font-semibold text-foreground">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="font-sans text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
              )}
              <span className="text-sm font-sans text-muted-foreground">/ {product.coneWeight} cone</span>
            </div>

            <p className="font-sans text-sm text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Color swatch */}
            <div>
              <p className="text-xs font-sans tracking-[0.15em] uppercase text-muted-foreground mb-2">Color</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full border-2 border-border"
                  style={{ backgroundColor: product.colorHex }}
                />
                <span className="text-sm font-sans">{product.color}</span>
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-border">
              {[
                { label: "Fiber", value: product.fiber },
                { label: "Weight", value: product.weight },
                { label: "Yardage", value: `${product.yardage} yds` },
                { label: "Cone Weight", value: product.coneWeight },
                { label: "Origin", value: product.origin },
                { label: "Care", value: product.careInstructions },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[10px] font-sans tracking-[0.15em] uppercase text-muted-foreground">{label}</p>
                  <p className="text-sm font-sans text-foreground mt-0.5">{value}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-primary text-primary-foreground hover:opacity-90 py-6 text-sm font-sans tracking-wide"
                disabled={!product.inStock}
                onClick={() => addItem(product)}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                {product.inStock ? "Add to Cart" : "Sold Out"}
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

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-muted/50 py-16">
          <div className="container">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetail;
