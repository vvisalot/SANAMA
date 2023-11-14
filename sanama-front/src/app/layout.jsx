"use client"
import { useState } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import NextBreadcrumb from "@/components/NextBreadcrumb"
import Sidebar from "@/components/sidebar/Sidebar"

const inter = Inter({ subsets: ["latin"] })


export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen)
  }

  const mainContentClass = isSidebarOpen ? "ml-64" : "ml-10"

  return (
    <html lang="en">
      <head>
        <title>SANAMA</title>
      </head>
      <body
        className={`${inter.className}  transition-all ease-linear duration-300`}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main
          className={`min-h-screen h-full w-full  min-w-screen ${mainContentClass}`}
        >
          <NextBreadcrumb
            homeElement={"Inicio"}
            separator={<span>/</span>}
            activeClasses="text-gray-700 font-bold text-md"
            containerClasses="flex py-5 bg-transparent rounded-t-md"
            listClasses="px-4 text-md text-slate-200 hover:text-blue-700"
            capitalizeLinks
          />
          {children}
        </main>
      </body>
    </html>
  )
}
