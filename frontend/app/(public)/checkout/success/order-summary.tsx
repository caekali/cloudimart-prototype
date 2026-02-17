import { redirect } from "next/navigation";
import { CheckCircle, Package, ArrowRight, Copy } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/button";
import { getOrder } from "@/api/orders";
import { auth } from "@/auth";



export default async function OrderSummary({
  tx_ref,
}: {
  tx_ref: string;
}) {
    const session = await auth()
  const order = await getOrder(tx_ref,session?.token);

  return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-green-50 p-8 text-center border-b border-green-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mt-2">Thank you for your purchase.</p>
        </div>

        <div className="p-8 space-y-8">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
              Order ID
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-mono font-bold text-gray-900">
                {order.order_id}
              </span>
              {/* <button
                onClick={() => navigator.clipboard.writeText(order.order_id)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
              >
                <Copy className="w-4 h-4" /> Copy
              </button> */}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-500" />
              Order Details
            </h3>
            <ul className="space-y-4 border-t border-gray-100 pt-4">
              {order.items.map((item) => (
                <li key={item.product_name} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.product_name}{" "}
                    <span className="text-gray-400">x{item.quantity}</span>
                  </span>
                  <span className="font-medium text-gray-900">
                    Mwk {item.price.toLocaleString()}
                  </span>
                </li>
              ))}
              <li className="flex justify-between text-base font-bold pt-2 border-t border-gray-200">
                <span className="text-gray-900">Total Paid</span>
                <span className="text-green-600">
                  MWK {order.total_amount.toLocaleString()}
                </span>
              </li>
            </ul>
          </div>

           <div className="bg-blue-50 p-4 rounded text-sm">
            <p>
              Delivery Location:{" "}
              <strong>{order.delivery_location}</strong>
            </p>
            <p>
              Payment Status:{" "}
              <strong>{order.payment_status.toUpperCase()}</strong>
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg text-sm text-info">
            <p>
              <strong>Next Step:</strong> You will receive a confirmation SMS at{" "}
              <strong>{order.contact.phone}</strong>. Show your Order ID to the
              delivery personnel upon arrival.
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href="/"
              className="flex-1 text-center py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Return Home
            </Link>
            <Button className="flex-1 flex items-center justify-center gap-2">
              View My Orders
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
