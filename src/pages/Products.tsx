import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import ProductCard from "@/components/ProductCard";
import { Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";

const Products = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search") || undefined;

  const { data: products, isLoading } = useShopifyProducts(50, searchQuery);

  return (
    <main className="container py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
          {searchQuery ? "Search results" : "All Yarns"}
        </h1>
        <p className="text-sm font-sans text-muted-foreground mt-2">
          {isLoading
            ? "Loading..."
            : searchQuery
              ? `${products?.length || 0} products for “${searchQuery}”`
              : `${products?.length || 0} products`}
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="font-serif text-xl text-muted-foreground">No products found</p>
          <p className="text-sm font-sans text-muted-foreground mt-2">
            Products will appear here once added to your Shopify store.
          </p>
        </div>
      )}
    </main>
  );
};

export default Products;
