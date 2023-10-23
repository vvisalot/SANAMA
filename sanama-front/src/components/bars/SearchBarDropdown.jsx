"use client"

import { useState } from "react"

const SearchBarDropdown = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    return (
        <form>
            <div className="flex">
                <button id="dropdown-button" type="button" onClick={toggleDropdown} data-dropdown-toggle="dropdown"
                    className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100">
                    Todas las especialidades
                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                <div id="dropdown" className={` relative top-full left-0 mt-2 z-10 ${isDropdownOpen ? '' : 'hidden'}  bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
                    <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdown-button">
                        <li>
                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 ">Mockups</button>
                        </li>
                        <li>
                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100">Templates</button>
                        </li>
                        <li>
                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100">Design</button>
                        </li>
                        <li>
                            <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100">Logos</button>
                        </li>
                    </ul>
                </div>

                <div className="relative w-full">
                    <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300
                     focus:ring-blue-500 focus:border-blue-500" placeholder=" Search Mockups, Logos, Design Templates..." required />
                    <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>

            </div>
        </form>
    )
}

export default SearchBarDropdown
