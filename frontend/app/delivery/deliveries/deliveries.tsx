import { getDeliveries } from "@/api/delivery";
import { auth } from "@/auth";
import { DeliveryListItem } from "@/types/delivery";
import Link from "next/link";
import React from "react";

function getStatusStyle(status: string) {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default async function Deliveries() {
  const session = await auth();
  const deliveries: DeliveryListItem[] = await getDeliveries(session?.token);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* <div className="px-6 py-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900">Deliveries</h2>
      </div> */}

      {deliveries.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3 text-center">Items</th>
                <th className="px-6 py-3 text-right">Total (MWK)</th>
                <th className="px-6 py-3 text-center">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {deliveries.map((delivery) => (
                <tr
                  key={delivery.delivery_id}
                  className="hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <Link
                      href={`/delivery/deliveries/${delivery.delivery_id}`}
                      className="block w-full h-full"
                    >
                      {delivery.order_id}
                    </Link>
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {delivery.customer_name}
                  </td>

                  <td className="px-6 py-4 text-center text-gray-600">
                    {delivery.items_count}
                  </td>

                  <td className="px-6 py-4 text-right font-semibold text-gray-900">
                    {delivery.total_amount}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                        delivery.status,
                      )}`}
                    >
                      {delivery.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">
          No new orders assigned for delivery.
        </p>
      )}
    </div>
  );
}
