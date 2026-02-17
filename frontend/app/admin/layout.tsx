import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminNavbar from "./admin-navbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session?.user?.role !== "admin") {
    redirect("/unauthorized");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      <main className="p-6 flex-1">{children}</main>
    </div>
  );
}
