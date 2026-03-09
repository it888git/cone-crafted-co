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

    <section className="container pb-16 max-w-4xl">
      <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-8">Delivery & Returns Policy</h1>

      <div className="space-y-10">
        {/* Delivery */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <Truck className="w-5 h-5 text-foreground" />
            <h2 className="font-serif text-2xl font-semibold text-foreground">Delivery Policy</h2>
          </div>
          <p className="text-base font-sans text-muted-foreground mb-5 leading-relaxed">
            Our dedicated team is working around the clock to pack and ship all orders from our warehouse within 48 hours. The customer receives tracking details via e-mail after the shipping confirmation.
          </p>

          {/* Shipping table */}
           <div className="border border-border rounded-lg overflow-x-auto mb-5">
            <table className="w-full text-sm font-sans table-fixed">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left px-4 py-3 font-medium text-foreground w-[24%]">Destination</th>
                  <th className="text-left px-4 py-3 font-medium text-foreground">Order Weight</th>
                  <th className="text-left px-4 py-3 font-medium text-foreground">Delivery Method</th>
                  <th className="text-center px-4 py-3 font-medium text-foreground">Cost</th>
                  <th className="text-left px-4 py-3 font-medium text-foreground">Delivery Time</th>
                  <th className="text-left px-4 py-3 font-medium text-foreground">Free Delivery</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {/* BALTIC STATES */}
                <tr className="border-t border-border">
                  <td className="px-4 py-3 align-top" rowSpan={3}>
                    <span className="font-semibold text-foreground">BALTIC STATES</span>
                    <br />
                    <span className="text-xs leading-snug">Lithuania, Latvia &amp; Estonia</span>
                  </td>
                  <td className="px-4 py-3">ALL</td>
                  <td className="px-4 py-3">Nearest DPD, UNISEND, OMNIVA Pickup Locker</td>
                  <td className="px-4 py-3 text-center">3.50€</td>
                  <td className="px-4 py-3">2 – 4 working days</td>
                  <td className="px-4 py-3" rowSpan={3}>—</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">ALL</td>
                  <td className="px-4 py-3">Home Delivery VENIPAK or SMARTPOSTI</td>
                  <td className="px-4 py-3 text-center">6.50€</td>
                  <td className="px-4 py-3">2 – 4 working days</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">ALL</td>
                  <td className="px-4 py-3">Express Mail (Post Office)</td>
                  <td className="px-4 py-3 text-center">8.50€</td>
                  <td className="px-4 py-3">3 – 5 working days</td>
                </tr>

                {/* UNITED KINGDOM */}
                <tr className="border-t-2 border-border">
                  <td className="px-4 py-3 align-top" rowSpan={3}>
                    <span className="font-semibold text-foreground">UNITED KINGDOM</span>
                  </td>
                  <td className="px-4 py-3">up to 1.8kg</td>
                  <td className="px-4 py-3">Express Mail (Post Office)</td>
                  <td className="px-4 py-3 text-center">8.50€</td>
                  <td className="px-4 py-3">4 – 7 working days</td>
                  <td className="px-4 py-3" rowSpan={3}>—</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">1.9kg and more</td>
                  <td className="px-4 py-3">Express Mail (Post Office)</td>
                  <td className="px-4 py-3 text-center">15.50€</td>
                  <td className="px-4 py-3">4 – 7 working days</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">ALL</td>
                  <td className="px-4 py-3">Home Delivery UPS Express</td>
                  <td className="px-4 py-3 text-center">17.50€</td>
                  <td className="px-4 py-3">4 – 7 working days</td>
                </tr>

                {/* EUROPE */}
                <tr className="border-t-2 border-border">
                  <td className="px-4 py-3 align-top" rowSpan={4}>
                    <span className="font-semibold text-foreground">EUROPE</span>
                    <br />
                    <span className="text-xs leading-snug">Austria, Belgium, Bulgaria, Croatia, Cyprus, Czech Republic, Denmark, Finland, France, Germany, Greece, Hungary, Iceland, Ireland, Italy, Luxembourg, Malta, Netherlands, Norway, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden, Switzerland</span>
                  </td>
                  <td className="px-4 py-3">up to 1.8kg</td>
                  <td className="px-4 py-3">Express Mail (Post Office)</td>
                  <td className="px-4 py-3 text-center">6.50€</td>
                  <td className="px-4 py-3">4 – 8 working days</td>
                  <td className="px-4 py-3" rowSpan={4}>—</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">1.9kg and more</td>
                  <td className="px-4 py-3">Express Mail (Post Office)</td>
                  <td className="px-4 py-3 text-center">9.50€</td>
                  <td className="px-4 py-3">4 – 8 working days</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">up to 1.8kg</td>
                  <td className="px-4 py-3">Home Delivery DHL, GLS or UPS Express</td>
                  <td className="px-4 py-3 text-center">8.50€</td>
                  <td className="px-4 py-3">3 – 7 working days</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">1.9kg and more</td>
                  <td className="px-4 py-3">Home Delivery DHL, GLS or UPS Express</td>
                  <td className="px-4 py-3 text-center">12.50€</td>
                  <td className="px-4 py-3">3 – 7 working days</td>
                </tr>

                {/* INTERNATIONAL */}
                <tr className="border-t-2 border-border">
                  <td className="px-4 py-3 align-top" rowSpan={3}>
                    <span className="font-semibold text-foreground">INTERNATIONAL</span>
                    <br />
                    <span className="text-xs leading-snug">USA, Canada, Australia, Japan, South Korea, Israel, Turkey, United Arab Emirates, Singapore, New Zealand &amp; Rest of the World</span>
                  </td>
                  <td className="px-4 py-3">ALL</td>
                  <td className="px-4 py-3">Express Mail (Post Office)</td>
                  <td className="px-4 py-3 text-center font-semibold text-green-700">FREE</td>
                  <td className="px-4 py-3">4 – 12 working days</td>
                  <td className="px-4 py-3" rowSpan={3}>—</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">up to 1.8kg</td>
                  <td className="px-4 py-3">FEDEX or UPS Express Delivery</td>
                  <td className="px-4 py-3 text-center">19.50€</td>
                  <td className="px-4 py-3">3 – 6 working days</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3">1.9kg and more</td>
                  <td className="px-4 py-3">FEDEX or UPS Express Delivery</td>
                  <td className="px-4 py-3 text-center">34.50€</td>
                  <td className="px-4 py-3">3 – 6 working days</td>
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
          <div className="space-y-3 text-base font-sans text-muted-foreground leading-relaxed">
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
