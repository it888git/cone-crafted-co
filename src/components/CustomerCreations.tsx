const images = [
  "https://cdn.shopify.com/s/files/1/0995/9122/5691/files/c1.jpg?v=1783932815",
  "https://cdn.shopify.com/s/files/1/0995/9122/5691/files/c2.jpg?v=1783932815",
  "https://cdn.shopify.com/s/files/1/0995/9122/5691/files/c3.jpg?v=1783932815",
  "https://cdn.shopify.com/s/files/1/0995/9122/5691/files/c4.jpg?v=1783932814",
  "https://cdn.shopify.com/s/files/1/0995/9122/5691/files/c5.webp?v=1783932814",
  "https://cdn.shopify.com/s/files/1/0995/9122/5691/files/c6.jpg?v=1783932814",
  "https://cdn.shopify.com/s/files/1/0995/9122/5691/files/c7.jpg?v=1783932813",
  "https://cdn.shopify.com/s/files/1/0995/9122/5691/files/c8.jpg?v=1783932814",
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
