import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useCartStore } from "@/stores/cartStore";
import { Minus, Plus, Trash2, ExternalLink, Loader2, ShoppingBag, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { formatPrice, formatPricePer100g } from "@/lib/priceUtils";
import { useMarketStore } from "@/stores/marketStore";
import { getVariantQuantityAvailable } from "@/lib/shopify";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const isInternational = useMarketStore((s) => s.selectedCountry.deliveryRegion === 'international');
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md bg-background flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-sans text-2xl font-bold">Your Cart</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-shrink-0 bg-[#F7941E]/10 border border-[#F7941E]/30 rounded-md px-3 py-2 mt-2">
          <p className="font-sans text-xs text-foreground text-center">
            🎉 Re-opening offer: <span className="font-semibold">15% OFF</span> with code <span className="font-semibold">OPEN15</span>
          </p>
        </div>


        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground font-sans text-sm">Your cart is empty</p>
            <Button variant="outline" className="mt-4" onClick={() => setIsOpen(false)}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4 min-h-0">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="w-16 h-16 bg-secondary/20 rounded-md overflow-hidden flex-shrink-0">
                    {item.product.node.images?.edges?.[0]?.node && (
                      <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-sans text-sm font-semibold text-foreground">{item.product.node.title}</h4>
                    <p className="text-sm text-muted-foreground font-sans mt-0.5">
                      Cone weight: {item.selectedOptions.map(o => o.value).join(' · ')} – {formatPrice(parseFloat(item.price.amount), item.price.currencyCode)}
                    </p>
                    {(() => {
                      const weightMatch = item.selectedOptions.map(o => o.value).join('').match(/(\d+)\s*g/i);
                      const grams = weightMatch ? parseInt(weightMatch[1], 10) : null;
                      const price = parseFloat(item.price.amount);
                      if (grams && grams > 0) {
                        const perKg = (price / grams) * 1000;
                        return (
                          <p className="text-sm font-sans font-bold mt-0.5">
                            {formatPricePer100g(perKg, item.price.currencyCode)}
                          </p>
                        );
                      }
                      return null;
                    })()}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="p-1 rounded border border-border hover:bg-muted transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-sans w-6 text-center">{item.quantity}</span>
                      {(() => {
                        const maxAvailable = getVariantQuantityAvailable(item.variantId, item.product);
                        const atMax = maxAvailable !== null && item.quantity >= maxAvailable;
                        return (
                          <>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              disabled={atMax}
                              className="p-1 rounded border border-border hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            {atMax && (
                              <span className="text-xs font-sans text-accent">
                                Max available reached
                              </span>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.variantId)} className="text-muted-foreground hover:text-foreground flex-shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex-shrink-0 border-t border-border pt-4 pb-8 space-y-3">
              <div className="flex justify-between font-sans text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{formatPrice(totalPrice, items[0]?.price.currencyCode || 'EUR')}</span>
              </div>
              {isInternational && (
                <div className="flex justify-center">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-[10px] font-sans font-semibold tracking-wider uppercase">
                    Free Delivery Included
                  </span>
                </div>
              )}
              <Button
                onClick={handleCheckout}
                className="w-full bg-primary text-primary-foreground hover:opacity-90 font-sans py-6"
                disabled={items.length === 0 || isLoading || isSyncing}
              >
                {isLoading || isSyncing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <span className="flex items-center justify-center gap-2 text-base font-semibold">
                    <Lock className="w-4 h-4" />
                    Checkout
                  </span>
                )}
              </Button>
              
              <div className="flex justify-center mt-3">
                <img src="/icons/payment-methods.png" alt="Visa, Mastercard, Amex, Apple Pay, Google Pay" className="h-10 opacity-60" />
              </div>
              <p className="text-[11px] text-muted-foreground text-center font-sans mt-2">
                {isInternational ? 'Free Express Mail Delivery Included' : 'Shipping & coupons at checkout'}
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
