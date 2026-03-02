import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import ProductCard from "@/components/ProductCard";
import { Loader2, Search, ChevronDown, MapPin, Repeat2, Globe, Lock, SlidersHorizontal, X } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const yarnCategories = [
  "All cone yarn",
  "Wool yarn",
  "Wool blend yarn",
  "Alpaca blend yarn",
  "Cashmere yarn",
  "Mohair yarn",
  "Cotton yarn",
  "Viscose yarn",
  "Linen yarn",
  "Silk blend yarn",
  "Acrylic yarn (Synthetic)",
];

const weightFilters = [
  "0 Lace weight yarn",
  "1 Fingering weight yarn",
  "2 Sport weight yarn",
  "3 DK weight yarn",
  "4 Worsted weight yarn",
];

const featureFilters = [
  "Fluffy", "Boucle", "Shiny", "Sequins", "Tape", "Scrubby",
  "Tweed", "Luxurious", "Thick & thin", "Gradient", "Elastic", "Chenille",
];

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

const FilterSidebar = ({
  localSearch, setLocalSearch, handleSearch, activeCategory, setActiveCategory, products,
}: {
  localSearch: string; setLocalSearch: (v: string) => void; handleSearch: () => void;
  activeCategory: string; setActiveCategory: (v: string) => void;
  products?: any[];
}) => {
  // Count products per tag-based filter (simple keyword match on tags/title)
  const countFor = (keyword: string) => {
    if (!products) return 0;
    const kw = keyword.toLowerCase();
    return products.filter((p) => {
      const title = p.node.title.toLowerCase();
      const tags = (p.node.tags || []).map((t: string) => t.toLowerCase());
      return title.includes(kw) || tags.some((t: string) => t.includes(kw));
    }).length;
  };

  return (
  <>
    <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2">
      <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      <input type="text" placeholder="Search products..." className="bg-transparent border-none outline-none text-sm font-sans text-foreground placeholder:text-muted-foreground/60 w-full" value={localSearch} onChange={(e) => setLocalSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
    </div>
    <div>
      <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground mb-4">Yarn Categories</h3>
      <ul className="space-y-1.5">
        {yarnCategories.map((cat) => (
          <li key={cat}><button onClick={() => setActiveCategory(cat)} className={`text-sm font-sans w-full text-left py-1 transition-colors ${activeCategory === cat ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"} ${cat !== "All cone yarn" ? "pl-4" : ""}`}>{cat}{cat !== "All cone yarn" && <span className="text-muted-foreground/60 ml-1">({countFor(cat.replace(/ yarn.*$/i, ''))})</span>}</button></li>
        ))}
      </ul>
    </div>
    <div className="border-t border-border" />
    <div>
      <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground mb-4">Filter by Weight</h3>
      <ul className="space-y-2">
        {weightFilters.map((w) => (<li key={w} className="flex items-center gap-2"><input type="checkbox" className="rounded border-border" /><span className="text-sm font-sans text-muted-foreground">{w} <span className="text-muted-foreground/60">({countFor(w.replace(/^\d\s*/, '').replace(/ weight yarn$/i, '').replace(/ yarn$/i, ''))})</span></span></li>))}
      </ul>
    </div>
    <div className="border-t border-border" />
    <div>
      <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground mb-4">Filter by Feature</h3>
      <ul className="space-y-2">
        {featureFilters.map((f) => (<li key={f} className="flex items-center gap-2"><input type="checkbox" className="rounded border-border" /><span className="text-sm font-sans text-muted-foreground">{f} <span className="text-muted-foreground/60">({countFor(f)})</span></span></li>))}
      </ul>
    </div>
    <div className="border-t border-border" />
    <div>
      <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground mb-4">Filter by Color</h3>
      <div className="flex flex-wrap gap-2">
        {colorFilters.map((c) => (<button key={c.name} title={`${c.name} (${countFor(c.name)})`} className="w-7 h-7 rounded-full border-2 border-border hover:border-foreground transition-colors hover:scale-110 relative group" style={{ background: c.hex }}>
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-sans text-muted-foreground opacity-0 group-hover:opacity-100 whitespace-nowrap">{countFor(c.name)}</span>
        </button>))}
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
  const [localSearch, setLocalSearch] = useState(searchQuery || "");
  const [sortBy, setSortBy] = useState("latest");
  const [activeCategory, setActiveCategory] = useState("All cone yarn");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [showFloatingFilter, setShowFloatingFilter] = useState(false);

  const { data: products, isLoading } = useShopifyProducts(50, searchQuery);

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
                products={products}
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
            products={products}
          />
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
            {searchQuery ? "Search results" : "All cone yarn"}
          </h1>

          {/* Description banner */}
          <div className="bg-muted/60 rounded-lg p-5 mb-6">
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">
              Experience unrivaled Italian quality for your crafting endeavors! Our cone yarn selection provides the convenience of larger quantities, minimizing interruptions while maximizing cost-efficiency. Whether you're a wholesale cone yarn buyer or an individual crafter, our fast worldwide service ensures fulfilling crafting experience.
            </p>
          </div>

          {/* Inline filter button for mobile/tablet - between description and sort */}
          <button
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-sans font-medium text-foreground mb-6"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          {/* Sort & count bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
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
              {isLoading ? "Loading..." : `Showing 1–${products?.length || 0} of ${products?.length || 0} results`}
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-serif text-xl text-muted-foreground">No products found</p>
              <p className="text-sm font-sans text-muted-foreground mt-2">
                Products will appear here once added to your Shopify store.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* FAQs */}
      <section className="mt-14 border border-border rounded-xl p-8 md:p-10">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-6">FAQs</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-sans text-sm font-bold text-foreground mb-2">
              Is it possible to place an order for a specific quantity, such as 400 grams, instead of the full quantity available for the cone yarn?
            </h3>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">
              Absolutely! You can order the exact quantity you need. Each unit corresponds to 100 grams.
            </p>
          </div>
          <div>
            <h3 className="font-sans text-sm font-bold text-foreground mb-2">
              Do you also do wholesale cone yarn business?
            </h3>
            <p className="text-sm font-sans text-muted-foreground leading-relaxed">
              Although our primary focus is serving individual retail customers, we are delighted to provide amazing offers for wholesale cone yarn business as well! Please contact us to discuss your specific wholesale needs and explore the possibilities of partnering with us.
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

export default Products;
