"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, LogOut, ReceiptText, Truck, Wrench } from "lucide-react";
import { signOut } from "next-auth/react";

export default function UserMenu({ user }: { user: any }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!user) {
    return (
      <Link href="/signin" className="flex items-center gap-2">
        <User className="w-6 h-6" />
        <span className="text-sm">Sign in</span>
      </Link>
    );
  }

  const handleSignOut = async () => {
    await signOut({ redirectTo: "/" });
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-xs">
          {user.name?.charAt(0)}
        </div>
        {/* <span className="hidden md:block text-sm">{user.name}</span> */}
      </button>

      {open && (
        <div className="absolute right-0 top-11 mt-2 w-48 rounded-md border bg-white shadow-lg">
          <Link
            href="/account/my-orders"
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted"
          >
            <ReceiptText className="w-4 h-4" />
            My Orders
          </Link>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
