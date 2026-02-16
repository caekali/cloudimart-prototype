"use client";

import Image from "next/image";
import cloudimartIcon from "../public/cloudimart.png";
import Link from "next/link";

import { useCart } from "@/context/cart-context";

import SearchBar from "./search-bar";
import CartIcon from "./cart-icon";
import UserMenu from "./user-menu";

export function NavBar({ session }: { session: any }) {
  const { cart } = useCart();
  return (
    <header className="sticky top-0 z-40 bg-background border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center h-full w-36">
          <Image
            src={cloudimartIcon}
            alt="Cloudimart"
            width={140}
            height={40}
            priority
          />
        </Link>

        <SearchBar />

        <div className="flex items-center gap-2">
          <CartIcon count={cart?.items.length ?? 0} />
          <UserMenu user={session?.user ?? null} />
        </div>
      </div>
    </header>
  );
}
