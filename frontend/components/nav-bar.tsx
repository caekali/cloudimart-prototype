"use client";

import Image from "next/image";
import cloudimartIcon from "../public/cloudimart.png";
import Link from "next/link";
import { Search, ShoppingCart, X } from "lucide-react";
import { useState, useMemo } from "react";
import { useCart } from "@/context/cart-context";

export function NavBar() {
  const { cart } = useCart();
  const [search, setSearch] = useState("");
  return (
    <header className="bg-background shadow-sm border-b border-border sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="w-50 h-full">
          <Link href={"/"}>
            <Image
              src={cloudimartIcon}
              alt="Cloudimart"
              className="h-full w-full"
            />
          </Link>
        </div>
        <div className="grow max-w-2xl flex items-center bg-gray-100 rounded-md overflow-hidden border border-gray-200 group focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 transition-all">
      
          <input
            type="text"
            placeholder="Search for essentials, textbooks, or snacks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent grow px-4 py-2.5 text-sm outline-none placeholder:text-gray-400"
          />
          <button className="bg-primary hover:bg-primary/80 text-white px-5 py-2.5 transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>

        <Link
          href="/shoppingcart"
          className="relative text-gray-600 hover:text-primary transition-colors p-2 ml-1"
        >
          <ShoppingCart className="w-6 h-6" />
         
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
              {cart.items.length}
            </span>
        </Link>
      </div>
    </header>
  );
}
