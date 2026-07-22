import { Link } from "react-router-dom";
import { ShoppingBag, Heart } from "lucide-react";
import type { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { Badge } from "@/components/ui/badge";
import { getPerKgPrice, formatPrice, getLowestVariantPrice, formatPricePer100g, extractWeightGrams } from "@/lib/priceUtils";
import { useMarketStore } from "@/stores/marketStore";
import { useConverter, currencySymbol, roundForDisplay } from "@/lib/currency";
import { getProductDescriptionText } from "@/lib/productDescription";

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
  const available = node.variants.edges.some((e) => e.node.availableForSale);

  const isInternational = useMarketStore((s) => s.selectedCountry.deliveryRegion === 'international');
  const { convert } = useConverter();

  const currencyCode = firstVariant?.price.currencyCode || price.currencyCode || 'EUR';

  let formattedPrice: string;
  if (isInternational) {
    // International: show cheapest variant absolute price + weight label, converted to user's currency
    const availableVariants = node.variants.edges.filter((v) => v.node.availableForSale);
    const pool = availableVariants.length > 0 ? availableVariants : node.variants.edges;
    const lowest = getLowestVariantPrice(pool);
    if (lowest) {
      const hasMultiple = pool.length > 1;
      const conv = convert(lowest.amount, lowest.currencyCode);
      const sym = currencySymbol(conv.currencyCode);
      const displayAmount = roundForDisplay(conv.amount, conv.currencyCode);
      formattedPrice = `${hasMultiple ? 'from ' : ''}${sym}${displayAmount.toFixed(['JPY','KRW'].includes(conv.currencyCode) ? 0 : 2)} / ${lowest.label}`;
    } else {
      const conv = convert(parseFloat(price.amount), currencyCode);
      formattedPrice = formatPrice(conv.amount, conv.currencyCode);
    }
  } else {
    // EU: lowest per-100g across variants, rounded to 1 decimal
    const symbol = currencySymbol(currencyCode);
    const per100gValues = node.variants.edges
      .map((v) => {
        const grams = extractWeightGrams(v.node.title);
        if (!grams || grams <= 0) return null;
        return (parseFloat(v.node.price.amount) / grams) * 100;
      })
      .filter((n): n is number => n !== null);
    const hasMultiplePrices = per100gValues.length > 1 && Math.min(...per100gValues) !== Math.max(...per100gValues);
    const lowestPer100g = per100gValues.length > 0 ? Math.min(...per100gValues) : null;
    formattedPrice = lowestPer100g !== null
      ? `${lowestPer100g.toFixed(2)} ${symbol}/100g`
      : formatPrice(parseFloat(price.amount), currencyCode);
  }


  const descriptionText = getProductDescriptionText(node.description, node.descriptionHtml);

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
            <div className="absolute top-3 left-3 inline-flex items-center justify-center px-2 h-5 bg-background/90 backdrop-blur-sm rounded-full">
              <span className="text-[10px] leading-none font-sans tracking-wider uppercase font-medium text-muted-foreground">Sold Out</span>
            </div>
          ) : (
            node.createdAt && (() => {
              const created = new Date(node.createdAt);
              const twoWeeksAgo = new Date();
              twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
              return created >= twoWeeksAgo;
            })() && (
              <div className="absolute top-3 left-3 inline-flex items-center justify-center px-2 h-5 bg-background/90 backdrop-blur-sm rounded-full">
                <span className="text-[10px] leading-none font-sans tracking-wider uppercase font-medium text-muted-foreground">NEW</span>
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
              className="absolute bottom-3 right-3 p-2.5 bg-primary text-primary-foreground rounded-full hidden md:block opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg disabled:opacity-50"
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
          {descriptionText && (
            <p className="font-sans text-xs text-muted-foreground whitespace-pre-line line-clamp-3">
              {descriptionText}
            </p>
          )}
          <p className="font-sans text-sm font-semibold text-foreground pt-0.5">
            {formattedPrice}
          </p>
          {isInternational && (
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-[10px] font-sans font-semibold tracking-wider uppercase">
              Free Delivery
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
