import c1 from "@/assets/creations-v2/c1.jpeg.asset.json";
import c2 from "@/assets/creations-v2/c2.jpg.asset.json";
import c3 from "@/assets/creations-v2/c3.jpg.asset.json";
import c4 from "@/assets/creations-v2/c4.jpg.asset.json";
import c5 from "@/assets/creations-v2/c5.webp.asset.json";
import c6 from "@/assets/creations-v2/c6.jpg.asset.json";
import c7 from "@/assets/creations-v2/c7.jpg.asset.json";
import c8 from "@/assets/creations-v2/c8.jpg.asset.json";

const images = [c1.url, c2.url, c3.url, c4.url, c5.url, c6.url, c7.url, c8.url];

const CustomerCreations = () => {
  return (
    <section className="w-full">
      <div className="container">
        <div className="max-w-2xl mx-auto space-y-3 text-center pb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
            Knitting connects ✨
          </h2>
          <p className="text-lg font-sans text-muted-foreground leading-relaxed">
            We are happy to receive your results from around the globe.
          </p>
        </div>
      </div>

      <div className="w-screen relative left-1/2 -translate-x-1/2 grid grid-cols-8 gap-0">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Customer creation ${i + 1}`}
            loading="lazy"
            className="w-full aspect-[4/5] object-cover object-center block"
          />
        ))}
      </div>
    </section>
  );
};

export default CustomerCreations;
