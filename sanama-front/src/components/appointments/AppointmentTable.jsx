import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

const AppointmentTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "idCita",
        header: "ID",
        enableSorting: true,
      },
      {
        accessorKey: "codigo",
        header: "Código",
        enableSorting: true,
        width: 120,
      },
      {
        accessorKey: "date",
        header: "Fecha y hora",
        enableSorting: true,
        width: 160,
      },
      {
        accessorKey: "patientName",
        header: "Paciente",
        enableSorting: true,
        width: 240,
      },
      {
        accessorKey: "doctorName",
        header: "Doctor",
        enableSorting: true,
        width: 240,
      },
      {
        accessorKey: "specialty",
        header: "Especialidad",
        enableSorting: true,
        width: 150,
      },
      {
        accessorKey: "status",
        header: "Estado",
        enableSorting: true,
        width: 150,
      },
    ],
    []
  );

const options = [
  {
    text: "Ver Cita",
    link: "/appointments",
    icon: "/icons/eye.svg",
  },
]

function columnExists(columnName) {
  for (let i = 0; i < defaultColumns.length - 1; i++) {
    if (defaultColumns[i].name === columnName) {
      return i
    }
  }
  return -1
}

  return (
    <Table
      columns={displayColumns}
      data={sortedData}
      requestSort={requestSort}
      sortConfig={sortConfig}
      options={options}
    />
  )
}

export default AppointmentTable;
