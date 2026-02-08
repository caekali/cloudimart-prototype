"use client";

import { useParams } from "next/navigation";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { getProductBySlug } from "@/api/products";
import Button from "@/components/ui/button";

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProduct = await getProductBySlug(slug);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-primary mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-lg text-gray-700">Loading product details...</p>
        </div>
      </div>
    );
  }

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

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-800">Product Not Found</h1>
        <Link href="/" className="text-primary underline mt-4 block">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <Link
        href="/"
        className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" /> Back to Products
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="h-96 md:h-auto bg-gray-50 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="text-sm font-bold text-primary tracking-wider uppercase mb-2">
            {product.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-auto border-t pt-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl font-bold text-gray-900">
                MWK {product.price.toLocaleString()}
              </span>
            </div>

            <Button
              className="flex items-center justify-center gap-2 w-full"
              onClick={() => addItem(product)}
            >
              <ShoppingCart size={24} /> Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
