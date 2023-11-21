import Table from "@/components/table/Table"
import { usePathname } from "next/navigation"
import React from "react"
import TableOptions from "./table/TableOptions"
import AdvancedTable from "@/components/table/Table"


const MedicalRecordsTable = ({ data, options }) => {
  const columns = React.useMemo(() => [
    {
      accessorKey: "idHistory",
      header: "ID",
      enableSorting: true,
    },

    {
      accessorKey: "historyCode",
      header: "Codigo",
      enableSorting: true,
    },
    {
      accessorKey: "doctorName",
      header: "Medico",
      enableSorting: true,
    },
    {
      accessorKey: "specialty",
      header: "Especialidad",
      enableSorting: true,
    },
    {
      accessorKey: "dateTime",
      header: "Fecha y hora",
      enableSorting: true,
    },
    {
      accessorKey: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const pathname = usePathname()
        const modifiedOptions = options.map((option) => ({
          ...option,
          link: `${pathname}/${option.link}`,
        }))
        return (
          <TableOptions id={row.original.idHistory} options={modifiedOptions} />
        )
      }
    },
  ], []
  )


  return (
    <AdvancedTable
      columns={columns}
      data={data}
      id={"idHistory"}
    />
  )
}
export default MedicalRecordsTable
