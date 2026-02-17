import Link from "next/link";
import clsx from "clsx";
import { Category } from "@/types/category";

export default function CategorySidebar({
  categories,
  activeCategory,
}: {
  categories: Category[];
  activeCategory?: string;
}) {
  return (
    <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        Categories
      </h2>

      <ul className="space-y-2">
        <li>
          <Link
            href="/products"
            className={clsx(
              "block px-4 py-2 rounded-xl transition",
              !activeCategory
                ? "bg-gray-100 text-gray-900 font-semibold"
                : "hover:bg-gray-50 text-gray-700"
            )}
          >
            All Products
          </Link>
        </li>

        {categories.map((category) => {
          const isActive = activeCategory === category.slug;

          return (
            <li key={category.id}>
              <Link
                href={`/products?category=${category.slug}`}
                className={clsx(
                  "block px-4 py-2 rounded-xl transition",
                  isActive
                    ? "bg-gray-100 text-gray-900 font-semibold"
                    : "hover:bg-gray-50 text-gray-700"
                )}
              >
                {category.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
