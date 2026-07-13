const images = [
  "https://i.ibb.co/sJvJCb3b/c1.jpg",
  "https://i.ibb.co/JjYcSntG/c2.jpg",
  "https://i.ibb.co/PzFXjf0q/c3.jpg",
  "https://i.ibb.co/wZzHyRkG/c4.jpg",
  "https://i.ibb.co/mVPW5cyR/c5.webp",
  "https://i.ibb.co/wFFPrnVf/c6.jpg",
  "https://i.ibb.co/SDPm3MDm/c7.jpg",
  "https://i.ibb.co/Rpr3yz5v/c8.jpg",
];

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
