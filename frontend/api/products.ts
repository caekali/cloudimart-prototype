import { BASE_URL } from "@/constants/base_url";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types/product";


export async function getProducts(): Promise<Product[]> {
  // const res = await fetch(`${BASE_URL}/products'`);
  // if (!res.ok) throw new Error('Failed to fetch products');
  // return res.json();
  return PRODUCTS
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  // const res = await fetch(`/api/products/${id}`);
  // if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
  // return res.json();
  // const product = PRODUCTS.find((p) => p.slug === slug)
  // if(!product) throw new Error('Product not found');

  return new Promise((resolve) => {
    const product = PRODUCTS.find((p) => p.slug === slug);
    setTimeout(() => resolve(product), 2000);
  });
  return PRODUCTS.find((p) => p.slug === slug)

}

