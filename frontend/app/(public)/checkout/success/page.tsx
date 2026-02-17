import {  Suspense } from "react";
import {  redirect } from "next/navigation";
import OrderSummary from "./order-summary";
import Loading from "./loading";

export  default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ tx_ref?: string }>;
}) {

   const { tx_ref } = await searchParams;

  if (!tx_ref) {
    redirect("/");
  }

  return (
    <Suspense fallback={<Loading/>}>
      <OrderSummary tx_ref={tx_ref} />
    </Suspense>
  );
}
