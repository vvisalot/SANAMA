import TableRow from "./TableRow"

const TableBody = ({ data }) => {
  return (
    <tbody className="border-2 border-gray-200">
      {data.map((row, index) => {
        return (
          <TableRow key={index} row={row} />
        )
      })}
    </tbody>
  )
}

export default TableBody
