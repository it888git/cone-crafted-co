import { Sparkles } from "lucide-react";
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
  { name: "Nancy", avatar: a2.url, result: r2.url, yarn: y2.url, yarnName: "Light Blue Mohair Wool Yarn" },
  { name: "O.G.", avatar: a3.url, result: r3.url, yarn: y3.url, yarnName: "Glossy Sequins Paillettes Yarn" },
  { name: "Amirtha", avatar: a4.url, result: r4.url, yarn: y4.url, yarnName: "Khaki Green Fluffy Mohair Yarn" },
  { name: "Etsy Buyer", avatar: a5.url, result: r5.url, yarn: y5.url, yarnName: "Color Gradient Merino Cotton Blend" },
  { name: "Jolie", avatar: a6.url, result: r6.url, yarn: y6.url, yarnName: "Merino Wool Soft Italian Yarn" },
  { name: "Jolie", avatar: a7.url, result: r7.url, yarn: y7.url, yarnName: "Gray Virgin Wool Yarn" },
];

const CustomerCreations = () => (
  <section className="border-t border-border pt-12">
    <div className="text-center max-w-2xl mx-auto mb-10">
      <p className="text-xs font-sans tracking-[0.3em] uppercase text-accent font-semibold mb-2 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5" />
        Knitting Connects Globally
        <Sparkles className="w-3.5 h-3.5" />
      </p>
      <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-3">
        Made With Our Yarn
      </h2>
      <p className="text-base font-sans text-muted-foreground leading-relaxed">
        From Lithuania to the world — every cone we ship becomes something beautiful in someone's hands. We are always thrilled to receive your finished project photos from every corner of the globe.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {creations.map((c, i) => (
        <article
          key={i}
          className="bg-background border border-border rounded-2xl overflow-hidden flex flex-col"
        >
          <div className="relative">
            <img
              src={c.result}
              alt={`Knitted creation by ${c.name}`}
              loading="lazy"
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          <div className="p-4 flex items-center gap-3 border-t border-border">
            <img
              src={c.avatar}
              alt={c.name}
              loading="lazy"
              className="w-11 h-11 rounded-full object-cover border border-border flex-shrink-0 bg-muted"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-sans font-semibold text-foreground truncate">
                {c.name}
              </p>
              <p className="text-xs font-sans text-muted-foreground truncate">
                made with our yarn
              </p>
            </div>
          </div>
          <div className="px-4 pb-4 flex items-center gap-3">
            <img
              src={c.yarn}
              alt={c.yarnName}
              loading="lazy"
              className="w-14 h-14 rounded-lg object-cover border border-border flex-shrink-0"
            />
            <p className="text-xs font-sans text-foreground/80 leading-snug">
              {c.yarnName}
            </p>
          </div>
        </article>
      ))}
    </div>

    <p className="text-center text-sm font-sans text-muted-foreground mt-8">
      Made something with our yarn? Share it with us at{" "}
      <a href="mailto:hello@yarneria.com" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
        hello@yarneria.com
      </a>
    </p>
  </section>
);

export default CustomerCreations;
