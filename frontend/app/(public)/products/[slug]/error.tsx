"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  useEffect(() => {
    console.error("Logged Error:", error);
  }, [error]);

  const router = useRouter();

   const handleRetry = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };
  return (
    <div className="p-6 border border-red-200 rounded-lg bg-red-50">
      <h2 className="text-xl font-semibold text-red-700">
        Something went wrong!
      </h2>
      <p className="text-red-600 mb-4">
        {error.message || "Failed to load product data."}
      </p>
      <button
        onClick={handleRetry}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}
