
import Table from "@/components/table/Table"

//Nombre de las columnas a secas
const columns = [
    { name: "Código" },
    { name: "Fecha Actualización" },
    { name: "DNI" },
    { name: "Nombre completo" },
    { name: "Urgencia" },
    { name: "Estado" },
    { name: "Opciones" },
]

const TriajeTable = ({ data }) => {
    return (
        <Table columns={columns} data={data} url="/triajes/profile" iconName="fa fa-file" />
    )
}

export default TriajeTable