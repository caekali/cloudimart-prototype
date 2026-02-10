import { BASE_URL } from "@/constants/base_url";

export interface DeliveryData {
  location: string;
  phone: string;
}

export interface OrderResponse {
  order_id: string;
  message: string;
}

export async function createOrder(
  items: { id: string; quantity: number }[],
  deliveryData: DeliveryData
): Promise<OrderResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // const res = await fetch(`${BASE_URL}/checkout/order`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ items, location: deliveryData.location, phone: deliveryData.phone }),
  // });

  // if (!res.ok) {
  //   const error = await res.json();
  //   throw new Error(error.message || 'Order creation failed');
  // }

  // return res.json();
  return {
    'message' : "sucesss",
    'order_id': 'CLM-MZU-2026-00045'
  }
}
