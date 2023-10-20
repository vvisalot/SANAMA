
import TableRow from "./TableRow"

const TableBody = ({ data }) => {
    return (
        <tbody>
            {data.map((row, index) => {
                return <TableRow key={index} row={row} />
            })}
        </tbody>
    )
}

export default TableBody