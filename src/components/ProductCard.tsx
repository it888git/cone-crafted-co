import { Link } from "react-router-dom";
import { ShoppingBag, Star, Heart } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  return (
    <div className="group relative animate-fade-in">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-muted aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <Badge className="bg-accent text-accent-foreground text-[10px] font-sans tracking-wider uppercase px-2 py-0.5">
                New
              </Badge>
            )}
            {product.isBestseller && (
              <Badge className="bg-primary text-primary-foreground text-[10px] font-sans tracking-wider uppercase px-2 py-0.5">
                Bestseller
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="secondary" className="text-[10px] font-sans tracking-wider uppercase px-2 py-0.5">
                Sold Out
              </Badge>
            )}
          </div>
          {/* Quick actions */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 bg-background/90 backdrop-blur-sm rounded-full text-foreground hover:bg-background transition-colors" aria-label="Add to wishlist">
              <Heart className="w-4 h-4" />
            </button>
          </div>
          {product.inStock && (
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product);
              }}
              className="absolute bottom-3 right-3 p-2.5 bg-primary text-primary-foreground rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          )}
        </div>
        {/* Info */}
        <div className="mt-3 space-y-1">
          <p className="text-[11px] font-sans tracking-[0.15em] uppercase text-muted-foreground">
            {product.fiber} · {product.weight}
          </p>
          <h3 className="font-serif text-base font-medium text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-accent text-accent" />
              <span className="text-xs font-sans text-muted-foreground">{product.rating}</span>
            </div>
            <span className="text-xs font-sans text-muted-foreground">({product.reviews})</span>
          </div>
          <div className="flex items-center gap-2 pt-0.5">
            <span className="font-sans text-sm font-semibold text-foreground">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="font-sans text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            )}
            <span className="text-[10px] font-sans text-muted-foreground">/ {product.coneWeight} cone</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
