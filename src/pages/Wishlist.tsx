import { useWishlistStore } from "@/stores/wishlistStore";
import ProductCard from "@/components/ProductCard";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const items = useWishlistStore((s) => s.items);

  return (
    <main className="bg-background">
      <div className="container py-8">
        <h1 className="font-serif text-3xl font-bold mb-1">My Wishlist</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {items.length} {items.length === 1 ? "item" : "items"} saved
        </p>

        {items.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <Heart className="w-12 h-12 mx-auto text-muted-foreground/40" />
            <p className="text-muted-foreground font-sans">Your wishlist is empty</p>
            <Link
              to="/products"
              className="inline-block mt-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-sans font-medium hover:bg-primary/90 transition-colors"
            >
              Browse Yarns
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {items.map((product) => (
              <ProductCard key={product.node.handle} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Wishlist;
