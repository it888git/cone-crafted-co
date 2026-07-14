import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import ProductCard from "@/components/ProductCard";
import { Loader2, Search, ChevronDown, MapPin, Repeat2, Globe, Lock, SlidersHorizontal, X } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

// Map each category to exact tag(s) that should match
const yarnCategoryTags: Record<string, string[]> = {
  "All cone yarn": [],
  "Wool yarn": ["wool"],
  "Wool blend yarn": ["wool blend"],
  "Alpaca blend yarn": ["alpaca"],
  "Cashmere yarn": ["cashmere"],
  "Mohair yarn": ["mohair"],
  "Cotton yarn": ["cotton"],
  "Viscose yarn": ["viscose"],
  "Linen yarn": ["linen"],
  "Silk blend yarn": ["silk"],
  "Acrylic yarn (Synthetic)": ["synthetic"],
};

const yarnCategories = Object.keys(yarnCategoryTags);

// Weight filters – the label IS the exact Shopify tag
const weightFilters = [
  "#0 Lace",
  "#1 Fingering",
  "#2 Sport",
  "#3 DK/Light Worsted",
  "#4 Aran/Worsted",
  "#5 Chunky/Bulky",
];

const featureFilters = ["Tweed", "Sequin", "Boucle", "Kidsilk"];

const colorFilters = [
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#1a1a1a" },
  { name: "Grey", hex: "#9ca3af" },
  { name: "Beige", hex: "#d4b896" },
  { name: "Brown", hex: "#8B4513" },
  { name: "Red", hex: "#dc2626" },
  { name: "Pink", hex: "#ec4899" },
  { name: "Orange", hex: "#f97316" },
  { name: "Yellow", hex: "#eab308" },
  { name: "Green", hex: "#22c55e" },
  { name: "Blue", hex: "#3b82f6" },
  { name: "Purple", hex: "#a855f7" },
  { name: "Multi", hex: "conic-gradient(red, yellow, green, blue, purple, red)" },
];

const sortOptions = [
  { label: "Sort by latest", value: "latest" },
  { label: "Sort by name", value: "name" },
];

// Helper: check if product has a tag containing keyword (substring)
const productMatchesTag = (p: any, keyword: string) => {
  const kw = keyword.toLowerCase();
  const tags = (p.node.tags || []).map((t: string) => t.toLowerCase());
  return tags.some((t: string) => t.includes(kw));
};

// Helper: check if product has an exact tag match (for categories)
const productHasExactTag = (p: any, exactTags: string[]) => {
  const tags = (p.node.tags || []).map((t: string) => t.toLowerCase().trim());
  return exactTags.some(et => tags.includes(et.toLowerCase()));
};

// Helper: check if product matches a keyword in tags or title (for search)
const productMatchesKeyword = (p: any, keyword: string) => {
  const kw = keyword.toLowerCase();
  const title = p.node.title.toLowerCase();
  return title.includes(kw) || productMatchesTag(p, kw);
};

