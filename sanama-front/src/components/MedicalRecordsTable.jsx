import Table from "@/components/table/Table"
import { usePathname } from "next/navigation"

const columns = [
  // { name: "ID" },
  { name: "Código" },
  { name: "Médico" },
  { name: "Especialidad" },
  { name: "Fecha de Atención" },
  { name: "Hora de Atención" },
  { name: "Hoja medica" },
  { name: "Resultados" },
]

const MedicalRecordsTable = ({ data }) => {
  const pathname = usePathname()
  return (
    <Table
      columns={columns}
      data={data}
      url={`${pathname}/view`}
      optionsText="Ver"
    />
  )
}
export default MedicalRecordsTable
