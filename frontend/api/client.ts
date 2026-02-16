import { ApiError, ApiResponse } from "@/types/api_response";


export async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
  token?: string
): Promise<ApiResponse<T>> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });
  

  const body: ApiResponse<T> = await res.json();

  if (!res.ok || !body.success) {
    throw new ApiError(
      body.message || "Request failed",
      res.status,
      body.errors
    );
  }

  return body;
}
