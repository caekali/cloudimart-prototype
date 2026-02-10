"use client";

import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";
import React, { createContext, useContext, useReducer, ReactNode } from "react";



interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "INCREMENT_ITEM"; payload: string }
  | { type: "DECREMENT_ITEM"; payload: string }
  | { type: "CLEAR_CART" };

const CartContext = createContext<
  | {
      cart: CartState;
      totalItems: number;
      subtotal: number;
      addItem: (product: Product) => void;
      removeItem: (id: string) => void;
      incrementItem: (id: string) => void;
      decrementItem: (id: string) => void;
      clearCart: () => void;
    }
  | undefined
>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "INCREMENT_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };
    case "DECREMENT_ITEM":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        subtotal,
        addItem: (product) => dispatch({ type: "ADD_ITEM", payload: product }),
        removeItem: (id) => dispatch({ type: "REMOVE_ITEM", payload: id }),
        incrementItem: (id) =>
          dispatch({ type: "INCREMENT_ITEM", payload: id }),
        decrementItem: (id) =>
          dispatch({ type: "DECREMENT_ITEM", payload: id }),
        clearCart: () => dispatch({ type: "CLEAR_CART" }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
