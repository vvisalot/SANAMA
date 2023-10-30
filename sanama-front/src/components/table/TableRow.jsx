import { Fragment } from "react"
import TableCell from "./TableCell"
import TableOptions from "./TableOptions"

const TableRow = ({ row, url, optionsText }) => {

    return (
        <tr className="bg-white border-b ">
            {row.map((cell, index) => {
                if (index != 0) {
                    if (index === row.length - 1) {
                        return (
                            <Fragment key={index}>
                                <TableCell data={cell.data} />
                                {url.length > 0 ? <TableOptions id={parseInt(row[0].data)} url={url} text={optionsText} />
                                    : null}
                            </Fragment>
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