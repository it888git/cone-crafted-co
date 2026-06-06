import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useMarketStore, MARKET_COUNTRIES, type MarketCountry } from "@/stores/marketStore";

const regions = [
  { key: 'baltic' as const, label: 'Baltic States' },
  { key: 'uk' as const, label: 'United Kingdom' },
  { key: 'europe' as const, label: 'Europe' },
  { key: 'international' as const, label: 'International' },
];

const CountrySelector = () => {
  const { selectedCountry, setCountry } = useMarketStore();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [open]);

  const handleSelect = (country: MarketCountry) => {
    setCountry(country);
    setOpen(false);
  };

  const q = query.trim().toLowerCase();
  const matches = (c: MarketCountry) =>
    !q ||
    c.name.toLowerCase().includes(q) ||
    c.code.toLowerCase().includes(q) ||
    c.currency.toLowerCase().includes(q);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-md hover:bg-muted transition-colors"
        aria-label="Select country"
      >
        <span className="text-[15px] leading-none">{selectedCountry.flag}</span>
        <span className="text-base font-sans font-medium text-foreground tracking-wide">{selectedCountry.currency}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-xl z-[100] max-h-96 overflow-hidden flex flex-col">
          <div className="p-2 border-b border-border sticky top-0 bg-background">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-muted/60 border border-border/60">
              <Search className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search country..."
                className="bg-transparent border-none outline-none text-sm font-sans text-foreground placeholder:text-muted-foreground/60 w-full"
              />
            </div>
          </div>
          <div className="overflow-y-auto">
            {regions.map((region) => {
              const countries = MARKET_COUNTRIES.filter((c) => c.deliveryRegion === region.key && matches(c));
              if (countries.length === 0) return null;
              return (
                <div key={region.key}>
                  <p className="px-3 pt-3 pb-1 text-[10px] font-sans tracking-widest uppercase text-muted-foreground/60 font-semibold">
                    {region.label}
                  </p>
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => handleSelect(country)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm font-sans transition-colors ${
                        selectedCountry.code === country.code
                          ? "bg-muted text-foreground font-medium"
                          : "text-foreground/80 hover:bg-muted/50"
                      }`}
                    >
                      <span className="text-base">{country.flag}</span>
                      <span className="flex-1 text-left">{country.name}</span>
                      <span className="text-xs text-muted-foreground">{country.currency}</span>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
