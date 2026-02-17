import React, { Suspense } from "react";
import Deliveries from "./deliveries";

export default async function Page() {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <Deliveries />
    </Suspense>
  );
}
