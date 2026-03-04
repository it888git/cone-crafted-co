import { Link } from "react-router-dom";
import { ShoppingBag, Heart } from "lucide-react";
import type { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { Badge } from "@/components/ui/badge";
import { getPerKgPrice, formatEuro } from "@/lib/priceUtils";

interface ProductCardProps {
  product: ShopifyProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.node.handle));
  const { node } = product;
  const image = node.images.edges[0]?.node;
  const image2 = node.images.edges[1]?.node;
  const price = node.priceRange.minVariantPrice;
  const firstVariant = node.variants.edges[0]?.node;
  const available = firstVariant?.availableForSale ?? false;

  // Calculate price per kg from first variant weight
  const { perKg } = getPerKgPrice(firstVariant?.price.amount || price.amount, firstVariant?.title || "");
  const formattedPrice = `${Math.round(perKg)} €/kg`;

  // Extract meterage from description if available (e.g. "+/- 800m/100g")
  const meterageMatch = node.description?.match(/\+?\/?-?\s*\d+\s*m\s*\/\s*\d+\s*g/i);
  const meterage = meterageMatch ? meterageMatch[0] : null;

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
    <div className="group relative">
      <Link to={`/product/${node.handle}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-muted aspect-square">
          {image ? (
              <img
                src={image.url}
                alt={image.altText || node.title}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                loading="lazy"
              />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              No image
            </div>
          )}
          {/* Sold Out badge (same style as NEW) – takes priority over NEW */}
          {!available ? (
            <div className="absolute top-3 left-3 px-2 py-0.5 bg-background/90 backdrop-blur-sm rounded-full">
              <span className="text-[10px] font-sans tracking-wider uppercase font-medium text-muted-foreground">Sold Out</span>
            </div>
          ) : (
            node.createdAt && (() => {
              const created = new Date(node.createdAt);
              const twoWeeksAgo = new Date();
              twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
              return created >= twoWeeksAgo;
            })() && (
              <div className="absolute top-3 left-3 px-2 py-0.5 bg-background/90 backdrop-blur-sm rounded-full">
                <span className="text-[10px] font-sans tracking-wider uppercase font-medium text-muted-foreground">NEW</span>
              </div>
            )
          )}
          {/* Favorite – always visible */}
          <div className="absolute top-3 right-3">
            <button
              onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
              className={`p-2 bg-background/90 backdrop-blur-sm rounded-full transition-colors ${isInWishlist ? 'text-accent' : 'text-foreground hover:text-accent'}`}
              aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className="w-4 h-4" fill={isInWishlist ? "currentColor" : "none"} />
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
        </div>
        <div className="mt-3 space-y-0.5">
          <h3 className="font-sans text-sm font-medium text-foreground leading-snug line-clamp-2">
            {node.title}
          </h3>
          {meterage && (
            <p className="font-sans text-xs text-muted-foreground">
              {meterage}
            </p>
          )}
          <p className="font-sans text-sm font-semibold text-foreground pt-0.5">
            {formattedPrice}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
