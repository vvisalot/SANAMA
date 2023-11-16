"use client";
import { useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import NextBreadcrumb from "@/components/NextBreadcrumb";
import Sidebar from "@/components/sidebar/Sidebar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);
  };

  const mainContentClass = isSidebarOpen ? "ml-64" : "ml-16";

  return (
    <html lang="en">
      <head>
        <title>Sanama</title>
      </head>

      <body className={`${inter.className} w-auto h-screen`}>
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main className={`${mainContentClass} bg-[#EFEFEF] h-fill`}>
          <NextBreadcrumb
            homeElement={"Inicio"}
            separator={<span>/</span>}
            activeClasses="text-gray-700 font-bold text-md"
            containerClasses="flex py-5 bg-transparent rounded-t-md"
            listClasses="px-4 text-md text-slate-200 hover:text-blue-700"
            capitalizeLinks
          />
          {children}
          <Toaster position="top-right" richColors />
        </main>
      </body>
    </html>
  );
}
