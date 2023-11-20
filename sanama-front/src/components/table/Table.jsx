import { flexRender, getCoreRowModel, getSortedRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"

const AdvancedTable = ({ data, id, columns }) => {
  const table = useReactTable(
    {
      data,
      columns,
      state: {
        columnVisibility: {
          [id]: false
        },
      },
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    }
  )

  return (
    <div className="p-2">
      <div className="overflow-x-auto">
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`px-4 py-4 text-gray-900 whitespace-nowrap truncate min-w-[80px] max-w-[150px] bg-white border-b`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center gap-2 mt-2">
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                table.setPageIndex(page)
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}


export default AdvancedTable




{/* <TablePagination
table={table}
className="flex items-center justify-end px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-600 sm:px-6"
/> */}