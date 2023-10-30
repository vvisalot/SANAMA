
import TableBody from "./TableBody"
import TableHeader from "./TableHeader"

const Table = ({ columns, data, url, optionsText }) => {
    return (
        <table className="w-full" >
            <TableHeader columns={columns} />
            <TableBody data={data} nColumns={columns.length} url={url} optionsText={optionsText} />
        </table>
    )
}

export default Table