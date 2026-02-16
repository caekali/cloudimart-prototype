import { BASE_URL } from "@/constants/base_url";
import { ApiError, ApiResponse } from "@/types/api_response";
import { Category } from "@/types/category";
import { apiFetch } from "./client";

export async function getCategories(): Promise<Category[]> {

  const res = await apiFetch<Category[]>(`${BASE_URL}/categories`, {
    cache: "no-store",
  })

  return res.data ?? []
}
