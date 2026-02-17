import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import ProductDetails from "./product-details";
import { getProductBySlug } from "@/api/products";
import LoadingSkeleton from "@/app/(public)/products/[slug]/loading-skeleton";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; 
  const productPromise = getProductBySlug(slug);

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <Link
        href="/"
        className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" /> Back to Products
      </Link>

      <Suspense fallback={<LoadingSkeleton />}>
        <ProductDetails productPromise={productPromise} />
      </Suspense>
    </div>
  );
}
