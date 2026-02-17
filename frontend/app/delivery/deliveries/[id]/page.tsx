import { getDeliveryDetail } from "@/api/delivery";
import { auth } from "@/auth";
import { DeliveryDetail } from "@/types/delivery";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    id: string;
  };
}

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

export default async function DeliveryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const delivery = await getDeliveryDetail(id, session?.token);

  if (!delivery) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Order {delivery.order_id}
            </h1>
            <p className="text-sm text-gray-500">
              Placed at: {new Date(delivery.placed_at).toLocaleString()}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
              delivery.status,
            )}`}
          >
            {delivery.status}
          </span>
        </div>
      </div>

      {/* Customer + Order Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Name:</strong> {delivery.customer.name}
            </p>
            <p>
              <strong>Email:</strong> {delivery.customer.email}
            </p>
            <p>
              <strong>Collector Phone:</strong>{" "}
              {delivery.collector_phone ?? "—"}
            </p>
          </div>
        </div>

        <div className="bg-white border rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Payment Status:</strong> {delivery.payment_status}
            </p>
            <p>
              <strong>Order Status:</strong> {delivery.order_status}
            </p>
            <p className="text-lg font-bold text-gray-900 pt-2">
              Total: MWK {delivery.total_amount}
            </p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold">Order Items</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Product</th>
                <th className="px-6 py-3 text-center">Qty</th>
                <th className="px-6 py-3 text-right">Unit Price</th>
                <th className="px-6 py-3 text-right">Total</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {delivery.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 text-gray-900">{item.name}</td>

                  <td className="px-6 py-4 text-center">{item.quantity}</td>

                  <td className="px-6 py-4 text-right">{item.price}</td>

                  <td className="px-6 py-4 text-right font-semibold">
                    {item.total_price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
