const TableHeader = ({ columns, requestSort, sortConfig }) => {
  //console.log("headers",columns)
  return (
    <thead className="border-gray-200 border-2 text-left text-[16px] text-gray-700 uppercase bg-gray-50">
      <tr>
        {columns.map((column, index) => {
          if (column.visible != null && !column.visible) return null
          else {
            return column.sortable ? (
              <th
                key={index}
                scope="col"
                className="px-6 py-6 cursor-pointer"
                onClick={() => requestSort(column.sortKey)}
              >
                {column.name}
                {sortConfig.key === column.sortKey
                  ? sortConfig.direction === "ascending"
                    ? "↓"
                    : "↑"
                  : null}
              </th>
            ) : (
              <th key={index} scope="col" className="px-6 py-6">
                {column.name}
              </th>
            )
          }
        }

        )}
      </tr>
    </thead>
  )
}

export default TableHeader
