import React, { useState } from "react"
import Link from "next/link"
import "font-awesome/css/font-awesome.min.css"

const TableOptions = ({ id, options, estado }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const handleClick = () => {
    setIsLoading(true)
  }

  const handleDropdown = () => {
    setShowOptions(!showOptions)
  }

  return (
    <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
      <button id="options-dropdown-button" data-dropdown-toggle="options-dropdown" onClick={handleDropdown}
        className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      </button>

      <div id="options-dropdown" className={`${showOptions ? '' : 'hidden'} absolute z-10 w-fit bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}>
        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="options-dropdown-button">
          {options.map((option, index) => (
            <li key={index}>
              <Link href={`${option.link}/${id}`} className="flex items-center w-fit">
                <img src={option.icon} alt="" className="w-4 h-4" />
                <span className="items-center space-x-2 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{option.text}</span>
              </Link>
            </li>
          ))
          }
        </ul>
      </div>
    </td>
  )
}

const Spinner = () => (
  <div role="status">
    <svg
      aria-hidden="true"
      className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
)

export default TableOptions
