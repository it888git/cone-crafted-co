import { Link } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, Heart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useState } from "react";
import logo from "@/assets/yarneria-logo.png";

const announcements = [
  "Free Delivery from 60€",
  "Easy & Simple Ordering",
  "Italian Yarn Selection",
];

const Header = () => {
  const totalItems = useCartStore((s) => s.totalItems());
  const setIsOpen = useCartStore((s) => s.setIsOpen);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/products", label: "Yarns" },
    { to: "/products", label: "Customers" },
    { to: "/products", label: "Sale %" },
  ];

  // Double the announcements for seamless loop
  const marqueeText = announcements.map(a => `‹ ${a} ›`).join("     ");

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Auto-sliding announcement bar - horizontal marquee */}
      <div className="bg-primary text-primary-foreground py-2 text-xs font-sans tracking-widest uppercase overflow-hidden whitespace-nowrap">
        <div className="inline-flex animate-marquee">
          <span className="px-8">{marqueeText}</span>
          <span className="px-8">{marqueeText}</span>
        </div>
      </div>

      <div className="container flex items-center justify-between py-4">
        {/* Left: Mobile menu toggle + Logo */}
        <div className="flex items-center gap-3">
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
              className="h-10 md:h-12 w-auto"
            />
          </Link>
        </div>

        {/* Center: Nav */}
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

        {/* Right: Icons */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
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