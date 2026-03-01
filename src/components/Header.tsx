import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, Heart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/yarneria-logo.png";

const announcements = [
  "Free Delivery from 60€",
  "Italian Yarn Selection",
  "Easy & Simple Ordering",
];

const Header = () => {
  const totalItems = useCartStore((s) => s.totalItems());
  const setIsOpen = useCartStore((s) => s.setIsOpen);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const searchAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!searchOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (searchAreaRef.current && !searchAreaRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  const navLinks = [
    { to: "/products", label: "Yarns" },
    { to: "/products", label: "Customers" },
    { to: "/products", label: "Sale %" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Auto-rotating announcement bar */}
      <AnnouncementBar />

      <div className="container flex items-center py-4">
        {/* Left: Mobile menu toggle + Logo */}
        <div className="flex items-center gap-3 flex-1">
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/">
            <img
              src={logo}
              alt="Yarneria - Premium Selected Italian Yarn on Cones"
              className="h-12 md:h-14 lg:h-16 w-auto"
            />
          </Link>
        </div>

        {/* Center: Nav */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-sans tracking-wide text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Icons + inline search */}
        <div ref={searchAreaRef} className="flex items-center gap-3 justify-end flex-1">
          {searchOpen && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/70 border border-border/60 search-pill">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-xs font-sans text-foreground placeholder:text-muted-foreground/70 w-32 md:w-44"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const term = searchTerm.trim();
                    const params = new URLSearchParams();
                    if (term) params.set("search", term);
                    navigate(params.toString() ? `/products?${params.toString()}` : "/products");
                    setSearchOpen(false);
                  } else if (e.key === "Escape") {
                    setSearchOpen(false);
                  }
                }}
              />
            </div>
          )}
          {!searchOpen && (
            <button
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </button>
          )}
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors hidden sm:block" aria-label="Wishlist">
            <Heart className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-muted-foreground hover:text-foreground transition-colors relative"
            onClick={() => setIsOpen(true)}
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-sans font-semibold rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-border bg-background px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="block text-sm font-sans tracking-wide text-muted-foreground hover:text-foreground py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;

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
      <div className="container flex justify-center">
        <div key={index} className="announcement-slide">
          <span className="px-4">
            {"← "}
            {announcements[index]}
            {" →"}
          </span>
        </div>
      </div>
    </div>
  );
};