const FilterSidebar = ({
  localSearch, setLocalSearch, handleSearch,
  activeCategory, setActiveCategory,
  activeWeights, toggleWeight,
  activeFeatures, toggleFeature,
  activeColors, toggleColor,
  products,
  onFilterSelect,
}: {
  localSearch: string; setLocalSearch: (v: string) => void; handleSearch: () => void;
  activeCategory: string; setActiveCategory: (v: string) => void;
  activeWeights: string[]; toggleWeight: (w: string) => void;
  activeFeatures: string[]; toggleFeature: (f: string) => void;
  activeColors: string[]; toggleColor: (c: string) => void;
  products?: any[];
  onFilterSelect?: () => void;
}) => {
  const countFor = (keyword: string) => {
    if (!products) return 0;
    return products.filter((p) => productMatchesTag(p, keyword)).length;
  };

  const countForCategory = (cat: string) => {
    if (!products) return 0;
    const tags = yarnCategoryTags[cat] || [];
    if (tags.length === 0) return 0;
    return products.filter((p) => productHasExactTag(p, tags)).length;
  };

  return (
  <>
    <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2">
      <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      <input type="text" style={{ fontSize: '16px' }} placeholder="Search products..." className="bg-transparent border-none outline-none text-sm font-sans text-foreground placeholder:text-muted-foreground/60 w-full" value={localSearch} onChange={(e) => setLocalSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
    </div>
    <div>
      <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground mb-4">Yarn Categories</h3>
      <ul className="space-y-1.5">
        {yarnCategories.map((cat) => (
          <li key={cat}><button onClick={() => { setActiveCategory(activeCategory === cat ? "All cone yarn" : cat); onFilterSelect?.(); }} className={`text-sm font-sans w-full text-left py-1 transition-colors ${activeCategory === cat ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"} ${cat !== "All cone yarn" ? "pl-4" : ""}`}>{cat}{cat !== "All cone yarn" && <span className="text-muted-foreground/60 ml-1">({countForCategory(cat)})</span>}</button></li>
        ))}
      </ul>
    </div>
    <div className="border-t border-border" />
    <div>
      <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground mb-4">Filter by Weight</h3>
      <ul className="space-y-2">
        {weightFilters.map((w) => {
          const count = products
            ? products.filter((p) => productHasExactTag(p, [w])).length
            : 0;
          return (
            <li key={w} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-border accent-[hsl(var(--primary))]"
                checked={activeWeights.includes(w)}
                onChange={() => { toggleWeight(w); onFilterSelect?.(); }}
              />
              <span className={`text-sm font-sans ${activeWeights.includes(w) ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {w} <span className="text-muted-foreground/60">({count})</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
    <div className="border-t border-border" />
    <div>
      <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground mb-4">Filter by Feature</h3>
      <ul className="space-y-2">
      {featureFilters.map((f) => {
          const count = products
            ? products.filter((p) => productHasExactTag(p, [f])).length
            : 0;
          return (
            <li key={f} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-border accent-[hsl(var(--primary))]"
                checked={activeFeatures.includes(f)}
                onChange={() => { toggleFeature(f); onFilterSelect?.(); }}
              />
              <span className={`text-sm font-sans ${activeFeatures.includes(f) ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {f} <span className="text-muted-foreground/60">({count})</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
    <div className="border-t border-border" />
    <div>
      <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground mb-4">Filter by Color</h3>
      <div className="flex flex-wrap gap-2">
        {colorFilters.map((c) => {
          const count = countFor(c.name);
          return (
            <button
              key={c.name}
              title={`${c.name} (${count})`}
              onClick={() => { toggleColor(c.name); onFilterSelect?.(); }}
              className={`w-8 h-8 rounded-full border-2 transition-colors hover:scale-110 relative flex items-center justify-center ${activeColors.includes(c.name) ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-foreground"}`}
              style={{ background: c.hex }}
            >
              <span className="text-[10px] font-sans font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  </>
);
};

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search") || undefined;
  const categoryParam = params.get("category") || undefined;
  const featureParam = params.get("feature") || undefined;
  const colorParam = params.get("color") || undefined;
  const weightParam = params.get("weight") || undefined;

  // Resolve category param to matching yarnCategory key
  const resolvedCategory = useMemo(() => {
    if (!categoryParam) return "All cone yarn";
    const kw = categoryParam.toLowerCase();
    const match = yarnCategories.find(cat => cat.toLowerCase().includes(kw));
    return match || "All cone yarn";
  }, [categoryParam]);

  // Resolve feature param to matching featureFilter
  const resolvedFeatures = useMemo(() => {
    if (!featureParam) return [];
    const kw = featureParam.toLowerCase();
    const match = featureFilters.find(f => f.toLowerCase() === kw);
    return match ? [match] : [];
  }, [featureParam]);

  const resolvedColors = useMemo(() => {
    if (!colorParam) return [];
    const kw = colorParam.toLowerCase();
    const match = colorFilters.find(c => c.name.toLowerCase() === kw);
    return match ? [match.name] : [];
  }, [colorParam]);

  const resolvedWeights = useMemo(() => {
    if (!weightParam) return [];
    const kw = weightParam.toLowerCase();
    const match = weightFilters.find(w => w.toLowerCase() === kw);
    return match ? [match] : [];
  }, [weightParam]);

  const [localSearch, setLocalSearch] = useState(searchQuery || "");
  const [sortBy, setSortBy] = useState("latest");
  const [activeCategory, setActiveCategory] = useState(resolvedCategory);
  const [activeWeights, setActiveWeights] = useState<string[]>(resolvedWeights);
  const [activeFeatures, setActiveFeatures] = useState<string[]>(resolvedFeatures);
  const [activeColors, setActiveColors] = useState<string[]>(resolvedColors);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [showFloatingFilter, setShowFloatingFilter] = useState(false);

  // Fetch all products (no server-side search query - we filter client-side for AND logic)
  const { data: products, isLoading } = useShopifyProducts(50);

  // Sync URL params to filter state on navigation
  useEffect(() => {
    setActiveCategory(resolvedCategory);
    setActiveFeatures(resolvedFeatures);
    setActiveColors(resolvedColors);
    setActiveWeights(resolvedWeights);
    setLocalSearch(searchQuery || "");
  }, [resolvedCategory, resolvedFeatures, resolvedColors, resolvedWeights, searchQuery]);

  useEffect(() => {
    const onScroll = () => setShowFloatingFilter(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = () => {
    const term = localSearch.trim();
    const p = new URLSearchParams();
    if (term) p.set("search", term);
    navigate(p.toString() ? `/products?${p.toString()}` : "/products");
  };

  const toggleWeight = (w: string) => setActiveWeights(prev => prev.includes(w) ? prev.filter(x => x !== w) : [...prev, w]);
  const toggleFeature = (f: string) => setActiveFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  const toggleColor = (c: string) => setActiveColors(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  // Client-side filtering
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let result = [...products];

    // AND search: every word must match title or tags
    if (searchQuery) {
      const words = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
      result = result.filter(p => {
        const title = p.node.title.toLowerCase();
        const tags = (p.node.tags || []).map((t: string) => t.toLowerCase());
        const allText = title + " " + tags.join(" ");
        return words.every(word => allText.includes(word));
      });
    }

    // Category filter (exact tag match)
    if (activeCategory !== "All cone yarn") {
      const catTags = yarnCategoryTags[activeCategory] || [];
      result = result.filter(p => productHasExactTag(p, catTags));
    }

    // Weight filters (OR within group, exact tag match)
    if (activeWeights.length > 0) {
      result = result.filter(p => productHasExactTag(p, activeWeights));
    }

    // Feature filters (OR within group, exact tag match)
    if (activeFeatures.length > 0) {
      result = result.filter(p => productHasExactTag(p, activeFeatures));
    }

    // Color filters (OR within group)
    if (activeColors.length > 0) {
      result = result.filter(p =>
        activeColors.some(c => productMatchesTag(p, c))
      );
    }

    // Sorting
    if (sortBy === "name") {
      result.sort((a, b) => a.node.title.localeCompare(b.node.title));
    } else {
      result.sort((a, b) => new Date(b.node.createdAt).getTime() - new Date(a.node.createdAt).getTime());
    }

    // When any filter/search is active, push sold-out items to the end
    const hasActiveFilter =
      !!searchQuery ||
      activeCategory !== "All cone yarn" ||
      activeWeights.length > 0 ||
      activeFeatures.length > 0 ||
      activeColors.length > 0;
    if (hasActiveFilter) {
      const isAvailable = (p: any) => p.node.variants.edges.some((v: any) => v.node.availableForSale);
      result.sort((a, b) => Number(isAvailable(b)) - Number(isAvailable(a)));
    }

    return result;
  }, [products, searchQuery, activeCategory, activeWeights, activeFeatures, activeColors, sortBy]);

  // Collect all active filter labels for display
  const activeFilterTags = useMemo(() => {
    const tags: { label: string; type: string; value: string }[] = [];
    if (activeCategory !== "All cone yarn") {
      tags.push({ label: activeCategory, type: "category", value: activeCategory });
    }
    activeWeights.forEach(w => tags.push({ label: w, type: "weight", value: w }));
    activeFeatures.forEach(f => tags.push({ label: f, type: "feature", value: f }));
    activeColors.forEach(c => tags.push({ label: c, type: "color", value: c }));
    return tags;
  }, [activeCategory, activeWeights, activeFeatures, activeColors]);

  const removeFilter = (tag: { type: string; value: string }) => {
    if (tag.type === "category") setActiveCategory("All cone yarn");
    else if (tag.type === "weight") toggleWeight(tag.value);
    else if (tag.type === "feature") toggleFeature(tag.value);
    else if (tag.type === "color") toggleColor(tag.value);
  };

  const clearAllFilters = () => {
    setActiveCategory("All cone yarn");
    setActiveWeights([]);
    setActiveFeatures([]);
    setActiveColors([]);
  };

  return (
    <main>
      <div className="container py-6 lg:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm font-sans text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <span className="text-foreground">All cone yarn</span>
      </nav>

      <div className="flex gap-10">
        {/* Floating mobile filter button - only on scroll */}
        {showFloatingFilter && (
          <button
            className="lg:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-foreground text-background rounded-full shadow-lg text-sm font-sans font-medium"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        )}

        {/* Mobile filter drawer */}
        {mobileFiltersOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
            <aside className="relative ml-auto w-80 max-w-[85vw] h-full bg-background border-l border-border overflow-y-auto p-6 space-y-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-sans text-lg font-bold text-foreground">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)} className="p-1.5 rounded-full hover:bg-muted">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterSidebar
                localSearch={localSearch}
                setLocalSearch={setLocalSearch}
                handleSearch={handleSearch}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                activeWeights={activeWeights}
                toggleWeight={toggleWeight}
                activeFeatures={activeFeatures}
                toggleFeature={toggleFeature}
                activeColors={activeColors}
                toggleColor={toggleColor}
                products={products}
                onFilterSelect={() => setMobileFiltersOpen(false)}
              />
            </aside>
          </div>
        )}

        {/* Sidebar */}
        <aside className="hidden lg:block w-60 flex-shrink-0 space-y-8">
          <FilterSidebar
            localSearch={localSearch}
            setLocalSearch={setLocalSearch}
            handleSearch={handleSearch}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeWeights={activeWeights}
            toggleWeight={toggleWeight}
            activeFeatures={activeFeatures}
            toggleFeature={toggleFeature}
            activeColors={activeColors}
            toggleColor={toggleColor}
            products={products}
          />
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <h1 className="font-sans text-3xl md:text-4xl font-semibold text-foreground mb-4">
            {searchQuery ? "Search results" : "All cone yarn"}
          </h1>

          {/* Description banner */}
          {!searchQuery && (
            <div className="bg-muted/60 rounded-lg p-5 mb-6">
              <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                Experience unrivaled Italian quality for your crafting endeavors! Our cone yarn selection provides the convenience of larger quantities, minimizing interruptions while maximizing cost-efficiency. Whether you're a wholesale cone yarn buyer or an individual crafter, our fast worldwide service ensures fulfilling crafting experience.
              </p>
            </div>
          )}

          {/* Mobile search + filter row - after description */}
          <div className="lg:hidden flex items-center gap-2 mb-4">
            <div className="flex-1 flex items-center gap-2 border border-border rounded-lg px-3 py-2.5">
              <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
               <input
                 type="text"
                 style={{ fontSize: '16px' }}
                 placeholder="Search products..."
                className="bg-transparent border-none outline-none text-sm font-sans text-foreground placeholder:text-muted-foreground/60 w-full"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
              {localSearch && (
                <button onClick={() => { setLocalSearch(""); navigate("/products"); }} className="p-0.5">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-sans font-medium text-foreground whitespace-nowrap"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Sort & count bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2 pb-4 border-b border-border">
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm font-sans text-foreground bg-transparent border-none outline-none cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-sm font-sans text-muted-foreground">
              {isLoading ? "Loading..." : `Showing 1–${filteredProducts.length} of ${filteredProducts.length} results`}
            </p>
          </div>

          {/* Active filter tags */}
          {(activeFilterTags.length > 0 || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 py-3 mb-4">
              {searchQuery && (
                <button
                  onClick={() => {
                    setLocalSearch("");
                    navigate("/products");
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium hover:bg-primary/20 transition-colors"
                >
                  Search: "{searchQuery}"
                  <X className="w-3 h-3" />
                </button>
              )}
              {activeFilterTags.map((tag) => (
                <button
                  key={`${tag.type}-${tag.value}`}
                  onClick={() => removeFilter(tag)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-medium hover:bg-primary/20 transition-colors"
                >
                  {tag.label}
                  <X className="w-3 h-3" />
                </button>
              ))}
              <button
                onClick={clearAllFilters}
                className="text-xs font-sans text-primary hover:text-primary/80 underline underline-offset-2 ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-serif text-xl text-muted-foreground">No products found</p>
              <p className="text-sm font-sans text-muted-foreground mt-2">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* FAQs */}
      <section className="mt-14 border border-border rounded-xl p-8 md:p-10">
        <h2 className="font-sans text-2xl md:text-3xl font-semibold text-foreground mb-6">FAQs</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-sans text-sm font-bold text-foreground mb-2">
              How do I place an order?
            </h3>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">
              Browse our newest Italian yarn collections and choose the exact quantity you need for your project. Most of our yarns are available in smaller cones ranging from 200g to 400g, allowing you to order only what you need or work with multiple plies at once for your preferred yarn thickness.
            </p>
          </div>
          <div>
            <h3 className="font-sans text-sm font-bold text-foreground mb-2">
              Do you ship worldwide?
            </h3>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">
              Yes! We ship worldwide using a variety of trusted courier and postal services. Thanks to our extensive experience shipping globally, we are able to offer competitive shipping rates to many destinations. Please see our Delivery & Returns Policy for more information.
            </p>
          </div>
        </div>
      </section>
      </div>

      {/* Trust bar - before footer */}
      <section className="border-t border-border py-8 mt-6">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {[
            { icon: MapPin, title: "Luxury Italian Yarns", desc: "The Finest Fibers from Nature" },
            { icon: Repeat2, title: "Easy Returns", desc: "Return within 30 days" },
            { icon: Globe, title: "Worldwide Delivery", desc: "Fast Express Delivery available" },
            { icon: Lock, title: "100% Secure Checkout", desc: "MasterCard / Visa / Paypal" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3 text-foreground">
              <Icon className="w-5 h-5 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-xs sm:text-sm font-sans font-semibold whitespace-nowrap">{title}</p>
                <p className="text-[10px] sm:text-xs font-sans text-muted-foreground hidden sm:block">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Products;
