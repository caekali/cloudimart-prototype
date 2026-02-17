"use client";

import { Product } from "@/types/product";
import { ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import Button from "./ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { data: session } = useSession();
  const user = session?.user;

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isCustomerOrGuest = !user || user.role === "customer";
  // const isAdmin = user?.role === "admin";
  // const isDelivery = user?.role === "delivery";

  const handleAddToCart = async () => {
    if (!session) {
      router.push(`/signin?callbackUrl=${window.location.pathname}`);
      return;
    }

    try {
      setLoading(true);
      await addItem(product.id);
    } catch (err) {
      console.error("Failed to add item to cart:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <Link
          href={`/products/${product.slug}`}
          className="text-gray-800 font-medium text-sm mb-1 line-clamp-2 h-10 hover:underline"
        >
          {product.name}
        </Link>


        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-orange-600">
              MWK {product.price.toLocaleString()}
            </span>
          </div>

          {isCustomerOrGuest && (
            <Button
              className="w-full flex items-center justify-center gap-2"
              onClick={handleAddToCart}
              disabled={loading}
            >
              {loading ? (
                <span className="text-sm">Adding...</span>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span className="text-sm">Add to Cart</span>
                </>
              )}
            </Button>
          )}

          {/* {isAdmin && (
            <div className="mt-2 flex gap-2">
              <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                Edit
              </button>
              <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
