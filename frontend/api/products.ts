import { BASE_URL } from "@/constants/base_url";
import { Product } from "@/types/product";
import { apiFetch } from "./client";
import { ApiError } from "@/types/api_response";


export async function getProducts(
  category?: string,
  cursor?: string
): Promise<{ products: Product[]; nextCursor: string | null }> {

  const url = new URL(`${BASE_URL}/products`);

  if (category) {
    url.searchParams.set("category", category);
  }

  if (cursor) {
    url.searchParams.set("cursor", cursor);
  }

  const res = await apiFetch<Product[]>(url.toString(), {
    cache: "no-store",
  });

  return {
    products: res.data ?? [],
    nextCursor: res.meta?.next_cursor ?? null,
  };
}




export async function getProductBySlug(slug: string): Promise<Product> {

  const res = await apiFetch<Product>(`${BASE_URL}/products/slug/${slug}`, {
    cache: "no-store",
  })

  if (!res.data) {
    throw new ApiError(
      "Missing product",
      500
    );
  }

  return res.data
}



export async function searchProduct(
  query?: string,
  category?: string,
  cursor?: string
): Promise<{ products: Product[]; nextCursor: string | null }> {

  const url = new URL(`${BASE_URL}/products/search`);

  if (category) {
    url.searchParams.set("category", category);
  }

  if (query) {
    url.searchParams.set("q", query);

  }

  if (cursor) {
    url.searchParams.set("cursor", cursor);
  }

  const res = await apiFetch<Product[]>(url.toString(), {
    cache: "no-store",
  });

  return {
    products: res.data ?? [],
    nextCursor: res.meta?.next_cursor ?? null,
  };
}


