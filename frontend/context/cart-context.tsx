"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useSession } from "next-auth/react";
import { CartState } from "@/types/cart";
import { cartService } from "@/api/cart";


interface CartContextValue {
  cart: CartState;
  totalItems: number;
  subtotal: number;
  refreshCart: () => Promise<void>;
  addItem: (productId: string) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
}

type CartAction =
  | { type: "HYDRATE_CART"; payload: CartState }
  | { type: "CLEAR_CART" };

const CartContext = createContext<CartContextValue | undefined>(undefined);

function cartReducer(_: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE_CART":
      return action.payload;
    case "CLEAR_CART":
      return { items: [] };
    default:
      return { items: [] };
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });
  const { data: session } = useSession();
  const token = session?.token; // or however you set your token in jwt callback

  const totalItems = cart.items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = cart.items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const refreshCart = async () => {
    if (!token) return;
    const cartData = await cartService.getCart(token);
    dispatch({ type: "HYDRATE_CART", payload: cartData });
  };

  const addItem = async (productId: string) => {
    if (!token) throw new Error("User not authenticated");
    const cartData = await cartService.addItem(productId, token);
    dispatch({ type: "HYDRATE_CART", payload: cartData });
  };

  const removeItem = async (itemId: string) => {
    if (!token) throw new Error("User not authenticated");
    const cartData = await cartService.removeItem(itemId, token);
    dispatch({ type: "HYDRATE_CART", payload: cartData });
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!token) throw new Error("User not authenticated");
    const cartData = await cartService.updateQuantity(itemId, quantity, token);
        console.log(cartData)

    dispatch({ type: "HYDRATE_CART", payload: cartData });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // Hydrate cart when session changes
  useEffect(() => {
    if (token) refreshCart();
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        subtotal,
        refreshCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
