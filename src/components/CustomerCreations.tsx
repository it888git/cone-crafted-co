import r1 from "@/assets/creations/result-1.jpg.asset.json";
import r2 from "@/assets/creations/result-2.jpg.asset.json";
import r3 from "@/assets/creations/result-3.jpg.asset.json";
import r4 from "@/assets/creations/result-4.jpg.asset.json";
import r5 from "@/assets/creations/result-5.jpg.asset.json";
import r6 from "@/assets/creations/result-6.jpg.asset.json";
import r7 from "@/assets/creations/result-7.jpg.asset.json";

const images = [r1.url, r2.url, r3.url, r4.url, r5.url, r6.url, r7.url];

const CustomerCreations = () => {
  return (
    <section>
      <div className="text-center space-y-3 mb-8">
        <p className="text-xs font-sans tracking-[0.3em] uppercase text-accent font-semibold">
          KNITTING CONNECTS GLOBALLY
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
          Your Results ✨
        </h2>
        <p className="text-lg font-sans text-muted-foreground leading-relaxed max-w-xl mx-auto">
          We are always thrilled to receive your finished project photos from every corner around the globe!
        </p>
      </div>

      <div
        className="flex gap-1 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Customer result ${i + 1}`}
            loading="lazy"
            className="snap-start flex-shrink-0 w-[180px] h-[240px] sm:w-[220px] sm:h-[290px] object-cover object-center"
          />
        ))}
      </div>
    </section>
  );
};

export default CustomerCreations;
