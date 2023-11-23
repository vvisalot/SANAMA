"use client"

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import TablePagination from "./TablePagination"

const AdvancedTable = ({ data, id, columns }) => {
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility: {
        [id]: false,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div>
      <TablePagination table={table} />
      <div className="relative shadow-md sm:rounded-lg">
        <table className="table-fixed min-w-full">
          <thead className="border-gray-200 border-2 text-left text-md tracking-wider text-blue-50 uppercase bg-[#28539E]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sortingState = header.column.getIsSorted()
                  let sortingIndicator
                  if (sortingState === "asc") {
                    sortingIndicator = " 🔼"
                  } else if (sortingState === "desc") {
                    sortingIndicator = " 🔽"
                  }
                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={`px-4 py-4 w-fit`}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {sortingIndicator}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody className="border-2 border-gray-200 text-ellipsis overflow-hidden">
            {table.getRowModel().rows.length > 0 ?
              (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`px-4 py-4 text-gray-900  min-w-[80px] max-w-[150px] bg-white border-b`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) :
              <tr className="bg-white w-fullh-[500px] flex justify-center">
                <img src="/no-table-data.jpg" className="object-cover w-[500px] h-[500px]"></img>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdvancedTable
