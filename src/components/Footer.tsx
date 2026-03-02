import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Customer Care */}
        <div>
          <h4 className="font-sans text-xs tracking-[0.2em] uppercase mb-5 opacity-50">Customer Care</h4>
          <ul className="space-y-2.5 font-sans text-sm opacity-70">
            <li><Link to="/" className="hover:opacity-100 transition-opacity">About Us</Link></li>
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
      <div className="border-t border-background/10 mt-12 pt-6 text-center text-xs font-sans opacity-40">
        © 2026 Yarneria. All rights reserved. Premium selected Italian yarn on cones.
      </div>
    </div>
  </footer>
);

export default Footer;
