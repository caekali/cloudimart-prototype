import { CATEGORIES } from "@/data/products";
import { Category } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  // const res = await fetch(`${BASE_URL}/products'`);
  // if (!res.ok) throw new Error('Failed to fetch products');
  // return res.json();
  return CATEGORIES
}