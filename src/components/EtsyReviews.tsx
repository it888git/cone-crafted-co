import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import r1 from "@/assets/reviews/review-1.jpg.asset.json";
import r2 from "@/assets/reviews/review-2.jpg.asset.json";
import r3 from "@/assets/reviews/review-3.jpg.asset.json";
import r4 from "@/assets/reviews/review-4.jpg.asset.json";
import r5 from "@/assets/reviews/review-5.jpg.asset.json";
import r6 from "@/assets/reviews/review-6.jpg.asset.json";
import r7 from "@/assets/reviews/review-7.jpg.asset.json";
import r8 from "@/assets/reviews/review-8.jpg.asset.json";
import r9 from "@/assets/reviews/review-9.jpg.asset.json";
import r10 from "@/assets/reviews/review-10.jpg.asset.json";

type Review = {
  name: string;
  date: string;
  text: string;
  product: string;
  image: string;
};

// Sorted: most recent first
const reviews: Review[] = [
  { name: "Natalia", date: "May 16, 2026", text: "Incredibly soft and luxurious premium yarn.", product: "Silk Cashmere Wool Yarn", image: r1.url },
  { name: "Natalia", date: "May 16, 2026", text: "Beautiful yarn, thank you so much.", product: "Silk Cashmere Wool Yarn – Gray", image: r2.url },
  { name: "Elena", date: "Mar 13, 2026", text: "I'm very happy with my order. The thread is a shiny silver color, and the 2mm sequins sparkle like diamonds. Very pretty.", product: "Cotton Sequin Yarn", image: r3.url },
  { name: "Etsy buyer", date: "Feb 26, 2026", text: "The customer service was very good and the yarn is better than my expectations!", product: "Organic Cotton Yarn Cone", image: r4.url },
  { name: "Dávid", date: "Jan 5, 2026", text: "Wonderful yarn of truly great quality, has a beautiful sheen, super soft and NOT SCRATCHY AT ALL. Definitely would recommend and will be buying from this shop again 🙌", product: "Merino Wool Yarn — Sport Weight", image: r5.url },
  { name: "Etsy buyer", date: "Oct 2, 2025", text: "The yarn is WOW!! Gorgeous 💖", product: "Tweed Mohair Merino Wool Silk", image: r6.url },
  { name: "Irina", date: "May 4, 2025", text: "Very good service and quality.", product: "100% White Linen Yarn", image: r8.url },
  { name: "Marina", date: "Apr 30, 2025", text: "Excellent quality, I recommend to buy.", product: "100% Bourette Silk Yarn", image: r7.url },
  { name: "Elel", date: "Jun 30, 2024", text: "Thank you very much, soft beautiful yarn, I'm ordering for the second time ❤️", product: "Socks Yarn — Fingering Weight", image: r9.url },
  { name: "Nancy", date: "Jan 9, 2024", text: "My Addi circular knitting machine loves this yarn.", product: "Mohair Wool Yarn — Light Blue", image: r10.url },
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
            <span className="font-semibold text-foreground">4.8/5</span>
            <a
              href="https://www.etsy.com/shop/YarneriaShop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground underline underline-offset-2"
            >
              based on 700+ Etsy reviews
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
            className="snap-start flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] bg-background border border-border rounded-2xl overflow-hidden flex flex-col"
          >
            <img
              src={r.image}
              alt={`Review by ${r.name}`}
              loading="lazy"
              className="w-full aspect-square object-cover object-center"
            />

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
