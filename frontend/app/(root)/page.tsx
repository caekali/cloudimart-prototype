import { Suspense } from "react"
import { HomeHeader } from "@/components/home-header"
import ProductSkeletonGrid from "./products-skeleton-grid"
import ProductsSection from "./products-section"


export default function HomePage() {
  return (
    <div className="space-y-8">
      <HomeHeader />

      <Suspense fallback={<ProductSkeletonGrid />}>
        <ProductsSection />
      </Suspense>
    </div>
  )
}
