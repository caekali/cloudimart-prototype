import { BASE_URL } from "@/constants/base_url";
import { ApiResponse } from "@/types/api_response";
import { Category } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
    const json = (await res.json()) as ApiResponse<Category[]>
  
    if (!json.success || !json.data) {
      throw new Error(json.message || "Invalid API response")
    }
  return json.data
 
}
