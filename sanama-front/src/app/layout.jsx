"use client"
import { useState } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import NextBreadcrumb from "@/components/NextBreadcrumb"
import Sidebar from "@/components/sidebar/Sidebar"
import { Toaster } from "sonner"
import Navbar from "@/components/navbar/Navbar"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // const toggleSidebar = () => {
  //   setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen)
  // }

  // const mainContentClass = isSidebarOpen ? "ml-64" : "ml-16";

  return (
    <html lang="en">
      <head>
        <title>Sanama</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.1.1/flowbite.min.css" rel="stylesheet" />
      </head>

      <body className={`${inter.className} bg-[#EFEFEF] w-auto h-screen`}>
        <Navbar />
        <main className={`h-screen`}>

          <div className="grid grid-cols-[1fr_10fr_1fr]">
            <div></div>
            <div>
              {<NextBreadcrumb homeElement={"Inicio"} separator={<span>/</span>} activeClasses="text-gray-700 font-extrabold text-md" containerClasses="flex py-5 bg-transparent rounded-t-md text-black"
                listClasses="px-4 text-md text-slate-700 hover:text-blue-700" capitalizeLinks />}

              {children}
            </div>
            <div></div>
          </div>
          <Toaster position="top-right" richColors />
        </main>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.1.1/flowbite.min.js"></script>

      </body>
    </html>
  )
}
