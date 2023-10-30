import TableRow from "./TableRow"

const TableBody = ({ data, url, optionsText }) => {
  return (
    <tbody className="border-2 border-gray-200">
      {data.map((row, index) => {
        return (
          <TableRow key={index} row={row} url={url} optionsText={optionsText} />
        )
      })}
    </tbody>
  )
}

export default TableBody
