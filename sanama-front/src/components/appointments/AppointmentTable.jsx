import React from "react"
import TableOptions from "../table/TableOptions"
import AdvancedTable from "../table/Table"

const AppointmentTable = ({ data, options }) => {
  const columns = React.useMemo(() => [
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
    {
      id: "expander",
      header: "Acciones",
      cell: ({ row }) => {
        return (
          <TableOptions id={row.original.idCita} options={options} />
        )
      },
    },
  ], []
  )


  return (
    <div className="">
      <AdvancedTable columns={columns} data={data} />
    </div>

  )
}

export default AppointmentTable
