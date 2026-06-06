import { Link } from "react-router-dom";
import { ChevronRight, Mail, MapPin, Instagram } from "lucide-react";
import CustomerCreations from "@/components/CustomerCreations";

const AboutUs = () => (
  <main>
    <div className="container py-4">
      <nav className="flex items-center gap-1.5 text-xs font-sans text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">About Us</span>
      </nav>
    </div>

    <section className="container">
      <div className="max-w-2xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground">About Us</h1>
        </div>

        <div className="space-y-5 text-lg font-sans text-muted-foreground leading-relaxed">
          <p>
            We are locally providing the broadest selection of yarn for all the passionate knitters, weavers and crocheters in Lithuania and Latvia. Our family works in this industry for over 25 years. The end of 2019, we began our journey on Etsy and now we are expanding worldwide!
          </p>
          <p>
            We still aim at a customer-centric approach. With our goal in mind: to create a shop that satisfies every customer's wishes and quality standards keeping the best possible prices in the market. For that, we offer a broad selection of colours, compositions, weights and quantities of Italian yarn that can be ordered on a cone.
          </p>
          <p>
            We are always truly happy to receive your beautiful pictures of completed projects! Therefore, if you want to share them please do not hesitate to reach out to us. Hope that our shop will broaden knitters, weavers and crocheters circle around the globe and this hobby (or a profession) will further spread happiness and keep others warm!
          </p>
          <p className="font-serif text-lg text-foreground italic">
            Best wishes,<br />Yarneria
          </p>
        </div>
      </div>
    </section>

    <section className="container py-10">
      <div className="max-w-2xl mx-auto">
        <CustomerCreations />
      </div>
    </section>


    <section className="container">
      <div className="max-w-2xl mx-auto">
        <div className="border-t border-border pt-8">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Find Us</h2>
          <p className="text-sm font-sans text-muted-foreground leading-relaxed">
            You can also find us on{" "}
            <a
              href="https://www.etsy.com/shop/Yarneria"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-foreground font-medium hover:text-primary transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true"><path d="M9.16 4.4v6.93s2.45 0 3.78-.1c1.05-.18 1.24-.27 1.43-1.32l.28-1.13h.85l-.14 3.02.15 3.08h-.86l-.27-1.05c-.27-1.04-.4-1.14-1.44-1.24-.65-.07-3.78-.07-3.78-.07v5.82c0 1.12.57 1.61 1.85 1.61h3.83c1.18 0 2.36-.1 3.1-1.85l.97-2.18h.74c-.05.47-.55 4.4-.65 5.26 0 0-2.9-.07-4.15-.07H7.7l-4.06.07v-.83l1.34-.27c.97-.2 1.24-.47 1.24-1.23 0 0 .1-2.55.1-6.77 0-4.23-.1-6.77-.1-6.77 0-.85-.27-1.04-1.24-1.24l-1.34-.27V3.7l3.97.08h7.8c1.55 0 4.16-.27 4.16-.27s-.08 1.6-.18 5.3h-.78l-.28-1c-.27-1.24-.66-1.85-1.43-2.13-.55-.2-1.4-.27-2.6-.27H9.16z"/></svg>
              Yarneria Shop
            </a>
            , on{" "}
            <a
              href="https://instagram.com/yarneria"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-foreground font-medium hover:text-primary transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              Yarneria
            </a>
            , or just contact us at{" "}
            <a href="mailto:hello@yarneria.com" className="text-foreground font-medium hover:text-primary transition-colors">
              hello@yarneria.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>

    <section className="container pb-20 pt-10">
      <div className="max-w-2xl mx-auto">
        <div className="border-t border-border pt-8">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Legal Information</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm font-sans">
            <div>
              <dt className="text-muted-foreground">Business Certificate</dt>
              <dd className="text-foreground font-medium">Nr.: 910017</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Bank / Institution</dt>
              <dd className="text-foreground font-medium">SWEDBANK AB</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">IBAN</dt>
              <dd className="text-foreground font-medium">LT587300010157892896</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">SWIFT / BIC</dt>
              <dd className="text-foreground font-medium">HABALT22</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Bank Code</dt>
              <dd className="text-foreground font-medium">73000</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground">Legal Address</dt>
              <dd className="text-foreground font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                H. Manto str. 7, LT-92128, Klaipeda, Lithuania
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground">Partner Warehouse</dt>
              <dd className="text-foreground font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Vilnius, Lithuania — dispatch location for all shipments
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  </main>
);

export default AboutUs;
