import Table from "@/components/table/Table"
import LaboratoryProfile from './../../../../laboratories/profile/[idLaboratory]/page';

// Columns for the Laboratory table
const columns = [
    { name: "Fecha actualización" },
    { name: "Médico prescriptor" },
    { name: "Muestra" },
    { name: "Estado" },
    { name: "Opciones" }
]

const LaboratoryTable = ({ data }) => {
    return (
        <Table columns={columns} data={data} url="/patients/profile/${id}" iconName="fa fa-file" />
    )
}

export default LaboratoryTable