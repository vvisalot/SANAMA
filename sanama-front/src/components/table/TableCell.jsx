const TableCell = ({ data, className }) => {
    return (
        <td scope="row" className={`px-6 py-4 text-gray-900 whitespace-nowrap ${className}`}>
            {data}
        </td>
    )
}

export default TableCell
