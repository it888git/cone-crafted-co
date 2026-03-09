import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useCartStore } from "@/stores/cartStore";
import { Minus, Plus, Trash2, ExternalLink, Loader2, ShoppingBag, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md bg-background flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-serif text-2xl font-bold">Your Cart</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>

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
                      Cone weight: {item.selectedOptions.map(o => o.value).join(' · ')} – {parseFloat(item.price.amount).toFixed(0)}€
                    </p>
                    <p className="text-sm font-sans font-bold mt-0.5">
                      {(() => {
                        const weightMatch = item.selectedOptions.map(o => o.value).join('').match(/(\d+)\s*g/i);
                        const grams = weightMatch ? parseInt(weightMatch[1], 10) : null;
                        const price = parseFloat(item.price.amount);
                        if (grams && grams > 0) {
                          const perKg = (price / grams) * 1000;
                          return `${perKg.toFixed(0).replace('.', ',')} €/kg`;
                        }
                        return `${price.toFixed(2).replace('.', ',')} €`;
                      })()}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="p-1 rounded border border-border hover:bg-muted transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-sans w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="p-1 rounded border border-border hover:bg-muted transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
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
                <span className="font-semibold">{items[0]?.price.currencyCode || '$'} {totalPrice.toFixed(2)}</span>
              </div>
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
                Shipping calculated at checkout
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
