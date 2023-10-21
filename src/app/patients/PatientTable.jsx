
import Table from "@/components/table/Table"

//Nombre de las columnas a secas
const columns = [
    { name: "ID" },
    { name: "Nombre completo" },
    { name: "DNI" },
    { name: "Fecha de nacimiento" },
    { name: "Telefono" },
    { name: "Opciones" },
]

//Parsear antes de meterlo a la tabla
/* Prueba de datos
    const data = [
    [{ data: "Apple MacBook Pro 17" }, { data: "Silver" }, { data: "Laptop" }, { data: "$2999" }],
    [{ data: "Microsoft Surface Pro" }, { data: "White" }, { data: "Laptop PC" }, { data: "$1999" }],
    [{ data: "Magic Mouse 2" }, { data: "Black" }, { data: "Accessories" }, { data: "$99" }]
] */


const PatientTable = ({ data }) => {
    return (
        <div  >
            <Table columns={columns} data={data} />
        </div >

    )
}

export default PatientTable