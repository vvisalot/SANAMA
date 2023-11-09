import Table from "@/components/table/Table"

const columns = [
    { name: "Nombre del doctor" },
    { name: "Especialidad" },
    { name: "Fecha" },
    { name: "Hora" },
    { name: "Estado" },
]

//TODO: PENDIENTE REDIRECCIONAR INFORMACION DE LAS CITAS DE UN PACIENTE.
//POR AHORA ES SOLO LA VISUALIZACION DE LA TABLA

const PatientAppointmentTable = ({ data }) => {
    return (
        <Table
            columns={columns}
            data={data}
            url={''}>
        </Table>

    )
}

export default PatientAppointmentTable