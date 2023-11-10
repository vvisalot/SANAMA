import Table from "@/components/table/Table"

// Columns for the Laboratory table
const columns = [
    { name: "Fecha actualización" },
    { name: "Médico prescriptor" },
    { name: "Muestra" },
    { name: "Estado" },
    { name: "Opciones" }
]

const LaboratoryTable = ({ data, id }) => {
    
    return (
        <Table columns={columns} data={data} url={`/patients/profile/${id}/lab-results`} iconName="fa fa-file" />
    )
}

export default LaboratoryTable