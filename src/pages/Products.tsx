import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import ProductCard from "@/components/ProductCard";
import { Loader2, Search, ChevronDown } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const yarnCategories = [
  { name: "All cone yarn", count: null },
  { name: "Wool yarn", count: null },
  { name: "Wool blend yarn", count: null },
  { name: "Alpaca blend yarn", count: null },
  { name: "Cashmere yarn", count: null },
  { name: "Mohair yarn", count: null },
  { name: "Cotton yarn", count: null },
  { name: "Viscose yarn", count: null },
  { name: "Linen yarn", count: null },
  { name: "Silk blend yarn", count: null },
  { name: "Acrylic yarn (Synthetic)", count: null },
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
  "White", "Black", "Grey", "Beige", "Brown", "Red", "Pink",
  "Orange", "Yellow", "Green", "Blue", "Purple", "Multi",
];

const sortOptions = [
  { label: "Sort by latest", value: "latest" },
  { label: "Sort by name", value: "name" },
];

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search") || undefined;
  const [localSearch, setLocalSearch] = useState(searchQuery || "");
  const [sortBy, setSortBy] = useState("latest");
  const [activeCategory, setActiveCategory] = useState("All cone yarn");

  const { data: products, isLoading } = useShopifyProducts(50, searchQuery);

  const handleSearch = () => {
    const term = localSearch.trim();
    const p = new URLSearchParams();
    if (term) p.set("search", term);
    navigate(p.toString() ? `/products?${p.toString()}` : "/products");
  };

  return (
    <main className="container py-6 lg:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm font-sans text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <span className="text-foreground">All cone yarn</span>
      </nav>

      <div className="flex gap-10">
        {/* Sidebar */}
        <aside className="hidden lg:block w-60 flex-shrink-0 space-y-8">
          {/* Search */}
          <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent border-none outline-none text-sm font-sans text-foreground placeholder:text-muted-foreground/60 w-full"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              Yarn Categories
            </h3>
            <ul className="space-y-1.5">
              {yarnCategories.map((cat) => (
                <li key={cat.name}>
                  <button
                    onClick={() => setActiveCategory(cat.name)}
                    className={`text-sm font-sans w-full text-left py-1 transition-colors ${
                      activeCategory === cat.name
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    } ${cat.name !== "All cone yarn" ? "pl-4" : ""}`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border" />

          {/* Weight filter */}
          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              Filter by Weight
            </h3>
            <ul className="space-y-2">
              {weightFilters.map((w) => (
                <li key={w} className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-sm font-sans text-muted-foreground">{w}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border" />

          {/* Feature filter */}
          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              Filter by Feature
            </h3>
            <ul className="space-y-2">
              {featureFilters.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-sm font-sans text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border" />

          {/* Color filter */}
          <div>
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-foreground mb-4">
              Filter by Color
            </h3>
            <ul className="space-y-2">
              {colorFilters.map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-sm font-sans text-muted-foreground">{c}</span>
                </li>
              ))}
            </ul>
          </div>
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
    </main>
  );
};

export default Products;
