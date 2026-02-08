import Footer from "@/components/footer";
import { NavBar } from "@/components/nav-bar";
import  { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-10">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}