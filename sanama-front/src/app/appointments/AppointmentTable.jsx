//Tabla de citas

import Table from "@/components/table/Table"

//Nombre de las columnas a secas
const columns = [
    { name: "ID" },
    { name: "Nombre del paciente" },
    { name: "Nombre del doctor" },
    { name: "Especialidad" },
    { name: "Fecha" },
    { name: "Hora" },
    { name: "Estado" },
    { name: "Opciones" },
]

const AppointmentTable = ({ data }) => {
    return (
        <Table url={'appointments/info'} columns={columns} data={data} optionsText={"Ver cita"} />
    )
}

export default AppointmentTable 