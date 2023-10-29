// {
//     "idCita": 3,
//     "paciente": {
//         "idPersona": 23,
//         "nombres": "Javier",
//         "apellidoPaterno": "Mendez",
//         "apellidoMaterno": "Molinas",
//         "dni": "74032409",
//         "fechaNacimiento": null,
//         "sexo": null,
//         "telefono": null,
//         "correoElectronico": null,
//         "foto": null,
//         "estado": 0,
//         "codigoSeguro": null,
//         "tipoSeguro": null,
//         "tieneAcompanhante": false,
//         "nombreAcompnhante": null,
//         "dniAcompanhante": null,
//         "correo": null,
//         "direccion": null,
//         "parentezco": null,
//         "historialClinico": null,
//         "programacionesCitas": null
//     },
//     "medico": {
//         "idPersona": 1,
//         "nombres": "Marcos",
//         "apellidoPaterno": "Salute",
//         "apellidoMaterno": "Segura",
//         "dni": null,
//         "fechaNacimiento": null,
//         "sexo": null,
//         "telefono": null,
//         "correoElectronico": null,
//         "foto": null,
//         "estado": 0,
//         "area": null,
//         "cmp": null,
//         "especialidad": {
//             "idEspecialidad": 0,
//             "codigo": null,
//             "nombre": "Cardiología",
//             "descripcion": null,
//             "estado": 0
//         },
//         "horariosAtencion": null
//     },
//     "horaCita": "14:30:00",
//     "fechaCita": "2023-10-23",
//     "lugarCita": null,
//     "tipoCita": null,
//     "codigoCita": "CODIGO_CITA_1",
//     "estadoCita": null,
//     "estado": 4,
//     "triaje": null,
//     "codigoCitaMedica": null,
//     "hojaMedica": {
//         "idHojaClinica": 1,
//         "codigo": null,
//         "fecha": null,
//         "estado": 0,
//         "diagnostico": null,
//         "resultados": null,
//         "recetaMedica": null
//     },
//     "ordenesLaboratorio": null,
//     "requiereTriaje": 0
// },

const getStatus = (estado) => {
    switch (estado) {
        case 1:
            return "Atendida"
        case 2:
            return "En Consultorio"
        case 3:
            return "Cancelada"
        case 4:
            return "Pendiente"
        default:
            return "Desconocido" // Puedes cambiar este valor predeterminado por lo que consideres adecuado.
    }
}



export function parseAppointmentTable(data) {
    const table = data.map(row => [
        { "data": row["idCita"] },
        { "data": `${row["paciente"]["nombres"]} ${row["paciente"]["apellidoPaterno"]} ${row["paciente"]["apellidoMaterno"]}` },
        { "data": `${row["medico"]["nombres"]} ${row["medico"]["apellidoPaterno"]} ${row["medico"]["apellidoMaterno"]}` },
        { "data": row["medico"]["especialidad"]["nombre"] },
        { "data": row["fechaCita"] },
        { "data": row["horaCita"] },
        { "data": getStatus(row["estado"]) }  // Utilizando la función getStatus aquí
    ])
    console.log(table)
    return table
}

export function parsePatientAppointmentTable(data) {
    const table = data.map(row => [
        { "data": row["idCita"] },
        { "data": `${row["medico"]["nombres"]} ${row["medico"]["apellidoPaterno"]} ${row["medico"]["apellidoMaterno"]}` },
        { "data": row["medico"]["especialidad"]["nombre"] },
        { "data": row["fechaCita"] },
        { "data": row["horaCita"] },
        { "data": getStatus(row["estado"]) }  // Utilizando la función getStatus aquí
    ])
    console.log(table)
    return table
}
