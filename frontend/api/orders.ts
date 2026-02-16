import { BASE_URL } from "@/constants/base_url";
import { apiFetch } from "./client";
import { ApiError } from "@/types/api_response";
import { Order } from "@/types/order";

export interface DeliveryData {
  location: string;
  phone: string;
}

export interface OrderResponse {
  order_id: string;
  payment_link: string;
}


interface CheckoutPayload {
  deliveryLocationId: string;
}


export async function checkout(payload: CheckoutPayload, token: string): Promise<OrderResponse> {
  if (!payload.deliveryLocationId) {
    throw new ApiError("Delivery location is required", 400);
  }

  const res = await apiFetch<OrderResponse>(
    `${BASE_URL}/checkout`,
    {
      method: "POST",
      body: JSON.stringify({
        location_id: payload.deliveryLocationId,
      }),
    },
    token
  );



  if (!res.data) {
    throw new ApiError("Order placement failed", 500);
  }

  console.log(res.data);

  return res.data;
}



export async function getOrder(orderId: string, token: string): Promise<Order> {


  const res = await apiFetch<Order>(
    `${BASE_URL}/orders/${orderId}`,
    {
      cache: "no-store",
    }
    ,
    token
  );

  if (!res.data) {
    throw new ApiError("Failed to get order", 500);
  }

  return res.data;
}


export async function getUserOrders(token: string): Promise<Order[]> {


  const res = await apiFetch<Order[]>(
    `${BASE_URL}/me/orders`,
    {
      cache: "no-store",
    }
    ,
    token
  );

  if (!res.data) {
    throw new ApiError("Failed to get order", 500);
  }

  return res.data ?? [];
}