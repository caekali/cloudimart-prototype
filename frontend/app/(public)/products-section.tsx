import { getProducts } from "@/api/products"
import ProductsGrid from "../../components/products-grid"

export default async function ProductsSection() {
  const initial = await getProducts()

  return (
    <ProductsGrid
      initialProducts={initial.products}
      initialCursor={initial.nextCursor}
    />
  )
}
