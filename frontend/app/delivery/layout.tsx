import { auth } from "@/auth";

import { redirect } from "next/navigation";
import DeliveryNavbar from "./delivery-navbar";

export default async function DeliveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session?.user?.role !== "delivery_person") {
    redirect("/unauthorized");
  }

  return (
   <div className="min-h-screen flex flex-col">
      <DeliveryNavbar />
      <main className="p-6 flex-1">{children}</main>
    </div>
  );
}
