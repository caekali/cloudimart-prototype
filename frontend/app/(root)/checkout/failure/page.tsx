"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";

function FailureContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden text-center">
        <div className="bg-red-50 p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-critical" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Failed</h1>
          <p className="text-gray-600 mt-2">
            We couldn't process your payment.
          </p>
        </div>

        <div className="p-8 space-y-6">
          <p className="text-sm text-gray-500">
            This could be due to insufficient funds, a network timeout, or a
            cancelled transaction. No funds have been deducted.
          </p>

          <div className="space-y-3">
            <Link
              href="/checkout"
              className="block w-full py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Retry Payment
            </Link>
            <Link
              href="/"
              className="block w-full py-3 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FailurePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FailureContent />
    </Suspense>
  );
}
