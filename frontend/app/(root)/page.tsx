"use client";

import { useEffect, useMemo, useState } from "react";
import { PRODUCTS } from "@/constants/products";
import ProductCard from "@/components/product-card";
import { useCart } from "../../context/cart-context";
import { HomeHeader } from "@/components/home-header";
import { getProducts } from "@/api/products";
import { Product } from "@/types/product";

export default function HomePage() {
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <HomeHeader />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
  
          />
        ))}
      </div>
    </div>
  );
}
