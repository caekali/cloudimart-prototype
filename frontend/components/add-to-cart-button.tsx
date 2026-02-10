"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";
import Button from "@/components/ui/button";
import { Product } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <Button className="flex items-center justify-center gap-2 w-full" onClick={() => addItem(product)}>
      <ShoppingCart size={24} /> Add to Cart
    </Button>
  );
}
