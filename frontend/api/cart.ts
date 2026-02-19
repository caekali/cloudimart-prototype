import { BASE_URL } from "@/constants/base_url";
import { CartState } from "@/types/cart";
import { apiFetch } from "./client";
import { ApiError } from "@/types/api_response";

export const cartService = {
  async getCart(token: string): Promise<CartState> {
    const res = await apiFetch<CartState>(`${BASE_URL}/me/cart`, {}, token);

    if (!res.data) {
      throw new ApiError("Cart data missing", 500);
    }

    return res.data;
  },

  async addItem(productId: string, token: string): Promise<CartState> {
    const res = await apiFetch<CartState>(
      `${BASE_URL}/me/cart/items`,
      {
        method: "POST",
        body: JSON.stringify({
          product_id: productId,
          quantity: 1,
        }),
      },
      token
    );

    if (!res.data) {
      throw new ApiError("Cart data missing after addItem", 500);
    }

    return res.data;
  },

  async updateQuantity(
    itemId: string,
    quantity: number,
    token: string
  ): Promise<CartState> {

    const res = await apiFetch<CartState>(
      `${BASE_URL}/me/cart/items/${itemId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ quantity }),
      },
      token
    );

    if (!res.data) {
      throw new ApiError("Cart data missing after updateQuantity", 500);
    }

    return res.data;
  },

  async removeItem(itemId: string, token: string): Promise<CartState> {
    const res = await apiFetch<CartState>(
      `${BASE_URL}/me/cart/items/${itemId}`,
      { method: "DELETE" },
      token
    );

    if (!res.data) {
      throw new ApiError("Cart data missing after removeItem", 500);
    }

    return res.data;
  },
};
