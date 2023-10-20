const TableRow = ({ row }) => {

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            {row.map((cell, index) => {
                if (index != 0) {
                    if (index == 1) {
                        return (
                            <td key={index} scope="row" className="px-6 py-4 ">
                                {cell.data}
                            </td>
                        )
                    } else {
                        return (
                            <td key={index} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {cell.data}
                            </td>
                        )
                    }
                }
            }
            )}
        </tr>
    )
}


export default TableRow