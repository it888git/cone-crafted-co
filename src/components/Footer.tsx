import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <span className="font-serif text-2xl font-bold uppercase">Yarneria</span>
          <p className="text-sm mt-3 opacity-70 font-sans leading-relaxed">
            Premium selected Italian yarn on cones for knitters, designers, and textile professionals worldwide.
          </p>
        </div>
        <div>
          <h4 className="font-sans text-xs tracking-[0.2em] uppercase mb-4 opacity-50">Shop</h4>
          <ul className="space-y-2.5 font-sans text-sm opacity-70">
            <li><Link to="/products" className="hover:opacity-100 transition-opacity">All Yarns</Link></li>
            <li><Link to="/products?fiber=Cashmere" className="hover:opacity-100 transition-opacity">Cashmere</Link></li>
            <li><Link to="/products?fiber=Merino" className="hover:opacity-100 transition-opacity">Merino</Link></li>
            <li><Link to="/products?fiber=Silk" className="hover:opacity-100 transition-opacity">Silk</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-sans text-xs tracking-[0.2em] uppercase mb-4 opacity-50">Help</h4>
          <ul className="space-y-2.5 font-sans text-sm opacity-70">
            <li><span className="hover:opacity-100 transition-opacity cursor-pointer">Shipping & Returns</span></li>
            <li><span className="hover:opacity-100 transition-opacity cursor-pointer">Yarn Care Guide</span></li>
            <li><span className="hover:opacity-100 transition-opacity cursor-pointer">Cone Weight Guide</span></li>
            <li><span className="hover:opacity-100 transition-opacity cursor-pointer">Contact Us</span></li>
          </ul>
        </div>
        <div>
          <h4 className="font-sans text-xs tracking-[0.2em] uppercase mb-4 opacity-50">Newsletter</h4>
          <p className="text-sm opacity-70 font-sans mb-3">New fibers, limited runs, and 10% off your first order.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-background/10 border border-background/20 rounded-l-md px-3 py-2 text-sm font-sans placeholder:opacity-40 focus:outline-none focus:border-accent"
            />
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md text-sm font-sans font-medium hover:bg-primary/90 transition-opacity">
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
