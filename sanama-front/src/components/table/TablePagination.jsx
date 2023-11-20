const TablePagination = ({ table }) => {
    return (
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
                <div>Página</div>
                <strong>
                    {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </strong>
            </span>
            <span className="flex items-center gap-1">
                | Ir a la página:
                <input
                    type="number"
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        table.setPageIndex(page)
                    }}
                    className="border p-2 rounded w-16"
                />
            </span>
            <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                    table.setPageSize(Number(e.target.value))
                }}
                className="rounded"
            >
                {[10, 20, 30, 40].map((pageSize) => (
                    <option key={pageSize} value={pageSize} >
                        Mostrar {pageSize}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default TablePagination