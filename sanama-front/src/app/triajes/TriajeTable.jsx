
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

const options = [
    {
        text: "Ver triaje",
        link: "/triajes/profile",
        icon: "fa fa-file",
    },
]

const TriajeTable = ({ data }) => {
    return (
        <Table
            columns={columns}
            data={data}
            options={options}
        />
    )
}

export default TriajeTable