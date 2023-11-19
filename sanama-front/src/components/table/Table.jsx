import React, { memo } from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = memo(
  ({ columns, data, url, optionsText, iconName, requestSort, sortConfig }) => (
    <table className="table-fixed w-full">
      <TableHeader
        columns={columns}
        requestSort={requestSort}
        sortConfig={sortConfig}
      />
      <TableBody
        data={data}
        url={url}
        optionsText={optionsText}
        iconName={iconName}
      />
    </table>
  )
);

export default Table;
