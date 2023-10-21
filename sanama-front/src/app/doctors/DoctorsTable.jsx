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
        <div className="relative overflow-x-auto">
            <Table columns={columns} data={data} />


        </div>
    )
}
export default DoctorTable