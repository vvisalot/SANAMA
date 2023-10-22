import Table from "@/components/table/Table"

const columns = [
    { name: "ID" },
    { name: "Nombre completo" },
    { name: "CMP" },
    { name: "Especialidad" },
    { name: "Area" },
]

const DoctorTable = ({ data }) => {
    return (
        <Table columns={columns} data={data} />
    )
}
export default DoctorTable