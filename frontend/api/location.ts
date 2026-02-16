import { BASE_URL } from "@/constants/base_url";
import { ApiResponse } from "@/types/api_response";
import { DeliveryLocation } from "@/types/location";
import { apiFetch } from "./client";


export const DELIVERY_LOCATIONS: DeliveryLocation[] = [
  { id: "mzuni", name: "Mzuzu University", allowed: true },
  { id: "mch", name: "Mzuzu Central Hospital", allowed: true },
  { id: "luwinga", name: "Luwinga", allowed: true },
  { id: "area1b", name: "Area 1B", allowed: true },
  { id: "kaka", name: "KAKA", allowed: true },
];

export async function getDeliveryLocations(): Promise<DeliveryLocation[]> {


  const res = await apiFetch<DeliveryLocation[]>(
    `${BASE_URL}/delivery-locations`,
    {
      cache: "no-store",
    }

  );
  return res.data ?? []
}