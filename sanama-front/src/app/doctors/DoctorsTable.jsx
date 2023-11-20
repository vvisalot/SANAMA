import Table from "@/components/table/Table"

const columns = [
    { name: "Nombre completo" },
    { name: "CMP" },
    { name: "Especialidad" },
    { name: "Area" },
    { name: "Opciones" }
]

const options = [
    {
        text: "Ver perfil",
        link: "/doctors/profile",
        icon: "/icons/eye.svg"

    },
]

const DoctorTable = ({ data }) => {
    return (
        <Table
            columns={columns}
            data={data}
            options={options}
        />
    )
}
export default DoctorTable