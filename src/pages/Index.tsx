import { Link } from "react-router-dom";
import { ArrowRight, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import ProductCard from "@/components/ProductCard";
import heroImage from "@/assets/hero-yarneria.png";
import { Loader2 } from "lucide-react";

const categoryRows = {
  row2: [
    { name: "Kid Silk Mohair", image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&h=400&fit=crop" },
    { name: "Italian Cashmere", image: "https://images.unsplash.com/photo-1601731603247-7c9e1e155467?w=600&h=400&fit=crop" },
  ],
  row3: [
    { name: "Angora", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=400&fit=crop" },
    { name: "Merino Wool", image: "https://images.unsplash.com/photo-1560481234-1b8aa0f92a32?w=400&h=400&fit=crop" },
    { name: "Silk", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop" },
    { name: "Linen", image: "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=400&h=400&fit=crop" },
  ],
};

const Index = () => {
  const { data: products, isLoading } = useShopifyProducts(8);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-muted">
        <div className="container grid lg:grid-cols-2 gap-8 items-center py-16 lg:py-24">
          <div className="space-y-6 animate-fade-in">
            <p className="text-xs font-sans tracking-[0.3em] uppercase text-primary font-semibold">
              Unleash Your Creativity
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] text-foreground text-balance">
              With Our Hand and Machine Knitting Yarn
            </h1>
            <p className="text-base md:text-lg font-sans text-muted-foreground leading-relaxed max-w-lg">
              Carefully chosen for endless creative possibilities. Premium selected Italian yarn on cones.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild className="bg-primary text-primary-foreground hover:opacity-90 px-8 py-6 text-sm font-sans tracking-wide">
                <Link to="/products">Shop now <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <img
              src={heroImage}
              alt="Hand holding a red knitted heart with yarn"
              className="w-full rounded-2xl shadow-2xl object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* Categories - Shop Our Selection */}
      <section className="container py-16 lg:py-24">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
            Shop Our Selection
          </h2>
        </div>

        {/* Full-width All Yarns */}
        <Link
          to="/products"
          className="group relative block overflow-hidden rounded-xl aspect-[3/1] mb-6 animate-fade-in"
        >
          <img
            src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=1200&h=400&fit=crop"
            alt="All Yarns"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8 md:px-12">
            <Button className="bg-primary text-primary-foreground hover:opacity-90 text-sm font-sans tracking-wide px-8 py-6">
              All Yarns <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </Link>

        {/* Row 2: Two categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {categoryRows.row2.map((cat, i) => (
            <Link
              key={cat.name}
              to="/products"
              className="group relative overflow-hidden rounded-xl aspect-[3/2] animate-fade-in"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="font-serif text-xl font-medium text-background">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Row 3: Four categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoryRows.row3.map((cat, i) => (
            <Link
              key={cat.name}
              to="/products"
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
              <p className="text-xs font-sans tracking-[0.3em] uppercase text-primary font-semibold mb-2">
                Our Products
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
                Featured Yarns
              </h2>
            </div>
            <Link
              to="/products"
              className="text-sm font-sans text-primary hover:opacity-80 transition-colors flex items-center gap-1"
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

      {/* Newsletter CTA - Join Our Community */}
      <section className="container py-16 lg:py-24">
        <div className="bg-primary rounded-2xl p-10 md:p-16 text-center text-primary-foreground">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-3">Join Our Community</h2>
          <p className="font-sans text-sm opacity-80 max-w-md mx-auto mb-6">
            Get early access to new fibers, limited colorways, and 10% off your first order.
          </p>
          <div className="flex max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 rounded-l-lg px-4 py-3 text-sm font-sans text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground/50"
            />
            <button className="bg-foreground text-background px-6 py-3 rounded-r-lg text-sm font-sans font-semibold hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Feature Icons Section */}
      <section className="border-t border-border py-10">
        <div className="container flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { icon: Truck, text: "Free Shipping" },
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
    </main>
  );
};

export default Index;
