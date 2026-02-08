import { BASE_URL } from "@/constants/base_url";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types/product";


export async function getProducts(): Promise<Product[]> {
  // const res = await fetch(`${BASE_URL}/products'`);
  // if (!res.ok) throw new Error('Failed to fetch products');
  // return res.json();
  return PRODUCTS
}


