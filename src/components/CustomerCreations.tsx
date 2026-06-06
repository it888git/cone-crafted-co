import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import a1 from "@/assets/creations/avatar-1.png.asset.json";
import a2 from "@/assets/creations/avatar-2.png.asset.json";
import a3 from "@/assets/creations/avatar-3.png.asset.json";
import a4 from "@/assets/creations/avatar-4.png.asset.json";
import a5 from "@/assets/creations/avatar-5.png.asset.json";
import a6 from "@/assets/creations/avatar-6.png.asset.json";
import a7 from "@/assets/creations/avatar-7.png.asset.json";
import r1 from "@/assets/creations/result-1.jpg.asset.json";
import r2 from "@/assets/creations/result-2.jpg.asset.json";
import r3 from "@/assets/creations/result-3.jpg.asset.json";
import r4 from "@/assets/creations/result-4.jpg.asset.json";
import r5 from "@/assets/creations/result-5.jpg.asset.json";
import r6 from "@/assets/creations/result-6.jpg.asset.json";
import r7 from "@/assets/creations/result-7.jpg.asset.json";
import y1 from "@/assets/creations/yarn-1.jpg.asset.json";
import y2 from "@/assets/creations/yarn-2.jpg.asset.json";
import y3 from "@/assets/creations/yarn-3.jpg.asset.json";
import y4 from "@/assets/creations/yarn-4.jpg.asset.json";
import y5 from "@/assets/creations/yarn-5.jpg.asset.json";
import y6 from "@/assets/creations/yarn-6.jpg.asset.json";
import y7 from "@/assets/creations/yarn-7.jpg.asset.json";

type Creation = {
  name: string;
  avatar: string;
  result: string;
  yarn: string;
  yarnName: string;
};

const creations: Creation[] = [
  { name: "Marina", avatar: a1.url, result: r1.url, yarn: y1.url, yarnName: "100% Bourette Silk Yarn" },
  { name: "Nancy", avatar: a2.url, result: r2.url, yarn: y2.url, yarnName: "Light Blue Mohair Wool" },
  { name: "O.G.", avatar: a3.url, result: r3.url, yarn: y3.url, yarnName: "Glossy Sequins Paillettes" },
  { name: "Amirtha", avatar: a4.url, result: r4.url, yarn: y4.url, yarnName: "Khaki Green Fluffy Mohair" },
  { name: "Etsy Buyer", avatar: a5.url, result: r5.url, yarn: y5.url, yarnName: "Merino Cotton Blend" },
  { name: "Jolie", avatar: a6.url, result: r6.url, yarn: y6.url, yarnName: "Merino Wool Soft Italian" },
  { name: "Jolie", avatar: a7.url, result: r7.url, yarn: y7.url, yarnName: "Gray Virgin Wool" },
];

const CustomerCreations = () => {
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
    const w = el.querySelector("article")?.clientWidth || 220;
    el.scrollBy({ left: dir === "left" ? -(w + 12) : w + 12, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    update();
    return () => el.removeEventListener("scroll", update);
  }, []);

  return (
    <section className="border-t border-border pt-10">
      <div className="flex items-end justify-between mb-6 gap-4">
        <div className="min-w-0">
          <p className="text-xs font-sans tracking-[0.3em] uppercase text-accent font-semibold mb-2">
            Knitting Connects Globally
          </p>
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
            Our Customers Results
          </h2>
          <p className="text-sm font-sans text-muted-foreground mt-2 max-w-lg">
            We are always thrilled to receive your finished project photos from every corner around the globe!
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => scrollBy("left")}
            disabled={!canLeft}
            aria-label="Previous"
            className="p-2 rounded-full border border-border bg-background text-foreground hover:bg-muted transition-colors disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollBy("right")}
            disabled={!canRight}
            aria-label="Next"
            className="p-2 rounded-full border border-border bg-background text-foreground hover:bg-muted transition-colors disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {creations.map((c, i) => (
          <article
            key={i}
            className="snap-start flex-shrink-0 w-[200px] bg-background border border-border rounded-xl overflow-hidden flex flex-col"
          >
            <img
              src={c.result}
              alt={`Created by ${c.name}`}
              loading="lazy"
              className="w-full aspect-square object-cover"
            />
            <div className="p-3 flex flex-col gap-2.5">
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={c.avatar}
                  alt={c.name}
                  loading="lazy"
                  className="w-7 h-7 rounded-full object-cover bg-muted flex-shrink-0"
                />
                <span className="text-sm font-sans font-semibold text-foreground truncate">
                  {c.name}
                </span>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-border min-w-0">
                <img
                  src={c.yarn}
                  alt={c.yarnName}
                  loading="lazy"
                  className="w-9 h-9 rounded-md object-cover flex-shrink-0"
                />
                <span className="text-xs font-sans text-muted-foreground leading-snug line-clamp-2">
                  {c.yarnName}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CustomerCreations;
