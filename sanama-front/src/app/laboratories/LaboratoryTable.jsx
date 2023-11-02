import Table from "@/components/table/Table"

// Columns for the Laboratory table
const columns = [
    { name: "ID" },
    { name: "Fecha Actualización" },
    { name: "Nombre completo" },
    { name: "DNI" },
    { name: "Examen" },
    { name: "Estado" },
    { name: "Resultados" },
    { name: "Opciones" }
]

const LaboratoryTable = ({ data }) => {
    return (
        <Table columns={columns} data={data} url="/laboratories/profile" iconName="fa fa-file"/>
    )
}

export default LaboratoryTable;
