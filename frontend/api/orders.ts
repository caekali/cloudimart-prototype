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

export async function placeOrder(
  items: { id: string; quantity: number }[],
  deliveryData: DeliveryData
): Promise<OrderResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await apiFetch<OrderResponse>(`${BASE_URL}/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items, location: deliveryData.location, phone: deliveryData.phone }),
  });

  console.log(res)
  if (!res.data) {
    throw new Error('Order placing failed');
  }

  return res.data

  return {
    'message': "sucesss",
    'order_id': 'CLM-MZU-2026-00045'
  }
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
        delivery_location: payload.deliveryLocationId,
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