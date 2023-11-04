import Table from "@/components/table/Table"

//Nombre de las columnas a secas
const columns = [
  { name: "Nombre completo" },
  { name: "DNI" },
  { name: "Fecha de nacimiento" },
  { name: "Telefono" },
  { name: "Opciones" },
]

const PatientTable = ({ data }) => {
  return (
    <Table
      columns={columns}
      data={data}
      url="/patients/profile"
      optionsText="Ver perfil"
    />
  )
}

export default PatientTable
