import { Link } from "react-router-dom";
import { ArrowRight, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import ProductCard from "@/components/ProductCard";
import heroImage from "@/assets/hero-yarn.png";
import { categories } from "@/data/products";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { data: products, isLoading } = useShopifyProducts(8);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-muted">
        <div className="container grid lg:grid-cols-2 gap-8 items-center py-16 lg:py-24">
          <div className="space-y-6 animate-fade-in">
            <p className="text-xs font-sans tracking-[0.3em] uppercase text-accent font-semibold">
              Premium Cone Yarns
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] text-foreground text-balance">
              The Finest Fibers, Wound on Cones
            </h1>
            <p className="text-base md:text-lg font-sans text-muted-foreground leading-relaxed max-w-lg">
              Curated collection of alpaca, cashmere, merino, silk and more — sourced from the world's
              finest mills for knitters and textile professionals.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild className="bg-primary text-primary-foreground hover:opacity-90 px-8 py-6 text-sm font-sans tracking-wide">
                <Link to="/products">Shop Collection <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <img
              src={heroImage}
              alt="Premium knitting yarn cones in natural colors"
              className="w-full rounded-2xl shadow-2xl object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-border py-6">
        <div className="container flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { icon: Truck, text: "Free Shipping $150+" },
            { icon: Shield, text: "Quality Guaranteed" },
            { icon: RotateCcw, text: "Easy Returns" },
            { icon: Star, text: "Premium Fibers" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm font-sans text-muted-foreground">
              <Icon className="w-4 h-4 text-primary" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container py-16 lg:py-24">
        <div className="text-center mb-12">
          <p className="text-xs font-sans tracking-[0.3em] uppercase text-accent font-semibold mb-2">
            Our Collection
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
            Shop by Fiber
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.name}
              to={`/products`}
              className="group relative overflow-hidden rounded-xl aspect-[3/4] animate-fade-in"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-serif text-lg font-medium text-background">{cat.name}</h3>
                <p className="text-xs font-sans text-background/70 mt-0.5">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-sans tracking-[0.3em] uppercase text-accent font-semibold mb-2">
                Our Products
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
                Featured Yarns
              </h2>
            </div>
            <Link
              to="/products"
              className="text-sm font-sans text-primary hover:text-accent transition-colors flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-serif text-xl text-muted-foreground">No products yet</p>
              <p className="text-sm font-sans text-muted-foreground mt-2">Products will appear here once added to your Shopify store.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="container py-16 lg:py-24">
        <div className="bg-primary rounded-2xl p-10 md:p-16 text-center text-primary-foreground">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-3">Join the ConeYarn Community</h2>
          <p className="font-sans text-sm opacity-80 max-w-md mx-auto mb-6">
            Get early access to new fibers, limited colorways, and 10% off your first order.
          </p>
          <div className="flex max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 rounded-l-lg px-4 py-3 text-sm font-sans text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent"
            />
            <button className="bg-accent text-accent-foreground px-6 py-3 rounded-r-lg text-sm font-sans font-semibold hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
