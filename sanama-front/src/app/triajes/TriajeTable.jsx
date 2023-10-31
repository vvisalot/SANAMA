
import Table from "@/components/table/Table"

//Nombre de las columnas a secas
const columns = [
    { name: "ID" },
    { name: "Fecha Actualización" },
    { name: "DNI" },
    { name: "Nombre completo" },
    { name: "Estado" },
    { name: "Urgencia" },
    { name: "Opciones" },
]

const TriajeTable = ({ data }) => {
    return (
        <Table columns={columns} data={data} url="/triajes/profile" iconName="fa fa-file"/>
    )
}

export default TriajeTable