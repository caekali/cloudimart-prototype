"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Package,
  Users,
  Box,
  Layers,

  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: <Home className="w-5 h-5" />,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: <Package className="w-5 h-5" />,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded shadow"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r flex flex-col z-50
          w-64 transform transition-transform duration-300
          md:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b md:hidden">
          <h1 className="font-bold text-xl">Admin Panel</h1>
          <button onClick={() => setMobileOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="hidden md:flex h-16 items-center justify-center border-b">
          <h1 className="font-bold text-xl">Admin Panel</h1>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto space-y-1">
          {sidebarItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded transition-colors duration-200
                  ${pathname === item.href ? "bg-yellow-400 text-white font-semibold" : "text-gray-700 hover:bg-yellow-100"}
                `}
                onClick={() => setMobileOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t">
          <Link href="/" className="text-sm text-gray-600 hover:underline">
            View public site
          </Link>
        </div>
      </aside>
    </>
  );
}
