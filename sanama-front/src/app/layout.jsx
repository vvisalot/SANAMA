"use client";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import NextBreadcrumb from "@/components/NextBreadcrumb";
import Sidebar from "@/components/sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);
  };

  const mainContentClass = isSidebarOpen ? "ml-64" : "ml-10";

  return (
    <html lang="en">
      <head>
        <title>SANAMA</title>
      </head>
      <body
        className={`${inter.className} flex  transition-all ease-linear duration-300`}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main
          className={`min-h-screen box-border w-full border-[36px] border-slate-300 bg-slate-200 rounded-t-lg ${mainContentClass}`}
        >
          <NextBreadcrumb
            homeElement={"Home"}
            separator={<span> | </span>}
            activeClasses="text-white font-bold"
            containerClasses="flex py-5 bg-gradient-to-r from-primary-light-periwinkle to-primary-dusk-blue rounded-t-lg"
            listClasses="px-10 text-white hover:text-blue-700"
            capitalizeLinks
          />
          {children}
        </main>
      </body>
    </html>
  );
}
