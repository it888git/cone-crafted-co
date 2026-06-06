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

const CustomerCreations = () => (
  <section className="border-t border-border pt-10">
    <div className="text-center mb-8">
      <p className="text-xs font-sans tracking-[0.3em] uppercase text-accent font-semibold mb-2">
        Knitting Connects Globally
      </p>
      <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">
        Our Customers Results
      </h2>
      <p className="text-base font-sans text-muted-foreground leading-relaxed">
        We are always thrilled to receive your finished project photos from every corner around the globe!
      </p>
    </div>

    <ul className="divide-y divide-border border-y border-border">
      {creations.map((c, i) => (
        <li key={i} className="flex items-center gap-3 py-3">
          <img
            src={c.avatar}
            alt={c.name}
            loading="lazy"
            className="w-8 h-8 rounded-full object-cover bg-muted flex-shrink-0"
          />
          <span className="text-sm font-sans font-medium text-foreground w-20 flex-shrink-0 truncate">
            {c.name}
          </span>
          <img
            src={c.result}
            alt={`Created by ${c.name}`}
            loading="lazy"
            className="w-14 h-14 rounded-md object-cover flex-shrink-0"
          />
          <img
            src={c.yarn}
            alt={c.yarnName}
            loading="lazy"
            className="w-10 h-10 rounded-md object-cover flex-shrink-0"
          />
          <span className="text-xs font-sans text-muted-foreground truncate flex-1">
            {c.yarnName}
          </span>
        </li>
      ))}
    </ul>
  </section>
);

export default CustomerCreations;
