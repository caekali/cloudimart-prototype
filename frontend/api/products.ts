import { auth } from "@/auth";
import { BASE_URL } from "@/constants/base_url";
import { ApiResponse } from "@/types/api_response";
import { Product } from "@/types/product";
import { notFound } from "next/navigation";


export async function getProducts(
  cursor?: string
): Promise<{ products: Product[]; nextCursor: string | null }> {
  const session = await auth();
  const apiToken = session?.token;

  const url = new URL(`${BASE_URL}/products`)

  if (cursor) {
    url.searchParams.set("cursor", cursor)
  }

  const res = await fetch(url.toString(), {
    cache: "no-store",
    headers: { Authorization: `Bearer ${apiToken}` }
  })

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  const json = (await res.json()) as ApiResponse<Product[]>

  if (!json.success || !json.data) {
    throw new Error(json.message || "Invalid API response")
  }

  return {
    products: json.data,
    nextCursor: json.meta?.next_cursor ?? null,
  }
}


export async function getProductBySlug(slug: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/slug/${slug}`, {
    cache: "no-store"
  });

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status}`);
  }

  const json = (await res.json()) as ApiResponse<Product>;

  if (!json.success || !json.data) {
    throw new Error(json.message || "Invalid response");
  }

  return json.data;
}



