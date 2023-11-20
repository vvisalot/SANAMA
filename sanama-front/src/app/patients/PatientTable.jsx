import AdvancedTable from "@/components/table/Table"
import TableOptions from "@/components/table/TableOptions"
import React from "react"



const PatientTable = ({ data, options }) => {
  const columns = React.useMemo(() => [
    {
      accessorKey: "idPersona",
      header: "ID",
      enableSorting: true,
    },

    {
      accessorKey: "patientName",
      header: "Nombre completo",
      enableSorting: true,
    },
    {
      accessorKey: "dni",
      header: "DNI",
      enableSorting: true,
    },
    {
      accessorKey: "birthdate",
      header: "Fecha de nacimiento",
      enableSorting: true,
    },
    {
      accessorKey: "phone",
      header: "Teléfono",
      enableSorting: true,
    },
    {
      accessorKey: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        return (
          <TableOptions id={row.original.idPersona} options={options} />
        )
      }
    },
  ], []
  )
  return (
    <AdvancedTable
      columns={columns}
      data={data}
      id={"idPersona"}
    />
  )
}

export default PatientTable
