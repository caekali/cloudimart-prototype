"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { useCart } from "@/context/cart-context";
import OrderSummary from "@/components/shoppingcart/order-summary";
import { CartItemRow } from "@/components/shoppingcart/cart-item";

export default function CartPage() {
  const {
    cart,
    subtotal,
    removeItem,
    clearCart,
   updateQuantity
  } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-20 bg-card rounded-2xl shadow-sm border border-border">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-gray-500 mb-8">
          Looks like you haven't added anything yet.
        </p>
        <Link
          href="/"
          className="bg-primary text-primary-foreground px-8 py-3 rounded-md hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
        >
          Start Shopping <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <Link
          className="inline-flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors font-medium"
          href="/"
        >
          <ChevronLeft />
          Continue Shopping
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Shopping Cart ({cart.items.length} items)
          </h1>

          <div className="space-y-4">
            {cart.items.map((item) => (
             <CartItemRow
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
        <OrderSummary subtotal={subtotal} />
        </div>
      </div>
    </>
  );
}
