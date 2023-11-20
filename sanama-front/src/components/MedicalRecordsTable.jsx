import Table from "@/components/table/Table"
import { usePathname } from "next/navigation"


const columns = [
  // { name: "ID" },
  { name: "Código" },
  { name: "Médico" },
  { name: "Especialidad" },
  { name: "Fecha de Atención" },
  { name: "Hora de Atención" },
  { name: "Opciones" },
]


const options = [
  {
    text: "Ver cita",
    link: "/info",
  },

  {
    text: "Ver resultados",
    link: "/historyLabResults",
  }
]

const MedicalRecordsTable = ({ data }) => {
  const pathname = usePathname()

  const modifiedOptions = options.map((option) => ({
    ...option,
    link: `${pathname}/${option.link}`,
  }))

  return (
    <Table
      columns={columns}
      data={data}
      options={modifiedOptions}
    />
  )
}
export default MedicalRecordsTable
