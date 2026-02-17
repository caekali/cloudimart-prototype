import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "./admin-sidebar";
import AdminTopbar from "./admin-navbar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session || session?.user?.role !== "admin") {
    redirect("/unauthorized");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 flex flex-col md:ml-64">

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
