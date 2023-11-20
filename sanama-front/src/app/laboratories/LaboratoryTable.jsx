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

const options = [
    {
        text: "Ver laboratorio",
        link: "/laboratories/profile",
        icon: "fa fa-file",
    },
]

const LaboratoryTable = ({ data }) => {
    return (
        <Table
            columns={columns}
            data={data}
            options={options}
        />
    )
}

export default LaboratoryTable
