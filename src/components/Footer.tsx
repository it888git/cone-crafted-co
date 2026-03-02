import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin } from "lucide-react";

const ShippingPaymentLogos = () => (
  <div className="flex items-center gap-3 flex-wrap">
    {/* DHL */}
    <div className="border border-background/20 rounded px-3 py-1.5 flex items-center justify-center h-8 min-w-[60px]">
      <svg viewBox="0 0 80 20" className="h-4 w-auto" fill="currentColor" opacity="0.7">
        <text x="0" y="15" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="-0.5">DHL</text>
      </svg>
    </div>
    {/* DPD */}
    <div className="border border-background/20 rounded px-3 py-1.5 flex items-center justify-center h-8 min-w-[60px]">
      <svg viewBox="0 0 60 20" className="h-4 w-auto" fill="currentColor" opacity="0.7">
        <text x="0" y="15" fontSize="13" fontWeight="bold" fontFamily="Arial, sans-serif">dpd</text>
      </svg>
    </div>
    {/* UPS */}
    <div className="border border-background/20 rounded px-3 py-1.5 flex items-center justify-center h-8 min-w-[60px]">
      <svg viewBox="0 0 60 22" className="h-4 w-auto" fill="currentColor" opacity="0.7">
        <rect x="2" y="1" width="56" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <text x="30" y="15" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif" textAnchor="middle">UPS</text>
      </svg>
    </div>
    {/* FedEx */}
    <div className="border border-background/20 rounded px-3 py-1.5 flex items-center justify-center h-8 min-w-[60px]">
      <svg viewBox="0 0 80 20" className="h-4 w-auto" fill="currentColor" opacity="0.7">
        <text x="0" y="15" fontSize="13" fontWeight="bold" fontFamily="Arial, sans-serif">FedEx</text>
      </svg>
    </div>
    {/* Divider */}
    <div className="w-px h-5 bg-background/20 mx-1" />
    {/* Visa */}
    <div className="border border-background/20 rounded px-3 py-1.5 flex items-center justify-center h-8 min-w-[50px]">
      <svg viewBox="0 0 60 20" className="h-4 w-auto" fill="currentColor" opacity="0.7">
        <text x="0" y="15" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif" fontStyle="italic">VISA</text>
      </svg>
    </div>
    {/* Mastercard */}
    <div className="border border-background/20 rounded px-3 py-1.5 flex items-center justify-center h-8 min-w-[50px]">
      <svg viewBox="0 0 36 22" className="h-4 w-auto" opacity="0.7">
        <circle cx="13" cy="11" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="23" cy="11" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </div>
    {/* Amex */}
    <div className="border border-background/20 rounded px-3 py-1.5 flex items-center justify-center h-8 min-w-[50px]">
      <svg viewBox="0 0 50 22" className="h-4 w-auto" fill="currentColor" opacity="0.7">
        <rect x="1" y="1" width="48" height="20" rx="2" fill="currentColor" opacity="0.15" />
        <text x="25" y="14" fontSize="8" fontWeight="bold" fontFamily="Arial, sans-serif" textAnchor="middle">AMEX</text>
      </svg>
    </div>
    {/* Apple Pay */}
    <div className="border border-background/20 rounded px-3 py-1.5 flex items-center justify-center h-8 min-w-[60px]">
      <svg viewBox="0 0 70 20" className="h-4 w-auto" fill="currentColor" opacity="0.7">
        <text x="0" y="15" fontSize="12" fontFamily="Arial, sans-serif"> Pay</text>
      </svg>
    </div>
    {/* Google Pay */}
    <div className="border border-background/20 rounded px-3 py-1.5 flex items-center justify-center h-8 min-w-[60px]">
      <svg viewBox="0 0 70 20" className="h-4 w-auto" fill="currentColor" opacity="0.7">
        <text x="0" y="15" fontSize="12" fontFamily="Arial, sans-serif">G Pay</text>
      </svg>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Customer Care */}
        <div>
          <h4 className="font-sans text-xs tracking-[0.2em] uppercase mb-5 opacity-50">Customer Care</h4>
          <ul className="space-y-2.5 font-sans text-sm opacity-70">
            <li><Link to="/about" className="hover:opacity-100 transition-opacity">About Us</Link></li>
            <li><Link to="/" className="hover:opacity-100 transition-opacity">My Account</Link></li>
            <li><Link to="/wishlist" className="hover:opacity-100 transition-opacity">My Wishlist</Link></li>
            <li><Link to="/" className="hover:opacity-100 transition-opacity">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:opacity-100 transition-opacity">Delivery &amp; Returns Policy</Link></li>
            <li><Link to="/" className="hover:opacity-100 transition-opacity">Most Frequent Questions</Link></li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div>
          <h4 className="font-sans text-xs tracking-[0.2em] uppercase mb-5 opacity-50">Stay Connected ♥</h4>
          <ul className="space-y-3 font-sans text-sm opacity-70">
            <li>
              <a href="https://instagram.com/yarneria" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:opacity-100 transition-opacity">
                <Instagram className="w-4 h-4 flex-shrink-0" />
                @yarneria
              </a>
            </li>
            <li>
              <a href="mailto:hello@yarneria.com" className="flex items-center gap-2.5 hover:opacity-100 transition-opacity">
                <Mail className="w-4 h-4 flex-shrink-0" />
                hello@yarneria.com
              </a>
            </li>
            <li>
              <span className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                Vilnius, Lithuania
              </span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-sans text-xs tracking-[0.2em] uppercase mb-5 opacity-50">Newsletter</h4>
          <p className="text-sm opacity-70 font-sans mb-3 leading-relaxed">New fibers, limited runs, and 10% off your first order.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-background/10 border border-background/20 rounded-l-md px-3 py-2 text-sm font-sans placeholder:opacity-40 focus:outline-none focus:border-accent"
            />
            <button className="bg-accent text-accent-foreground px-4 py-2 rounded-r-md text-sm font-sans font-medium hover:bg-accent/90 transition-opacity">
              Join
            </button>
          </div>
        </div>
      </div>
      {/* Shipping & Payment logos + Copyright */}
      <div className="border-t border-background/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <ShippingPaymentLogos />
        <p className="text-xs font-sans opacity-40 text-center">
          © 2026 Yarneria. All rights reserved. Premium selected Italian yarn on cones.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
