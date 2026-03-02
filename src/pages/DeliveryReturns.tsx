import { Link } from "react-router-dom";
import { ChevronRight, Truck, RotateCcw, Mail } from "lucide-react";

const DeliveryReturns = () => (
  <main>
    <div className="container py-4">
      <nav className="flex items-center gap-1.5 text-xs font-sans text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">Delivery & Returns</span>
      </nav>
    </div>

    <section className="container pb-16 max-w-3xl">
      <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-8">Delivery & Returns Policy</h1>

      <div className="space-y-10">
        {/* Delivery */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <Truck className="w-5 h-5 text-foreground" />
            <h2 className="font-serif text-2xl font-semibold text-foreground">Delivery Policy</h2>
          </div>
          <p className="text-sm font-sans text-muted-foreground mb-5 leading-relaxed">
            Our dedicated team is working around the clock to pack and ship all orders from our warehouse within 48 hours. The customer receives tracking details via e-mail after the shipping confirmation.
          </p>

          {/* Shipping table */}
          <div className="border border-border rounded-lg overflow-hidden mb-5">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left px-4 py-3 font-medium text-foreground">Destination</th>
                  <th className="text-left px-4 py-3 font-medium text-foreground">Carrier</th>
                  <th className="text-left px-4 py-3 font-medium text-foreground">Delivery Time</th>
                  <th className="text-right px-4 py-3 font-medium text-foreground">Cost</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-border">
                  <td className="px-4 py-3">EU Countries</td>
                  <td className="px-4 py-3">DHL / DPD</td>
                  <td className="px-4 py-3">3–7 business days</td>
                  <td className="px-4 py-3 text-right">From €4.99</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">EU (Free shipping)</td>
                  <td className="px-4 py-3">DHL / DPD</td>
                  <td className="px-4 py-3">3–7 business days</td>
                  <td className="px-4 py-3 text-right">Free over €79</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">UK & Switzerland</td>
                  <td className="px-4 py-3">DHL / DPD</td>
                  <td className="px-4 py-3">5–10 business days</td>
                  <td className="px-4 py-3 text-right">From €9.99</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">USA & Canada</td>
                  <td className="px-4 py-3">DHL / FedEx</td>
                  <td className="px-4 py-3">7–14 business days</td>
                  <td className="px-4 py-3 text-right">From €14.99</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">Rest of World</td>
                  <td className="px-4 py-3">DHL / FedEx</td>
                  <td className="px-4 py-3">7–21 business days</td>
                  <td className="px-4 py-3 text-right">From €14.99</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs font-sans text-muted-foreground leading-relaxed">
            Please keep in mind that orders outside of Europe may be subject to import duties and/or additional taxes or expenses. You will be responsible for the payment of any such additional duties and/or taxes. We advise you contact your local customs office or taxation authority for more information.
          </p>
        </div>

        {/* Returns */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <RotateCcw className="w-5 h-5 text-foreground" />
            <h2 className="font-serif text-2xl font-semibold text-foreground">Returns Policy</h2>
          </div>
          <div className="space-y-3 text-sm font-sans text-muted-foreground leading-relaxed">
            <p>Thanks for your interest in our yarn. We hope you are happy with your purchase. However, if you are not completely satisfied with your purchase for any reason, you may return it to us for store credit or an exchange.</p>
            <p>All returns must be postmarked within <strong className="text-foreground">thirty (30) days</strong> of the purchase date. All returned items must be in unused condition.</p>
            <p>
              In order to return an item, please email customer service at{" "}
              <a href="mailto:hello@yarneria.com" className="text-primary underline">hello@yarneria.com</a>{" "}
              to obtain a Return Number. After receiving it, pack the item securely and include your Return Number, then mail your return to:
            </p>
            <address className="not-italic border-l-2 border-border pl-4 py-2">
              DHL Service Point Locker<br />
              V. Gerulaicio g. 10<br />
              Vilnius, 08200<br />
              Lithuania
            </address>
            <p>Please note that you will be responsible for all return shipping charges.</p>
            <p>After receiving your return, we will process your return or exchange. Please allow at least fourteen (14) days from the receipt of your item to process your return or exchange.</p>
          </div>
        </div>

        {/* Contact */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm font-sans text-muted-foreground">
              Have more questions? Contact us at{" "}
              <a href="mailto:hello@yarneria.com" className="text-primary underline">hello@yarneria.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default DeliveryReturns;
