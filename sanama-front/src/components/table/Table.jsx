import React, { memo } from "react"
import TableBody from "./TableBody"
import TableHeader from "./TableHeader"

const Table = ({
  columns,
  data,
  options = [],
  requestSort,
  sortConfig
}) => (
  <table className="table-fixed w-full">
    <TableHeader
      columns={columns}
      requestSort={requestSort}
      sortConfig={sortConfig}
    />

    <TableBody
      data={data}
      options={options}
    />
  </table>
)


export default Table
