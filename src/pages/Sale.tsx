import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import ProductCard from "@/components/ProductCard";
import { Loader2 } from "lucide-react";

const Sale = () => {
  const { data: products, isLoading } = useShopifyProducts(50, "sale");

  return (
    <main>
      <div className="container py-4">
        <nav className="flex items-center gap-1.5 text-xs font-sans text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">Products tagged "Yarn on sale"</span>
        </nav>
      </div>

      <section className="container pb-16">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">Yarn on sale</h1>

        <div className="bg-accent/15 border border-accent/30 rounded-lg p-6 mb-8">
          <p className="text-sm font-sans text-muted-foreground leading-relaxed">
            Don't miss out on these yarn and save your money from our last-chance sale! The yarn on sale selection available at our store holds an undeniable appeal. Its presence on sale offers a unique opportunity for crafters to access quality fibers at a more affordable price. Whether it's limited-time promotions, clearance deals, or special offers, this yarn on sale selection presents a range of enticing options for budget-conscious customers.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-serif text-xl text-muted-foreground">No sale items found</p>
            <p className="text-sm font-sans text-muted-foreground mt-2">
              Sale products will appear here when tagged in your store.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Sale;
