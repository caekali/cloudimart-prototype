import Link from "next/link";

interface OrderSummaryProps {
  subtotal: number;
}

export default function OrderSummary({ subtotal }: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium">MWK {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery Fee</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
        <div className="border-t pt-4 flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>MWK {subtotal.toLocaleString()}</span>
        </div>
      </div>

      <Link
        href="/checkout"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-md px-4 py-2 rounded font-semibold transition duration-200 ease-in-out text-lg block text-center"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
