import { auth } from "@/auth";
import Footer from "@/components/footer";
import { NavBar } from "@/components/nav-bar";
import  { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();
  return (
    
    <div className="min-h-screen bg-gray-50 flex flex-col pb-10">
      <NavBar session={session}/>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}

// max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12