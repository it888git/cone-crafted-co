import { Link } from "react-router-dom";
import { ChevronRight, Mail, MapPin } from "lucide-react";
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


    <section className="container pb-20">
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
            <div>
              <dt className="text-muted-foreground">Email</dt>
              <dd className="text-foreground font-medium flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <a href="mailto:hello@yarneria.com" className="hover:text-primary transition-colors">hello@yarneria.com</a>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground">Legal Address</dt>
              <dd className="text-foreground font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                H. Manto str. 7, LT-92128, Klaipeda, Lithuania
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  </main>
);

export default AboutUs;
