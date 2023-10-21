"use client"
import { useState } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'


import Sidebar from '@/components/sidebar/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen)
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='flex'>

          <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

          <main className="flex-auto transition-all duration-500">
            {children}
          </main>
        </div>
      </body>
    </html >
  )
}
