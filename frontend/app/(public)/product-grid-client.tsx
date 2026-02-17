"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { getProducts } from "@/api/products"
import { Product } from "@/types/product"
import ProductCard from "@/components/product-card"
import ProductSkeleton from "@/components/product-card-skeleton"

interface Props {
  initialProducts: Product[]
  initialCursor: string | null
  category?: string
}

export default function ProductGridClient({
  initialProducts,
  initialCursor,
  category,
}: Props) {
  const [products, setProducts] = useState(initialProducts)
  const [nextCursor, setNextCursor] = useState<string | null>(initialCursor)

  const [isPending, startTransition] = useTransition()
  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setProducts(initialProducts)
    setNextCursor(initialCursor)
  }, [initialProducts, initialCursor])

  const loadMore = () => {
    if (!nextCursor || isPending) return

    startTransition(async () => {
      const res = await getProducts(category, nextCursor)

      setProducts((prev) => {
        const ids = new Set(prev.map((p) => p.id))
        return [...prev, ...res.products.filter((p) => !ids.has(p.id))]
      })

      setNextCursor(res.nextCursor)
    })
  }

  useEffect(() => {
    if (!observerRef.current || !nextCursor) return

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && loadMore(),
      { rootMargin: "300px" }
    )

    observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [nextCursor, isPending])

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {isPending &&
          Array.from({ length: 4 }).map((_, i) => (
            <ProductSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {nextCursor && <div ref={observerRef} className="h-1" />}
    </>
  )
}
