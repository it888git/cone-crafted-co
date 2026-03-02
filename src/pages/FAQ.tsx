import { Link } from "react-router-dom";
import { ChevronRight, Mail } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How to order?",
    answer:
      "Select the yarns you want using different categories and product filters. Choose how many grams you want (for example, 4 units means 400 grams on a single cone) or if it is available, buy full yarn on a cone. Mostly, we give our customers the opportunity to order as much as they need to implement the desired project!",
  },
  {
    question: "Do you ship worldwide?",
    answer:
      'Yes! We ship worldwide using Postal or DPD courier services! We also ship via FedEx, DHL and other couriers upon request. See "Delivery & Returns Policy" for more information.',
  },
  {
    question: "Is free shipping available?",
    answer:
      'Of course! See "Delivery & Returns Policy" for more information.',
  },
  {
    question: "Do you do wholesale business?",
    answer:
      "Yes, please contact hello@yarneria.com regarding this matter. Buy in bulk for even better prices and cheaper shipping!",
  },
  {
    question: "What are the available payment methods?",
    answer:
      "In cooperation with the popular payment collection system Stripe it is possible to pay with bank cards Visa, Mastercard, Maestro, American Express, etc. You can also pay by Apple Pay, PayPal or a simple bank transfer.",
  },
  {
    question: "How long does it take to prepare an order?",
    answer:
      "Our dedicated team is working around the clock to pack and ship all orders from our warehouse within 48 hours. The customer receives tracking details via e-mail after the shipping confirmation.",
  },
];

const FAQ = () => (
  <main>
    <div className="container py-4">
      <nav className="flex items-center gap-1.5 text-xs font-sans text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">FAQ</span>
      </nav>
    </div>

    <section className="container pb-16 max-w-3xl">
      <p className="text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground mb-2">Questions?</p>
      <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-8">Most Frequent Questions</h1>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, idx) => (
          <AccordionItem key={idx} value={`faq-${idx}`}>
            <AccordionTrigger className="text-left font-sans text-base font-medium text-foreground">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base font-sans text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Contact */}
      <div className="border-t border-border mt-10 pt-8 text-center">
        <p className="text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground mb-2">Still have questions?</p>
        <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Contact Us!</h2>
        <div className="space-y-2 text-sm font-sans text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" />
            <a href="mailto:hello@yarneria.com" className="text-primary underline">hello@yarneria.com</a>
          </p>
          <div className="mt-4 text-xs text-muted-foreground/70 space-y-0.5">
            <p className="font-medium text-muted-foreground">Legal information: „YARNERIA"</p>
            <p>Business Certificate Nr.: 910017</p>
            <p>Bank: SWEDBANK AB</p>
            <p>IBAN: LT587300010157892896</p>
            <p>SWIFT: HABALT22</p>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default FAQ;
