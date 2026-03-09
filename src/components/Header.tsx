import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, Heart, User, ChevronDown } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/yarneria-logo.png";
import CountrySelector from "@/components/CountrySelector";

const announcements = [
  "Free Delivery from 60€",
  "Italian Yarn Selection",
  "Easy & Simple Ordering",
];

const yarnsMegaMenu = {
  composition1: {
    title: "Shop by composition",
    items: ["Wool", "Wool Blend", "Alpaca Blend", "Cashmere", "Mohair"],
  },
  composition2: {
    title: "",
    items: ["Cotton", "Viscose", "Linen", "Silk", "Other Composition"],
  },
  feature1: {
    title: "Shop by feature",
    items: ["Fluffy", "Boucle", "Shiny", "Sequins"],
  },
  feature2: {
    title: "",
    items: ["Tape", "Scrubby", "Tweed", "Luxurious"],
  },
  feature3: {
    title: "",
    items: ["Thick & thin", "Gradient", "Elastic", "Chenille"],
  },
};

const knittersMegaMenu = {
  col1: { title: "", items: ["About Us", "Favourite Yarn"] },
  col2: { title: "", items: ["Delivery & Returns Policy", "Most Frequent Questions"] },
};

// No mega menu for Sale %

type NavItem = {
  label: string;
  to: string;
  mega?: Record<string, { title: string; items: string[] }>;
};

const navLinks: NavItem[] = [
  { to: "/products", label: "Yarns", mega: yarnsMegaMenu },
  { to: "/products", label: "Knitters", mega: knittersMegaMenu },
  { to: "/sale", label: "Sale %" },
];

