import { Link } from "react-router-dom";
import { ShoppingBag, Heart } from "lucide-react";
import type { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: ShopifyProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const { node } = product;
  const image = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const firstVariant = node.variants.edges[0]?.node;
  const available = firstVariant?.availableForSale ?? false;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!firstVariant) return;
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });
  };

  return (
    <div className="group relative animate-fade-in">
      <Link to={`/product/${node.handle}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-muted aspect-square">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              No image
            </div>
          )}
          {/* Quick actions */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 bg-background/90 backdrop-blur-sm rounded-full text-foreground hover:bg-background transition-colors" aria-label="Add to wishlist">
              <Heart className="w-4 h-4" />
            </button>
          </div>
          {available && (
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="absolute bottom-3 right-3 p-2.5 bg-primary text-primary-foreground rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg disabled:opacity-50"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          )}
          {!available && (
            <Badge variant="secondary" className="absolute top-3 left-3 text-[10px] font-sans tracking-wider uppercase px-2 py-0.5">
              Sold Out
            </Badge>
          )}
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="font-serif text-base font-medium text-foreground group-hover:text-primary transition-colors">
            {node.title}
          </h3>
          <div className="flex items-center gap-2 pt-0.5">
            <span className="font-sans text-sm font-semibold text-foreground">
              {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
