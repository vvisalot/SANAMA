import Table from "@/components/table/Table"

const columns = [
    { name: "Nombre completo" },
    { name: "CMP" },
    { name: "Especialidad" },
    { name: "Area" },
    { name: "Opciones" }
]

const DoctorTable = ({ data }) => {
    return (
        <Table columns={columns} data={data} url="doctors/profile" optionsText="Ver perfil" />
    )
}
export default DoctorTable