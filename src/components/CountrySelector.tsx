import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (country: MarketCountry) => {
    setCountry(country);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs font-sans text-primary-foreground/90 hover:text-primary-foreground transition-colors"
      >
        <span className="text-sm">{selectedCountry.flag}</span>
        <span>{selectedCountry.code}</span>
        <span className="text-primary-foreground/60">·</span>
        <span>{selectedCountry.currency}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-xl z-[100] max-h-80 overflow-y-auto">
          {regions.map((region) => {
            const countries = MARKET_COUNTRIES.filter((c) => c.deliveryRegion === region.key);
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
      )}
    </div>
  );
};

export default CountrySelector;
