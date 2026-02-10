import { BASE_URL } from "@/constants/base_url";
import { CATEGORIES } from "@/data/products";
import { ApiResponse } from "@/types/api_response";
import { Category } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  // const res = await fetch(`${BASE_URL}/products'`);
  // if (!res.ok) throw new Error('Failed to fetch products');
  // return res.json();
  return CATEGORIES
}

export async function getCategoriess(): Promise<ApiResponse<Category[]>> {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}