import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products, type FiberType, type YarnWeight } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, X } from "lucide-react";

const fibers: FiberType[] = ["Alpaca", "Mohair", "Cashmere", "Merino", "Silk", "Angora", "Linen", "Cotton", "Blend"];
const weights: YarnWeight[] = ["Lace", "Fingering", "Sport", "DK", "Worsted", "Bulky"];
const priceRanges = [
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 – $50", min: 25, max: 50 },
  { label: "$50+", min: 50, max: Infinity },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const selectedFiber = searchParams.get("fiber") as FiberType | null;
  const selectedWeight = searchParams.get("weight") as YarnWeight | null;
  const selectedPrice = searchParams.get("price");
  const sortBy = searchParams.get("sort") || "featured";

  const setFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  const clearFilters = () => setSearchParams({});

  const hasFilters = selectedFiber || selectedWeight || selectedPrice;

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedFiber) result = result.filter((p) => p.fiber === selectedFiber);
    if (selectedWeight) result = result.filter((p) => p.weight === selectedWeight);
    if (selectedPrice) {
      const range = priceRanges.find((r) => r.label === selectedPrice);
      if (range) result = result.filter((p) => p.price >= range.min && p.price < range.max);
    }
    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }
    return result;
  }, [selectedFiber, selectedWeight, selectedPrice, sortBy]);

  const FilterSection = ({ title, options, selected, filterKey }: { title: string; options: string[]; selected: string | null; filterKey: string }) => (
    <div>
      <h3 className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setFilter(filterKey, selected === opt ? null : opt)}
            className={`px-3 py-1.5 rounded-full text-xs font-sans transition-colors ${
              selected === opt
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-secondary"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <main className="container py-8 lg:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
          {selectedFiber ? `${selectedFiber} Yarns` : "All Yarns"}
        </h1>
        <p className="text-sm font-sans text-muted-foreground mt-2">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-sans hover:bg-muted transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-2 text-xs font-sans text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3 h-3" /> Clear all
            </button>
          )}
        </div>
        <select
          value={sortBy}
          onChange={(e) => setFilter("sort", e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-background text-sm font-sans focus:outline-none focus:ring-1 focus:ring-ring"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="mb-8 p-6 rounded-xl bg-muted/50 border border-border space-y-6 animate-fade-in">
          <FilterSection title="Fiber Type" options={fibers} selected={selectedFiber} filterKey="fiber" />
          <FilterSection title="Yarn Weight" options={weights} selected={selectedWeight} filterKey="weight" />
          <FilterSection title="Price Range" options={priceRanges.map((r) => r.label)} selected={selectedPrice} filterKey="price" />
        </div>
      )}

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="font-serif text-xl text-muted-foreground">No yarns match your filters</p>
          <button onClick={clearFilters} className="mt-4 text-sm font-sans text-primary hover:text-accent transition-colors">
            Clear filters
          </button>
        </div>
      )}
    </main>
  );
};

export default Products;
