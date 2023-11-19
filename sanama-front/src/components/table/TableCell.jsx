const TableCell = ({ data }) => {
    return (
        <td scope="row" className={`px-6 py-4`}>
            {data}
        </td>
    )
}

export default TableCell
