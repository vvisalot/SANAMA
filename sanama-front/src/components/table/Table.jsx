
import TableBody from "./TableBody"
import TableHeader from "./TableHeader"

const Table = ({ columns, data }) => {
    return (
        <table className="w-full" >
            <TableHeader columns={columns} />
            <TableBody data={data} />
        </table>
    )
}

export default Table