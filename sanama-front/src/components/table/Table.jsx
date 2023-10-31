import React, { memo } from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = memo(
  ({ columns, data, url, optionsText, requestSort, sortConfig }) => (
    <table className="w-full">
      <TableHeader
        columns={columns}
        requestSort={requestSort}
        sortConfig={sortConfig}
      />
      <TableBody
        data={data}
        nColumns={columns.length}
        url={url}
        optionsText={optionsText}
      />
    </table>
  )
);

export default Table;
