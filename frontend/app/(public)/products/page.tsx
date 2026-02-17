import CategorySidebar from "./category-sidebar";
import MobileCategoryDrawer from "./mobile-drawer";
import { getProducts } from "@/api/products";
import { getCategories } from "@/api/categories";
import ProductGridClient from "../../../components/products-grid";
import { Suspense } from "react";
import ProductSkeletonGrid from "../../../components/skeletons/products-grid-skeleton";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(category),
  ]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden lg:block w-64 border-r bg-white">
        <CategorySidebar categories={categories} activeCategory={category} />
      </aside>

      <main className="flex-1 p-6 lg:p-10">
        <div className="lg:hidden mb-6">
          <MobileCategoryDrawer
            categories={categories}
            activeCategory={category}
          />
        </div>

        <Suspense fallback={<ProductSkeletonGrid />}>
          <ProductGridClient
            initialProducts={products.products}
            initialCursor={products.nextCursor}
            category={category}
          />
        </Suspense>
      </main>
    </div>
  );
}
