import c1 from "@/assets/creations/c1.jpg";
import c2 from "@/assets/creations/c2.jpg";
import c3 from "@/assets/creations/c3.jpg";
import c4 from "@/assets/creations/c4.jpg";
import c5 from "@/assets/creations/c5.webp";
import c6 from "@/assets/creations/c6.jpg";
import c7 from "@/assets/creations/c7.jpg";
import c8 from "@/assets/creations/c8.jpg";

const images = [c1, c2, c3, c4, c5, c6, c7, c8];

const CustomerCreations = () => {
  return (
    <section className="w-full">
      <div className="container">
        <div className="max-w-2xl mx-auto space-y-3 text-center pb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
            Knitting connects ✨
          </h2>
          <p className="text-base md:text-lg font-sans text-muted-foreground leading-relaxed">
            We are happy to receive your results from around the globe.
          </p>
        </div>
      </div>

      <div className="w-screen relative left-1/2 -translate-x-1/2 grid grid-cols-4 md:grid-cols-8 gap-0">
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
