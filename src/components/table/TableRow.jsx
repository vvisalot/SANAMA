import TableCell from "./TableCell"
import TableOptions from "./TableOptions"

const TableRow = ({ row }) => {

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            {row.map((cell, index) => {
                if (index != 0) {
                    if (index === row.length - 1) {
                        console.log(row[0])
                        return (
                            <>
                                <TableCell key={index} data={cell.data} />
                                <TableOptions id={parseInt(row[0].data)} />
                            </>
                        )
                    } else {
                        return (
                            <TableCell key={index} data={cell.data} />
                        )
                    }
                }
            })}
        </tr>
    )
}


export default TableRow