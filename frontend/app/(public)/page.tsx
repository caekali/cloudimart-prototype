import { Suspense } from "react"
import { HomeHeader } from "@/components/home-header"
import ProductsSection from "./products-section"
import ProductsGridSkeleton from "../../components/skeletons/products-grid-skeleton"


export default function HomePage() {
  return (
    <div className="space-y-8">
      <HomeHeader />

      <Suspense fallback={<ProductsGridSkeleton />}>
        <ProductsSection />
      </Suspense>
    </div>
  )
}
