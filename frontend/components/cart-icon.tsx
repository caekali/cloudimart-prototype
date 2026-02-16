"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function CartIcon({ count }: { count: number }) {
  return (
    <Link
      href="/shoppingcart"
      className="relative p-2"
      aria-label="Shopping cart"
    >
      <ShoppingCart className="w-6 h-6" />

      {count > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
