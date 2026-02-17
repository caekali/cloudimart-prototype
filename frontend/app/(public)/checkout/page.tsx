import { Suspense } from "react";


import LoadingSkeleton from "../(public)/products/[slug]/loading-skeleton";
import CheckoutData from "./checkout-data";

export default async function CheckoutPage() {

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CheckoutData />
    </Suspense>
  );
}
