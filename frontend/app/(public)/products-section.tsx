import { getProducts } from "@/api/products"
import ProductGridClient from "./product-grid-client"

export default async function ProductsSection() {
  const initial = await getProducts()

  return (
    <ProductGridClient
      initialProducts={initial.products}
      initialCursor={initial.nextCursor}
    />
  )
}
