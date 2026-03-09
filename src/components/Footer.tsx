import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

const PaymentLogos = () => (
  <div className="flex items-center gap-3 flex-wrap">
    <img src="/icons/payment-methods.png" alt="Visa, Mastercard, Amex, Apple Pay, Google Pay" className="h-10 opacity-70" />
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
            <li><Link to="/privacy-policy" className="hover:opacity-100 transition-opacity">Privacy Policy</Link></li>
            <li><Link to="/delivery-returns" className="hover:opacity-100 transition-opacity">Delivery &amp; Returns Policy</Link></li>
            <li><Link to="/faq" className="hover:opacity-100 transition-opacity">Most Frequent Questions</Link></li>
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
          <NewsletterForm variant="footer" />
        </div>
      </div>
      {/* Shipping & Payment logos + Copyright */}
      <div className="border-t border-background/10 mt-12 pt-6 flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <PaymentLogos />
        <p className="text-xs font-sans opacity-40 text-center">
          © 2026 Yarneria. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
