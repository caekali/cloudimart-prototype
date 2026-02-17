'use client'

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCategories } from "@/api/categories";
import { Category } from "@/types/category";

export function HomeHeader() {
  const searchParams = useSearchParams();
  const [showDropdown, setShowDropdown] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setError(null);
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories. Please try again later.");
      } finally {
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-3 relative">
      <div
        className="relative"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <button className="px-4 py-2 text-sm transition">
          All Categories
        </button>

        {showDropdown && (
          <div className="absolute left-0 w-48 bg-white border rounded-md shadow-lg z-10">
            <ul className="py-2">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={`/products?category=${cat.name}`}
                    className="block px-4 py-2 text-sm"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
