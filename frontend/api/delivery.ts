import { BASE_URL } from "@/constants/base_url";
import { DeliveryDetail, DeliveryListItem } from "@/types/delivery";
import { apiFetch } from "./client";
import { ApiResponse } from "@/types/api_response";




export async function getDeliveries(
    token: string
): Promise<DeliveryListItem[]> {
    const res = await apiFetch<DeliveryListItem[]>(`${BASE_URL}/deliveries`, {
        cache: "no-store",
    }, token)

    return res.data ?? []
}

export async function getDeliveryDetail(
    deliveryId: string,
    token: string
): Promise<DeliveryDetail | undefined> {
    const res = await apiFetch<DeliveryDetail>(`${BASE_URL}/deliveries/${deliveryId}`, {
        cache: "no-store",
    }, token)

    return res.data
}


export async function confirmDelivery(
    orderId: string,
    collectorPhone: string,
    token: string
): Promise<ApiResponse<void>> {
    const res = await apiFetch<void>(`${BASE_URL}/deliveries/confirm`, {
        method:"POST",
        cache: "no-store",
        body: JSON.stringify({
            order_id: orderId,
            collector_phone: collectorPhone,
        }),
    }, token)

    return res
}
