import Table from "@/components/table/Table"

//Nombre de las columnas a secas
const columns = [
  { name: "Nombre completo" },
  { name: "DNI" },
  { name: "Fecha de nacimiento" },
  { name: "Telefono" },
  { name: "Opciones" },
]

const options = [
  {
    text: "Ver perfil",
    link: "/patients/profile",
    icon: "/icons/eye.svg",
  },
]

const PatientTable = ({ data }) => {
  return (
    <Table
      columns={columns}
      data={data}
      options={options}
    />
  )
}

export default PatientTable
