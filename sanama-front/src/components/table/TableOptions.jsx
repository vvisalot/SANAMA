import Link from "next/link"
import "font-awesome/css/font-awesome.min.css"

const TableOptions = ({ url, id, text, iconName, estado }) => {
  // console.log("Estado recibido:", estado);
  if (estado === "3" || estado === "Cancelada") {
    return (
      <td
        scope="row"
        className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white cursor-not-allowed opacity-50"
      >
        <span
          className={`text-blue-700 hover:text-white border 
            border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800`}
        >
          <i className={`${iconName}`}></i>
          {text}
        </span>
      </td>
    )
  }

  return (
    <td
      scope="row"
      className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
    >
      <Link
        href={`${url}/${id}`}
        className={`text-blue-700 hover:text-white border 
            border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800`}
      >
        <i className={`${iconName}`}></i>
        {text}
      </Link>
    </td>
  )
}

export default TableOptions
