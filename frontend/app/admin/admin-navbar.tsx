"use client";

import UserMenu from "@/components/user-menu";
import { Menu } from "lucide-react";

interface AdminTopbarProps {
  title?: string;
  user: any;
  toggleSidebar: () => void;
}

export default function AdminTopbar({ title, user, toggleSidebar }: AdminTopbarProps) {
  return (
    <header className="w-full h-16 bg-white border-b flex items-center justify-between px-4 md:hidden sticky top-0 z-30">
      <button
        onClick={toggleSidebar}
        className="p-2 rounded hover:bg-yellow-100 transition-colors duration-200"
      >
        <Menu className="w-6 h-6 text-yellow-600" />
      </button>

      <h1 className="text-lg font-semibold text-gray-800">{title ?? "Admin Panel"}</h1>
    </header>
  );
}
