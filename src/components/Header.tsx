import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, Heart, User } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/products", label: "Yarns" },
    { to: "/products", label: "Knitters" },
    { to: "/products", label: "Sale %" },
  ];

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
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-sans tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Center: Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src={logo}
              alt="Yarneria - Premium Selected Italian Yarn on Cones"
              className="h-12 md:h-14 lg:h-16 w-auto"
            />
          </Link>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-3 justify-end flex-1">
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors hidden sm:block" aria-label="Wishlist">
            <Heart className="w-6 h-6" />
          </button>
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors hidden sm:block" aria-label="Account">
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

      {/* Search bar – hides on scroll */}
      <div
        className={`border-t border-border overflow-hidden transition-all duration-300 ${
          scrolled ? "max-h-0 opacity-0" : "max-h-16 opacity-100"
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

      {/* Mobile menu */}
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
