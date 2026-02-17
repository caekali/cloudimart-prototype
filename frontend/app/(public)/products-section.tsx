import { getProducts } from "@/api/products"
import ProductsGrid from "./product-grid-client"

export default async function ProductsSection() {
  const initial = await getProducts()

  return (
    <ProductsGrid
      initialProducts={initial.products}
      initialCursor={initial.nextCursor}
    />
  )
}
