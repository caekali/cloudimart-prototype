"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { Category } from "@/types/category";

export default function MobileCategoryDrawer({
  categories,
  activeCategory,
}: {
  categories: Category[];
  activeCategory?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl"
      >
        <Menu size={18} />
        Categories
      </button>

      {open && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          <div className="relative w-64 bg-white h-full shadow-lg p-6 z-50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg">Categories</h2>
              <button onClick={() => setOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "block px-4 py-2 rounded-xl",
                    !activeCategory
                      ? "bg-yellow-500 text-white"
                      : "hover:bg-yellow-100",
                  )}
                >
                  All Products
                </Link>
              </li>

              {categories.map((category) => {
                const isActive = activeCategory === category.name;

                return (
                  <li key={category.name}>
                    <Link
                      href={`/products?category=${category.name}`}
                      onClick={() => setOpen(false)}
                      className={clsx(
                        "block px-4 py-2 rounded-xl",
                        isActive
                          ? "bg-yellow-500 text-white"
                          : "hover:bg-yellow-100",
                      )}
                    >
                      {category.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
