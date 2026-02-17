import Link from "next/link";
import { Product } from "@/types/product";
import AddToCartButton from "@/components/add-to-cart-button";
import { use } from "react";
import { auth } from "@/auth";

interface ProductDetailsProps {
  productPromise: Promise<Product>;
}

export default async function ProductDetails({
  productPromise,
}: ProductDetailsProps) {
  const product = await productPromise;
  const session = await auth();
  const isCustomerOrGuest = !session?.user || session?.user.role === "customer";

  return (
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
          {isCustomerOrGuest && <AddToCartButton product={product} />}
        </div>
      </div>
    </div>
  );
}
