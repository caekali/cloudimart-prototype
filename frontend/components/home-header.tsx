import Link from "next/link";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";

const TOP_CATEGORIES = [
  { label: "Groceries", value: "Groceries" },
  { label: "Stationery", value: "Stationery" },
  { label: "Electronics", value: "Electronics" },
];

// Example full list of categories
const ALL_CATEGORIES = [
  "Groceries",
  "Stationery",
  "Electronics",
  "Books",
  "Snacks",
  "Clothing",
  "Accessories",
];

export function HomeHeader() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="rounded-xl border bg-muted/30 p-6 space-y-4 relative">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-semibold">Shop Essentials</h1>
        <p className="text-sm text-muted-foreground">
          Popular categories for students
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap items-center gap-3 relative">
        {/* Top 3 categories */}
        {TOP_CATEGORIES.map((category) => {
          const isActive = activeCategory === category.value;

          return (
            <Link
              key={category.value}
              href={`/?category=${category.value}`}
              className={clsx(
                "px-4 py-2 rounded-md text-sm font-medium transition",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border hover:bg-muted"
              )}
            >
              {category.label}
            </Link>
          );
        })}

        {/* All Categories hover button */}
        <div
          className="ml-auto relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button className="px-4 py-2 rounded-md text-sm font-medium border bg-background hover:bg-muted transition">
            All Categories
          </button>

          {/* Dropdown menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
              <ul className="py-2">
                {ALL_CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <Link
                      href={`/?category=${cat}`}
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
