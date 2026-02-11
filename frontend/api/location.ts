import { BASE_URL } from "@/constants/base_url";
import { ApiResponse } from "@/types/api_response";
import { DeliveryLocation } from "@/types/location";


export const DELIVERY_LOCATIONS: DeliveryLocation[] = [
  { id: "mzuni", name: "Mzuzu University", allowed: true },
  { id: "mch", name: "Mzuzu Central Hospital", allowed: true },
  { id: "luwinga", name: "Luwinga", allowed: true },
  { id: "area1b", name: "Area 1B", allowed: true },
  { id: "kaka", name: "KAKA", allowed: true },
];

export async function getDeliveryLocations(): Promise<DeliveryLocation[]> {

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DELIVERY_LOCATIONS)
    }, 500);
  });

  // const res = await fetch(`${BASE_URL}/delivery-locations'`);
  // if (!res.ok) throw new Error('Failed to fetch locations');
  // const json = (await res.json()) as ApiResponse<DeliveryLocation[]>

  // if (!json.success || !json.data) {
  //   throw new Error(json.message || "Invalid API response")
  // }
  // return json.data

}