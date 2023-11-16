import Table from "@/components/table/Table"

// Columns for the Laboratory table
const columns = [
    { name: "Código" },
    { name: "Fecha Actualización" },
    { name: "DNI" },
    { name: "Nombre completo" },
    { name: "Muestra" },
    { name: "Estado" },
    { name: "Opciones" }
]

const LaboratoryTable = ({ data }) => {
    return (
        <Table columns={columns} data={data} url="/laboratories/profile" iconName="fa fa-file" />
    )
}

export default LaboratoryTable
