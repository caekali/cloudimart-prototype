import { CheckCircle, Truck } from 'lucide-react';
import Link from 'next/link';


export default function DeliverySuccessPage() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <svg
          className="mx-auto h-24 w-24 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-6 mb-4">Delivery Confirmed!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Order ID: <span className="font-bold text-blue-600">{"orderId"}</span> has been successfully marked as delivered.
        </p>
        <p className="text-md text-gray-600 mb-8">
          The customer has received a mock SMS confirmation.
        </p>
        <Link
          href="/delivery/verify"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-b transition-colors duration-300"
        >
          Verify Another Delivery
        </Link>
      </div>

      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
            <div className="bg-green-50 p-6 rounded-full mb-6 relative">
                <Truck size={64} className="text-green-600" />
                <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full">
                    <CheckCircle size={32} className="text-green-500 bg-white rounded-full" />
                </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Delivery Verified</h1>
            <p className="text-gray-600 mb-8 max-w-sm">
                The order has been successfully marked as delivered in the system.
            </p>

            <Link href="/delivery/verify" className="bg-gray-100 text-gray-800 px-8 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                Verify Another Order
            </Link>
        </div>
    </div>
  );
}

