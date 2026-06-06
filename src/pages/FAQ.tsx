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
    question: "How do I place an order?",
    answer:
      "Browse our newest Italian yarn collections and choose the exact quantity you need for your project. Most of our yarns are available in smaller cones ranging from 200g to 400g, allowing you to order only what you need or work with multiple plies at once for your preferred yarn thickness.",
  },
  {
    question: "Do you ship worldwide?",
    answer:
      "Yes! We ship worldwide using a variety of trusted courier and postal services. Thanks to our extensive experience shipping globally, we are able to offer competitive shipping rates to many destinations. Please see our Delivery & Returns Policy for more information.",
  },
  {
    question: "Is free shipping available?",
    answer:
      "Yes! We offer free shipping to selected destinations and for qualifying orders. Please refer to our Delivery & Returns Policy for detailed information about current shipping offers.",
  },
  {
    question: "Do you offer wholesale pricing?",
    answer:
      "Absolutely. If you are interested in wholesale purchases or larger quantities, please contact us at hello@yarneria.com. We offer attractive bulk pricing and more economical shipping options for larger orders.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We use Shopify Payments, one of the world's most trusted and secure payment platforms. Customers can choose from a variety of popular payment methods, including major credit and debit cards, digital wallets, and local payment options where available.",
  },
  {
    question: "How long does it take to prepare an order?",
    answer:
      "Our team works hard to prepare and dispatch orders as quickly as possible. Most orders are packed and shipped within 48 hours. Once your order has been dispatched, you will receive a shipping confirmation email containing your tracking information.",
  },
  {
    question: "Why choose yarn on cones?",
    answer:
      "Cone yarn offers excellent value and convenience for both hand knitting and machine knitting. With continuous lengths of yarn, fewer joins, and the ability to choose your exact quantity, cone yarn is ideal for projects of all sizes.",
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
      <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-8">Frequently Asked Questions</h1>

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
