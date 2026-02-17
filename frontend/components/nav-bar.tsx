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
  const user = session?.user;

  const isCustomerOrGuest = !user || user.role === "customer";
  const isAdmin = user?.role === "admin";
  const isDelivery = user?.role === "delivery_person";

  return (
    <header className="sticky top-0 z-40 bg-background border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center h-full w-36">
          <Image
            src={cloudimartIcon}
            alt="Cloudimart"
            width={140}
            height={40}
            
          />
        </Link>

        {isCustomerOrGuest && <SearchBar />}

        <div className="flex items-center gap-2">
          {isCustomerOrGuest && <CartIcon count={cart?.items.length ?? 0} />}

          {isAdmin && (
            <Link href="/admin/dashboard" className="text-primary underline">
              Admin Dashboard
            </Link>
          )}

          {isDelivery && (
            <Link
              href="/delivery/deliveries"
              className="text-primary underline"
            >
              Delivery Dashboard
            </Link>
          )}

          <UserMenu user={user} />
        </div>
      </div>
    </header>
  );
}
