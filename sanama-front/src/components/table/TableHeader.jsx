const TableHeader = ({ columns }) => {
    return (
        <thead className="text-left text-[16px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {columns.map((column, index) =>
                    column.name !== "ID" ?
                        <th key={index} scope="col" className=" px-6 py-6">
                            {column.name}
                        </th> : null
                )}
            </tr>
        </thead>
    )
}

export default TableHeader