const Header = () => {
  const totalItems = useCartStore((s) => s.totalItems());
  const setIsOpen = useCartStore((s) => s.setIsOpen);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isProductsPage = location.pathname === "/products";
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileMenuRef = useRef<HTMLElement | null>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // If click is on the toggle button, let the toggle handler deal with it
      if (target.closest('[aria-label="Toggle menu"]')) return;
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMenuEnter = (label: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMenu(label);
  };

  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Announcement bar */}
      <AnnouncementBar />

      {/* Main nav row */}
      <div className="container flex items-center py-4">
        {/* Left: Mobile menu toggle + Nav links */}
        <div className="flex items-center gap-6 flex-1">
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => handleMenuEnter(link.label)}
                onMouseLeave={handleMenuLeave}
              >
                <Link
                  to={link.to}
                  className={`text-base font-sans font-medium tracking-wide transition-colors py-2 border-b-2 ${
                    activeMenu === link.label
                      ? "text-foreground border-foreground"
                      : "text-muted-foreground hover:text-foreground border-transparent"
                  }`}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>
        </div>

        {/* Center: Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src={logo}
              alt="Yarneria - Premium Selected Italian Yarn on Cones"
              className="h-12 md:h-14 lg:h-16 w-auto mix-blend-multiply"
            />
          </Link>
        </div>

        {/* Right: Icons + Country */}
        <div className="flex items-center gap-1 sm:gap-3 justify-end flex-1">
          <CountrySelector />
          <Link to="/wishlist" className="p-2 text-muted-foreground hover:text-foreground transition-colors relative" aria-label="Wishlist">
            <Heart className="w-6 h-6" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-sans font-semibold rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
                {wishlistCount}
              </span>
            )}
          </Link>
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors hidden sm:inline-flex" aria-label="Account">
            <User className="w-6 h-6" />
          </button>
          <button
            className="p-2 text-muted-foreground hover:text-foreground transition-colors relative"
            onClick={() => setIsOpen(true)}
            aria-label="Cart"
          >
            <ShoppingBag className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-sans font-semibold rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search bar – hides on scroll, on products page, or when mega menu is open */}
      {!isProductsPage && (
        <div
          className={`border-t border-border transition-all duration-300 ${
            scrolled ? "max-h-0 opacity-0 overflow-hidden" : activeMenu ? "opacity-0 pointer-events-none max-h-16" : "max-h-16 opacity-100"
          }`}
        >
        <div className="container flex items-center justify-center py-2.5">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/60 border border-border/60 w-full max-w-md">
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="What are you looking for today..."
              className="bg-transparent border-none outline-none text-sm font-sans text-foreground placeholder:text-muted-foreground/60 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const term = searchTerm.trim();
                  const params = new URLSearchParams();
                  if (term) params.set("search", term);
                  navigate(params.toString() ? `/products?${params.toString()}` : "/products");
                } else if (e.key === "Escape") {
                  searchInputRef.current?.blur();
                }
              }}
            />
          </div>
        </div>
      </div>
      )}

      {/* Mega menu dropdown */}
      {navLinks.map((link) =>
        link.mega && activeMenu === link.label ? (
          <div
            key={link.label}
            className="absolute left-0 right-0 bg-background border-b border-border shadow-lg z-50"
            onMouseEnter={() => handleMenuEnter(link.label)}
            onMouseLeave={handleMenuLeave}
          >
            <div className="container py-8">
              {link.label === "Knitters" && (
                <p className="text-xs font-sans tracking-widest uppercase text-muted-foreground/60 font-semibold mb-5">Customer Care</p>
              )}
            <div className="flex gap-12">
                {Object.values(link.mega).map((col, idx) => (
                  <div key={col.title || `col-${idx}`}>
                    {col.title ? (
                      <p className="text-xs font-sans tracking-widest uppercase text-muted-foreground/60 font-semibold mb-4">
                        {col.title}
                      </p>
                    ) : (
                      link.label !== "Knitters" && <p className="mb-4 h-[16px]">&nbsp;</p>
                    )}
                    <ul className="space-y-2.5">
                      {col.items.map((item) => {
                        const knitterRoutes: Record<string, string> = {
                          "About Us": "/about",
                          "Favourite Yarn": "/wishlist",
                          "Delivery & Returns Policy": "/delivery-returns",
                          "Most Frequent Questions": "/faq",
                        };
                        // Build filter URL for composition/feature items
                        let to = knitterRoutes[item] || "/products";
                        if (!knitterRoutes[item] && link.label === "Yarns") {
                          const isFeature = ["Fluffy", "Boucle", "Shiny", "Sequins", "Tape", "Scrubby", "Tweed", "Luxurious", "Thick & thin", "Gradient", "Elastic", "Chenille"].includes(item);
                          if (isFeature) {
                            to = `/products?feature=${encodeURIComponent(item.toLowerCase())}`;
                          } else if (item !== "Other Composition") {
                            to = `/products?category=${encodeURIComponent(item.toLowerCase())}`;
                          }
                        }
                        return (
                          <li key={item}>
                            <Link
                              to={to}
                              className="text-sm font-sans text-foreground hover:text-primary transition-colors"
                              onClick={() => setActiveMenu(null)}
                            >
                              {item}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav ref={mobileMenuRef} className="lg:hidden border-t border-border bg-background px-6 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
          {navLinks.map((link) => (
            <MobileNavItem key={link.label} link={link} onClose={() => setMobileMenuOpen(false)} />
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;

const MobileNavItem = ({ link, onClose }: { link: NavItem; onClose: () => void }) => {
  const [open, setOpen] = useState(false);
  const knitterRoutes: Record<string, string> = {
    "About Us": "/about",
    "Favourite Yarn": "/wishlist",
    "Delivery & Returns Policy": "/delivery-returns",
    "Most Frequent Questions": "/faq",
  };

  if (!link.mega) {
    return (
      <Link
        to={link.to}
        className="block text-sm font-sans tracking-wide text-muted-foreground hover:text-foreground py-2.5 border-b border-border/50"
        onClick={onClose}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-border/50">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-sm font-sans tracking-wide text-muted-foreground hover:text-foreground py-2.5"
      >
        {link.label}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-3 pl-3 space-y-1">
          {Object.values(link.mega!).map((col, idx) => (
            <div key={idx}>
              {col.title && (
                <p className="text-[10px] font-sans tracking-widest uppercase text-muted-foreground/60 font-semibold mt-2 mb-1">{col.title}</p>
              )}
              {col.items.map((item) => {
                const to = knitterRoutes[item] || (() => {
                  const isFeature = ["Fluffy", "Boucle", "Shiny", "Sequins", "Tape", "Scrubby", "Tweed", "Luxurious", "Thick & thin", "Gradient", "Elastic", "Chenille"].includes(item);
                  if (link.label === "Yarns" && isFeature) return `/products?feature=${encodeURIComponent(item.toLowerCase())}`;
                  if (link.label === "Yarns" && item !== "Other Composition") return `/products?category=${encodeURIComponent(item.toLowerCase())}`;
                  return "/products";
                })();
                return (
                  <Link
                    key={item}
                    to={to}
                    className="block text-sm font-sans text-foreground/80 hover:text-foreground py-1.5"
                    onClick={onClose}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AnnouncementBar = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % announcements.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary text-primary-foreground py-2 text-xs font-sans tracking-widest uppercase overflow-hidden">
      <div className="container flex items-center justify-between">
        <div className="hidden sm:block">
          <CountrySelector />
        </div>
        <div className="flex-1 flex justify-center">
          <div key={index} className="announcement-slide">
            <span className="px-4">
              {announcements[index]}
            </span>
          </div>
        </div>
        <div className="hidden sm:block w-[100px]" /> {/* Spacer for centering */}
      </div>
      {/* Mobile country selector */}
      <div className="sm:hidden flex justify-center pt-1">
        <CountrySelector />
      </div>
    </div>
  );
};
