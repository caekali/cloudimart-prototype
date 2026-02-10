"use client";

import Image from "next/image";
import cloudimartIcon from "../public/cloudimart.png";
import Link from "next/link";
import { Search, ShoppingCart, User, LogOut, X } from "lucide-react";
import { useRef, useState } from "react";
import { useCart } from "@/context/cart-context";
import { signOut } from "next-auth/react";
import { useClickOutside } from "@/hooks/use-click-outside";
import SignoutForm from "@/app/SignoutForm";

export function NavBar({ session }: { session: any }) {
  const { cart } = useCart();
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setMenuOpen(false));
  useClickOutside(searchRef, () => setSearchOpen(false));

  const user = session?.user;
  const initials =
    user?.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .slice(0, 2) ?? "U";

  const handleSignOut = async () => {
    await signOut({ redirectTo: "/" });
  };

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center h-full w-36">
          <Image
            src={cloudimartIcon}
            alt="Cloudimart"
            className="h-full w-auto object-contain"
            priority
          />
        </Link>

        <div className="hidden md:flex flex-1 max-w-2xl items-center bg-gray-100 rounded-md overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500">
          <input
            type="text"
            placeholder="Search for essentials, textbooks, or snacks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-gray-400"
          />
          <button className="px-5 py-2.5 bg-primary text-white">
            <Search className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="md:hidden p-2 text-gray-600 hover:text-primary"
          >
            <Search className="w-6 h-6" />
          </button>

          <Link
            href="/shoppingcart"
            className="relative p-2 text-gray-600 hover:text-primary"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
              {cart.items.length}
            </span>
          </Link>

          {user && (
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary text-white text-xs font-semibold flex items-center justify-center">
                    {initials}
                  </div>
                )}

                <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[120px] truncate">
                  {user.name}
                </span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-md border border-gray-200 bg-white shadow-md overflow-hidden">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {searchOpen && (
        <div
          ref={searchRef}
          className="md:hidden border-t border-border bg-background px-4 py-3 flex items-center gap-2"
        >
          <input
            autoFocus
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-gray-100 px-4 py-2 rounded-md text-sm outline-none"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="p-2 text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </header>
  );
}
