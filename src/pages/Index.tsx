import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Star, Truck, Shield, RotateCcw, Globe, Lock, ChevronLeft, ChevronRight, MapPin, Repeat2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import ProductCard from "@/components/ProductCard";
import heroImage from "@/assets/hero-yarneria-cutout.png";
import { Loader2 } from "lucide-react";
import review1 from "@/assets/review-1.png";
import review2 from "@/assets/review-2.png";
import review3 from "@/assets/review-3.png";

const categoryRows = {
  row2: [
    { name: "Shop by Composition", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop&q=80" },
    { name: "Shop by Feature", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop&q=80" },
  ],
  row3: [
    { name: "Cashmere", image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=400&h=400&fit=crop&q=80" },
    { name: "Merino", image: "https://images.unsplash.com/photo-1560481234-1b8aa0f92a32?w=400&h=400&fit=crop&q=80" },
    { name: "Mohair", image: "https://images.unsplash.com/photo-1601731603247-7c9e1e155467?w=400&h=400&fit=crop&q=80" },
    { name: "Silk", image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=400&h=400&fit=crop&q=80" },
  ],
};

const Index = () => {
  const { data: products, isLoading } = useShopifyProducts(10);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.querySelector('div')?.offsetWidth || 300;
    carouselRef.current.scrollBy({ left: direction === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
      return () => el.removeEventListener('scroll', updateScrollButtons);
    }
  }, [products]);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-muted">
        <div className="container grid lg:grid-cols-2 gap-6 items-center py-6 lg:py-10">
          <div className="space-y-5 animate-fade-in">
            <p className="text-xs font-sans tracking-[0.3em] uppercase text-accent font-semibold">
              Unleash Your Creativity
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] text-foreground text-balance">
              With Our Hand and Machine Knitting Yarn
            </h1>
            <p className="text-base md:text-lg font-sans text-muted-foreground leading-relaxed max-w-lg">
              Carefully chosen for endless creative possibilities. Premium selected Italian yarn on cones.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-sm font-sans tracking-wide">
                <Link to="/products">Shop now <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
          <div className="relative hero-image-appear">
            <img
              src={heroImage}
              alt="Hand holding a red knitted heart with yarn"
              className="w-full max-w-xl mx-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Social proof / Reviews */}
      <section className="container pt-8 pb-3 lg:pt-10 lg:pb-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center -space-x-3 mb-5">
            {[
              { src: review1, alt: "Customer review photo 1" },
              { src: review2, alt: "Customer review photo 2" },
              { src: review3, alt: "Customer review photo 3" },
            ].map((img) => (
              <img
                key={img.alt}
                src={img.src}
                alt={img.alt}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover ring-2 ring-background shadow-sm"
                loading="lazy"
              />
            ))}
          </div>

          <p className="font-serif text-lg md:text-2xl leading-snug text-foreground">
            "This was delivered faster than expected! The yarn is beautiful. This is a very good seller. I've ordered before."
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-sans">
            <div className="flex items-center gap-0.5 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4" fill="currentColor" />
              ))}
            </div>
            <span className="font-semibold text-foreground">4.8/5</span>
            <span className="text-muted-foreground">based on 700+ Etsy reviews</span>
          </div>
        </div>
      </section>

      {/* Categories - Shop Our Selection */}
      <section className="container py-10 lg:py-14">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
            Shop Our Selection
          </h2>
        </div>

        {/* Full-width All Yarns - Burga style */}
        <Link
          to="/products"
          className="group relative block overflow-hidden rounded-xl aspect-[3/1] mb-4 animate-fade-in"
        >
          <img
            src="https://images.unsplash.com/photo-1590412200988-a436970781fa?w=1200&h=400&fit=crop&q=80"
            alt="All Yarns - Yarn cones on shelves"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/50 transition-colors duration-300" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 md:pb-8">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-background mb-3 drop-shadow-lg tracking-wide uppercase">
              All Yarns
            </h3>
            <span className="border border-background text-background text-xs font-sans tracking-widest uppercase px-6 py-2.5 hover:bg-background hover:text-foreground transition-colors">
              Shop Now
            </span>
          </div>
        </Link>

        {/* Row 2: Two categories - Burga style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
              <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/50 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-5 md:pb-7">
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-background mb-3 drop-shadow-lg tracking-wide uppercase">
                  {cat.name}
                </h3>
                <span className="border border-background text-background text-xs font-sans tracking-widest uppercase px-5 py-2 hover:bg-background hover:text-foreground transition-colors">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Row 3: Four categories - square, Burga style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoryRows.row3.map((cat, i) => (
            <Link
              key={cat.name}
              to="/products"
              className="group relative overflow-hidden rounded-xl aspect-square animate-fade-in"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/50 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 md:pb-6">
                <h3 className="font-serif text-lg md:text-xl font-semibold text-background mb-2 drop-shadow-lg tracking-wide uppercase">
                  {cat.name}
                </h3>
                <span className="border border-background text-background text-[10px] font-sans tracking-widest uppercase px-4 py-1.5 hover:bg-background hover:text-foreground transition-colors">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newest Collection Carousel */}
      <section className="bg-muted/50 py-10 lg:py-14">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-sans tracking-[0.3em] uppercase text-accent font-semibold mb-2">
                Just Arrived
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
                Newest Collection
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCarousel('left')}
                disabled={!canScrollLeft}
                className="p-2 rounded-full border border-border bg-background text-foreground hover:bg-muted transition-colors disabled:opacity-30"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                disabled={!canScrollRight}
                className="p-2 rounded-full border border-border bg-background text-foreground hover:bg-muted transition-colors disabled:opacity-30"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <Link
                to="/products"
                className="ml-2 text-sm font-sans text-primary hover:opacity-80 transition-colors flex items-center gap-1"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : products && products.length > 0 ? (
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {products.slice(0, 10).map((product) => (
                <div key={product.node.id} className="min-w-[220px] md:min-w-[260px] snap-start flex-shrink-0" style={{ width: 'calc((100% - 96px) / 5)' }}>
                  <ProductCard product={product} />
                </div>
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
      <section className="container py-10 lg:py-14">
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
            <button className="bg-accent text-accent-foreground px-6 py-3 rounded-r-lg text-sm font-sans font-semibold hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Trust Features Section */}
      <section className="border-t border-border py-8">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { icon: MapPin, title: "Luxury Italian Yarns", desc: "The Finest Fibers from Nature" },
            { icon: Repeat2, title: "Easy Returns", desc: "Return within 30 days" },
            { icon: Globe, title: "Worldwide Delivery", desc: "Fast Express Delivery available" },
            { icon: Lock, title: "100% Secure Checkout", desc: "MasterCard / Visa / Paypal" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3 text-foreground">
              <Icon className="w-5 h-5 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-sans font-semibold">{title}</p>
                <p className="text-xs font-sans text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Index;
