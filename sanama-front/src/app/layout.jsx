'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import NextBreadcrumb from '@/components/NextBreadcrumb'
import { Toaster } from 'sonner'
import Navbar from '@/components/navbar/Navbar'
import { MdArrowBack } from 'react-icons/md'
const inter = Inter({ subsets: ['latin'] })
import { useRouter } from "next/navigation"
export default function RootLayout({ children }) {
	const router = useRouter()
	return (
		<html lang="es">
			<head>
				<title>Sanama</title>
			</head>

			<body className={`${inter.className} bg-[#EFEFEF] w-auto h-screen`}>
				<Navbar />
				<main className={`h-screen`}>
					<div className="grid grid-cols-[1fr_10fr_1fr]">
						<div></div>
						<div>
							{
								<NextBreadcrumb
									homeElement={''}
									separator={<span>/</span>}
									activeClasses="text-gray-700 font-extrabold text-md"
									containerClasses="flex py-5 bg-transparent rounded-t-md text-black"
									listClasses="px-4 text-md text-slate-700 hover:text-blue-700"
									capitalizeLinks
								/>
							}
							<div className="flex justify-start pl-10">
								<button
									type="button"
									className="text-black hover:bg-gray-300 hover:underline font-medium rounded-lg text-sm px-2 py-2 flex items-center"
									onClick={() => router.back()}>
									<MdArrowBack className="mr-2 h-5 w-5" />
									Volver
								</button>
							</div>
							{children}
						</div>
						<div></div>
					</div>
					<Toaster position="top-right" richColors visibleToasts={12} />
				</main>
			</body>
		</html>
	)
}
