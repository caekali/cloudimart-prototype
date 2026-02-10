"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Input from "@/components/ui/form-field";

export default function DeliveryVerifyPage() {
  const [orderId, setOrderId] = useState("");
  const [collectorPhoneNumber, setCollectorPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const orderIndex = orders.findIndex((o: any) => o.id === orderId);

    if (orderIndex === -1) {
      setError("Order ID not found. Please check and try again.");
      setLoading(false);
      return;
    }

    // In a real app, we would validate phone number against the customer's record
    // For prototype, we just require it to be entered.

    // Mark as delivered
    orders[orderIndex].status = "DELIVERED";
    orders[orderIndex].deliveredAt = new Date().toISOString();
    orders[orderIndex].deliveryPhone = collectorPhoneNumber;

    localStorage.setItem("orders", JSON.stringify(orders));

    setLoading(false);
    router.push("/delivery/success");
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Delivery Verification
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Delivery staff: Enter the Order ID and collector's phone number to
          confirm delivery.
        </p>

        <form onSubmit={handleVerify} className="space-y-6">
          <Input
            id="orderId"
            label="Order ID"
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g., CLM-MZU-2026-00045"
            required
            disabled={loading}
          />

          <Input
            id="collectorPhoneNumber"
            label="Collector Phone Number"
            type="tel"
            value={collectorPhoneNumber}
            onChange={(e) => setCollectorPhoneNumber(e.target.value)}
            placeholder="e.g., 0999123456"
            required
            disabled={loading}
          />

          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Verify Delivery"}
          </button>
        </form>
      </div>
    </div>
  );
}
