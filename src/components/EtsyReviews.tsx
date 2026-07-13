import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const r1 = "https://cdn.shopify.com/s/files/1/0995/9122/5691/files/review-1.jpg?v=1783932912";
const r2 = "https://cdn.shopify.com/s/files/1/0995/9122/5691/files/review-2.jpg?v=1783932911";
const r3 = "https://cdn.shopify.com/s/files/1/0995/9122/5691/files/review-3.jpg?v=1783932911";
const r4 = "https://cdn.shopify.com/s/files/1/0995/9122/5691/files/review-4.jpg?v=1783932913";
const r5 = "https://cdn.shopify.com/s/files/1/0995/9122/5691/files/review-5.jpg?v=1783932911";
const r6 = "https://cdn.shopify.com/s/files/1/0995/9122/5691/files/review-6.jpg?v=1783932912";
const r7 = "https://cdn.shopify.com/s/files/1/0995/9122/5691/files/review-7.jpg?v=1783932912";
const r8 = "https://cdn.shopify.com/s/files/1/0995/9122/5691/files/review-8.jpg?v=1783932911";
const r9 = "https://cdn.shopify.com/s/files/1/0995/9122/5691/files/review-9.jpg?v=1783932911";
const r10 = "https://cdn.shopify.com/s/files/1/0995/9122/5691/files/review-10.jpg?v=1783932911";
const rKim = "https://cdn.shopify.com/s/files/1/0995/9122/5691/files/review-kim.jpg?v=1783932912";
const rDulce = "https://cdn.shopify.com/s/files/1/0995/9122/5691/files/review-dulce.avif?v=1783932911";

type Review = {
  name: string;
  date: string;
  text: string;
  product: string;
  image: string;
};

// Sorted: most recent first
const reviews: Review[] = [
  { name: "Kim", date: "Jul 12, 2026", text: "Holding this double. Searching now and will wash to see how if feel's & blooms", product: "Lace Cashmere Yarn — Merino Wool Cone Yarn", image: rKim },
  { name: "Dulce", date: "Jun 16, 2026", text: "Beautiful Linen, exactly the foto, beautiful colours and received in a few days, very fast shipment, very professional 🤩 Very much pleased with this company!", product: "100% Linen Yarn", image: rDulce },
  { name: "Natalia", date: "May 16, 2026", text: "Incredibly soft and luxurious premium yarn.", product: "Silk Cashmere Wool Yarn", image: r1 },
  { name: "Natalia", date: "May 16, 2026", text: "Beautiful yarn, thank you so much.", product: "Silk Cashmere Wool Yarn – Gray", image: r2 },
  { name: "Elena", date: "Mar 13, 2026", text: "I'm very happy with my order. The thread is a shiny silver color, and the 2mm sequins sparkle like diamonds. Very pretty.", product: "Cotton Sequin Yarn", image: r3 },
  { name: "Etsy buyer", date: "Feb 26, 2026", text: "The customer service was very good and the yarn is better than my expectations!", product: "Organic Cotton Yarn Cone", image: r4 },
  { name: "Dávid", date: "Jan 5, 2026", text: "Wonderful yarn of truly great quality, has a beautiful sheen, super soft and NOT SCRATCHY AT ALL. Definitely would recommend and will be buying from this shop again 🙌", product: "Merino Wool Yarn — Sport Weight", image: r5 },
  { name: "Etsy buyer", date: "Oct 2, 2025", text: "The yarn is WOW!! Gorgeous 💖", product: "Tweed Mohair Merino Wool Silk", image: r6 },
  { name: "Irina", date: "May 4, 2025", text: "Very good service and quality.", product: "100% White Linen Yarn", image: r8 },
  { name: "Marina", date: "Apr 30, 2025", text: "Excellent quality, I recommend to buy.", product: "100% Bourette Silk Yarn", image: r7 },
  { name: "Elel", date: "Jun 30, 2024", text: "Thank you very much, soft beautiful yarn, I'm ordering for the second time ❤️", product: "Socks Yarn — Fingering Weight", image: r9 },
  { name: "Nancy", date: "Jan 9, 2024", text: "My Addi circular knitting machine loves this yarn.", product: "Mohair Wool Yarn — Light Blue", image: r10 },
];

const EtsyReviews = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const update = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  const scrollBy = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const w = el.querySelector("article")?.clientWidth || 320;
    el.scrollBy({ left: dir === "left" ? -(w + 16) : w + 16, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    update();
    return () => el.removeEventListener("scroll", update);
  }, []);

  return (
    <section className="container py-10 lg:py-14">
      <div className="flex items-end justify-between mb-6 gap-4">
        <div className="min-w-0">
          <p className="text-xs font-sans tracking-[0.3em] uppercase text-accent font-semibold mb-2">
            What Our Customers Say
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
            Recent Etsy Reviews
          </h2>
          <div className="mt-3 flex items-center gap-2 text-sm font-sans">
            <span className="flex items-center gap-0.5 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4" fill="currentColor" />
              ))}
            </span>
            <span className="font-semibold text-foreground">4.9/5</span>
            <a
              href="https://www.etsy.com/shop/YarneriaShop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground underline underline-offset-2"
            >
              based on 750+ Etsy reviews
            </a>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => scrollBy("left")}
            disabled={!canLeft}
            aria-label="Previous reviews"
            className="p-2 rounded-full border border-border bg-background text-foreground hover:bg-muted transition-colors disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollBy("right")}
            disabled={!canRight}
            aria-label="Next reviews"
            className="p-2 rounded-full border border-border bg-background text-foreground hover:bg-muted transition-colors disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {reviews.map((r, i) => (
          <article
            key={i}
            className="snap-start flex-shrink-0 w-[220px] sm:w-[240px] md:w-[260px] bg-background border border-border rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="w-full aspect-square overflow-hidden">
              <img
                src={r.image}
                alt={`Review by ${r.name}`}
                loading="lazy"
                className="w-full h-full object-cover object-center scale-[1.35]"
              />
            </div>

            <div className="p-4 flex flex-col gap-2 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-sans font-semibold text-foreground">{r.name}</span>
                <span className="text-xs font-sans text-muted-foreground">{r.date}</span>
              </div>
              <div className="flex items-center gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5" fill="currentColor" />
                ))}
              </div>
              <p className="text-sm font-sans text-foreground/85 leading-relaxed line-clamp-4">
                {r.text}
              </p>
              <p className="text-xs font-sans text-muted-foreground mt-auto pt-1 truncate">
                {r.product}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default EtsyReviews;
